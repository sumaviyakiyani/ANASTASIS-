import { createFileRoute } from "@tanstack/react-router";
import { Target, Eye, Heart, Rocket, Lightbulb, Users, Award, Sparkles } from "lucide-react";
import { SiteLayout, Section, PageHero } from "@/components/SiteLayout";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Anastasis Technologies" },
      { name: "description", content: "Our mission, team, timeline and values driving research-led software." },
      { property: "og:title", content: "About Anastasis Technologies" },
      { property: "og:description", content: "A senior engineering team building research-driven products." },
    ],
  }),
  component: About,
});

const team = [
  { name: "Dr. Ayan Malik", role: "Founder & CEO", tone: "from-emerald-500 to-green-700" },
  { name: "Sana Rehman", role: "Head of Engineering", tone: "from-green-500 to-emerald-800" },
  { name: "Bilal Qureshi", role: "AI Research Lead", tone: "from-lime-500 to-green-700" },
  { name: "Zara Ahmed", role: "Product Design Lead", tone: "from-emerald-400 to-green-600" },
];

const timeline = [
  { year: "2018", title: "Founded", desc: "Anastasis was born from a research lab with a mission to revive impact through software." },
  { year: "2020", title: "First 25 clients", desc: "Delivered platforms across health, education and fintech." },
  { year: "2022", title: "AI division launched", desc: "Dedicated ML/LLM practice serving global teams." },
  { year: "2024", title: "Global expansion", desc: "Opened partnerships across 3 continents." },
  { year: "2026", title: "R&D Lab v2", desc: "Anastasis Research Lab launches applied recursion & bio-tech tooling." },
];

const values = [
  { icon: Lightbulb, t: "Curiosity", d: "We ask the second question." },
  { icon: Rocket, t: "Momentum", d: "Ship weekly, learn faster." },
  { icon: Heart, t: "Care", d: "Users, teammates, code — treated with respect." },
  { icon: Award, t: "Craft", d: "Beautiful, resilient engineering." },
];

function About() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="About us"
        title="We revive ideas with technology"
        subtitle="Anastasis (Greek: resurrection) — we bring dormant potential back to life through research, code and craft."
      />

      <Section>
        <div className="grid md:grid-cols-2 gap-8">
          {[
            { icon: Target, t: "Our Mission", d: "To engineer software that solves meaningful problems — from bench research to global-scale platforms." },
            { icon: Eye, t: "Our Vision", d: "A world where every ambitious idea has a technology partner that can ship it responsibly." },
          ].map((b) => (
            <div key={b.t} className="p-10 rounded-3xl neu-card group hover:shadow-glow transition">
              <div className="grid place-items-center h-16 w-16 rounded-2xl bg-gradient-brand text-white shadow-glow group-hover:scale-110 transition-transform">
                <b.icon size={28} />
              </div>
              <h3 className="mt-6 text-2xl font-bold">{b.t}</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">{b.d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Team */}
      <Section className="bg-muted/40">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-semibold tracking-widest uppercase text-brand">The people</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold">
            Small team, <span className="text-gradient-brand">senior craft</span>
          </h2>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((m) => (
            <div key={m.name} className="group rounded-3xl bg-card p-6 shadow-card hover:shadow-glow hover:-translate-y-2 transition">
              <div className={`aspect-square rounded-2xl bg-gradient-to-br ${m.tone} grid place-items-center text-white text-5xl font-bold shadow-glow group-hover:scale-[1.02] transition-transform`}>
                {m.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
              </div>
              <h3 className="mt-5 text-lg font-bold">{m.name}</h3>
              <p className="text-sm text-brand">{m.role}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Timeline */}
      <Section>
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-semibold tracking-widest uppercase text-brand">Our journey</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold">A story of <span className="text-gradient-brand">recursion</span></h2>
        </div>
        <div className="mt-14 relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand via-brand-dark to-transparent md:-translate-x-1/2" />
          <div className="space-y-10">
            {timeline.map((t, i) => (
              <div key={t.year} className={`relative flex flex-col md:flex-row items-start gap-6 md:gap-10 ${i % 2 ? "md:flex-row-reverse" : ""}`}>
                <div className="absolute left-4 md:left-1/2 h-4 w-4 rounded-full bg-gradient-brand shadow-glow md:-translate-x-1/2 mt-2" />
                <div className="md:w-1/2 pl-12 md:pl-0 md:px-10">
                  <div className="glass p-6 rounded-2xl shadow-card hover:shadow-glow transition">
                    <div className="text-brand font-bold text-2xl">{t.year}</div>
                    <div className="mt-1 text-lg font-semibold">{t.title}</div>
                    <p className="mt-2 text-sm text-muted-foreground">{t.desc}</p>
                  </div>
                </div>
                <div className="hidden md:block md:w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Values */}
      <Section className="bg-gradient-dark text-ink relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial opacity-40" />
        <div className="relative text-center max-w-2xl mx-auto">
          <span className="text-xs font-semibold tracking-widest uppercase text-brand-glow">Core values</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold">What guides <span className="text-gradient-brand">every decision</span></h2>
        </div>
        <div className="relative mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <div key={v.t} className="glass-dark p-8 rounded-3xl hover:bg-brand/10 hover:-translate-y-1 transition">
              <div className="grid place-items-center h-14 w-14 rounded-2xl bg-gradient-brand shadow-glow">
                <v.icon size={24} />
              </div>
              <h3 className="mt-5 text-xl font-bold">{v.t}</h3>
              <p className="mt-2 text-sm text-ink/70">{v.d}</p>
            </div>
          ))}
        </div>
      </Section>
    </SiteLayout>
  );
}
