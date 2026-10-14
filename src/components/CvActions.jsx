import { DownloadIcon, ExternalIcon } from "./Icons";
import { safeHref } from "../lib/url";

// View opens the PDF in the browser; download is the secondary option.
export default function CvActions({ url, primary = false }) {
  const href = safeHref(url);
  if (!href) return null;

  return (
    <div className="flex gap-2">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex min-h-11 items-center gap-2 rounded-xl px-5 transition-colors ${
          primary
            ? "bg-action font-semibold text-on-action hover:bg-action-hover"
            : "border border-line text-fg hover:border-fg"
        }`}
      >
        View CV
        <ExternalIcon />
      </a>
      <a
        href={href}
        download
        aria-label="Download CV"
        title="Download CV"
        className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-line text-fg transition-colors hover:border-fg"
      >
        <DownloadIcon />
      </a>
    </div>
  );
}
