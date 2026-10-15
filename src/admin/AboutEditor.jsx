import { useEffect, useState } from "react";
import { Link } from "react-router";
import {
  MAX_VIDEO_MB,
  deleteStoredFile,
  getAbout,
  saveAbout,
  uploadImage,
  uploadVideo,
} from "./data";
import {
  Button,
  Card,
  FilePicker,
  IconButton,
  RowList,
  TextArea,
  describeError,
  inputCls,
  move,
  useToast,
} from "./ui";
import { DownIcon, ExternalIcon, PlusIcon, TrashIcon, UpIcon } from "../components/Icons";
import { normalizeAbout, seedAbout } from "../lib/seed";
import { toEmbedUrl } from "../lib/embed";

const SUGGESTED = ["Presentations", "Hobbies", "Life outside code"];

const mediaUrls = (about) =>
  about.sections.flatMap((s) => s.media.filter((m) => m.kind !== "embed").map((m) => m.url));

function MediaPreview({ item }) {
  if (item.kind === "image") {
    return <img src={item.url} alt="" className="aspect-[4/3] w-full object-cover" />;
  }
  if (item.kind === "video") {
    return <video src={item.url} preload="metadata" muted className="aspect-[4/3] w-full bg-ink object-cover" />;
  }
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex aspect-[4/3] w-full flex-col items-center justify-center gap-1 bg-ink text-sm text-dim hover:text-signal"
    >
      Linked video
      <ExternalIcon />
    </a>
  );
}

