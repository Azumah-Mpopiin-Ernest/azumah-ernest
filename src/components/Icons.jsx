// Small stroke icons (Lucide-style), decorative unless given a title.
function Icon({ children, className = "h-4 w-4", title }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden={title ? undefined : "true"}
      role={title ? "img" : undefined}
    >
      {title && <title>{title}</title>}
      {children}
    </svg>
  );
}

export const ExternalIcon = (p) => (
  <Icon {...p}>
    <path d="M7 17 17 7M8 7h9v9" />
  </Icon>
);
export const DownloadIcon = (p) => (
  <Icon {...p}>
    <path d="M12 3v12m0 0-4-4m4 4 4-4M5 21h14" />
  </Icon>
);
export const BackIcon = (p) => (
  <Icon {...p}>
    <path d="m15 18-6-6 6-6" />
  </Icon>
);
export const ChevronRight = (p) => (
  <Icon {...p}>
    <path d="m9 18 6-6-6-6" />
  </Icon>
);
export const CodeIcon = (p) => (
  <Icon {...p}>
    <path d="m16 18 6-6-6-6M8 6l-6 6 6 6" />
  </Icon>
);
export const PlusIcon = (p) => (
  <Icon {...p}>
    <path d="M12 5v14M5 12h14" />
  </Icon>
);
export const TrashIcon = (p) => (
  <Icon {...p}>
    <path d="M3 6h18M8 6V4h8v2m-9 0 1 14h8l1-14" />
  </Icon>
);
export const UpIcon = (p) => (
  <Icon {...p}>
    <path d="m18 15-6-6-6 6" />
  </Icon>
);
export const DownIcon = (p) => (
  <Icon {...p}>
    <path d="m6 9 6 6 6-6" />
  </Icon>
);
export const StarIcon = ({ filled, ...p }) => (
  <Icon {...p}>
    <path
      fill={filled ? "currentColor" : "none"}
      d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.2l1-6.2L3 9.6l6.2-.9z"
    />
  </Icon>
);
export const PinIcon = ({ filled, ...p }) => (
  <Icon {...p}>
    <path
      fill={filled ? "currentColor" : "none"}
      d="M9 4h6l-1 6 4 4H6l4-4zM12 14v7"
    />
  </Icon>
);
export const HomeIcon = (p) => (
  <Icon {...p}>
    <path d="M3 11 12 4l9 7M5 10v10h14V10" />
  </Icon>
);
export const GridIcon = (p) => (
  <Icon {...p}>
    <path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" />
  </Icon>
);
export const UserIcon = (p) => (
  <Icon {...p}>
    <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4 21a8 8 0 0 1 16 0" />
  </Icon>
);
export const NoteIcon = (p) => (
  <Icon {...p}>
    <path d="M6 3h9l4 4v14H6zM14 3v5h5M9 13h7M9 17h5" />
  </Icon>
);
export const ImageIcon = (p) => (
  <Icon {...p}>
    <path d="M4 5h16v14H4zM4 16l5-5 4 4 2-2 5 5" />
    <circle cx="15" cy="9" r="1.5" />
  </Icon>
);
export const SearchIcon = (p) => (
  <Icon {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </Icon>
);
export const CloseIcon = (p) => (
  <Icon {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Icon>
);
