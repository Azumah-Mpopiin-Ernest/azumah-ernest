import { useEffect, useState } from "react";
import {
  deleteStoredFile,
  getProfile,
  saveProfile,
  uploadImage,
  uploadPdf,
} from "./data";
import {
  Button,
  Card,
  FilePicker,
  RowList,
  TextArea,
  TextInput,
  describeError,
  inputCls,
  useToast,
} from "./ui";
import { seedProfile } from "../lib/seed";
import { safeHref } from "../lib/url";

export default function ProfileEditor() {
  const toast = useToast();
  const [original, setOriginal] = useState(null);
  const [form, setForm] = useState(null);
  const [fromSeed, setFromSeed] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(null);

  useEffect(() => {
    getProfile()
      .then((p) => {
        setFromSeed(!p);
        setOriginal(p || seedProfile);
        setForm(p || seedProfile);
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

  const set = (key) => (value) => setForm((f) => ({ ...f, [key]: value }));

  const upload = async (file, key) => {
    setUploading(key);
    try {
      const url =
        key === "resumeUrl" ? await uploadPdf(file, "resume") : await uploadImage(file, "profile");
      set(key)(url);
      toast("Uploaded. Save to apply it to your site.");
    } catch (e) {
      toast(describeError(e), "error");
    } finally {
      setUploading(null);
    }
  };

  const save = async () => {
    const badLink = form.contacts.find((c) => c.href && !safeHref(c.href));
    if (badLink) {
      toast(`The link for "${badLink.label}" must start with https://, mailto: or tel:`, "error");
      return;
    }
    setSaving(true);
    try {
      await saveProfile(form);
      await Promise.all(
        ["photoUrl", "resumeUrl"]
          .filter((k) => original[k] !== form[k])
          .map((k) => deleteStoredFile(original[k])),
      );
      setOriginal(form);
      setFromSeed(false);
      toast("Profile saved.");
    } catch (e) {
      toast(describeError(e), "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-3xl font-bold">Profile</h1>
        <p className="mt-1 text-dim">Everything visitors read about you outside your projects.</p>
        {fromSeed && (
          <p className="mt-3 rounded-xl border border-action/40 bg-action/10 p-3 text-sm text-fg">
            These are the values bundled with your site. Save once to start managing them here.
          </p>
        )}
      </header>

      <Card title="Introduction">
        <div className="grid gap-5 sm:grid-cols-2">
          <TextInput label="Full name" value={form.name} onChange={set("name")} />
          <TextInput label="Short name" hint="Shown in the site header." value={form.shortName} onChange={set("shortName")} />
          <TextInput label="Role" value={form.role} onChange={set("role")} />
          <TextInput label="Location" value={form.location} onChange={set("location")} />
        </div>
        <TextInput
          label="Headline"
          hint="The one line under your name at the top of the site."
          value={form.headline}
          onChange={set("headline")}
        />
        <TextArea label="Short intro" rows={3} value={form.intro} onChange={set("intro")} />
        <TextInput
          label="Availability"
          hint="Shown with a green dot. Leave empty to hide."
          value={form.availability}
          onChange={set("availability")}
        />
        <TextArea label="About me" rows={7} value={form.about} onChange={set("about")} />
      </Card>

      <Card title="Photo and CV">
        <div className="flex flex-wrap items-center gap-4">
          <img
            src={form.photoUrl || "/profile.png"}
            alt="Profile preview"
            className="h-20 w-20 rounded-2xl border border-line object-cover"
          />
          <FilePicker
            label="Replace photo"
            accept="image/*"
            busy={uploading === "photoUrl"}
            onFiles={([f]) => upload(f, "photoUrl")}
          />
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <a
            href={safeHref(form.resumeUrl)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-signal hover:underline"
          >
            View current CV
          </a>
          <FilePicker
            label="Upload new CV (PDF)"
            accept="application/pdf"
            busy={uploading === "resumeUrl"}
            onFiles={([f]) => upload(f, "resumeUrl")}
          />
        </div>
      </Card>

      <Card title="Contact links" description="Use https:// for websites, mailto: for email and tel: for phone numbers.">
        <RowList
          items={form.contacts}
          onChange={set("contacts")}
          makeNew={() => ({ label: "", value: "", href: "" })}
          addLabel="Add contact"
          renderRow={(c, update) => (
            <div className="grid gap-3 sm:grid-cols-3">
              <input aria-label="Label" placeholder="Label, e.g. Email" className={inputCls} value={c.label} onChange={(e) => update({ ...c, label: e.target.value })} />
              <input aria-label="Shown as" placeholder="Shown as" className={inputCls} value={c.value} onChange={(e) => update({ ...c, value: e.target.value })} />
              <input
                aria-label="Link"
                placeholder="https:// or mailto:"
                className={inputCls}
                value={c.href}
                onChange={(e) => update({ ...c, href: e.target.value.trim() })}
              />
            </div>
          )}
        />
      </Card>

      <Card title="Skills" description="Grouped skills with a short note on where you learned or used each one.">
        <RowList
          items={form.skills}
          onChange={set("skills")}
          makeNew={() => ({ group: "", items: [] })}
          addLabel="Add skill group"
          renderRow={(g, update) => (
            <>
              <input
                aria-label="Group name"
                placeholder="Group, e.g. Frontend"
                className={`${inputCls} font-medium`}
                value={g.group}
                onChange={(e) => update({ ...g, group: e.target.value })}
              />
              <RowList
                items={g.items}
                onChange={(items) => update({ ...g, items })}
                makeNew={() => ({ name: "", note: "" })}
                addLabel="Add skill"
                renderRow={(s, updateSkill) => (
                  <div className="grid gap-2 sm:grid-cols-2">
                    <input aria-label="Skill" placeholder="Skill" className={inputCls} value={s.name} onChange={(e) => updateSkill({ ...s, name: e.target.value })} />
                    <input aria-label="Note" placeholder="Where you learned it" className={inputCls} value={s.note} onChange={(e) => updateSkill({ ...s, note: e.target.value })} />
                  </div>
                )}
              />
            </>
          )}
        />
      </Card>

      <div className="sticky bottom-[calc(4.5rem+env(safe-area-inset-bottom))] z-30 -mx-1 flex items-center justify-between gap-3 rounded-2xl border border-line bg-panel-2/95 p-3 backdrop-blur md:bottom-4">
        <p className="pl-2 text-sm text-dim" aria-live="polite">
          {dirty ? "Unsaved changes" : fromSeed ? "Not saved to the database yet" : "All changes saved"}
        </p>
        <Button onClick={save} disabled={saving || Boolean(uploading) || (!dirty && !fromSeed)}>
          {saving ? "Saving…" : "Save profile"}
        </Button>
      </div>
    </div>
  );
}
