# Portfolio + dashboard

My developer portfolio (React, Vite, Tailwind) with a private dashboard at `/admin` for managing projects, profile and private notes. Content lives in Firebase; the site deploys to Vercel from GitHub.

- **Public site** reads published projects and the profile from Firestore. If Firebase isn't configured, or the database is empty, it falls back to the content bundled in `src/lib/seed.js`.
- **Dashboard** (`/admin`) requires Google sign-in. Only the email set in the rules files can read or write anything private.
- **Installable**: it's a PWA, so on a phone you can open the site and choose *Add to Home Screen* / *Install app*. It launches straight into the dashboard.

## One-time Firebase setup

1. **Create the project** in the [Firebase console](https://console.firebase.google.com) and upgrade to Blaze (Storage needs it).
2. **Add a web app**: Project settings → Your apps → Web. Copy the config values.
3. **Enable Google sign-in**: Authentication → Sign-in method → Google → Enable.
4. **Authorise your domains**: Authentication → Settings → Authorised domains. Add your Vercel domain (e.g. `your-site.vercel.app`) and any custom domain. `localhost` is there by default.
5. **Create Firestore** (Build → Firestore Database, production mode) and **Storage** (Build → Storage).
6. **Set your email** in both `firestore.rules` and `storage.rules`: replace `REPLACE_WITH_YOUR_GOOGLE_EMAIL` with the Google account you'll sign in with (lowercase).
7. **Deploy the rules**:
   ```bash
   npm install -g firebase-tools
   firebase login
   firebase use --add          # pick your project
   firebase deploy --only firestore:rules,storage
   ```
8. **Environment variables**: copy `.env.example` to `.env.local` and fill it in. Add the same keys in Vercel → Project → Settings → Environment Variables, then redeploy.
9. Open `/admin`, sign in, and click **Import current content** on the Overview page to copy your existing projects and profile into the database.

## Everyday use

- **Add a project**: Dashboard → Projects → New project. Fill in the basics, upload a cover and screenshots, then publish. Fill in the case-study fields to give it its own page at `/work/<address>`.
- **Edit your bio, CV, contacts or skills**: Dashboard → Profile.
- **Notes**: Dashboard → Notes. They autosave and are only readable by your account.

Changes show up on the live site immediately. No code edits or redeploys needed.

## Local development

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build (includes the service worker)
npm run lint
```

App icons are generated from `public/icon.svg`:

```bash
npx pwa-assets-generator --preset minimal-2023 public/icon.svg
```
