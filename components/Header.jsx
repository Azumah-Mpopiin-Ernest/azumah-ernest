import { NavLink } from "react-router";
import { useEffect, useState } from "react";

export default function Header() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const sectionIds = ["home", "projects", "skills", "contact"];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        root: null,
        threshold: [0.25, 0.4, 0.6, 0.75],
        rootMargin: "-120px 0px -35% 0px",
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const sectionLinks = [
    { name: "Home", href: "#home", id: "home" },
    { name: "Projects", href: "#projects", id: "projects" },
    { name: "Skills", href: "#skills", id: "skills" },
    { name: "Contact", href: "#contact", id: "contact" },
  ];

  return (
    <nav className="navbar fixed top-0 w-full z-10 flex justify-center">
      {sectionLinks.map((link) => {
        const isActive = activeSection === link.id;

        return (
          <a
            key={link.name}
            href={link.href}
            className={isActive ? "nav-item active" : "nav-item"}
          >
            <span className="link-text text-sm md:text-lg">{link.name}</span>

            <div className="orbit-container">
              <div className="glow-particle"></div>
            </div>
          </a>
        );
      })}

      <NavLink
        to="/Resume"
        className={({ isActive }) =>
          isActive ? "nav-item active" : "nav-item"
        }
      >
        <span className="link-text text-sm md:text-lg">Resume</span>
        <div className="orbit-container">
          <div className="glow-particle"></div>
        </div>
      </NavLink>
    </nav>
  );
}
