import { useEffect } from "react";
import { Link } from "react-router";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import MediaGallery from "../components/MediaGallery";
import CvActions from "../components/CvActions";
import Skills from "../components/Skills";
import { BackIcon, ExternalIcon } from "../components/Icons";
import { useAbout, useProfile } from "../lib/content";
import { safeHref } from "../lib/url";

const paragraphs = (text) =>
  (text || "")
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

export default function AboutPage() {
  const { data: profile } = useProfile();
  const { data: about } = useAbout();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (profile) document.title = `My story · ${profile.name}`;
  }, [profile]);

  const ready = profile && about;

  return (
    <>
      <SiteHeader profile={profile} />
      <main className="mx-auto max-w-6xl px-4 pt-24 pb-20 sm:px-6 sm:pt-28">
        <Link
          to="/"
          className="inline-flex min-h-11 items-center gap-1 text-sm text-dim transition-colors hover:text-fg"
        >
          <BackIcon />
          Home
        </Link>

        {!ready ? (
          <div className="mt-10 space-y-4" aria-busy="true">
            <div className="h-16 w-2/3 animate-pulse rounded-xl bg-panel" />
            <div className="h-40 animate-pulse rounded-xl bg-panel" />
          </div>
        ) : (
          <>
            <div className="mt-8 grid gap-12 md:grid-cols-[300px_1fr]">
              <aside className="md:sticky md:top-24 md:self-start">
                {safeHref(profile.photoUrl) && (
                  <img
                    src={safeHref(profile.photoUrl)}
                    alt={profile.name}
                    className="aspect-[4/5] w-48 rounded-3xl border border-line bg-panel object-cover md:w-full"
                  />
                )}
                <p className="mt-6 font-display text-2xl font-bold">{profile.name}</p>
                <p className="text-dim">{profile.role}</p>
                {profile.location && <p className="mt-1 text-sm text-faint">{profile.location}</p>}
                <div className="mt-6">
                  <CvActions url={profile.resumeUrl} />
                </div>
                <ul className="mt-6 space-y-1">
                  {profile.contacts
                    ?.filter((c) => safeHref(c.href))
                    .map((c) => (
                      <li key={c.label}>
                        <a
                          href={safeHref(c.href)}
                          target={c.href.startsWith("mailto:") ? undefined : "_blank"}
                          rel="noopener noreferrer"
                          className="inline-flex min-h-11 items-center gap-2 text-sm text-dim transition-colors hover:text-signal"
                        >
                          {c.label}
                          <ExternalIcon className="h-3.5 w-3.5" />
                        </a>
                      </li>
                    ))}
                </ul>
              </aside>

              <div className="min-w-0">
                <h1 className="font-display text-[clamp(2.6rem,7vw,4.5rem)] leading-[0.95] font-extrabold tracking-[-0.03em]">
                  My story
                </h1>
                <p className="mt-8 max-w-[60ch] text-xl leading-relaxed text-fg">{profile.about}</p>
                {paragraphs(about.story).map((p, i) => (
                  <p key={i} className="mt-5 max-w-[65ch] text-lg leading-relaxed text-dim">
                    {p}
                  </p>
                ))}

                {profile.skills?.length > 0 && (
                  <section className="mt-16">
                    <h2 className="font-display text-2xl font-bold">What I work with</h2>
                    <div className="mt-6">
                      <Skills skills={profile.skills} />
                    </div>
                  </section>
                )}
              </div>
            </div>

            {about.sections.map((section, i) => (
              <section key={i} className="mt-20 border-t border-line pt-12">
                <div className="grid gap-6 md:grid-cols-[300px_1fr] md:gap-12">
                  <h2 className="font-display text-3xl font-bold tracking-tight">{section.title}</h2>
                  <div className="min-w-0">
                    {paragraphs(section.body).map((p, j) => (
                      <p key={j} className="mb-4 max-w-[65ch] text-dim">
                        {p}
                      </p>
                    ))}
                    {section.media.length > 0 && (
                      <div className="mt-6">
                        <MediaGallery media={section.media} />
                      </div>
                    )}
                  </div>
                </div>
              </section>
            ))}
          </>
        )}
      </main>
      <SiteFooter profile={profile} />
    </>
  );
}
