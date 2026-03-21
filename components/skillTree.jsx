const tree = {
  root: "Full Stack Developer",
  branches: [
    {
      name: "Frontend",
      skills: [
        { name: "JavaScript", source: "Scrimba — first course, June 2025" },
        { name: "React", source: "Scrimba — React course" },
        { name: "HTML & CSS", source: "KNUST + Personal practice" },
        { name: "Tailwind CSS", source: "YouTube + personal projects" },
      ],
    },
    {
      name: "Backend",
      skills: [
        { name: "Node.js", source: "YouTube + Personal projects" },
        { name: "Express", source: "YouTube + Personal projects" },
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
      <div className="w-0.5 h-6 bg-yellow-500" />{" "}
      {/* ✅ yellow stem per skill */}
      <div className="relative px-3 py-1.5 text-xs font-medium border border-zinc-700 rounded-lg bg-zinc-900 text-zinc-300 cursor-pointer group-hover:border-yellow-500 group-hover:text-yellow-400 transition-all whitespace-nowrap">
        {skill.name}
        <div className="hidden group-hover:block absolute bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2 w-44 bg-zinc-950 border border-yellow-500 rounded-lg p-2 z-10 pointer-events-none">
          <p className="text-yellow-400 text-xs font-medium mb-1">
            {skill.name}
          </p>
          <p className="text-zinc-400 text-xs leading-relaxed">
            {skill.source}
          </p>
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-yellow-500" />
        </div>
      </div>
    </div>
  );
}

function Branch({ branch }) {
  return (
    <div className="flex flex-col items-center">
      {/* Stem down to branch node */}
      <div className="w-0.5 h-8 bg-yellow-500" />

      {/* Branch label */}
      <div className="px-5 py-2 bg-zinc-900 border-2 border-yellow-500 rounded-lg text-yellow-400 font-semibold text-sm whitespace-nowrap">
        {branch.name}
      </div>

      {/* Stem down to horizontal bar */}
      <div className="w-0.5 h-8 bg-yellow-500" />

      {/* ✅ Horizontal yellow bar connecting all skill stems */}
      <div className="relative flex items-start justify-center w-full">
        {/* The yellow horizontal line stretches across all skill stems */}
        <div
          className="absolute top-0 left-[calc(50%/var(--count))] right-[calc(50%/var(--count))] h-0.5 bg-yellow-500"
          style={{
            left: `calc(100% / ${branch.skills.length * 2})`,
            right: `calc(100% / ${branch.skills.length * 2})`,
          }}
        />

        {/* Skills */}
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
      <h2 className="text-yellow-500 font-bold text-xl mb-10">
        Skills & Learning
      </h2>

      {/* Root node */}
      <div className="px-7 py-2.5 bg-zinc-900 border-2 border-yellow-500 rounded-xl text-yellow-400 font-bold text-base whitespace-nowrap">
        {tree.root}
      </div>

      {/* Root stem */}
      <div className="w-0.5 h-8 bg-yellow-500" />

      {/* ✅ Desktop: horizontal bar connecting Frontend and Backend */}
      <div className="relative flex flex-col md:flex-row items-center md:items-start w-full max-w-3xl">
        <div className="hidden md:block absolute top-0 left-1/4 right-1/4 w-[520px] h-0.5 bg-yellow-500" />

        {/* ✅ Left divider between branches — visible on desktop only */}
        <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-0.5 bg-zinc-800" />

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
