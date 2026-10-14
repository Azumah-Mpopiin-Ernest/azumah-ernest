import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  createNote,
  getProfile,
  importStarterContent,
  subscribeNotes,
  subscribeProjects,
} from "./data";
import { Button, Card, describeError, useToast } from "./ui";
import { useAuth } from "./auth";
import { PlusIcon } from "../components/Icons";

function Stat({ label, value, to }) {
  return (
    <Link
      to={to}
      className="rounded-2xl border border-line bg-panel p-5 transition-colors hover:border-faint"
    >
      <p className="font-display text-3xl font-bold">{value ?? "–"}</p>
      <p className="mt-1 text-sm text-dim">{label}</p>
    </Link>
  );
}

export default function Overview() {
  const { user } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const [projects, setProjects] = useState(null);
  const [notes, setNotes] = useState(null);
  const [hasProfile, setHasProfile] = useState(null);
  const [importing, setImporting] = useState(false);

  useEffect(() => {
    const onError = (e) => toast(describeError(e), "error");
    const offP = subscribeProjects(setProjects, onError);
    const offN = subscribeNotes(setNotes, onError);
    getProfile()
      .then((p) => setHasProfile(Boolean(p)))
      .catch(onError);
    return () => {
      offP();
      offN();
    };
  }, [toast]);

  const published = projects?.filter((p) => p.published).length;
  const drafts = projects?.filter((p) => !p.published).length;
  const firstName = user?.displayName?.split(" ")[0];

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-display text-3xl font-bold">
          {firstName ? `Hi, ${firstName}` : "Overview"}
        </h1>
        <p className="mt-1 text-dim">Here's what's on your portfolio right now.</p>
      </header>

      {projects?.length === 0 && (
        <Card
          title="Bring in your current portfolio"
          description="Your database is empty, so visitors are seeing the content bundled with the site. Import it once to start editing everything from here."
        >
          <Button
            disabled={importing}
            onClick={async () => {
              setImporting(true);
              try {
                await importStarterContent({ includeProfile: !hasProfile });
                toast("Imported your projects and profile.");
              } catch (e) {
                toast(describeError(e), "error");
              } finally {
                setImporting(false);
              }
            }}
          >
            {importing ? "Importing…" : "Import current content"}
          </Button>
        </Card>
      )}

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <Stat label="Published projects" value={published} to="/admin/projects" />
        <Stat label="Drafts" value={drafts} to="/admin/projects" />
        <Stat label="Private notes" value={notes?.length} to="/admin/notes" />
      </div>

      <div className="flex flex-wrap gap-3">
        <Button onClick={() => navigate("/admin/projects/new")}>
          <PlusIcon />
          New project
        </Button>
        <Button
          variant="secondary"
          onClick={async () => {
            try {
              const id = await createNote();
              navigate(`/admin/notes/${id}`);
            } catch (e) {
              toast(describeError(e), "error");
            }
          }}
        >
          <PlusIcon />
          New note
        </Button>
        <Button variant="secondary" onClick={() => navigate("/admin/profile")}>
          Edit profile
        </Button>
      </div>

      {notes?.some((n) => n.pinned) && (
        <section>
          <h2 className="font-display text-lg font-bold">Pinned notes</h2>
          <ul className="mt-3 grid gap-3 sm:grid-cols-2">
            {notes
              .filter((n) => n.pinned)
              .slice(0, 4)
              .map((n) => (
                <li key={n.id}>
                  <Link
                    to={`/admin/notes/${n.id}`}
                    className="block rounded-2xl border border-line bg-panel p-4 hover:border-faint"
                  >
                    <p className="font-medium">{n.title || "Untitled note"}</p>
                    <p className="mt-1 line-clamp-2 text-sm text-dim">{n.body}</p>
                  </Link>
                </li>
              ))}
          </ul>
        </section>
      )}
    </div>
  );
}
