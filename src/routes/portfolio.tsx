import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { SiteLayout, Section, PageHero } from "@/components/SiteLayout";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio — Anastasis Technologies" },
      { name: "description", content: "Selected client work: web, mobile, AI and R&D projects." },
      { property: "og:title", content: "Portfolio · Anastasis Technologies" },
      { property: "og:description", content: "Selected work from our engineering studio." },
    ],
  }),
  component: Portfolio,
});

type Cat = "All" | "Web" | "App" | "AI" | "R&D";

const projects: { title: string; cat: Exclude<Cat, "All">; desc: string; tone: string }[] = [
  { title: "NexoraOS Platform", cat: "Web", desc: "SaaS ops platform for logistics teams.", tone: "from-emerald-500 to-green-800" },
  { title: "BioTrace Mobile", cat: "App", desc: "Field health data capture app.", tone: "from-green-400 to-emerald-700" },
  { title: "Helix RAG Engine", cat: "AI", desc: "Enterprise RAG over 2M docs.", tone: "from-lime-500 to-green-700" },
  { title: "Orbital Dashboard", cat: "Web", desc: "Real-time telemetry visualization.", tone: "from-emerald-600 to-green-900" },
  { title: "Quanta Vision", cat: "AI", desc: "Computer vision QA for factories.", tone: "from-green-500 to-emerald-800" },
  { title: "Recursion Lab", cat: "R&D", desc: "Applied recursion research prototype.", tone: "from-emerald-400 to-lime-700" },
  { title: "AxisOne Wallet", cat: "App", desc: "Multi-chain crypto wallet.", tone: "from-green-600 to-emerald-900" },
  { title: "Revive Learn", cat: "Web", desc: "AI-powered learning platform.", tone: "from-lime-400 to-green-700" },
  { title: "Genome Insights", cat: "R&D", desc: "Bio-data analysis pipeline.", tone: "from-emerald-500 to-green-800" },
];

const cats: Cat[] = ["All", "Web", "App", "AI", "R&D"];

function Portfolio() {
  const [active, setActive] = useState<Cat>("All");
  const filtered = projects.filter((p) => active === "All" || p.cat === active);

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Portfolio"
        title="Work that ships and scales"
        subtitle="A selection of platforms, apps and research projects we've built with our clients."
      />

      <Section>
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition ${
                active === c
                  ? "bg-gradient-brand text-white shadow-glow"
                  : "bg-muted text-muted-foreground hover:bg-accent"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <div
              key={p.title}
              className="group relative rounded-3xl overflow-hidden shadow-card hover:shadow-glow transition"
            >
              <div className={`aspect-[4/3] bg-gradient-to-br ${p.tone} relative`}>
                <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_20%,white,transparent_60%)]" />
                <div className="absolute top-4 left-4 glass-dark text-ink text-xs px-3 py-1 rounded-full font-semibold">
                  {p.cat}
                </div>
                <div className="absolute inset-0 bg-ink/80 opacity-0 group-hover:opacity-100 transition flex flex-col justify-end p-6 text-white">
                  <h3 className="text-2xl font-bold">{p.title}</h3>
                  <p className="mt-2 text-ink/80 text-sm">{p.desc}</p>
                  <div className="mt-4 inline-flex items-center gap-2 text-brand-glow font-semibold">
                    View case study <ExternalLink size={16} />
                  </div>
                </div>
              </div>
              <div className="p-5 bg-card group-hover:hidden">
                <h3 className="text-lg font-bold">{p.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </SiteLayout>
  );
}
