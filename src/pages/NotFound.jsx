import { Link } from "react-router";

export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-4 text-center">
      <p className="font-display text-7xl font-extrabold text-signal">404</p>
      <h1 className="mt-4 font-display text-2xl font-bold">No signal on this page</h1>
      <p className="mt-2 text-dim">The page may have moved or been removed.</p>
      <Link
        to="/"
        className="mt-8 inline-flex min-h-11 items-center rounded-xl bg-action px-5 font-semibold text-on-action hover:bg-action-hover"
      >
        Go to the homepage
      </Link>
    </main>
  );
}
