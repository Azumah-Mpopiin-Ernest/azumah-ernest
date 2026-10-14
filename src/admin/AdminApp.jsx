import { useEffect } from "react";
import { NavLink, Route, Routes } from "react-router";
import { AuthProvider, useAuth } from "./auth";
import { ToastProvider } from "./ui";
import Login from "./Login";
import Overview from "./Overview";
import ProjectsList from "./ProjectsList";
import ProjectEditor from "./ProjectEditor";
import ProfileEditor from "./ProfileEditor";
import Notes from "./Notes";
import { GridIcon, HomeIcon, NoteIcon, UserIcon } from "../components/Icons";
import NotFound from "../pages/NotFound";

const nav = [
  { to: "/admin", label: "Overview", icon: HomeIcon, end: true },
  { to: "/admin/projects", label: "Projects", icon: GridIcon },
  { to: "/admin/profile", label: "Profile", icon: UserIcon },
  { to: "/admin/notes", label: "Notes", icon: NoteIcon },
];

function Shell({ children }) {
  const { user, signOut } = useAuth();
  return (
    <div className="min-h-dvh md:flex">
      <aside className="sticky top-0 hidden h-dvh w-60 shrink-0 flex-col border-r border-line bg-panel/60 p-4 md:flex">
        <p className="px-3 py-2 font-display text-lg font-bold">Dashboard</p>
        <nav aria-label="Dashboard" className="mt-4 flex flex-col gap-1">
          {nav.map(({ to, label, icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm transition-colors ${
                  isActive ? "bg-panel-2 text-fg" : "text-dim hover:text-fg"
                }`
              }
            >
              {icon({ className: "h-5 w-5" })}
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="mt-auto space-y-1 border-t border-line pt-4">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-11 items-center rounded-xl px-3 text-sm text-dim hover:text-fg"
          >
            View live site
          </a>
          <button
            type="button"
            onClick={signOut}
            className="flex min-h-11 w-full items-center rounded-xl px-3 text-left text-sm text-dim hover:text-fg"
          >
            Sign out
          </button>
          <p className="truncate px-3 text-xs text-faint">{user?.email}</p>
        </div>
      </aside>

      <main className="min-w-0 flex-1 px-4 pt-[calc(1.5rem+env(safe-area-inset-top))] pb-[calc(6.5rem+env(safe-area-inset-bottom))] sm:px-8 md:pt-10 md:pb-16">
        <div className="mx-auto max-w-4xl">{children}</div>
      </main>

      <nav
        aria-label="Dashboard"
        className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-4 border-t border-line bg-ink/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden"
      >
        {nav.map(({ to, label, icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex min-h-16 flex-col items-center justify-center gap-1 text-xs transition-colors ${
                isActive ? "text-signal" : "text-faint"
              }`
            }
          >
            {icon({ className: "h-5 w-5" })}
            {label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}

function Gate() {
  const { ready, isOwner } = useAuth();

  useEffect(() => {
    document.title = "Dashboard · Azumah";
    let robots = document.querySelector('meta[name="robots"]');
    if (!robots) {
      robots = document.createElement("meta");
      robots.name = "robots";
      document.head.appendChild(robots);
    }
    robots.content = "noindex";
    return () => robots.remove();
  }, []);

  if (!ready) return <div className="min-h-dvh" aria-busy="true" />;
  if (!isOwner) return <Login />;

  return (
    <Shell>
      <Routes>
        <Route index element={<Overview />} />
        <Route path="projects" element={<ProjectsList />} />
        <Route path="projects/new" element={<ProjectEditor />} />
        <Route path="projects/:id" element={<ProjectEditor />} />
        <Route path="profile" element={<ProfileEditor />} />
        <Route path="notes" element={<Notes />} />
        <Route path="notes/:id" element={<Notes />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Shell>
  );
}

export default function AdminApp() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Gate />
      </ToastProvider>
    </AuthProvider>
  );
}
