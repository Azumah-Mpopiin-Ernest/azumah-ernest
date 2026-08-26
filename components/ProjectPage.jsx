import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router";
import Footer from "./footer";
import { projects } from "./projects";

function ScreenshotSlider({ project }) {
  const screenshots = project.screenshots || [project.img];
  const [activeIndex, setActiveIndex] = useState(0);

  const move = (direction) => {
    setActiveIndex(
      (current) =>
        (current + direction + screenshots.length) % screenshots.length,
    );
  };

  useEffect(() => {
    if (screenshots.length < 2) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % screenshots.length);
    }, 4500);

    return () => window.clearInterval(timer);
  }, [screenshots.length]);

  return (
    <section className="mt-10" aria-label={`${project.name} screenshots`}>
      <div className="relative mx-auto w-full max-w-[330px] md:max-w-[380px]">
        <div className="relative aspect-[9/16] max-h-[620px] overflow-hidden rounded-[2rem] border-[6px] border-[#161b29] bg-[#10141f] p-2 shadow-[0_24px_80px_-28px_#4fd8c455]">
          <img
            src={screenshots[activeIndex]}
            alt={`${project.name} mobile screen ${activeIndex + 1}`}
            className="h-full w-full rounded-[1.4rem] object-contain"
          />
          {screenshots.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => move(-1)}
                aria-label="Previous screenshot"
                className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-[#0a0e17]/85 text-lg text-[#e9ecf3] hover:text-[#4fd8c4]"
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => move(1)}
                aria-label="Next screenshot"
                className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-[#0a0e17]/85 text-lg text-[#e9ecf3] hover:text-[#4fd8c4]"
              >
                →
              </button>
            </>
          )}
        </div>
        <div
          className="mt-4 flex justify-center gap-2"
          role="tablist"
          aria-label="Screenshot slides"
        >
          {screenshots.map((screenshot, index) => (
            <button
              key={`${project.name}-dot-${index}`}
              type="button"
              role="tab"
              aria-label={`Show screenshot ${index + 1}`}
              aria-selected={activeIndex === index}
              onClick={() => setActiveIndex(index)}
              className={`h-1.5 rounded-full transition-all ${activeIndex === index ? "w-8 bg-[#4fd8c4]" : "w-1.5 bg-[#6b7488]"}`}
            />
          ))}
        </div>
      </div>
      <p className="mt-3 text-center font-mono text-[10px] tracking-widest text-[#6b7488]">
        MOBILE SCREEN {String(activeIndex + 1).padStart(2, "0")} /{" "}
        {String(screenshots.length).padStart(2, "0")}
      </p>
    </section>
  );
}
export default function ProjectPage() {
  const { slug } = useParams();
  const project = projects.find(
    (candidate) => candidate.slug === slug && candidate.priority === "high",
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <main className="min-h-screen w-full bg-[#0a0e17] text-[#e9ecf3] px-5 py-8 md:py-12">
        <article className="max-w-[1000px] mx-auto">
          <Link
            to="/#projects"
            className="font-mono text-sm text-[#8992a9] hover:text-[#4fd8c4]"
          >
            ← Back to projects
          </Link>

          <header className="relative mt-16 max-w-[820px] border-l-2 border-[#4fd8c4] pl-6 md:pl-10">
            <p className="font-mono text-[11px] tracking-[0.2em] text-[#4fd8c4] mb-3">
              FEATURED PROJECT / {project.status.toUpperCase()}
            </p>
            <h1 className="font-display font-bold text-4xl md:text-6xl text-[#e9ecf3]">
              {project.name}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-[#c4c9d6]">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="font-display font-semibold text-[#0a0e17] bg-[#e8963d] hover:bg-[#f2a850] transition-colors px-5 py-3 rounded-xl"
              >
                Open live project
              </a>
            </div>
          </header>

          <ScreenshotSlider project={project} />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <section className="md:col-span-2">
              <p className="font-mono text-[11px] tracking-[0.2em] text-[#4fd8c4] mb-3">
                THE STORY
              </p>
              <h2 className="font-display font-semibold text-2xl mb-4">
                From problem to product
              </h2>
              <h3 className="font-display font-semibold text-lg text-[#e8963d] mb-2">
                The problem
              </h3>
              <p className="text-[#c4c9d6] leading-relaxed">
                {project.problem}
              </p>
              <h3 className="font-display font-semibold text-lg text-[#e8963d] mt-8 mb-2">
                The challenge
              </h3>
              <p className="text-[#c4c9d6] leading-relaxed">
                {project.challenge}
              </p>
              <h3 className="font-display font-semibold text-lg text-[#e8963d] mt-8 mb-2">
                How I navigated it
              </h3>
              <p className="text-[#c4c9d6] leading-relaxed">
                {project.approach}
              </p>
              <h3 className="font-display font-semibold text-lg text-[#e8963d] mt-8 mb-2">
                Result
              </h3>
              <p className="text-[#c4c9d6] leading-relaxed">
                {project.outcome}
              </p>
            </section>

            <aside className="bg-[#10141f] border border-[#232838] rounded-xl p-5 h-fit">
              <p className="font-mono text-[11px] tracking-[0.2em] text-[#4fd8c4] mb-4">
                PROJECT INFO
              </p>
              <dl className="flex flex-col gap-4 text-sm">
                <div>
                  <dt className="text-[#8992a9]">Role</dt>
                  <dd className="text-[#e9ecf3] mt-1">{project.role}</dd>
                </div>
                <div>
                  <dt className="text-[#8992a9]">Status</dt>
                  <dd className="text-[#e8963d] mt-1">{project.status}</dd>
                </div>
                <div>
                  <dt className="text-[#8992a9]">Technologies</dt>
                  <dd className="flex flex-wrap gap-2 mt-2">
                    {project.technologies.map((technology) => (
                      <span
                        key={technology}
                        className="font-mono text-[10px] text-[#4fd8c4] border border-[#4fd8c4]/30 rounded-md px-2 py-1"
                      >
                        {technology}
                      </span>
                    ))}
                  </dd>
                </div>
              </dl>
            </aside>
          </div>

          <section className="mt-16">
            <p className="font-mono text-[11px] tracking-[0.2em] text-[#4fd8c4] mb-3">
              CAPABILITIES
            </p>
            <h2 className="font-display font-semibold text-2xl mb-6">
              What the app does
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {project.features.map((feature, index) => (
                <div
                  key={feature}
                  className="bg-[#10141f] border border-[#232838] rounded-xl p-4"
                >
                  <span className="font-mono text-xs text-[#e8963d]">
                    0{index + 1}
                  </span>
                  <p className="text-sm text-[#c4c9d6] mt-3">{feature}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-16">
            <p className="font-mono text-[11px] tracking-[0.2em] text-[#4fd8c4] mb-3">
              FEATURE MAP
            </p>
            <h2 className="font-display font-semibold text-2xl mb-6">
              Built for the whole maintenance operation
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.featureGroups.map((group) => (
                <article
                  key={group.name}
                  className="bg-[#10141f] border border-[#232838] rounded-xl p-5 hover:border-[#4fd8c4]/50 transition-colors"
                >
                  <h3 className="font-display font-semibold text-lg text-[#e8963d]">
                    {group.name}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#c4c9d6] mt-3">
                    {group.details}
                  </p>
                </article>
              ))}
            </div>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
