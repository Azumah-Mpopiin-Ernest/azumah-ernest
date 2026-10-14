import { useEffect, useState } from "react";
import { Link } from "react-router";
import { safeHref } from "../lib/url";

const links = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export default function SiteHeader({ profile }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-30 transition-colors duration-300 ${
        scrolled
          ? "border-b border-line bg-ink/85 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6"
      >
        <Link
          to="/"
          className="font-display text-lg font-bold tracking-tight text-fg"
        >
          {profile?.shortName || "Azumah"}
        </Link>
        <div className="flex items-center gap-1 sm:gap-2">
          {links.map((l) => (
            <Link
              key={l.label}
              to={l.href}
              className="rounded-lg px-2.5 py-2 text-sm text-dim transition-colors hover:text-fg sm:px-3"
            >
              {l.label}
            </Link>
          ))}
          {profile?.resumeUrl && (
            <a
              href={safeHref(profile.resumeUrl)}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 rounded-lg border border-line px-3 py-2 text-sm text-fg transition-colors hover:border-signal hover:text-signal"
            >
              CV
            </a>
          )}
        </div>
      </nav>
    </header>
  );
}
