import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { createNote, deleteNote, subscribeNotes, updateNote } from "./data";
import { Button, IconButton, describeError, inputCls, useToast } from "./ui";
import { BackIcon, PinIcon, PlusIcon, SearchIcon, TrashIcon } from "../components/Icons";

const formatDate = (ts) =>
  ts?.toDate
    ? ts.toDate().toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" })
    : "Just now";

function Editor({ note, onDeleted }) {
  const toast = useToast();
  const [draft, setDraft] = useState({ title: note.title, body: note.body });
  const [status, setStatus] = useState("Saved");
  const pending = useRef(null);
  const timer = useRef(null);

  const flush = async () => {
    clearTimeout(timer.current);
    if (!pending.current) return;
    const fields = pending.current;
    pending.current = null;
    try {
      await updateNote(note.id, fields);
      setStatus("Saved");
    } catch (e) {
      setStatus("Not saved");
      toast(describeError(e), "error");
    }
  };

  // Save whatever is pending when switching notes or leaving the page.
  useEffect(
    () => () => {
      flush();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [note.id],
  );

  const change = (key) => (e) => {
    const value = e.target.value;
    setDraft((d) => ({ ...d, [key]: value }));
    pending.current = { ...pending.current, [key]: value };
    setStatus("Saving…");
    clearTimeout(timer.current);
    timer.current = setTimeout(flush, 700);
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between gap-2 border-b border-line pb-3">
        <Link to="/admin/notes" className="inline-flex min-h-11 items-center gap-1 text-sm text-dim hover:text-fg md:hidden">
          <BackIcon />
          Notes
        </Link>
        <p className="text-xs text-faint" aria-live="polite">
          {status} · edited {formatDate(note.updatedAt)}
        </p>
        <div className="flex">
          <IconButton
            label={note.pinned ? "Unpin note" : "Pin note"}
            className={note.pinned ? "text-signal" : ""}
            onClick={() => updateNote(note.id, { pinned: !note.pinned }).catch((e) => toast(describeError(e), "error"))}
          >
            <PinIcon filled={note.pinned} />
          </IconButton>
          <IconButton
            label="Delete note"
            className="hover:text-danger"
            onClick={async () => {
              if (!window.confirm("Delete this note? This can't be undone.")) return;
              clearTimeout(timer.current);
              pending.current = null;
              try {
                await deleteNote(note.id);
                onDeleted();
              } catch (e) {
                toast(describeError(e), "error");
              }
            }}
          >
            <TrashIcon />
          </IconButton>
        </div>
      </div>
      <input
        aria-label="Note title"
        placeholder="Title"
        className="mt-4 w-full bg-transparent font-display text-2xl font-bold text-fg placeholder:text-faint focus:outline-none"
        value={draft.title}
        onChange={change("title")}
        onBlur={flush}
      />
      <textarea
        aria-label="Note"
        placeholder="Write anything. Only you can see this."
        className="mt-3 min-h-[50vh] w-full flex-1 resize-none bg-transparent leading-relaxed text-fg placeholder:text-faint focus:outline-none"
        value={draft.body}
        onChange={change("body")}
        onBlur={flush}
      />
    </div>
  );
}

export default function Notes() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const [notes, setNotes] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => subscribeNotes(setNotes, (e) => toast(describeError(e), "error")), [toast]);

  const selected = notes?.find((n) => n.id === id);
  const q = search.trim().toLowerCase();
  const visible = notes?.filter(
    (n) => !q || n.title?.toLowerCase().includes(q) || n.body?.toLowerCase().includes(q),
  );

  const add = async () => {
    try {
      const newId = await createNote();
      navigate(`/admin/notes/${newId}`);
    } catch (e) {
      toast(describeError(e), "error");
    }
  };

  return (
    <div className="md:grid md:grid-cols-[280px_1fr] md:gap-8">
      <div className={id ? "hidden md:block" : ""}>
        <header className="flex items-center justify-between gap-3">
          <div>
            <h1 className="font-display text-3xl font-bold">Notes</h1>
            <p className="text-sm text-dim">Private. Only you can see these.</p>
          </div>
          <IconButton label="New note" className="border border-line" onClick={add}>
            <PlusIcon />
          </IconButton>
        </header>

        <div className="relative mt-5">
          <SearchIcon className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-faint" />
          <input
            type="search"
            aria-label="Search notes"
            placeholder="Search notes"
            className={`${inputCls} pl-9`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {!notes ? (
          <div className="mt-4 h-40 animate-pulse rounded-2xl bg-panel" aria-busy="true" />
        ) : visible.length === 0 ? (
          <div className="mt-6 text-center">
            <p className="text-sm text-dim">{q ? "No notes match your search." : "No notes yet."}</p>
            {!q && (
              <Button variant="secondary" className="mt-3" onClick={add}>
                <PlusIcon />
                Write your first note
              </Button>
            )}
          </div>
        ) : (
          <ul className="mt-4 space-y-1">
            {visible.map((n) => (
              <li key={n.id}>
                <Link
                  to={`/admin/notes/${n.id}`}
                  aria-current={n.id === id ? "page" : undefined}
                  className={`block rounded-xl px-3 py-3 transition-colors ${
                    n.id === id ? "bg-panel-2" : "hover:bg-panel"
                  }`}
                >
                  <p className="flex items-center gap-2 truncate font-medium text-fg">
                    {n.pinned && <PinIcon filled className="h-3.5 w-3.5 shrink-0 text-signal" />}
                    <span className="truncate">{n.title || "Untitled note"}</span>
                  </p>
                  <p className="mt-0.5 truncate text-sm text-faint">
                    {formatDate(n.updatedAt)} · {n.body?.slice(0, 80) || "Empty"}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={id ? "" : "hidden md:block"}>
        {selected ? (
          <Editor key={selected.id} note={selected} onDeleted={() => navigate("/admin/notes", { replace: true })} />
        ) : id && notes ? (
          <p className="text-dim">This note no longer exists.</p>
        ) : (
          <div className="hidden h-full min-h-80 items-center justify-center rounded-2xl border border-dashed border-line md:flex">
            <p className="text-sm text-faint">Choose a note or start a new one.</p>
          </div>
        )}
      </div>
    </div>
  );
}
