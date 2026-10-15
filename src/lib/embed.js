// Turns a YouTube or Vimeo link into an embed URL. Anything else returns null,
// so only these two players can ever be framed on the site.
export function toEmbedUrl(link) {
  let url;
  try {
    url = new URL((link || "").trim());
  } catch {
    return null;
  }
  if (url.protocol !== "https:") return null;
  const host = url.hostname.replace(/^www\.|^m\./, "");
  const id = (v) => (/^[\w-]{6,20}$/.test(v || "") ? v : null);

  if (host === "youtube.com" || host === "youtube-nocookie.com") {
    const parts = url.pathname.split("/").filter(Boolean);
    const vid =
      url.searchParams.get("v") ||
      (["embed", "shorts", "live"].includes(parts[0]) ? parts[1] : null);
    return id(vid) ? `https://www.youtube-nocookie.com/embed/${vid}` : null;
  }
  if (host === "youtu.be") {
    const vid = url.pathname.slice(1);
    return id(vid) ? `https://www.youtube-nocookie.com/embed/${vid}` : null;
  }
  if (host === "vimeo.com" || host === "player.vimeo.com") {
    const vid = url.pathname.split("/").filter(Boolean).find((p) => /^\d+$/.test(p));
    return vid ? `https://player.vimeo.com/video/${vid}` : null;
  }
  return null;
}
