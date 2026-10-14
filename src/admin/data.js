import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  initializeFirestore,
  onSnapshot,
  persistentLocalCache,
  persistentMultipleTabManager,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";
import { app } from "../lib/firebase";
import { byOrder } from "../lib/content";
import {
  normalizeProfile,
  normalizeProject,
  seedProfile,
  seedProjects,
} from "../lib/seed";

// Full SDK with an on-device cache so the installed dashboard works offline.
const db = app
  ? initializeFirestore(app, {
      localCache: persistentLocalCache({
        tabManager: persistentMultipleTabManager(),
      }),
    })
  : null;
const storage = app ? getStorage(app) : null;

/* Projects */

export function subscribeProjects(onData, onError) {
  return onSnapshot(
    collection(db, "projects"),
    (snap) =>
      onData(
        snap.docs
          .map((d) => normalizeProject({ ...d.data(), id: d.id }))
          .sort(byOrder),
      ),
    onError,
  );
}

export async function getProject(id) {
  const snap = await getDoc(doc(db, "projects", id));
  return snap.exists() ? normalizeProject({ ...snap.data(), id: snap.id }) : null;
}

export async function slugTaken(slug, exceptId) {
  const snap = await getDocs(
    query(collection(db, "projects"), where("slug", "==", slug)),
  );
  return snap.docs.some((d) => d.id !== exceptId);
}

export async function saveProject(id, data) {
  const { id: _ignored, ...clean } = normalizeProject(data);
  if (id) {
    await updateDoc(doc(db, "projects", id), {
      ...clean,
      updatedAt: serverTimestamp(),
    });
    return id;
  }
  const created = await addDoc(collection(db, "projects"), {
    ...clean,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return created.id;
}

export async function deleteProject(project) {
  await deleteDoc(doc(db, "projects", project.id));
  const files = [project.cover, ...(project.screenshots || [])];
  await Promise.all(files.map(deleteStoredFile));
}

export async function setProjectFields(id, fields) {
  await updateDoc(doc(db, "projects", id), {
    ...fields,
    updatedAt: serverTimestamp(),
  });
}

// Rewrites order as 0..n so moves never collide.
export async function reorderProjects(projects) {
  const batch = writeBatch(db);
  projects.forEach((p, i) => {
    if (p.order !== i) batch.update(doc(db, "projects", p.id), { order: i });
  });
  await batch.commit();
}

/* Profile */

export async function getProfile() {
  const snap = await getDoc(doc(db, "site", "profile"));
  return snap.exists() ? normalizeProfile(snap.data()) : null;
}

export async function saveProfile(profile) {
  await setDoc(doc(db, "site", "profile"), {
    ...profile,
    updatedAt: serverTimestamp(),
  });
}

/* Starter content */

export async function importStarterContent({ includeProfile }) {
  const batch = writeBatch(db);
  if (includeProfile) {
    batch.set(doc(db, "site", "profile"), {
      ...seedProfile,
      updatedAt: serverTimestamp(),
    });
  }
  seedProjects.forEach((p) => {
    batch.set(doc(collection(db, "projects")), {
      ...p,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  });
  await batch.commit();
}

/* Notes (private) */

export function subscribeNotes(onData, onError) {
  return onSnapshot(
    collection(db, "notes"),
    (snap) =>
      onData(
        snap.docs
          .map((d) => ({ id: d.id, ...d.data() }))
          .sort(
            (a, b) =>
              Number(Boolean(b.pinned)) - Number(Boolean(a.pinned)) ||
              (b.updatedAt?.toMillis?.() ?? Date.now()) -
                (a.updatedAt?.toMillis?.() ?? Date.now()),
          ),
      ),
    onError,
  );
}

export async function createNote() {
  const created = await addDoc(collection(db, "notes"), {
    title: "",
    body: "",
    pinned: false,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return created.id;
}

export function updateNote(id, fields) {
  return updateDoc(doc(db, "notes", id), {
    ...fields,
    updatedAt: serverTimestamp(),
  });
}

export function deleteNote(id) {
  return deleteDoc(doc(db, "notes", id));
}

/* Files */

const MAX_EDGE = 1800;

async function compressImage(file) {
  if (file.type === "image/svg+xml" || file.type === "image/gif") return file;
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, MAX_EDGE / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext("2d").drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close?.();

  const toBlob = (type, q) =>
    new Promise((resolve) => canvas.toBlob(resolve, type, q));
  let blob = await toBlob("image/webp", 0.85);
  // Older Safari can't encode WebP and silently returns PNG.
  if (!blob || blob.type !== "image/webp") blob = await toBlob("image/jpeg", 0.85);
  return blob.size < file.size ? blob : file;
}

function uniqueName(ext) {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
}

export async function uploadImage(file, folder) {
  if (!file.type.startsWith("image/")) throw new Error("Choose an image file.");
  const blob = await compressImage(file);
  const ext = (blob.type.split("/")[1] || "img").replace("svg+xml", "svg");
  const fileRef = ref(storage, `public/${folder}/${uniqueName(ext)}`);
  await uploadBytes(fileRef, blob, {
    contentType: blob.type,
    cacheControl: "public, max-age=31536000, immutable",
  });
  return getDownloadURL(fileRef);
}

export async function uploadPdf(file, folder) {
  if (file.type !== "application/pdf") throw new Error("Choose a PDF file.");
  const fileRef = ref(storage, `public/${folder}/${uniqueName("pdf")}`);
  await uploadBytes(fileRef, file, { contentType: "application/pdf" });
  return getDownloadURL(fileRef);
}

// Best effort: only files we uploaded to Storage are removed; bundled /images stay.
export async function deleteStoredFile(url) {
  if (!url || !url.includes("firebasestorage.googleapis.com")) return;
  try {
    await deleteObject(ref(storage, url));
  } catch (error) {
    if (error.code !== "storage/object-not-found") console.warn(error);
  }
}
