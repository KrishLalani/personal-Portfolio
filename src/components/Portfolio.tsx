import { Nav } from "./portfolio/Nav";
import { Hero } from "./portfolio/Hero";
import { About } from "./portfolio/About";
import { Skills } from "./portfolio/Skills";
import { Projects } from "./portfolio/Projects";
import { Experience } from "./portfolio/Experience";
import { Education } from "./portfolio/Education";
import { Contact } from "./portfolio/Contact";
import { Footer } from "./portfolio/Footer";
export function Portfolio() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Nav />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <Projects />
        <Experience />
        <Skills />
        <About />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