function MediaManager({ media, onChange, onUpload, busy, progress }) {
  const [link, setLink] = useState("");
  const [linkError, setLinkError] = useState("");

  const addLink = () => {
    if (!toEmbedUrl(link)) {
      setLinkError("Paste a YouTube or Vimeo link, e.g. https://youtu.be/…");
      return;
    }
    onChange([...media, { kind: "embed", url: link.trim(), caption: "" }]);
    setLink("");
    setLinkError("");
  };

  return (
    <div>
      <p className="text-sm font-medium">Photos and videos</p>
      {media.length > 0 && (
        <ul className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {media.map((item, i) => (
            <li key={item.url + i} className="overflow-hidden rounded-xl border border-line bg-ink">
              <MediaPreview item={item} />
              <input
                aria-label={`Caption for item ${i + 1}`}
                placeholder="Caption (optional)"
                className="w-full border-y border-line bg-transparent px-3 py-2 text-sm text-fg placeholder:text-faint focus:outline-none"
                value={item.caption}
                onChange={(e) => onChange(media.map((m, j) => (j === i ? { ...m, caption: e.target.value } : m)))}
              />
              <div className="flex justify-between">
                <IconButton label="Move earlier" disabled={i === 0} onClick={() => onChange(move(media, i, -1))}>
                  <UpIcon className="h-4 w-4 -rotate-90" />
                </IconButton>
                <IconButton
                  label="Remove"
                  className="hover:text-danger"
                  onClick={() => onChange(media.filter((_, j) => j !== i))}
                >
                  <TrashIcon />
                </IconButton>
                <IconButton
                  label="Move later"
                  disabled={i === media.length - 1}
                  onClick={() => onChange(move(media, i, 1))}
                >
                  <DownIcon className="h-4 w-4 -rotate-90" />
                </IconButton>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-3 flex flex-wrap gap-2">
        <FilePicker
          label="Add photos"
          accept="image/*"
          multiple
          busy={busy === "image"}
          disabled={Boolean(busy)}
          onFiles={(f) => onUpload(f, "image")}
        />
        <FilePicker
          label="Upload video"
          accept="video/*"
          busy={busy === "video"}
          disabled={Boolean(busy)}
          onFiles={(f) => onUpload(f, "video")}
        />
      </div>
      {busy === "video" && progress != null && (
        <div className="mt-3" role="progressbar" aria-valuenow={Math.round(progress * 100)} aria-valuemin={0} aria-valuemax={100} aria-label="Video upload">
          <div className="h-2 overflow-hidden rounded-full bg-line">
            <div className="h-full bg-signal transition-[width]" style={{ width: `${progress * 100}%` }} />
          </div>
          <p className="mt-1 text-xs text-faint">Uploading video… {Math.round(progress * 100)}%</p>
        </div>
      )}
      <p className="mt-2 text-xs text-faint">
        Videos up to {MAX_VIDEO_MB} MB. For longer talks, upload to YouTube (unlisted is fine) and add the link.
      </p>

      <div className="mt-3 flex gap-2">
        <input
          aria-label="YouTube or Vimeo link"
          aria-invalid={linkError ? "true" : undefined}
          placeholder="YouTube or Vimeo link"
          inputMode="url"
          className={inputCls}
          value={link}
          onChange={(e) => {
            setLink(e.target.value);
            setLinkError("");
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addLink();
            }
          }}
        />
        <Button variant="secondary" onClick={addLink} disabled={!link.trim()}>
          Add link
        </Button>
      </div>
      {linkError && (
        <p className="mt-1 text-sm text-danger" role="alert">
          {linkError}
        </p>
      )}
    </div>
  );
}

export default function AboutEditor() {
  const toast = useToast();
  const [original, setOriginal] = useState(null);
  const [form, setForm] = useState(null);
  const [busy, setBusy] = useState({ section: null, kind: null, progress: null });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getAbout()
      .then((a) => {
        const value = a || normalizeAbout(seedAbout);
        setOriginal(value);
        setForm(value);
      })
      .catch((e) => toast(describeError(e), "error"));
  }, [toast]);

  const dirty = Boolean(form && JSON.stringify(form) !== JSON.stringify(original));

  useEffect(() => {
    if (!dirty) return undefined;
    const warn = (e) => e.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  if (!form) return <div className="h-96 animate-pulse rounded-2xl bg-panel" aria-busy="true" />;

  const setSections = (sections) => setForm((f) => ({ ...f, sections }));
  // Uploads finish later, so patch by index against the latest state.
  const patchMedia = (index, fn) =>
    setForm((f) => ({
      ...f,
      sections: f.sections.map((s, i) => (i === index ? { ...s, media: fn(s.media) } : s)),
    }));

  const upload = async (index, files, kind) => {
    setBusy({ section: index, kind, progress: kind === "video" ? 0 : null });
    try {
      for (const file of files) {
        const url =
          kind === "video"
            ? await uploadVideo(file, "about", (p) => setBusy((b) => ({ ...b, progress: p })))
            : await uploadImage(file, "about");
        patchMedia(index, (media) => [...media, { kind, url, caption: "" }]);
      }
      toast(kind === "video" ? "Video uploaded. Save to publish it." : "Photos uploaded. Save to publish them.");
    } catch (e) {
      toast(describeError(e), "error");
    } finally {
      setBusy({ section: null, kind: null, progress: null });
    }
  };

  const save = async () => {
    setSaving(true);
    try {
      const data = normalizeAbout(form);
      await saveAbout(data);
      const kept = new Set(mediaUrls(data));
      await Promise.all(mediaUrls(original).filter((u) => !kept.has(u)).map(deleteStoredFile));
      setOriginal(data);
      setForm(data);
      toast("About page saved.");
    } catch (e) {
      toast(describeError(e), "error");
    } finally {
      setSaving(false);
    }
  };

  const missing = SUGGESTED.filter((t) => !form.sections.some((s) => s.title === t));

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-bold">About page</h1>
          <p className="mt-1 text-dim">Your story, presentations, hobbies and life. Shown at /about.</p>
        </div>
        <a
          href="/about"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center gap-1 text-sm text-signal hover:underline"
        >
          View page
          <ExternalIcon />
        </a>
      </header>

      <Card
        title="Your story"
        description={
          <>
            Appears under your short intro. The intro itself, your photo and skills are edited in{" "}
            <Link to="/admin/profile" className="text-signal hover:underline">
              Profile
            </Link>
            .
          </>
        }
      >
        <TextArea
          label="Story"
          hint="Leave a blank line between paragraphs."
          rows={10}
          value={form.story}
          onChange={(story) => setForm((f) => ({ ...f, story }))}
        />
      </Card>

      <Card title="Sections" description="Each section gets a heading, text and a gallery.">
        <RowList
          items={form.sections}
          onChange={setSections}
          makeNew={() => ({ title: "", body: "", media: [] })}
          addLabel="Add section"
          empty="No sections yet."
          renderRow={(section, update, i) => (
            <>
              <input
                aria-label="Section heading"
                placeholder="Heading, e.g. Presentations"
                className={`${inputCls} font-display text-lg font-bold`}
                value={section.title}
                onChange={(e) => update({ ...section, title: e.target.value })}
              />
              <textarea
                aria-label="Section text"
                placeholder="What should people know? Leave a blank line between paragraphs."
                rows={4}
                className={`${inputCls} resize-y`}
                value={section.body}
                onChange={(e) => update({ ...section, body: e.target.value })}
              />
              <MediaManager
                media={section.media}
                onChange={(media) => patchMedia(i, () => media)}
                onUpload={(files, kind) => upload(i, files, kind)}
                busy={busy.section === i ? busy.kind : busy.section !== null ? "other" : null}
                progress={busy.section === i ? busy.progress : null}
              />
            </>
          )}
        />
        {missing.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 border-t border-line pt-4">
            <span className="text-sm text-faint">Quick add:</span>
            {missing.map((title) => (
              <Button
                key={title}
                variant="ghost"
                onClick={() => setSections([...form.sections, { title, body: "", media: [] }])}
              >
                <PlusIcon />
                {title}
              </Button>
            ))}
          </div>
        )}
      </Card>

      <div className="sticky bottom-[calc(4.5rem+env(safe-area-inset-bottom))] z-30 -mx-1 flex items-center justify-between gap-3 rounded-2xl border border-line bg-panel-2/95 p-3 backdrop-blur md:bottom-4">
        <p className="pl-2 text-sm text-dim" aria-live="polite">
          {dirty ? "Unsaved changes" : "All changes saved"}
        </p>
        <Button onClick={save} disabled={saving || !dirty || busy.section !== null}>
          {saving ? "Saving…" : "Save about page"}
        </Button>
      </div>
    </div>
  );
}
