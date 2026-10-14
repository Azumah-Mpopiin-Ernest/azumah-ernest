import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import DeviceFrame from "../components/DeviceFrame";
import {
  BackIcon,
  ChevronRight,
  CodeIcon,
  ExternalIcon,
} from "../components/Icons";
import { useProfile, useProject } from "../lib/content";
import { safeHref } from "../lib/url";
import NotFound from "./NotFound";

function Gallery({ project }) {
  const shots = project.screenshots?.length
    ? project.screenshots
    : [project.cover].filter(Boolean);
  const [index, setIndex] = useState(0);
  const touchX = useRef(null);

  if (!shots.length) return null;

  const go = (dir) => setIndex((i) => (i + dir + shots.length) % shots.length);
  const phone = project.deviceFrame === "phone";

  return (
    <section aria-label={`${project.name} screenshots`} className="mt-14">
      <div
        className={`mx-auto ${phone ? "max-w-[320px]" : "max-w-[760px]"}`}
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
          touchX.current = null;
        }}
      >
        <DeviceFrame kind={project.deviceFrame}>
          <img
            src={shots[index]}
            alt={`${project.name} screen ${index + 1} of ${shots.length}`}
            className={`h-full w-full ${phone ? "object-cover object-top" : "object-contain"}`}
          />
        </DeviceFrame>
      </div>

      {shots.length > 1 && (
        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous screenshot"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-fg transition-colors hover:border-signal hover:text-signal"
          >
            <BackIcon />
          </button>
          <p className="min-w-16 text-center text-sm text-dim" aria-live="polite">
            {index + 1} / {shots.length}
          </p>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next screenshot"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-fg transition-colors hover:border-signal hover:text-signal"
          >
            <ChevronRight />
          </button>
        </div>
      )}

      {shots.length > 1 && (
        <div className="no-scrollbar mx-auto mt-6 flex max-w-[760px] gap-2 overflow-x-auto px-1 pb-2">
          {shots.map((src, i) => (
            <button
              key={src + i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show screenshot ${i + 1}`}
              aria-current={i === index ? "true" : undefined}
              className={`h-20 w-14 shrink-0 overflow-hidden rounded-md border-2 transition-colors ${
                i === index ? "border-signal" : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <img src={src} alt="" className="h-full w-full object-cover object-top" loading="lazy" />
            </button>
          ))}
        </div>
      )}
    </section>
  );
}

const story = [
  ["problem", "The problem"],
  ["challenge", "The challenge"],
  ["approach", "How I approached it"],
  ["outcome", "Result"],
];

export default function ProjectPage() {
  const { slug } = useParams();
  const { data: project, loading } = useProject(slug);
  const { data: profile } = useProfile();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    if (project) document.title = `${project.name} · ${profile?.name || "Case study"}`;
  }, [project, profile]);

  if (!loading && !project) return <NotFound />;

  return (
    <>
      <SiteHeader profile={profile} />
      <main className="mx-auto max-w-6xl px-4 pt-24 pb-20 sm:px-6 sm:pt-28">
        <Link
          to="/#work"
          className="inline-flex min-h-11 items-center gap-1 text-sm text-dim transition-colors hover:text-fg"
        >
          <BackIcon />
          All projects
        </Link>

        {!project ? (
          <div className="mt-10 space-y-4" aria-busy="true">
            <div className="h-16 w-2/3 animate-pulse rounded-xl bg-panel" />
            <div className="h-24 animate-pulse rounded-xl bg-panel" />
          </div>
        ) : (
          <article>
            <header className="mt-8 max-w-[52rem]">
              <h1 className="font-display text-[clamp(2.6rem,8vw,5rem)] leading-[0.95] font-extrabold tracking-[-0.03em]">
                {project.name}
              </h1>
              <p className="mt-6 text-lg text-dim sm:text-xl">{project.summary}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                {safeHref(project.link) && (
                  <a
                    href={safeHref(project.link)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-action px-5 font-semibold text-on-action transition-colors hover:bg-action-hover"
                  >
                    Open live app
                    <ExternalIcon />
                  </a>
                )}
                {safeHref(project.repo) && (
                  <a
                    href={safeHref(project.repo)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-line px-5 text-fg transition-colors hover:border-fg"
                  >
                    <CodeIcon />
                    Source code
                  </a>
                )}
              </div>
            </header>

            <dl className="mt-12 grid gap-6 border-y border-line py-6 sm:grid-cols-3">
              {project.role && (
                <div>
                  <dt className="text-sm text-faint">Role</dt>
                  <dd className="mt-1 text-fg">{project.role}</dd>
                </div>
              )}
              {project.status && (
                <div>
                  <dt className="text-sm text-faint">Status</dt>
                  <dd className="mt-1 text-fg">{project.status}</dd>
                </div>
              )}
              {project.technologies?.length > 0 && (
                <div>
                  <dt className="text-sm text-faint">Built with</dt>
                  <dd className="mt-1 text-fg">{project.technologies.join(", ")}</dd>
                </div>
              )}
            </dl>

            <Gallery key={project.slug} project={project} />

            <div className="mt-20 grid gap-12 md:grid-cols-[1fr_1.6fr]">
              <h2 className="font-display text-3xl font-bold tracking-tight">
                From problem to product
              </h2>
              <div className="space-y-10">
                {story
                  .filter(([key]) => project[key])
                  .map(([key, label]) => (
                    <section key={key}>
                      <h3 className="font-display text-lg font-bold text-signal">{label}</h3>
                      <p className="mt-2 max-w-[65ch] text-dim">{project[key]}</p>
                    </section>
                  ))}
              </div>
            </div>

            {project.features?.length > 0 && (
              <section className="mt-20 grid gap-12 md:grid-cols-[1fr_1.6fr]">
                <h2 className="font-display text-3xl font-bold tracking-tight">
                  What it does
                </h2>
                <ul className="grid gap-x-8 sm:grid-cols-2">
                  {project.features.map((f) => (
                    <li key={f} className="flex gap-3 border-t border-line py-3 text-dim">
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-signal" />
                      {f}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {project.featureGroups?.length > 0 && (
              <section className="mt-20">
                <h2 className="font-display text-3xl font-bold tracking-tight">
                  Feature breakdown
                </h2>
                <div className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2">
                  {project.featureGroups.map((g) => (
                    <div key={g.name} className="bg-ink p-6">
                      <h3 className="font-display text-lg font-bold text-fg">{g.name}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-dim">{g.details}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </article>
        )}
      </main>
      <SiteFooter profile={profile} />
    </>
  );
}
