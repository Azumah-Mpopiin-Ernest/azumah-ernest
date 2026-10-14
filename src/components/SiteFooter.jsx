export default function SiteFooter({ profile }) {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-faint sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          © {new Date().getFullYear()} {profile?.name}
        </p>
        <p>Designed and built by me with React and Firebase.</p>
      </div>
    </footer>
  );
}
