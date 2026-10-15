import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  deleteProject,
  reorderProjects,
  setProjectFields,
  subscribeProjects,
} from "./data";
import { Button, IconButton, describeError, move, useToast } from "./ui";
import { formatDay } from "../lib/format";
import {
  DownIcon,
  PlusIcon,
  StarIcon,
  TrashIcon,
  UpIcon,
} from "../components/Icons";

export default function ProjectsList() {
  const toast = useToast();
  const navigate = useNavigate();
  const [projects, setProjects] = useState(null);

  useEffect(
    () => subscribeProjects(setProjects, (e) => toast(describeError(e), "error")),
    [toast],
  );

  const run = async (fn, success) => {
    try {
      await fn();
      if (success) toast(success);
    } catch (e) {
      toast(describeError(e), "error");
    }
  };

  return (
    <div>
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold">Projects</h1>
          <p className="mt-1 text-dim">
            The order here is the order on your site. Featured projects are shown large.
          </p>
        </div>
        <Button onClick={() => navigate("/admin/projects/new")}>
          <PlusIcon />
          New project
        </Button>
      </header>

      {!projects ? (
        <div className="mt-8 space-y-3" aria-busy="true">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-20 animate-pulse rounded-2xl bg-panel" />
          ))}
        </div>
      ) : projects.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-line p-10 text-center">
          <p className="text-dim">No projects yet.</p>
          <p className="mt-1 text-sm text-faint">
            Import your current content from Overview, or add your first project.
          </p>
        </div>
      ) : (
        <ul className="mt-8 space-y-2">
          {projects.map((p, i) => (
            <li
              key={p.id}
              className="flex items-center gap-3 rounded-2xl border border-line bg-panel p-2 pr-1 sm:gap-4 sm:p-3"
            >
              <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-panel-2">
                {p.cover && (
                  <img src={p.cover} alt="" className="h-full w-full object-cover object-top" />
                )}
              </div>
              <Link to={`/admin/projects/${p.id}`} className="min-w-0 flex-1 py-1">
                <p className="truncate font-medium text-fg hover:text-signal">
                  {p.name || "Untitled project"}
                </p>
                <p className="mt-0.5 flex flex-wrap gap-x-3 text-xs">
                  <span className={p.published ? "text-ok" : "text-action"}>
                    {p.published ? "Published" : "Draft"}
                  </span>
                  {p.featured && <span className="text-signal">Featured</span>}
                  <span className={p.lastUpdated ? "text-faint" : "text-danger"}>
                    {p.lastUpdated ? `Updated ${formatDay(p.lastUpdated)}` : "No date"}
                  </span>
                </p>
              </Link>
              <div className="flex shrink-0 items-center">
                <IconButton
                  label={p.featured ? "Remove from featured" : "Feature this project"}
                  className={p.featured ? "text-signal" : ""}
                  onClick={() => run(() => setProjectFields(p.id, { featured: !p.featured }))}
                >
                  <StarIcon filled={p.featured} />
                </IconButton>
                <IconButton
                  label="Move up"
                  disabled={i === 0}
                  onClick={() => run(() => reorderProjects(move(projects, i, -1)))}
                >
                  <UpIcon />
                </IconButton>
                <IconButton
                  label="Move down"
                  disabled={i === projects.length - 1}
                  onClick={() => run(() => reorderProjects(move(projects, i, 1)))}
                >
                  <DownIcon />
                </IconButton>
                <IconButton
                  label={`Delete ${p.name}`}
                  className="hidden hover:text-danger sm:inline-flex"
                  onClick={() => {
                    if (window.confirm(`Delete "${p.name}"? This can't be undone.`)) {
                      run(() => deleteProject(p), "Project deleted.");
                    }
                  }}
                >
                  <TrashIcon />
                </IconButton>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
