import { createFileRoute } from "@tanstack/react-router";
import { useMediaQuery } from "@/hooks/useMediaQuery";

import { Background } from "../components/Background";
import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { About } from "../components/About";
import { Projects } from "../components/Projects";
import { Experience } from "../components/Experience";
import { TechStack } from "../components/TechStack";
import { Services } from "../components/Services";
import { Certificates } from "../components/Certificates";
import { Contact } from "../components/Contact";
import { Footer } from "../components/Footer";
import { Showcase } from "../components/Showcase";
import { Interactive } from "../components/Interactive";

import { SITE } from "../constants/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${SITE.name} — ${SITE.role}` },
      { name: "description", content: SITE.description },
      { property: "og:title", content: `${SITE.name} — Full Stack Software Engineer` },
      { property: "og:description", content: SITE.description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const isMobile = useMediaQuery("(max-width: 767px)");

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:text-accent-foreground"
      >
        Skip to content
      </a>

      <Background />
      <Header />

      <main id="main" className="relative">
        <Hero />
        <About />
        <Interactive />

        {isMobile ? <Projects /> : <Showcase />}

        <Experience />
        <TechStack />
        <Services />
        <Certificates />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
