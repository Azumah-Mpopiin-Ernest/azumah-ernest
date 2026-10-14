// Phone screenshots get a handset bezel; desktop screenshots a browser bar.
export default function DeviceFrame({ kind = "browser", children, className = "" }) {
  if (kind === "phone") {
    return (
      <div
        className={`rounded-[2.2rem] border border-line bg-panel-2 p-2.5 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)] ${className}`}
      >
        <div className="relative aspect-[9/16] overflow-hidden rounded-[1.7rem] bg-ink">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`overflow-hidden rounded-xl border border-line bg-panel-2 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)] ${className}`}
    >
      <div className="flex h-7 items-center gap-1.5 border-b border-line px-3">
        <span className="h-2 w-2 rounded-full bg-line" />
        <span className="h-2 w-2 rounded-full bg-line" />
        <span className="h-2 w-2 rounded-full bg-line" />
      </div>
      <div className="relative aspect-[4/3] bg-ink">{children}</div>
    </div>
  );
}
