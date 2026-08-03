import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Shield, Sparkles, Zap } from "lucide-react";
import { SiteLayout, Section, PageHero } from "@/components/SiteLayout";

export const Route = createFileRoute("/premium")({
  head: () => ({
    meta: [
      { title: "Premium — Anastasis Technologies" },
      { name: "description", content: "Premium software services and AI products built for next-level growth." },
    ],
  }),
  component: Premium,
});

const benefits = [
  { icon: Shield, title: "Enterprise-grade security", desc: "Architecture and code designed for scale, compliance, and trust." },
  { icon: Zap, title: "Accelerated delivery", desc: "High-velocity product launches backed by strong engineering rhythms." },
  { icon: Sparkles, title: "Premium support", desc: "Dedicated guidance, operations, and optimization for critical solutions." },
];

function Premium() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Premium"
        title="Premium software services for ambitious teams"
        subtitle="From product strategy to polished delivery, we build with the quality and care required for mission-critical initiatives."
      />

      <Section>
        <div className="grid gap-6 md:grid-cols-3">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="rounded-3xl border border-muted/20 bg-white/80 p-8 shadow-sm transition hover:shadow-glow">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-brand text-white shadow-glow">
                <benefit.icon size={24} />
              </div>
              <h2 className="mt-6 text-xl font-semibold text-ink">{benefit.title}</h2>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{benefit.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-8 py-4 text-sm font-semibold text-white shadow-glow hover:scale-105 transition-transform"
          >
            Explore premium support <ArrowRight size={18} />
          </Link>
        </div>
      </Section>
    </SiteLayout>
  );
}
