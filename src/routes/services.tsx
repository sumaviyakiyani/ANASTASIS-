import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Code2, Smartphone, Brain, Briefcase, FlaskConical, Cpu, Cloud, Shield, Palette, ArrowRight,
} from "lucide-react";
import { SiteLayout, Section, PageHero } from "@/components/SiteLayout";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Anastasis Technologies" },
      { name: "description", content: "Web, mobile, AI, R&D, IT consulting and enterprise software services." },
      { property: "og:title", content: "Services · Anastasis Technologies" },
      { property: "og:description", content: "Research-driven software services." },
    ],
  }),
  component: Services,
});

const services = [
  { icon: Code2, t: "Web Development", d: "Modern web apps with React, Next.js and TanStack, built for scale, speed and SEO.", tags: ["React", "TanStack", "Node"] },
  { icon: Smartphone, t: "App Development", d: "iOS, Android and cross-platform apps that feel native and perform reliably.", tags: ["React Native", "Flutter", "Swift"] },
  { icon: Brain, t: "AI & ML Solutions", d: "Custom models, RAG pipelines, LLM integrations and computer vision built for production use.", tags: ["LLM", "RAG", "Vision"] },
  { icon: Briefcase, t: "IT Consulting", d: "Architecture reviews, technology strategy and CTO support for growing companies.", tags: ["Strategy", "Audit", "Roadmap"] },
  { icon: FlaskConical, t: "Research & Development", d: "Applied research that turns promising ideas into working prototypes and protected IP.", tags: ["R&D", "Prototypes", "IP"] },
  { icon: Cpu, t: "Custom Software", d: "Bespoke platforms tailored to your operations, from ERP tools to marketplaces.", tags: ["SaaS", "ERP", "Portals"] },
  { icon: Cloud, t: "Cloud & DevOps", d: "AWS, GCP and Azure infrastructure with CI/CD, observability and cost control.", tags: ["AWS", "K8s", "CI/CD"] },
  { icon: Shield, t: "Security Engineering", d: "Threat modeling, pen testing and secure-by-default engineering practices.", tags: ["AppSec", "Audit"] },
  { icon: Palette, t: "Product Design", d: "UX research, design systems and interfaces that support conversion and clarity.", tags: ["UX", "UI", "Design Systems"] },
];

function Services() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Services"
        title="Full-spectrum software expertise"
        subtitle="From first prototype to global rollout — we handle the whole stack, end to end."
      />

      <Section>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div
              key={s.t}
              className="group relative overflow-hidden rounded-3xl border bg-card p-6 shadow-card transition hover:-translate-y-2 hover:shadow-glow sm:p-8"
            >
              <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-brand/10 group-hover:bg-brand/30 transition blur-2xl" />
              <div className="relative">
                <div className="inline-grid place-items-center h-14 w-14 rounded-2xl bg-gradient-brand text-white shadow-glow group-hover:scale-110 transition-transform">
                  <s.icon size={26} />
                </div>
                <h3 className="mt-5 text-lg font-bold sm:text-xl">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">{s.d}</p>
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
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-brand px-8 py-4 font-semibold text-white shadow-glow transition-transform hover:scale-105 sm:w-auto"
          >
            Discuss your project <ArrowRight size={18} />
          </Link>
        </div>
      </Section>
    </SiteLayout>
  );
}
