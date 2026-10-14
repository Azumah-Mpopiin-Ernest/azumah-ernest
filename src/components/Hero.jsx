import SignalTrace from "./SignalTrace";
import { DownloadIcon } from "./Icons";
import { safeHref } from "../lib/url";

export default function Hero({ profile }) {
  return (
    <section
      id="top"
      className="mx-auto max-w-6xl px-4 pt-24 pb-16 sm:px-6 sm:pt-32 md:pb-24"
    >
      <SignalTrace />

      <div className="mt-10 grid gap-8 md:mt-14 md:grid-cols-[1.4fr_1fr] md:items-end">
        <div>
          <h1
            className="hero-reveal font-display text-[clamp(2.6rem,8vw,5.75rem)] leading-[0.95] font-extrabold tracking-[-0.03em] text-fg"
            style={{ animationDelay: "1.5s" }}
          >
            {profile.name}
          </h1>
          <p
            className="hero-reveal mt-6 max-w-[34ch] font-display text-xl leading-snug font-medium text-signal sm:text-2xl"
            style={{ animationDelay: "1.65s" }}
          >
            {profile.headline}
          </p>
        </div>

        <div
          className="hero-reveal md:pb-2"
          style={{ animationDelay: "1.8s" }}
        >
          <p className="max-w-[46ch] text-dim">{profile.intro}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#work"
              className="inline-flex min-h-11 items-center rounded-xl bg-action px-5 font-semibold text-on-action transition-colors hover:bg-action-hover"
            >
              See my work
            </a>
            {profile.resumeUrl && (
              <a
                href={safeHref(profile.resumeUrl)}
                download
                className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-line px-5 text-fg transition-colors hover:border-fg"
              >
                <DownloadIcon />
                Download CV
              </a>
            )}
          </div>
          {(profile.location || profile.availability) && (
            <p className="mt-6 flex items-center gap-2 text-sm text-faint">
              <span className="live-dot h-2 w-2 shrink-0 rounded-full bg-ok" />
              {[profile.availability, profile.location]
                .filter(Boolean)
                .join(", ")}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
