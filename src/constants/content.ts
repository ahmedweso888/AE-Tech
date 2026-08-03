/** Portfolio content model — pure data, decoupled from layout. */

import project1 from "../assets/project-1.jpg";
import project2 from "../assets/project-2.jpg";
import project3 from "../assets/project-3.jpg";
import project4 from "../assets/project-4.jpg";

export interface TechCategory {
  id: string;
  title: string;
  icon: "layout" | "server" | "database" | "cloud" | "wrench";
  items: readonly string[];
}

export const TECH_STACK: readonly TechCategory[] = [
  {
    id: "frontend",
    title: "Frontend",
    icon: "layout",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "React Query"],
  },
  {
    id: "backend",
    title: "Backend",
    icon: "server",
    items: ["Node.js", "Express.js", "NestJS", "Laravel", "PHP"],
  },
  {
    id: "databases",
    title: "Databases",
    icon: "database",
    items: ["MySQL", "PostgreSQL", "MongoDB", "Redis"],
  },
  {
    id: "cloud",
    title: "Cloud",
    icon: "cloud",
    items: ["AWS", "Vercel", "Cloudflare", "Docker", "Nginx", "Linux"],
  },
  {
    id: "tools",
    title: "Tools",
    icon: "wrench",
    items: ["Git", "GitHub", "Postman", "Figma", "Blender", "VS Code"],
  },
] as const;

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tech: readonly string[];
  github: string;
  demo?: string;
}

export const PROJECTS: readonly Project[] = [
  {
    id: "insight",
    title: "Insight Analytics Platform",
    description:
      "Multi-tenant analytics product with a streaming ingestion pipeline, role-based access control and sub-second dashboards over hundreds of millions of events.",
    image: project1,
    tech: ["Next.js", "NestJS", "PostgreSQL", "Redis", "Docker"],
    github: "https://github.com/",
    demo: "https://example.com",
  },
  {
    id: "commerce",
    title: "Modern Commerce Suite",
    description:
      "Headless storefront and admin platform with a fully typed checkout, inventory sync, Stripe payments and a CDN-cached product catalogue.",
    image: project2,
    tech: ["React", "TypeScript", "Node.js", "MySQL", "Cloudflare"],
    github: "https://github.com/",
    demo: "https://example.com",
  },
  {
    id: "api-core",
    title: "API Core & Developer Console",
    description:
      "Versioned REST platform with API keys, rate limiting, webhook delivery, OpenAPI docs and a developer console for testing endpoints live.",
    image: project3,
    tech: ["NestJS", "PostgreSQL", "Redis", "AWS", "Nginx"],
    github: "https://github.com/",
    demo: "https://example.com",
  },
  {
    id: "realtime",
    title: "Realtime Collaboration App",
    description:
      "Presence-aware messaging and collaboration workspace with WebSocket fan-out, offline queues and end-to-end encrypted attachments.",
    image: project4,
    tech: ["React", "Express.js", "MongoDB", "WebSockets", "Docker"],
    github: "https://github.com/",
    demo: "https://example.com",
  },
] as const;

export interface ExperienceItem {
  company: string;
  position: string;
  period: string;
  description: string;
  tech: readonly string[];
}

export const EXPERIENCE: readonly ExperienceItem[] = [
  {
    company: "Freelance & Contract",
    position: "Full Stack Software Engineer",
    period: "2024 — Present",
    description:
      "Design and deliver production web platforms end to end: system architecture, database modelling, REST APIs, deployment pipelines and polished product interfaces.",
    tech: ["Next.js", "NestJS", "PostgreSQL", "AWS", "Docker"],
  },
  {
    company: "Nexus Software",
    position: "Backend Engineer",
    period: "2023 — 2024",
    description:
      "Built and scaled service APIs, moved a monolith to modular services, cut p95 latency by 62% with caching and query tuning, and hardened auth and access control.",
    tech: ["Node.js", "Express.js", "Redis", "MySQL", "Nginx"],
  },
  {
    company: "Orbit Digital",
    position: "Frontend Engineer",
    period: "2022 — 2023",
    description:
      "Shipped design-system-driven interfaces for client products, improved Lighthouse scores across the board and introduced typed data fetching and testing standards.",
    tech: ["React", "TypeScript", "Tailwind CSS", "React Query"],
  },
] as const;

export interface Certificate {
  title: string;
  provider: string;
  date: string;
}

export const CERTIFICATES: readonly Certificate[] = [
  { title: "AWS Certified Cloud Practitioner", provider: "Amazon Web Services", date: "2025" },
  { title: "Meta Back-End Developer", provider: "Meta / Coursera", date: "2024" },
  { title: "Advanced React & Performance", provider: "Frontend Masters", date: "2024" },
  { title: "Database Design & SQL", provider: "Oracle Academy", date: "2023" },
] as const;

export interface Service {
  title: string;
  description: string;
  icon: "code" | "layers" | "plug" | "database" | "globe" | "sparkles";
}

export const SERVICES: readonly Service[] = [
  {
    title: "Full Stack Development",
    description: "Complete products delivered from the first schema to the deployed release.",
    icon: "code",
  },
  {
    title: "Backend Architecture",
    description: "Service boundaries, auth, caching and infrastructure built to scale calmly.",
    icon: "layers",
  },
  {
    title: "REST APIs",
    description: "Versioned, documented and typed APIs your team can build on with confidence.",
    icon: "plug",
  },
  {
    title: "Database Design",
    description: "Normalised schemas, indexing strategy and migrations that stay predictable.",
    icon: "database",
  },
  {
    title: "Web Applications",
    description: "Secure, fast dashboards and platforms for real business workflows.",
    icon: "globe",
  },
  {
    title: "Modern UI Development",
    description: "Design systems and interfaces with precise motion and accessibility built in.",
    icon: "sparkles",
  },
] as const;
