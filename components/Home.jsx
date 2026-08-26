import Header from "./Header";
import { useState, useEffect } from "react";

import CrystalProfile from "./crystalFrame";
import SkillTree from "./skillTree";
import Footer from "./footer";
import Projects from "./projectsSection";

export default function Home() {
  const lines = [
    "Building signal from noise.",
    "Telecommunications Engineering @ KNUST.",
    "Self-taught full-stack developer.",
    "Open to new frequencies — let's talk.",
  ];

  const [text, setText] = useState("");
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const currentLine = lines[lineIndex];
    if (charIndex < currentLine.length) {
      const timeout = setTimeout(() => {
        setText(currentLine.slice(0, charIndex + 1));
        setCharIndex((p) => p + 1);
      }, 55);
      return () => clearTimeout(timeout);
    }
    const nextTimeout = setTimeout(() => {
      setCharIndex(0);
      setText("");
      setLineIndex((p) => (p + 1) % lines.length);
    }, 1600);
    return () => clearTimeout(nextTimeout);
  }, [charIndex, lineIndex]);

  return (
    <>
      <Header />

      <main className="w-full flex justify-center bg-[#0a0e17] text-[#e9ecf3]">
        <div className="flex flex-col items-center gap-24 md:max-w-[1100px] w-full overflow-x-hidden pt-32 pb-10">
          {/* HERO */}
          <section
            id="home"
            className="flex flex-col items-center text-center px-5"
          >
            <CrystalProfile />
            <h1 className="font-display font-bold text-2xl md:text-3xl mt-8 mb-3">
              Azumah Mpopiin Ernest
            </h1>
            <div className="h-6 flex items-center">
              <p className="font-mono text-sm md:text-base text-[#4fd8c4]">
                {text}
                <span className="cursor">|</span>
              </p>
            </div>
          </section>

          {/* ABOUT */}
          <section className="max-w-[560px] md:max-w-[800px] px-5 text-center">
            <p className="font-mono text-[11px] tracking-[0.2em] text-[#4fd8c4] mb-2">
              SEC.01 — ABOUT
            </p>
            <h2 className="font-display font-semibold text-xl mb-4">
              A little about me
            </h2>
            <p className="text-[#c4c9d6] leading-relaxed">
              I'm a Telecommunications Engineering student at KNUST, Kumasi, and
              a self-taught full-stack developer. Outside the code, I bring
              strong people skills and an ease in team settings that I've built
              deliberately, through reading, practice, and reflection. I lead
              with love in everything I do: for the craft, for the people I
              build with, and for work that actually matters. I'm always open to
              new knowledge, collaboration, and opportunities to grow.
            </p>
          </section>

          {/* PROJECTS */}
          <Projects />

          {/* SKILLS */}
          <div id="skills" className="w-full">
            <SkillTree />
          </div>

          {/* CONTACT */}
          <section
            id="contact"
            className="max-w-[600px] md:max-w-[1100px] px-5 w-full text-center"
          >
            <p className="font-mono text-[11px] tracking-[0.2em] text-[#4fd8c4] mb-2">
              SEC.04 — CONTACT
            </p>
            <h2 className="font-display font-semibold text-xl mb-8">
              Get in touch
            </h2>
            <div className="flex justify-center flex-wrap gap-3">
              {[
                { label: "WhatsApp", href: "https://wa.me/233557410587" },
                { label: "E-mail", href: "mailto:teslajunior0552@gmail.com" },
                {
                  label: "LinkedIn",
                  href: "https://www.linkedin.com/in/ernest-azumah-48b3a5308/",
                },
                {
                  label: "GitHub",
                  href: "https://github.com/Azumah-Mpopiin-Ernest",
                },
              ].map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="font-mono text-sm text-[#e9ecf3] bg-[#10141f] border border-[#232838] hover:border-[#4fd8c4] hover:text-[#4fd8c4] transition-colors rounded-xl px-6 py-3">
                    {c.label}
                  </button>
                </a>
              ))}
            </div>
          </section>

          {/* RESUME */}
          <section
            id="resume"
            className="flex flex-col items-center gap-6 mb-10 px-5"
          >
            <p className="font-mono text-[11px] tracking-[0.2em] text-[#4fd8c4]">
              SEC.05 — RESUME
            </p>

            <a
              href="/resume.pdf"
              download="Azumah_Mpopiin_Ernest.pdf"
              className="font-display font-semibold text-[#0a0e17] bg-[#e8963d] hover:bg-[#f2a850] transition-colors px-10 py-3 rounded-xl"
            >
              Download Resume
            </a>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
