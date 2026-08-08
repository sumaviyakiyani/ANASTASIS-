import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Code2, Smartphone, Brain, Briefcase, FlaskConical, Cpu, Cloud, Shield, Palette, ArrowRight,
} from "lucide-react";
import { SiteLayout, Section, PageHero } from "@/components/SiteLayout";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services | Anastasis Technologies" },
      { name: "description", content: "Web, mobile, AI, R&D, IT consulting and enterprise software services." },
      { property: "og:title", content: "Services · Anastasis Technologies" },
      { property: "og:description", content: "Research-driven software services." },
    ],
  }),
  component: Services,
});

const services = [
  { icon: Code2, t: "Web Development", d: "Modern web apps with React, Next.js and TanStack, engineered for scale, speed and SEO.", tags: ["React", "TanStack", "Node"] },
  { icon: Smartphone, t: "App Development", d: "iOS, Android and cross-platform apps that feel native and perform beautifully.", tags: ["React Native", "Flutter", "Swift"] },
  { icon: Brain, t: "AI & ML Solutions", d: "Custom models, RAG pipelines, LLM integrations and computer vision at production quality.", tags: ["LLM", "RAG", "Vision"] },
  { icon: Briefcase, t: "IT Consulting", d: "Architecture reviews, technology strategy and CTO-as-a-service for scaling companies.", tags: ["Strategy", "Audit", "Roadmap"] },
  { icon: FlaskConical, t: "Research & Development", d: "Applied research turning cutting-edge papers into working prototypes and IP.", tags: ["R&D", "Prototypes", "IP"] },
  { icon: Cpu, t: "Custom Software", d: "Bespoke platforms tailored to your operations: ERP, dashboards and marketplaces.", tags: ["SaaS", "ERP", "Portals"] },
  { icon: Cloud, t: "Cloud & DevOps", d: "AWS, GCP, Azure infrastructure with CI/CD, observability and cost optimization.", tags: ["AWS", "K8s", "CI/CD"] },
  { icon: Shield, t: "Security Engineering", d: "Threat modeling, pen testing and secure-by-default engineering practices.", tags: ["AppSec", "Audit"] },
  { icon: Palette, t: "Product Design", d: "UX research, design systems and beautiful interfaces that convert.", tags: ["UX", "UI", "Design Systems"] },
];

function Services() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Services"
        title="Full-spectrum software expertise"
        subtitle="From first prototype to global rollout, we handle the whole stack end to end."
      />

      <Section>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div
              key={s.t}
              className="group relative p-8 rounded-3xl bg-card border shadow-card hover:shadow-glow hover:-translate-y-2 transition overflow-hidden"
            >
              <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-brand/10 group-hover:bg-brand/30 transition blur-2xl" />
              <div className="relative">
                <div className="inline-grid place-items-center h-14 w-14 rounded-2xl bg-gradient-brand text-white shadow-glow group-hover:scale-110 transition-transform">
                  <s.icon size={26} />
                </div>
                <h3 className="mt-5 text-xl font-bold">{s.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.d}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {s.tags.map((tag) => (
                    <span key={tag} className="text-xs px-3 py-1 rounded-full bg-accent text-accent-foreground font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-brand text-white px-8 py-4 font-semibold shadow-glow hover:scale-105 transition-transform"
          >
            Discuss your project <ArrowRight size={18} />
          </Link>
        </div>
      </Section>
    </SiteLayout>
  );
}
