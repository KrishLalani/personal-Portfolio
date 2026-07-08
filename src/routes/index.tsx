import { createFileRoute } from "@tanstack/react-router";
import { Portfolio } from "@/components/Portfolio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Krish Lalani" },
      {
        name: "description",
        content:
          "Portfolio of Krish Lalani, a full-stack software developer open to full-time roles and freelance projects.",
      },
      { property: "og:title", content: "Krish Lalani — Software Developer" },
      {
        property: "og:description",
        content:
          "Portfolio of Krish Lalani, a full-stack software developer open to full-time roles and freelance projects.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Krish Lalani",
          jobTitle: "Software Developer",
          email: "mailto:Krish7lalani@gmail.com",
          sameAs: [
            "https://github.com/KrishLalani",
            "https://www.linkedin.com/in/krish-lalani-bb4385252/",
          ],
        }),
      },
    ],
  }),
  component: Portfolio,
});
