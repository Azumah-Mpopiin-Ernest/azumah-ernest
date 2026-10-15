import { useEffect, useRef, useState } from "react";
import { BackIcon, ChevronRight, CloseIcon } from "./Icons";
import { toEmbedUrl } from "../lib/embed";
import { safeHref } from "../lib/url";

function Lightbox({ images, index, onClose, onMove }) {
  const ref = useRef(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog.open) dialog.showModal();
    const onKey = (e) => {
      if (e.key === "ArrowRight") onMove(1);
      if (e.key === "ArrowLeft") onMove(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onMove]);

  const item = images[index];
  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && ref.current.close()}
      aria-label="Photo viewer"
      className="m-auto max-h-none max-w-none bg-transparent p-0 backdrop:bg-black/85"
    >
      <figure className="flex max-h-[92dvh] max-w-[94vw] flex-col items-center">
        <img
          src={item.url}
          alt={item.caption || ""}
          className="max-h-[80dvh] max-w-[94vw] rounded-xl object-contain"
        />
        {item.caption && (
          <figcaption className="mt-3 max-w-[60ch] text-center text-sm text-dim">
            {item.caption}
          </figcaption>
        )}
      </figure>
      <div className="fixed inset-x-0 bottom-6 flex justify-center gap-3">
        {images.length > 1 && (
          <button
            type="button"
            onClick={() => onMove(-1)}
            aria-label="Previous photo"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-panel-2 text-fg hover:text-signal"
          >
            <BackIcon />
          </button>
        )}
        <button
          type="button"
          onClick={() => ref.current.close()}
          aria-label="Close"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-panel-2 text-fg hover:text-signal"
        >
          <CloseIcon />
        </button>
        {images.length > 1 && (
          <button
            type="button"
            onClick={() => onMove(1)}
            aria-label="Next photo"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-panel-2 text-fg hover:text-signal"
          >
            <ChevronRight />
          </button>
        )}
      </div>
    </dialog>
  );
}

function MediaItem({ item, onOpen }) {
  if (item.kind === "embed") {
    const src = toEmbedUrl(item.url);
    if (!src) return null;
    return (
      <figure className="mb-4 break-inside-avoid">
        <div className="aspect-video overflow-hidden rounded-xl border border-line bg-panel">
          <iframe
            src={src}
            title={item.caption || "Video"}
            loading="lazy"
            allow="encrypted-media; picture-in-picture; fullscreen"
            referrerPolicy="strict-origin-when-cross-origin"
            className="h-full w-full"
          />
        </div>
        {item.caption && <figcaption className="mt-2 text-sm text-dim">{item.caption}</figcaption>}
      </figure>
    );
  }

  const src = safeHref(item.url);
  if (!src) return null;

  if (item.kind === "video") {
    return (
      <figure className="mb-4 break-inside-avoid">
        <video
          src={src}
          controls
          playsInline
          preload="metadata"
          className="w-full rounded-xl border border-line bg-panel"
        />
        {item.caption && <figcaption className="mt-2 text-sm text-dim">{item.caption}</figcaption>}
      </figure>
    );
  }

  return (
    <figure className="mb-4 break-inside-avoid">
      <button
        type="button"
        onClick={onOpen}
        className="block w-full overflow-hidden rounded-xl border border-line"
        aria-label={item.caption ? `View photo: ${item.caption}` : "View photo"}
      >
        <img
          src={src}
          alt={item.caption || ""}
          loading="lazy"
          className="w-full transition-transform duration-300 hover:scale-[1.02]"
        />
      </button>
      {item.caption && <figcaption className="mt-2 text-sm text-dim">{item.caption}</figcaption>}
    </figure>
  );
}

export default function MediaGallery({ media }) {
  const [open, setOpen] = useState(null);
  const images = media.filter((m) => m.kind === "image" && safeHref(m.url));
  if (!media.length) return null;

  return (
    <>
      <div className={media.length === 1 ? "max-w-3xl" : "columns-1 gap-4 sm:columns-2 lg:columns-3"}>
        {media.map((item, i) => (
          <MediaItem
            key={item.url + i}
            item={item}
            onOpen={() => setOpen(images.indexOf(item))}
          />
        ))}
      </div>
      {open !== null && open >= 0 && (
        <Lightbox
          images={images}
          index={open}
          onClose={() => setOpen(null)}
          onMove={(dir) => setOpen((i) => (i + dir + images.length) % images.length)}
        />
      )}
    </>
  );
}
