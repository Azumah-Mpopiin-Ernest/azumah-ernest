import { projects } from "./projects";
import { Link } from "react-router";

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

function ProjectEvidence({ project }) {
  return (
    <div className="flex flex-col gap-2 mt-3 pt-3 border-t border-[#232838]">
      <div className="flex flex-wrap gap-1.5">
        {project.technologies.map((technology) => (
          <span
            key={technology}
            className="font-mono text-[10px] text-[#4fd8c4] border border-[#4fd8c4]/30 rounded-md px-2 py-1"
          >
            {technology}
          </span>
        ))}
      </div>
      <p className="text-xs text-[#8992a9]">
        <span className="text-[#c4c9d6]">Role:</span> {project.role}
      </p>
      <p className="text-xs text-[#8992a9] leading-relaxed">
        <span className="text-[#c4c9d6]">Challenge:</span> {project.challenge}
      </p>
      <p className="text-xs text-[#8992a9]">
        <span className="text-[#c4c9d6]">Outcome:</span> {project.outcome}
      </p>
      <p className="font-mono text-[10px] uppercase tracking-wide text-[#e8963d]">
        {project.status}
      </p>
    </div>
  );
}

function FeaturedCard({ project }) {
  return (
    <div className="group relative flex w-full max-w-[680px] flex-col bg-[#10141f] border border-[#4fd8c4]/40 rounded-2xl overflow-hidden hover:border-[#4fd8c4] transition-colors shadow-[0_0_40px_-20px_#4fd8c455]">
      <Link to={`/projects/${project.slug}`} className="flex flex-col">
        <PriorityTag />
        {project.img && (
          <img
            src={project.img}
            alt={project.name}
            className="w-full h-[200px] object-cover"
          />
        )}
        <div className="flex flex-col gap-2 p-6 pb-3">
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
      </Link>
      <div className="px-6 pb-6">
        <ProjectEvidence project={project} />
      </div>
    </div>
  );
}

function StandardCard({ project }) {
  return (
    <div className="group flex flex-col bg-[#0a0e17] border border-[#232838] rounded-xl overflow-hidden hover:border-[#333b52] transition-colors">
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col"
      >
        {project.img && (
          <img
            src={project.img}
            alt={project.name}
            className="w-full h-[120px] object-cover opacity-90 group-hover:opacity-100 transition-opacity"
          />
        )}
        <div className="flex flex-col gap-1.5 p-4 pb-1">
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
      <div className="px-4 pb-4">
        <ProjectEvidence project={project} />
      </div>
    </div>
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
      <div className="text-center mb-10">
        <h2 className="font-display font-semibold text-xl">
          Featured Projects
        </h2>
        <p className="max-w-[540px] text-sm leading-relaxed text-[#8992a9] mt-3">
          A closer look at the work where I turn complex workflows into useful,
          human-centered products.
        </p>
      </div>

      {featured.length > 0 && (
        <div className="flex justify-center w-full max-w-[1000px] mb-6">
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
