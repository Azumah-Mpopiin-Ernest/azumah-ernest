const tree = {
  root: "Full Stack Developer",
  branches: [
    {
      name: "Frontend",
      skills: [
        { name: "JavaScript", source: "Scrimba — June 2025" },
        { name: "React", source: "Scrimba — React course" },
        { name: "HTML & CSS", source: "KNUST + personal practice" },
        { name: "Tailwind CSS", source: "YouTube + personal projects" },
      ],
    },
    {
      name: "Backend",
      skills: [
        { name: "Node.js", source: "YouTube + personal projects" },
        { name: "Express", source: "YouTube + personal projects" },
        { name: "PostgreSQL", source: "YouTube + Prisma docs" },
        { name: "Prisma", source: "Official Prisma docs" },
        { name: "OAuth 2.0", source: "YouTube + hands-on projects" },
      ],
    },
  ],
};

function SkillNode({ skill }) {
  return (
    <div className="relative group flex flex-col items-center">
      <div className="w-px h-6 bg-[#232838] group-hover:bg-[#4fd8c4] transition-colors" />
      <div className="relative px-3 py-1.5 font-mono text-xs border border-[#232838] rounded-md bg-[#10141f] text-[#c4c9d6] cursor-default group-hover:border-[#4fd8c4] group-hover:text-[#4fd8c4] transition-colors whitespace-nowrap">
        {skill.name}
        <div className="hidden group-hover:block absolute bottom-[calc(100%+10px)] left-1/2 -translate-x-1/2 w-48 bg-[#0a0e17] border border-[#4fd8c4]/40 rounded-lg p-3 z-10 pointer-events-none shadow-[0_10px_30px_-10px_rgba(0,0,0,0.7)]">
          <p className="text-[#4fd8c4] text-[11px] font-semibold mb-1">
            {skill.name}
          </p>
          <p className="text-[#8992a9] text-[11px] leading-relaxed font-mono">
            {skill.source}
          </p>
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-[#4fd8c4]/40" />
        </div>
      </div>
    </div>
  );
}

function Branch({ branch }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-px h-8 bg-[#232838]" />
      <div className="px-5 py-2 bg-[#10141f] border border-[#232838] rounded-lg text-[#e9ecf3] font-display font-semibold text-sm whitespace-nowrap">
        {branch.name}
      </div>
      <div className="w-px h-8 bg-[#232838]" />
      <div className="relative flex items-start justify-center w-full">
        <div
          className="absolute top-0 h-px bg-[#232838]"
          style={{
            left: `calc(100% / ${branch.skills.length * 2})`,
            right: `calc(100% / ${branch.skills.length * 2})`,
          }}
        />
        <div className="flex flex-wrap md:flex-nowrap justify-center gap-4 w-full">
          {branch.skills.map((skill) => (
            <SkillNode key={skill.name} skill={skill} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function SkillTree() {
  return (
    <section className="w-full flex flex-col items-center py-16 px-4">
      <p className="font-mono text-[11px] tracking-[0.2em] text-[#4fd8c4] mb-2">
        SEC.03 — STACK
      </p>
      <h2 className="font-display font-semibold text-2xl mb-10 text-[#e9ecf3]">
        Skills & Learning
      </h2>

      <div className="px-7 py-2.5 bg-[#10141f] border border-[#4fd8c4]/50 rounded-xl text-[#4fd8c4] font-display font-bold text-base whitespace-nowrap shadow-[0_0_30px_-10px_#4fd8c455]">
        {tree.root}
      </div>

      <div className="w-px h-8 bg-[#232838]" />

      <div className="relative flex flex-col md:flex-row items-start w-full max-w-3xl">
        <div className="hidden md:block absolute top-0 left-1/2 w-px h-full bg-[#161b29]" />
        {tree.branches.map((branch) => (
          <div
            key={branch.name}
            className="flex-1 w-full flex flex-col items-center px-4 md:px-8"
          >
            <Branch branch={branch} />
          </div>
        ))}
      </div>
    </section>
  );
}
