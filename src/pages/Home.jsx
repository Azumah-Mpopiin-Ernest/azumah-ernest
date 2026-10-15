import { useEffect } from "react";
import { useLocation } from "react-router";
import SiteHeader from "../components/SiteHeader";
import Hero from "../components/Hero";
import Work from "../components/Work";
import About from "../components/About";
import Contact from "../components/Contact";
import SiteFooter from "../components/SiteFooter";
import { useProfile, useProjects } from "../lib/content";

export default function Home() {
  const { data: profile } = useProfile();
  const { data: projects } = useProjects();
  const { hash } = useLocation();

  // Router navigation to /#section lands before content renders; scroll once it exists.
  useEffect(() => {
    if (!hash) return;
    document.getElementById(hash.slice(1))?.scrollIntoView();
  }, [hash, profile, projects]);

  return (
    <>
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-lg focus:bg-action focus:px-4 focus:py-2 focus:text-on-action"
      >
        Skip to projects
      </a>
      <SiteHeader profile={profile} />
      <main>
        <Hero profile={profile} />
        <Work projects={projects} />
        {profile && (
          <>
            <About profile={profile} />
            <Contact profile={profile} />
          </>
        )}
      </main>
      <SiteFooter profile={profile} />
    </>
  );
}
