import project1 from "../assets/project-1.jpg";
import project2 from "../assets/project-2.jpg";
import project3 from "../assets/project-3.jpg";
import project4 from "../assets/project-4.jpg";

export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  tech: string[];
  liveUrl: string;
  githubUrl: string;
  accent: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Insight Analytics",
    category: "SaaS Platform",
    description:
      "Multi-tenant analytics product with a streaming ingestion pipeline, role-based access control and sub-second dashboards over hundreds of millions of events.",
    image: project1,
    tech: ["Next.js", "NestJS", "PostgreSQL", "Redis", "Docker"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/",
    accent: "#2563EB",
  },
  {
    id: 2,
    title: "Commerce Suite",
    category: "E-Commerce",
    description:
      "Headless storefront and admin platform with a fully typed checkout, inventory sync, Stripe payments and a CDN-cached product catalogue.",
    image: project2,
    tech: ["React", "TypeScript", "Node.js", "MySQL", "Cloudflare"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/",
    accent: "#0EA5E9",
  },
  {
    id: 3,
    title: "API Core",
    category: "Backend Architecture",
    description:
      "Versioned REST and webhook platform with schema-first contracts, generated SDKs, granular rate limiting and full request observability.",
    image: project3,
    tech: ["Node.js", "Express.js", "PostgreSQL", "AWS", "Nginx"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/",
    accent: "#6366F1",
  },
  {
    id: 4,
    title: "Realtime Collaboration",
    category: "Web Application",
    description:
      "Low-latency messaging and presence layer with offline-first sync, end-to-end delivery guarantees and horizontally scalable socket workers.",
    image: project4,
    tech: ["React", "Laravel", "Redis", "MongoDB", "Docker"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/",
    accent: "#14B8A6",
  },
];
