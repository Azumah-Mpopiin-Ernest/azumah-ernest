import { initializeApp } from "firebase/app";

const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// The public site still renders (from bundled content) when Firebase isn't configured yet.
export const firebaseReady = Boolean(config.apiKey && config.projectId);

export const app = firebaseReady ? initializeApp(config) : null;

// UI-level gate only. Real enforcement lives in firestore.rules and storage.rules.
export const ADMIN_EMAIL = (import.meta.env.VITE_ADMIN_EMAIL || "")
  .trim()
  .toLowerCase();
