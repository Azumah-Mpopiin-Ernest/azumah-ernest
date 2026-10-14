const SAFE = /^(https?:|mailto:|tel:|\/(?!\/))/i;

// Links come from the database, so only allow web, mail, phone and same-site paths.
export function safeHref(value) {
  const v = (value || "").trim();
  return SAFE.test(v) ? v : undefined;
}
