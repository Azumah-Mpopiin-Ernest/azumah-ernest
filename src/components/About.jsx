import { Link } from "react-router";
import Skills from "./Skills";
import { ChevronRight } from "./Icons";

export default function About({ profile }) {
  return (
    <section id="about" className="border-y border-line bg-panel/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-[280px_1fr] md:py-24">
        <div>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            About me
          </h2>
          <Link
            to="/about"
            className="mt-6 inline-flex min-h-11 items-center gap-1 rounded-xl border border-line px-5 text-fg transition-colors hover:border-signal hover:text-signal"
          >
            More about me
            <ChevronRight />
          </Link>
        </div>

        <div>
          <p className="max-w-[65ch] text-lg leading-relaxed text-dim">
            {profile.about}
          </p>

          {profile.skills?.length > 0 && (
            <>
              <h3 className="mt-14 font-display text-xl font-bold">
                What I work with
              </h3>
              <div className="mt-6">
                <Skills skills={profile.skills} />
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
