/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useId, useRef, useState } from "react";
import { CloseIcon, DownIcon, ImageIcon, PlusIcon, TrashIcon, UpIcon } from "../components/Icons";

export const inputCls =
  "w-full rounded-lg border border-line bg-ink px-3 py-2.5 text-fg placeholder:text-faint transition-colors focus:border-signal focus:outline-none";

export function Field({ label, hint, error, children, id: givenId }) {
  const autoId = useId();
  const id = givenId || autoId;
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-fg">
        {label}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="mt-0.5 text-xs text-faint">
          {hint}
        </p>
      )}
      <div className="mt-1.5">{children(id, hint ? `${id}-hint` : undefined)}</div>
      {error && (
        <p className="mt-1 text-sm text-danger" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export function TextInput({ label, hint, error, value, onChange, ...rest }) {
  return (
    <Field label={label} hint={hint} error={error}>
      {(id, describedBy) => (
        <input
          id={id}
          aria-describedby={describedBy}
          aria-invalid={error ? "true" : undefined}
          className={inputCls}
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          {...rest}
        />
      )}
    </Field>
  );
}

export function TextArea({ label, hint, value, onChange, rows = 4, ...rest }) {
  return (
    <Field label={label} hint={hint}>
      {(id, describedBy) => (
        <textarea
          id={id}
          aria-describedby={describedBy}
          rows={rows}
          className={`${inputCls} resize-y leading-relaxed`}
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          {...rest}
        />
      )}
    </Field>
  );
}

export function Toggle({ label, hint, checked, onChange }) {
  const id = useId();
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <label htmlFor={id} className="text-sm font-medium text-fg">
          {label}
        </label>
        {hint && <p className="text-xs text-faint">{hint}</p>}
      </div>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${
          checked ? "bg-signal" : "bg-line"
        }`}
      >
        <span
          className={`absolute top-1 left-1 h-5 w-5 rounded-full transition-transform ${
            checked ? "translate-x-5 bg-ink" : "bg-fg"
          }`}
        />
      </button>
    </div>
  );
}

export function Button({ variant = "primary", className = "", children, ...rest }) {
  const styles = {
    primary: "bg-action text-on-action hover:bg-action-hover font-semibold",
    secondary: "border border-line text-fg hover:border-fg",
    ghost: "text-dim hover:text-fg hover:bg-panel-2",
    danger: "border border-danger/40 text-danger hover:bg-danger/10",
  };
  return (
    <button
      type="button"
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-4 text-sm transition-colors disabled:opacity-50 ${styles[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

export function IconButton({ label, children, className = "", ...rest }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-dim transition-colors hover:bg-panel-2 hover:text-fg disabled:opacity-30 ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

export function Card({ title, description, children, className = "" }) {
  return (
    <section className={`rounded-2xl border border-line bg-panel p-5 sm:p-6 ${className}`}>
      {title && <h2 className="font-display text-lg font-bold">{title}</h2>}
      {description && <p className="mt-1 text-sm text-dim">{description}</p>}
      <div className={title || description ? "mt-5 space-y-5" : "space-y-5"}>{children}</div>
    </section>
  );
}

export function move(list, index, dir) {
  const next = [...list];
  const target = index + dir;
  if (target < 0 || target >= next.length) return list;
  [next[index], next[target]] = [next[target], next[index]];
  return next;
}

// Comma-separated chips, e.g. technologies.
export function ChipInput({ label, hint, value = [], onChange }) {
  const [draft, setDraft] = useState("");
  const add = () => {
    const parts = draft
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s && !value.includes(s));
    if (parts.length) onChange([...value, ...parts]);
    setDraft("");
  };
  return (
    <Field label={label} hint={hint}>
      {(id, describedBy) => (
        <div className="rounded-lg border border-line bg-ink p-2 focus-within:border-signal">
          {value.length > 0 && (
            <ul className="mb-2 flex flex-wrap gap-1.5">
              {value.map((v) => (
                <li
                  key={v}
                  className="flex items-center gap-1 rounded-md bg-panel-2 py-1 pr-1 pl-2 text-sm"
                >
                  {v}
                  <button
                    type="button"
                    aria-label={`Remove ${v}`}
                    onClick={() => onChange(value.filter((x) => x !== v))}
                    className="rounded p-1 text-faint hover:text-danger"
                  >
                    <CloseIcon className="h-3.5 w-3.5" />
                  </button>
                </li>
              ))}
            </ul>
          )}
          <input
            id={id}
            aria-describedby={describedBy}
            className="w-full bg-transparent px-1 py-1.5 text-fg placeholder:text-faint focus:outline-none"
            placeholder="Type and press Enter"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === ",") {
                e.preventDefault();
                add();
              }
            }}
            onBlur={add}
          />
        </div>
      )}
    </Field>
  );
}

// Repeatable rows with reorder and remove.
export function RowList({ items, onChange, renderRow, makeNew, addLabel, empty }) {
  return (
    <div className="space-y-3">
      {items.length === 0 && empty && <p className="text-sm text-faint">{empty}</p>}
      {items.map((item, i) => (
        <div key={i} className="flex gap-2 rounded-xl border border-line bg-ink/50 p-3">
          <div className="min-w-0 flex-1 space-y-3">
            {renderRow(item, (next) => onChange(items.map((x, j) => (j === i ? next : x))), i)}
          </div>
          <div className="flex flex-col">
            <IconButton label="Move up" disabled={i === 0} onClick={() => onChange(move(items, i, -1))}>
              <UpIcon />
            </IconButton>
            <IconButton
              label="Move down"
              disabled={i === items.length - 1}
              onClick={() => onChange(move(items, i, 1))}
            >
              <DownIcon />
            </IconButton>
            <IconButton
              label="Remove"
              className="hover:text-danger"
              onClick={() => onChange(items.filter((_, j) => j !== i))}
            >
              <TrashIcon />
            </IconButton>
          </div>
        </div>
      ))}
      <Button variant="secondary" onClick={() => onChange([...items, makeNew()])}>
        <PlusIcon />
        {addLabel}
      </Button>
    </div>
  );
}

export function FilePicker({ label, accept, multiple, busy, disabled, onFiles }) {
  const inputRef = useRef(null);
  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        className="sr-only"
        tabIndex={-1}
        onChange={(e) => {
          const files = [...e.target.files];
          e.target.value = "";
          if (files.length) onFiles(files);
        }}
      />
      <Button variant="secondary" disabled={busy || disabled} onClick={() => inputRef.current.click()}>
        <ImageIcon />
        {busy ? "Uploading…" : label}
      </Button>
    </>
  );
}

/* Toasts */

const ToastContext = createContext(() => {});

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const push = useCallback((message, tone = "ok") => {
    const id = Math.random();
    setToasts((t) => [...t, { id, message, tone }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), tone === "error" ? 7000 : 3500);
  }, []);
  return (
    <ToastContext.Provider value={push}>
      {children}
      <div
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 bottom-[calc(5.5rem+env(safe-area-inset-bottom))] z-50 flex flex-col items-center gap-2 px-4 md:bottom-6"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            role={t.tone === "error" ? "alert" : "status"}
            className={`pointer-events-auto max-w-md rounded-xl border px-4 py-3 text-sm shadow-xl ${
              t.tone === "error"
                ? "border-danger/50 bg-[#2a1416] text-fg"
                : "border-line bg-panel-2 text-fg"
            }`}
          >
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}

export function describeError(error) {
  if (error?.code === "permission-denied" || error?.code === "storage/unauthorized") {
    return "Permission denied. Check that your Google email matches the one in firestore.rules and storage.rules, then deploy the rules.";
  }
  if (error?.code === "unavailable") return "You're offline. Changes will sync when you reconnect.";
  return error?.message || "Something went wrong. Try again.";
}
