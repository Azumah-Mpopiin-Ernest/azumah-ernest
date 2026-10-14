import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  GoogleAuthProvider,
  browserLocalPersistence,
  getAuth,
  onAuthStateChanged,
  setPersistence,
  signInWithPopup,
  signInWithRedirect,
  signOut as fbSignOut,
} from "firebase/auth";
import { ADMIN_EMAIL, app } from "../lib/firebase";

const auth = app ? getAuth(app) : null;
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [state, setState] = useState({ user: null, ready: !auth });

  useEffect(() => {
    if (!auth) return undefined;
    return onAuthStateChanged(auth, (user) => setState({ user, ready: true }));
  }, []);

  const value = useMemo(() => {
    const email = state.user?.email?.toLowerCase();
    return {
      ...state,
      isOwner: Boolean(
        email && ADMIN_EMAIL && email === ADMIN_EMAIL && state.user.emailVerified,
      ),
      async signIn() {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: "select_account" });
        await setPersistence(auth, browserLocalPersistence);
        try {
          await signInWithPopup(auth, provider);
        } catch (error) {
          // Installed apps and some mobile browsers block popups.
          if (
            error.code === "auth/popup-blocked" ||
            error.code === "auth/operation-not-supported-in-this-environment"
          ) {
            await signInWithRedirect(auth, provider);
            return;
          }
          throw error;
        }
      },
      signOut: () => fbSignOut(auth),
    };
  }, [state]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}
