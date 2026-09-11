import { createFileRoute } from "@tanstack/react-router";
import { Portfolio } from "@/components/Portfolio";
import { profile } from "@/lib/portfolio-data";

const configuredUrl = import.meta.env.VITE_SITE_URL || profile.website;
const siteUrl =
  configuredUrl && /^https?:\/\//.test(configuredUrl)
    ? new URL("/", configuredUrl).href
    : undefined;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Krish Lalani | Software Developer · Python & Computer Vision" },
      {
        name: "description",
        content:
          "Krish Lalani is a software developer focused on Python backends, REST APIs, and computer vision. Explore industrial inspection work, projects, and experience.",
      },
      {
        property: "og:title",
        content: "Krish Lalani — Python, Backend & Computer Vision",
      },
      {
        property: "og:description",
        content:
          "Krish Lalani is a software developer focused on Python backends, REST APIs, and computer vision. Explore industrial inspection work, projects, and experience.",
      },
      { property: "og:type", content: "website" },
      {
        name: "twitter:card",
        content: siteUrl ? "summary_large_image" : "summary",
      },
      ...(siteUrl
        ? [
            { property: "og:url", content: siteUrl },
            {
              property: "og:image",
              content: new URL("social-card.png", siteUrl).href,
            },
            { property: "og:image:width", content: "1200" },
            { property: "og:image:height", content: "630" },
            {
              property: "og:image:alt",
              content:
                "Krish Lalani — Backend systems. Computer vision. Practical software.",
            },
          ]
        : []),
    ],
    links: siteUrl ? [{ rel: "canonical", href: siteUrl }] : [],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Krish Lalani",
          jobTitle: "Software Developer",
          ...(siteUrl ? { url: siteUrl } : {}),
          knowsAbout: [
            "Python",
            "Backend Development",
            "REST APIs",
            "Computer Vision",
            "OpenCV",
          ],
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
