import { projects } from "./projects";

function PriorityTag() {
  return (
    <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-[#0a0e17] border border-[#4fd8c4]/50 rounded-full pl-2 pr-2.5 py-1">
      <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
        <rect x="0" y="6" width="3" height="4" rx="0.5" fill="#4fd8c4" />
        <rect x="5" y="3" width="3" height="7" rx="0.5" fill="#4fd8c4" />
        <rect x="10" y="0" width="3" height="10" rx="0.5" fill="#4fd8c4" />
      </svg>
      <span className="font-mono text-[10px] tracking-wider text-[#4fd8c4]">
        PRIORITY
      </span>
    </div>
  );
}

function FeaturedCard({ project }) {
  return (
    <a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col bg-[#10141f] border border-[#4fd8c4]/40 rounded-2xl overflow-hidden hover:border-[#4fd8c4] transition-colors shadow-[0_0_40px_-20px_#4fd8c455]"
    >
      <PriorityTag />
      {project.img && (
        <img
          src={project.img}
          alt={project.name}
          className="w-full h-[200px] object-cover"
        />
      )}
      <div className="flex flex-col gap-2 p-6">
        <h3 className="font-display font-semibold text-lg text-[#e9ecf3]">
          {project.name}
        </h3>
        <p className="text-[#8992a9] text-sm leading-relaxed">
          {project.description}
        </p>
        <span className="font-mono text-xs text-[#4fd8c4] mt-2 group-hover:underline">
          View project →
        </span>
      </div>
    </a>
  );
}

function StandardCard({ project }) {
  return (
    <a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col bg-[#0a0e17] border border-[#232838] rounded-xl overflow-hidden hover:border-[#333b52] transition-colors"
    >
      {project.img && (
        <img
          src={project.img}
          alt={project.name}
          className="w-full h-[120px] object-cover opacity-90 group-hover:opacity-100 transition-opacity"
        />
      )}
      <div className="flex flex-col gap-1.5 p-4">
        <h3 className="font-display font-medium text-sm text-[#e9ecf3]">
          {project.name}
        </h3>
        <p className="text-[#8992a9] text-xs leading-relaxed line-clamp-2">
          {project.description}
        </p>
        <span className="font-mono text-[11px] text-[#6b7488] mt-1 group-hover:text-[#4fd8c4] transition-colors">
          View project →
        </span>
      </div>
    </a>
  );
}

export default function Projects() {
  const featured = projects.filter((p) => p.priority === "high");
  const standard = projects.filter((p) => p.priority !== "high");

  return (
    <section id="projects" className="w-full flex flex-col items-center px-5">
      <p className="font-mono text-[11px] tracking-[0.2em] text-[#4fd8c4] mb-2">
        SEC.02 — PROJECTS
      </p>
      <h2 className="font-display font-semibold text-xl mb-10">
        Featured Projects
      </h2>

      {featured.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-[1000px] mb-6">
          {featured.map((project) => (
            <FeaturedCard key={project.name} project={project} />
          ))}
        </div>
      )}

      {standard.length > 0 && (
        <>
          <div className="flex items-center gap-3 w-full max-w-[1000px] my-8">
            <div className="h-px flex-1 bg-[#232838]" />
            <span className="font-mono text-[10px] tracking-widest text-[#6b7488]">
              MORE PROJECTS
            </span>
            <div className="h-px flex-1 bg-[#232838]" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-[1000px]">
            {standard.map((project) => (
              <StandardCard key={project.name} project={project} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
