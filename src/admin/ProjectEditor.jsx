import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import {
  deleteProject,
  deleteStoredFile,
  getProject,
  saveProject,
  slugTaken,
  uploadImage,
} from "./data";
import {
  Button,
  Card,
  ChipInput,
  FilePicker,
  IconButton,
  RowList,
  TextArea,
  TextInput,
  Toggle,
  describeError,
  inputCls,
  move,
  useToast,
} from "./ui";
import { BackIcon, ExternalIcon, TrashIcon, UpIcon, DownIcon } from "../components/Icons";
import { normalizeProject } from "../lib/seed";
import { todayISO } from "../lib/format";

const slugify = (s) =>
  s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 60);

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const lines = (text) =>
  text
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);

export default function ProjectEditor() {
  const { id } = useParams();
  const isNew = !id;
  const navigate = useNavigate();
  const toast = useToast();

  const [original, setOriginal] = useState(null);
  const [form, setForm] = useState(null);
  const [featuresText, setFeaturesText] = useState("");
  const [slugEdited, setSlugEdited] = useState(!isNew);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(null);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    if (isNew) {
      const blank = normalizeProject({
        published: false,
        lastUpdated: todayISO(),
        order: Date.now(),
        deviceFrame: "browser",
      });
      setOriginal(blank);
      setForm(blank);
      setFeaturesText("");
      return;
    }
    getProject(id)
      .then((p) => {
        if (!p) return setMissing(true);
        setOriginal(p);
        setForm(p);
        setFeaturesText(p.features.join("\n"));
      })
      .catch((e) => toast(describeError(e), "error"));
  }, [id, isNew, toast]);

  const current = useMemo(
    () => form && { ...form, features: lines(featuresText) },
    [form, featuresText],
  );
  const dirty = Boolean(
    current && original && JSON.stringify(current) !== JSON.stringify(original),
  );

  useEffect(() => {
    if (!dirty) return undefined;
    const warn = (e) => e.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  if (missing) {
    return (
      <div>
        <p className="text-dim">This project no longer exists.</p>
        <Link to="/admin/projects" className="mt-4 inline-block text-signal">
          Back to projects
        </Link>
      </div>
    );
  }

  if (!form) return <div className="h-96 animate-pulse rounded-2xl bg-panel" aria-busy="true" />;

  const set = (key) => (value) => {
    setForm((f) => {
      const next = { ...f, [key]: value };
      if (key === "name" && !slugEdited) next.slug = slugify(value);
      return next;
    });
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const folder = `projects/${form.slug || "untitled"}`;

  const upload = async (files, target) => {
    setUploading(target);
    try {
      const urls = [];
      for (const file of files) urls.push(await uploadImage(file, folder));
      if (target === "cover") set("cover")(urls[0]);
      else set("screenshots")([...form.screenshots, ...urls]);
      toast(urls.length > 1 ? `${urls.length} images uploaded.` : "Image uploaded.");
    } catch (e) {
      toast(describeError(e), "error");
    } finally {
      setUploading(null);
    }
  };

  const validate = async () => {
    const next = {};
    if (!form.name.trim()) next.name = "Give the project a name.";
    if (!SLUG_RE.test(form.slug))
      next.slug = "Use lowercase letters, numbers and hyphens, e.g. my-app.";
    else if (await slugTaken(form.slug, id)) next.slug = "Another project already uses this address.";
    if (form.link && !/^https?:\/\//i.test(form.link)) next.link = "Start the link with https://";
    if (form.repo && !/^https?:\/\//i.test(form.repo)) next.repo = "Start the link with https://";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const save = async () => {
    setSaving(true);
    try {
      if (!(await validate())) {
        toast("Fix the highlighted fields first.", "error");
        return;
      }
      const data = { ...current, name: current.name.trim() };
      const savedId = await saveProject(id, data);
      const kept = new Set([data.cover, ...data.screenshots]);
      const removed = [original.cover, ...original.screenshots].filter(
        (u) => u && !kept.has(u),
      );
      await Promise.all(removed.map(deleteStoredFile));
      setOriginal(data);
      setForm(data);
      toast(data.published ? "Project saved and live." : "Project saved as draft.");
      if (isNew) navigate(`/admin/projects/${savedId}`, { replace: true });
    } catch (e) {
      toast(describeError(e), "error");
    } finally {
      setSaving(false);
    }
  };

  const remove = async () => {
    if (!window.confirm(`Delete "${form.name || "this project"}"? This can't be undone.`)) return;
    try {
      await deleteProject({ ...original, id });
      toast("Project deleted.");
      navigate("/admin/projects", { replace: true });
    } catch (e) {
      toast(describeError(e), "error");
    }
  };

  return (
    <div className="space-y-6">
      <header>
        <button
          type="button"
          onClick={() => {
            if (!dirty || window.confirm("Leave without saving your changes?")) navigate("/admin/projects");
          }}
          className="inline-flex min-h-11 items-center gap-1 text-sm text-dim hover:text-fg"
        >
          <BackIcon />
          Projects
        </button>
        <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
          <h1 className="font-display text-3xl font-bold">
            {isNew ? "New project" : form.name || "Untitled project"}
          </h1>
          {!isNew && original.published && original.slug && (
            <a
              href={`/work/${original.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-signal hover:underline"
            >
              View on site
              <ExternalIcon />
            </a>
          )}
        </div>
      </header>

      <Card title="Visibility">
        <Toggle
          label="Published"
          hint="Drafts are only visible to you."
          checked={form.published}
          onChange={set("published")}
        />
        <Toggle
          label="Featured"
          hint="Featured projects are shown large at the top of your work."
          checked={form.featured}
          onChange={set("featured")}
        />
      </Card>

      <Card title="Basics">
        <TextInput label="Project name" value={form.name} onChange={set("name")} error={errors.name} />
        <TextInput
          label="Page address"
          hint={`Your case study will live at /work/${form.slug || "…"}`}
          value={form.slug}
          error={errors.slug}
          onChange={(v) => {
            setSlugEdited(true);
            set("slug")(v.toLowerCase().replace(/\s+/g, "-"));
          }}
        />
        <TextArea
          label="Summary"
          hint="One or two sentences shown on cards and at the top of the case study."
          rows={3}
          value={form.summary}
          onChange={set("summary")}
        />
        <div className="grid gap-5 sm:grid-cols-2">
          <TextInput label="Your role" placeholder="Full-stack developer" value={form.role} onChange={set("role")} />
          <TextInput label="Status" placeholder="In production, Prototype…" value={form.status} onChange={set("status")} />
          <div>
            <TextInput
              label="Last updated"
              hint="Shown on your site. Leave empty to hide."
              type="date"
              max={todayISO()}
              value={form.lastUpdated}
              onChange={set("lastUpdated")}
            />
            <button
              type="button"
              onClick={() => set("lastUpdated")(todayISO())}
              className="mt-1 min-h-11 text-sm text-signal hover:underline"
            >
              Set to today
            </button>
          </div>
          <TextInput
            label="Live link"
            type="url"
            inputMode="url"
            placeholder="https://"
            value={form.link}
            onChange={set("link")}
            error={errors.link}
          />
          <TextInput
            label="Source code link"
            hint="Optional"
            type="url"
            inputMode="url"
            placeholder="https://github.com/…"
            value={form.repo}
            onChange={set("repo")}
            error={errors.repo}
          />
        </div>
        <ChipInput
          label="Technologies"
          hint="Press Enter or comma after each one."
          value={form.technologies}
          onChange={set("technologies")}
        />
      </Card>

      <Card title="Images" description="Images are resized and compressed before upload.">
        <div>
          <p className="text-sm font-medium">Screenshot style</p>
          <div className="mt-2 flex gap-2" role="radiogroup" aria-label="Screenshot style">
            {[
              ["phone", "Phone"],
              ["browser", "Desktop / browser"],
            ].map(([value, label]) => (
              <button
                key={value}
                type="button"
                role="radio"
                aria-checked={form.deviceFrame === value}
                onClick={() => set("deviceFrame")(value)}
                className={`min-h-11 rounded-xl border px-4 text-sm transition-colors ${
                  form.deviceFrame === value ? "border-signal text-signal" : "border-line text-dim hover:text-fg"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-medium">Cover image</p>
          <p className="text-xs text-faint">Used as the thumbnail in your project list.</p>
          <div className="mt-3 flex flex-wrap items-center gap-4">
            <div className="h-24 w-24 overflow-hidden rounded-xl border border-line bg-ink">
              {form.cover && <img src={form.cover} alt="Cover preview" className="h-full w-full object-cover object-top" />}
            </div>
            <FilePicker
              label={form.cover ? "Replace cover" : "Upload cover"}
              accept="image/*"
              busy={uploading === "cover"}
              onFiles={(files) => upload(files, "cover")}
            />
            {form.cover && (
              <Button variant="ghost" onClick={() => set("cover")("")}>
                Remove
              </Button>
            )}
          </div>
        </div>

        <div>
          <p className="text-sm font-medium">Screenshots</p>
          <p className="text-xs text-faint">Shown as a gallery on the case-study page, in this order.</p>
          {form.screenshots.length > 0 && (
            <ul className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {form.screenshots.map((src, i) => (
                <li key={src + i} className="overflow-hidden rounded-xl border border-line bg-ink">
                  <img src={src} alt={`Screenshot ${i + 1}`} className="aspect-[3/4] w-full object-cover object-top" />
                  <div className="flex justify-between border-t border-line">
                    <IconButton
                      label="Move earlier"
                      disabled={i === 0}
                      onClick={() => set("screenshots")(move(form.screenshots, i, -1))}
                    >
                      <UpIcon className="h-4 w-4 -rotate-90" />
                    </IconButton>
                    <IconButton
                      label="Remove screenshot"
                      className="hover:text-danger"
                      onClick={() => set("screenshots")(form.screenshots.filter((_, j) => j !== i))}
                    >
                      <TrashIcon />
                    </IconButton>
                    <IconButton
                      label="Move later"
                      disabled={i === form.screenshots.length - 1}
                      onClick={() => set("screenshots")(move(form.screenshots, i, 1))}
                    >
                      <DownIcon className="h-4 w-4 -rotate-90" />
                    </IconButton>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <div className="mt-3">
            <FilePicker
              label="Add screenshots"
              accept="image/*"
              multiple
              busy={uploading === "screenshots"}
              onFiles={(files) => upload(files, "screenshots")}
            />
          </div>
        </div>
      </Card>

      <Card
        title="Case study"
        description="Optional. Fill these in and the project gets its own page; leave them empty and it links straight to the live app."
      >
        <TextArea label="The problem" value={form.problem} onChange={set("problem")} />
        <TextArea label="The challenge" rows={3} value={form.challenge} onChange={set("challenge")} />
        <TextArea label="How you approached it" rows={6} value={form.approach} onChange={set("approach")} />
        <TextArea label="Result" rows={3} value={form.outcome} onChange={set("outcome")} />
        <TextArea
          label="What it does"
          hint="One feature per line."
          rows={6}
          value={featuresText}
          onChange={setFeaturesText}
        />
        <div>
          <p className="text-sm font-medium">Feature breakdown</p>
          <p className="mb-3 text-xs text-faint">Grouped areas of the product, each with a short description.</p>
          <RowList
            items={form.featureGroups}
            onChange={set("featureGroups")}
            makeNew={() => ({ name: "", details: "" })}
            addLabel="Add group"
            renderRow={(g, update) => (
              <>
                <input
                  aria-label="Group name"
                  placeholder="Group name"
                  className={inputCls}
                  value={g.name}
                  onChange={(e) => update({ ...g, name: e.target.value })}
                />
                <textarea
                  aria-label="Group details"
                  placeholder="Details"
                  rows={3}
                  className={`${inputCls} resize-y`}
                  value={g.details}
                  onChange={(e) => update({ ...g, details: e.target.value })}
                />
              </>
            )}
          />
        </div>
      </Card>

      {!isNew && (
        <Card title="Danger zone">
          <Button variant="danger" onClick={remove}>
            <TrashIcon />
            Delete project
          </Button>
        </Card>
      )}

      <div className="sticky bottom-[calc(4.5rem+env(safe-area-inset-bottom))] z-30 -mx-1 flex items-center justify-between gap-3 rounded-2xl border border-line bg-panel-2/95 p-3 backdrop-blur md:bottom-4">
        <p className="pl-2 text-sm text-dim" aria-live="polite">
          {dirty ? "Unsaved changes" : "All changes saved"}
        </p>
        <Button onClick={save} disabled={saving || (!dirty && !isNew) || Boolean(uploading)}>
          {saving ? "Saving…" : form.published ? "Save and publish" : "Save draft"}
        </Button>
      </div>
    </div>
  );
}
