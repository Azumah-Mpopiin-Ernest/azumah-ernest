import { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  query,
  where,
} from "firebase/firestore/lite";
import { app } from "./firebase";
import {
  normalizeProfile,
  normalizeProject,
  seedProfile,
  seedProjects,
} from "./seed";

// Visitors only need one-off reads, so the public site uses the much smaller Lite SDK.
const db = app ? getFirestore(app) : null;

export const byOrder = (a, b) => (a.order ?? 0) - (b.order ?? 0);

async function loadProjects() {
  if (!db) return seedProjects;
  const snap = await getDocs(
    query(collection(db, "projects"), where("published", "==", true)),
  );
  if (snap.empty) return seedProjects;
  return snap.docs
    .map((d) => normalizeProject({ ...d.data(), id: d.id }))
    .sort(byOrder);
}

async function loadProject(slug) {
  if (!db) return seedProjects.find((p) => p.slug === slug) || null;
  const snap = await getDocs(
    query(
      collection(db, "projects"),
      where("slug", "==", slug),
      where("published", "==", true),
      limit(1),
    ),
  );
  if (!snap.empty) {
    const d = snap.docs[0];
    return normalizeProject({ ...d.data(), id: d.id });
  }
  // Before starter content is imported, fall back to bundled projects.
  const any = await getDocs(
    query(collection(db, "projects"), where("published", "==", true), limit(1)),
  );
  return any.empty ? seedProjects.find((p) => p.slug === slug) || null : null;
}

async function loadProfile() {
  if (!db) return seedProfile;
  const snap = await getDoc(doc(db, "site", "profile"));
  return snap.exists() ? normalizeProfile(snap.data()) : seedProfile;
}

function useLoader(loader, fallback, key) {
  const [state, setState] = useState({ data: null, loading: true, key });

  if (state.key !== key) {
    setState({ data: null, loading: true, key });
  }

  useEffect(() => {
    let alive = true;
    loader()
      .then((data) => alive && setState({ data, loading: false, key }))
      .catch((error) => {
        console.error(error);
        if (alive) setState({ data: fallback(), loading: false, key });
      });
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return state;
}

export function useProjects() {
  return useLoader(loadProjects, () => seedProjects, "projects");
}

export function useProject(slug) {
  return useLoader(
    () => loadProject(slug),
    () => seedProjects.find((p) => p.slug === slug) || null,
    slug,
  );
}

export function useProfile() {
  return useLoader(loadProfile, () => seedProfile, "profile");
}
