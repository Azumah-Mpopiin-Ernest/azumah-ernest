import { useEffect, useState } from "react";

const sectionLinks = [
  { name: "Home", href: "#home", id: "home" },
  { name: "Projects", href: "#projects", id: "projects" },
  { name: "Skills", href: "#skills", id: "skills" },
  { name: "Contact", href: "#contact", id: "contact" },
  { name: "Resume", href: "#resume", id: "resume" },
];

export default function Header() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const updateActiveSection = () => {
      const scrollPosition = window.scrollY + 150;
      let currentSection = sectionLinks[0].id;

      sectionLinks.forEach((link) => {
        const section = document.getElementById(link.id);
        const sectionTop = section
          ? section.getBoundingClientRect().top + window.scrollY
          : Infinity;

        if (section && sectionTop <= scrollPosition) {
          currentSection = link.id;
        }
      });

      setActiveSection(currentSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1 bg-[#10141f]/90 backdrop-blur border border-[#232838] rounded-full px-2 py-2 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.6)]">
      {sectionLinks.map((link) => {
        const isActive = activeSection === link.id;
        return (
          <a
            key={link.id}
            href={link.href}
            className={`relative px-4 py-1.5 rounded-full text-xs md:text-sm font-mono tracking-wide transition-colors duration-300 ${
              isActive
                ? "text-[#0a0e17]"
                : "text-[#8992a9] hover:text-[#e9ecf3]"
            }`}
          >
            {isActive && (
              <span className="absolute inset-0 rounded-full bg-[#4fd8c4] -z-10 shadow-[0_0_20px_-2px_#4fd8c4]" />
            )}
            {link.name}
          </a>
        );
      })}
    </nav>
  );
}
