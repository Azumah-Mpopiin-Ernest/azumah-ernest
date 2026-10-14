import { useState } from "react";
import { Link } from "react-router";
import { useAuth } from "./auth";
import { ADMIN_EMAIL, firebaseReady } from "../lib/firebase";
import { Button, describeError } from "./ui";

function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path fill="#4285F4" d="M22.6 12.3c0-.8-.1-1.6-.2-2.3H12v4.4h6a5.1 5.1 0 0 1-2.2 3.4v2.8h3.6c2-1.9 3.2-4.7 3.2-8.3Z" />
      <path fill="#34A853" d="M12 23c3 0 5.5-1 7.4-2.7l-3.6-2.8c-1 .7-2.3 1.1-3.8 1.1-2.9 0-5.4-2-6.3-4.6H2v2.9A11 11 0 0 0 12 23Z" />
      <path fill="#FBBC05" d="M5.7 14c-.2-.7-.4-1.4-.4-2.1s.1-1.4.4-2.1V7H2a11 11 0 0 0 0 9.9L5.7 14Z" />
      <path fill="#EA4335" d="M12 5.4c1.6 0 3.1.6 4.3 1.7l3.2-3.2A11 11 0 0 0 2 7l3.7 2.9C6.6 7.4 9.1 5.4 12 5.4Z" />
    </svg>
  );
}

export default function Login() {
  const { user, signIn, signOut } = useAuth();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const configMissing = !firebaseReady || !ADMIN_EMAIL;

  return (
    <main className="flex min-h-dvh items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm rounded-3xl border border-line bg-panel p-8">
        <h1 className="font-display text-2xl font-bold">Dashboard</h1>

        {configMissing ? (
          <div className="mt-4 space-y-3 text-sm text-dim">
            <p>Firebase isn't connected yet.</p>
            <p>
              Add the <code className="text-fg">VITE_FIREBASE_*</code> and{" "}
              <code className="text-fg">VITE_ADMIN_EMAIL</code> values from{" "}
              <code className="text-fg">.env.example</code> to{" "}
              <code className="text-fg">.env.local</code> (and to Vercel), then
              reload.
            </p>
          </div>
        ) : user ? (
          <div className="mt-4 space-y-4">
            <p className="text-sm text-dim">
              This dashboard is private. You're signed in as{" "}
              <span className="text-fg">{user.email}</span>, which doesn't have
              access.
            </p>
            <Button variant="secondary" className="w-full" onClick={signOut}>
              Sign out and switch account
            </Button>
          </div>
        ) : (
          <div className="mt-4 space-y-4">
            <p className="text-sm text-dim">
              Sign in to manage your portfolio and notes.
            </p>
            <Button
              variant="secondary"
              className="w-full bg-fg text-ink! hover:bg-white"
              disabled={busy}
              onClick={async () => {
                setError("");
                setBusy(true);
                try {
                  await signIn();
                } catch (e) {
                  if (e.code !== "auth/popup-closed-by-user" && e.code !== "auth/cancelled-popup-request") {
                    setError(
                      e.code === "auth/unauthorized-domain"
                        ? "This domain isn't authorised. Add it under Firebase Console → Authentication → Settings → Authorised domains."
                        : describeError(e),
                    );
                  }
                } finally {
                  setBusy(false);
                }
              }}
            >
              <GoogleMark />
              {busy ? "Signing in…" : "Sign in with Google"}
            </Button>
            {error && (
              <p role="alert" className="text-sm text-danger">
                {error}
              </p>
            )}
          </div>
        )}

        <Link to="/" className="mt-8 inline-block text-sm text-faint hover:text-fg">
          Back to the portfolio
        </Link>
      </div>
    </main>
  );
}
