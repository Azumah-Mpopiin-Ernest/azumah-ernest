import Header from "./Header";
import { useState, useEffect } from "react";
import { projects } from "./projects";
import CrystalProfile from "./crystalFrame";
import SkillTree from "./skillTree";
import Footer from "./footer";
export default function Home() {
  const lines = [
    "You are Warmly Welcome",
    "You are in the right place",
    "I build clean web experiences",

    "Thanks for passing by",
  ];

  const [text, setText] = useState("");
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const currentLine = lines[lineIndex];

    if (charIndex < currentLine.length) {
      const timeout = setTimeout(() => {
        setText(currentLine.slice(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
      }, 70);

      return () => clearTimeout(timeout);
    }

    const nextTimeout = setTimeout(() => {
      setCharIndex(0);
      setText("");
      setLineIndex((prev) => (prev + 1) % lines.length);
    }, 1500);

    return () => clearTimeout(nextTimeout);
  }, [charIndex, lineIndex]);

  return (
    <>
      <Header />

      <main className="w-full flex justify-center mt-16">
        <div className="flex flex-col items-center gap-16 md:max-w-[1100px]  w-full overflow-x-hidden">
          <section id="home">
            <CrystalProfile />
            <h1 className="text-white font-bold text-xl my-10">
              Azumah Mpopiin Ernest
            </h1>
            <div className="typewriter-wrap w-full">
              <h1 className="typewriter-live text-yellow-500 md:text-lg">
                {text}
                <span className="cursor">|</span>
              </h1>
            </div>
          </section>

          <div className="max-w-[500px] md:max-w-[800px] px-5">
            <h2 className="text-yellow-500 font-bold text-xl border-b w-40 mb-2">
              About
            </h2>
            <p className="text-white">
              Hi, I'm Azumah Mpopiin Ernest, a Telecommunication Engineering
              student at KNUST, Kumasi, and a self-taught full stack developer.
              Beyond the code, I bring strong people skills and a natural ease
              in team environments, something I've deliberately developed
              through reading, practice, and personal reflection. The value I
              lead with in everything I do is love: for the craft, for the
              people I work with, and for building things that actually matter.
              I'm always open to new knowledge, collaboration, and opportunities
              to grow.
            </p>
          </div>

          {/* PROJECT SCROLLER */}
          <div id="projects" className="projects-wrapper mb-10">
            <h2 className="text-yellow-500 font-bold text-xl text-center mb-5">
              Featured Projects
            </h2>
            <div className="projects-track ">
              {[...projects, ...projects].map((project, i) => (
                <div
                  key={i}
                  className="project-card max-w-[200px] max-w-[200px]"
                >
                  {project.img && (
                    <img
                      src={project.img}
                      alt={project.name}
                      className="project-img"
                    />
                  )}

                  <h2>{project.name}</h2>

                  <p>{project.description}</p>

                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Project →
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div id="skills">
            <SkillTree />
          </div>

          <div id="contact" className="max-w-[600px] md:max-w-[1100px] px-2">
            <h2 className="text-yellow-500 font-bold text-xl text-center mb-2">
              Contacts
            </h2>
            <div className="flex justify-center flex-wrap  mb-10 gap-10  p-5">
              <a href="https://wa.me/233557410587" target="blank">
                <button className="text-black shadow-white hover:shadow text-lg transition bg-white rounded-xl  p-5 cursor-pointer border border-yellow-200">
                  WhatsApp
                </button>
              </a>
              <a href="mailto:teslajunior0552@gmail.com" target="blank">
                <button className="text-black shadow-white hover:shadow text-lg transition bg-white rounded-xl  p-5 cursor-pointer border border-yellow-200">
                  E-mail
                </button>
              </a>

              <a
                href="https://www.linkedin.com/in/ernest-azumah-48b3a5308/"
                target="blank"
              >
                <button className="text-black shadow-white hover:shadow text-lg transition bg-white rounded-xl  p-5 cursor-pointer border border-yellow-200">
                  Linkedin
                </button>
              </a>

              <a href="https://github.com/Azumah-Mpopiin-Ernest" target="blank">
                <button className="text-black shadow-white hover:shadow text-lg transition bg-white rounded-xl  p-5 cursor-pointer border border-yellow-200">
                  Github
                </button>
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
