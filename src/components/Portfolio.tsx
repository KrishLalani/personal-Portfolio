import { Nav } from "./portfolio/Nav";
import { Hero } from "./portfolio/Hero";
import { About } from "./portfolio/About";
import { Skills } from "./portfolio/Skills";
import { Projects } from "./portfolio/Projects";
import { Experience } from "./portfolio/Experience";
import { Education } from "./portfolio/Education";
import { Certifications } from "./portfolio/Certifications";
import { Contact } from "./portfolio/Contact";
import { Footer } from "./portfolio/Footer";
import { useTheme } from "@/hooks/use-theme";

export function Portfolio() {
  useTheme();

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <div
        aria-hidden
        className="site-grid pointer-events-none fixed inset-0 z-0"
      />
      <Nav />

      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Certifications />
        <Contact />
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
