import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { SiteLayout, Section, PageHero } from "@/components/SiteLayout";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Insights — Anastasis Technologies" },
      { name: "description", content: "Articles on AI, engineering, research and product strategy." },
      { property: "og:title", content: "Insights · Anastasis Technologies" },
      { property: "og:description", content: "Ideas from our engineering and research team." },
    ],
  }),
  component: Blog,
});

const posts = [
  { title: "Recursion in production ML pipelines", date: "Jun 10, 2026", read: "6 min", cat: "AI", tone: "from-emerald-500 to-green-800" },
  { title: "Why we bet on TanStack for enterprise UI", date: "May 22, 2026", read: "4 min", cat: "Engineering", tone: "from-green-500 to-emerald-700" },
  { title: "R&D as a service: turning papers into products", date: "Apr 30, 2026", read: "8 min", cat: "Research", tone: "from-lime-500 to-green-700" },
  { title: "Designing for reliability, not just aesthetics", date: "Apr 12, 2026", read: "5 min", cat: "Design", tone: "from-emerald-600 to-green-900" },
  { title: "The revival economy — software that rebuilds industries", date: "Mar 18, 2026", read: "7 min", cat: "Strategy", tone: "from-green-600 to-emerald-800" },
  { title: "Building safe LLM agents for enterprise", date: "Feb 27, 2026", read: "9 min", cat: "AI", tone: "from-lime-400 to-green-700" },
];

function Blog() {
  const [featured, ...rest] = posts;

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Insights"
        title="Ideas from the lab"
        subtitle="Field notes on research, engineering, AI and building software that matters."
      />

      <Section>
        {/* Featured */}
        <article className="grid lg:grid-cols-2 gap-8 items-center rounded-3xl overflow-hidden bg-card shadow-elegant hover:shadow-glow transition group">
          <div className={`aspect-[4/3] lg:aspect-auto lg:h-full bg-gradient-to-br ${featured.tone} relative`}>
            <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_20%,white,transparent_60%)]" />
            <div className="absolute top-6 left-6 glass-dark text-ink text-xs px-3 py-1 rounded-full font-semibold">
              Featured · {featured.cat}
            </div>
          </div>
          <div className="p-10">
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Calendar size={14} /> {featured.date}</span>
              <span className="flex items-center gap-1"><Clock size={14} /> {featured.read}</span>
            </div>
            <h2 className="mt-4 text-3xl md:text-4xl font-bold group-hover:text-brand transition">{featured.title}</h2>
            <p className="mt-4 text-muted-foreground">
              A deep look at how we approach the topic — practical patterns, trade-offs, and what
              worked when we shipped it to production teams.
            </p>
            <Link
              to="/blog"
              className="mt-6 inline-flex items-center gap-2 font-semibold text-brand hover:gap-3 transition-all"
            >
              Read article <ArrowRight size={18} />
            </Link>
          </div>
        </article>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((p) => (
            <article
              key={p.title}
              className="group rounded-3xl overflow-hidden bg-card border shadow-card hover:shadow-glow hover:-translate-y-2 transition"
            >
              <div className={`aspect-video bg-gradient-to-br ${p.tone} relative`}>
                <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_20%,white,transparent_60%)]" />
                <div className="absolute top-4 left-4 glass-dark text-ink text-xs px-3 py-1 rounded-full font-semibold">
                  {p.cat}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Calendar size={14} /> {p.date}</span>
                  <span className="flex items-center gap-1"><Clock size={14} /> {p.read}</span>
                </div>
                <h3 className="mt-3 text-lg font-bold group-hover:text-brand transition">{p.title}</h3>
                <Link to="/blog" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand">
                  Read more <ArrowRight size={14} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Section>
    </SiteLayout>
  );
}
