import { DownloadIcon, ExternalIcon } from "./Icons";
import { safeHref } from "../lib/url";

export default function Contact({ profile }) {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
      <div className="grid gap-10 md:grid-cols-[1fr_1.2fr]">
        <div>
          <h2 className="font-display text-[clamp(2.2rem,6vw,4rem)] leading-none font-extrabold tracking-[-0.03em]">
            Let's build something useful.
          </h2>
          <p className="mt-6 max-w-[42ch] text-dim">
            Have a role, a project or a question? Reach me directly.
          </p>
          {profile.resumeUrl && (
            <a
              href={safeHref(profile.resumeUrl)}
              download
              className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-xl bg-action px-5 font-semibold text-on-action transition-colors hover:bg-action-hover"
            >
              <DownloadIcon />
              Download CV
            </a>
          )}
        </div>

        <ul className="self-end">
          {profile.contacts?.filter((c) => safeHref(c.href)).map((c) => (
            <li key={c.label} className="border-t border-line last:border-b">
              <a
                href={safeHref(c.href)}
                target={c.href?.startsWith("mailto:") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="group flex min-h-16 items-center justify-between gap-4 py-4"
              >
                <span className="text-sm text-faint">{c.label}</span>
                <span className="flex min-w-0 items-center gap-2 text-right font-display text-lg font-medium break-all text-fg transition-colors group-hover:text-signal sm:text-xl">
                  {c.value}
                  <ExternalIcon className="h-4 w-4 shrink-0 text-faint group-hover:text-signal" />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
