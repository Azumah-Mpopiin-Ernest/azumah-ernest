import { Link } from "react-router";
import DeviceFrame from "./DeviceFrame";
import { ChevronRight, ExternalIcon } from "./Icons";
import { hasCaseStudy } from "../lib/seed";
import { safeHref } from "../lib/url";

function TechList({ items }) {
  if (!items?.length) return null;
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Technologies">
      {items.map((t) => (
        <li
          key={t}
          className="rounded-md bg-panel-2 px-2 py-1 text-xs text-dim"
        >
          {t}
        </li>
      ))}
    </ul>
  );
}

function StatusTag({ status }) {
  if (!status) return null;
  const live = /production|live/i.test(status);
  return (
    <span className="inline-flex items-center gap-1.5 text-sm text-dim">
      <span
        className={`h-1.5 w-1.5 rounded-full ${live ? "bg-ok" : "bg-faint"}`}
      />
      {status}
    </span>
  );
}

function FeaturedProject({ project }) {
  const caseStudy = hasCaseStudy(project);
  return (
    <article className="grid gap-10 rounded-3xl border border-line bg-panel p-6 sm:p-10 md:grid-cols-[1.15fr_1fr] md:items-center">
      <div className="order-2 md:order-1">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <StatusTag status={project.status} />
          {project.role && (
            <span className="text-sm text-faint">{project.role}</span>
          )}
        </div>
        <h3 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
          {project.name}
        </h3>
        <p className="mt-4 max-w-[60ch] text-dim">{project.summary}</p>
        {project.challenge && (
          <p className="mt-4 max-w-[60ch] border-l-2 border-signal pl-4 text-fg">
            {project.challenge}
          </p>
        )}
        <div className="mt-6">
          <TechList items={project.technologies} />
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          {caseStudy && (
            <Link
              to={`/work/${project.slug}`}
              className="inline-flex min-h-11 items-center gap-1 rounded-xl bg-action px-5 font-semibold text-on-action transition-colors hover:bg-action-hover"
            >
              Read the case study
              <ChevronRight />
            </Link>
          )}
          {project.link && (
            <a
              href={safeHref(project.link)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-line px-5 text-fg transition-colors hover:border-fg"
            >
              Open live app
              <ExternalIcon />
            </a>
          )}
        </div>
      </div>
      {project.cover && (
        <div className="order-1 mx-auto w-full max-w-[300px] md:order-2">
          <DeviceFrame kind={project.deviceFrame}>
            <img
              src={project.screenshots?.[0] || project.cover}
              alt={`${project.name} screen`}
              className="h-full w-full object-cover object-top"
              loading="lazy"
            />
          </DeviceFrame>
        </div>
      )}
    </article>
  );
}

function ProjectRow({ project }) {
  const caseStudy = hasCaseStudy(project);
  const inner = (
    <>
      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-line bg-panel-2 sm:h-20 sm:w-24">
        {project.cover && (
          <img
            src={project.cover}
            alt=""
            className="h-full w-full object-cover object-top"
            loading="lazy"
          />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline gap-x-3">
          <h3 className="font-display text-lg font-bold text-fg sm:text-xl">
            {project.name}
          </h3>
          <StatusTag status={project.status} />
        </div>
        <p className="mt-1 line-clamp-2 text-sm text-dim sm:max-w-[70ch]">
          {project.summary}
        </p>
        <p className="mt-2 hidden text-xs text-faint sm:block">
          {project.technologies?.join(", ")}
        </p>
      </div>
      <span className="hidden shrink-0 items-center gap-1 text-sm text-dim transition-colors group-hover:text-signal sm:flex">
        {caseStudy ? (
          <>
            Case study <ChevronRight />
          </>
        ) : (
          <>
            Live app <ExternalIcon />
          </>
        )}
      </span>
    </>
  );

  const cls =
    "group flex items-start gap-4 rounded-xl px-2 py-5 transition-colors hover:bg-panel sm:items-center sm:gap-6 sm:px-4";

  return (
    <li className="border-t border-line first:border-t-0">
      {caseStudy ? (
        <Link to={`/work/${project.slug}`} className={cls}>
          {inner}
        </Link>
      ) : (
        <a
          href={safeHref(project.link)}
          target="_blank"
          rel="noopener noreferrer"
          className={cls}
        >
          {inner}
        </a>
      )}
    </li>
  );
}

export default function Work({ projects }) {
  const featured = projects?.filter((p) => p.featured) ?? [];
  const rest = projects?.filter((p) => !p.featured) ?? [];

  return (
    <section id="work" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Selected work
        </h2>
        {projects && (
          <p className="text-sm text-faint">
            {projects.length} project{projects.length === 1 ? "" : "s"}
          </p>
        )}
      </div>

      {!projects ? (
        <div className="mt-10 space-y-4" aria-busy="true">
          <div className="h-80 animate-pulse rounded-3xl bg-panel" />
          <div className="h-20 animate-pulse rounded-xl bg-panel" />
          <div className="h-20 animate-pulse rounded-xl bg-panel" />
        </div>
      ) : (
        <>
          <div className="mt-10 space-y-6">
            {featured.map((p) => (
              <FeaturedProject key={p.id || p.slug} project={p} />
            ))}
          </div>
          {rest.length > 0 && (
            <>
              <h3 className="mt-16 font-display text-xl font-bold text-dim">
                More projects
              </h3>
              <ul className="mt-4">
                {rest.map((p) => (
                  <ProjectRow key={p.id || p.slug} project={p} />
                ))}
              </ul>
            </>
          )}
        </>
      )}
    </section>
  );
}
