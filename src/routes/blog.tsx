import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  Building2,
  Calendar,
  Clock,
  Compass,
  Cpu,
  FlaskConical,
  Handshake,
  Lightbulb,
  LineChart,
  Newspaper,
  Rocket,
  ScrollText,
  Sparkles,
  Users2,
} from "lucide-react";
import { SiteLayout, Section, PageHero } from "@/components/SiteLayout";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Insights — Portfolio, Research, Partnerships & Trends | Anastasis" },
      {
        name: "description",
        content:
          "Project portfolio and innovation, industry insights, research updates, strategic partnerships, future collaborations and technology statistics.",
      },
      { property: "og:title", content: "Insights · Anastasis Technologies" },
      {
        property: "og:description",
        content: "Project portfolio, research, partnerships and technology statistics from our team.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Insights · Anastasis Technologies" },
      { name: "twitter:description", content: "Portfolio, research, partnerships and trends." },
    ],
  }),
  component: Insights,
});

const news = [
  {
    icon: Newspaper,
    tag: "Company News",
    title: "New research and delivery hub opens in Islamabad",
    date: "Jul 28, 2026",
    read: "3 min",
    body: "A dedicated lab space for automation and applied AI work, doubling our delivery capacity for enterprise programs.",
  },
  {
    icon: Lightbulb,
    tag: "Innovation Update",
    title: "Autonomous delivery pipeline reaches production maturity",
    date: "Jul 09, 2026",
    read: "5 min",
    body: "Our internal loop now plans, builds, tests and ships increments with human review only at decision gates.",
  },
  {
    icon: ScrollText,
    tag: "Research Article",
    title: "Recursion in production ML pipelines",
    date: "Jun 10, 2026",
    read: "6 min",
    body: "Practical patterns and trade-offs for self-referential training loops that stay observable and safe.",
  },
];

/* ── Project portfolio & innovation (moved from Portfolio page) ── */
type Cat = "All" | "Web" | "App" | "AI" | "R&D" | "Automation";
type Status = "Completed" | "Ongoing";

type Project = {
  title: string;
  cat: Exclude<Cat, "All">;
  status: Status;
  desc: string;
  tech: string[];
  tone: string;
  progress?: number;
};

const projects: Project[] = [
  {
    title: "NexoraOS Platform",
    cat: "Web",
    status: "Completed",
    desc: "SaaS operations platform for logistics teams with live fleet tracking.",
    tech: ["React", "TypeScript", "PostgreSQL", "Tailwind"],
    tone: "from-emerald-500 to-green-800",
  },
  {
    title: "BioTrace Mobile",
    cat: "App",
    status: "Completed",
    desc: "Offline-first field health data capture app for rural clinics.",
    tech: ["React Native", "SQLite", "Node.js"],
    tone: "from-green-400 to-emerald-700",
  },
  {
    title: "Helix RAG Engine",
    cat: "AI",
    status: "Ongoing",
    progress: 72,
    desc: "Enterprise retrieval engine reasoning over 2M internal documents.",
    tech: ["Python", "pgvector", "LangChain", "FastAPI"],
    tone: "from-lime-500 to-green-700",
  },
  {
    title: "Orbital Dashboard",
    cat: "Web",
    status: "Completed",
    desc: "Real-time telemetry visualization for satellite ground stations.",
    tech: ["React", "WebSockets", "D3.js"],
    tone: "from-emerald-600 to-green-900",
  },
  {
    title: "Quanta Vision",
    cat: "AI",
    status: "Ongoing",
    progress: 45,
    desc: "Computer-vision quality assurance for high-throughput factories.",
    tech: ["PyTorch", "ONNX", "Edge TPU"],
    tone: "from-green-500 to-emerald-800",
  },
  {
    title: "Recursion Lab",
    cat: "R&D",
    status: "Ongoing",
    progress: 30,
    desc: "Applied recursion research prototype for self-improving pipelines.",
    tech: ["Rust", "WASM", "Python"],
    tone: "from-emerald-400 to-lime-700",
  },
  {
    title: "AxisOne Wallet",
    cat: "App",
    status: "Completed",
    desc: "Multi-chain crypto wallet with hardware key support.",
    tech: ["React Native", "ethers.js", "Secure Enclave"],
    tone: "from-green-600 to-emerald-900",
  },
  {
    title: "Revive Learn",
    cat: "Web",
    status: "Completed",
    desc: "Adaptive learning platform with AI-generated assessments.",
    tech: ["Next.js", "Supabase", "OpenAI"],
    tone: "from-lime-400 to-green-700",
  },
  {
    title: "FlowForge Automation",
    cat: "Automation",
    status: "Ongoing",
    progress: 58,
    desc: "Zero-headcount back-office automation suite for finance teams.",
    tech: ["TypeScript", "Temporal", "Postgres"],
    tone: "from-emerald-500 to-green-700",
  },
];

const cats: Cat[] = ["All", "Web", "App", "AI", "R&D", "Automation"];

const industryInsights = [
  {
    icon: LineChart,
    sector: "Logistics",
    title: "Real-time visibility is now the baseline",
    body: "Operators expect live telemetry and predictive ETAs before they will retire manual dispatch tooling.",
  },
  {
    icon: FlaskConical,
    sector: "Healthcare",
    title: "Offline-first beats cloud-first in the field",
    body: "Rural data capture succeeds only when sync failures are treated as the normal case, not an exception.",
  },
  {
    icon: Cpu,
    sector: "Manufacturing",
    title: "Inspection moves to the edge",
    body: "On-device inference removes the latency and bandwidth costs that stalled earlier vision programs.",
  },
];

const research = [
  {
    icon: FlaskConical,
    title: "Recursive delivery loops",
    body: "Self-improving pipelines that plan, build and evaluate increments with human gates at decisions only.",
  },
  {
    icon: Sparkles,
    title: "Retrieval quality research",
    body: "Evaluation harnesses that treat retrieval accuracy as the primary driver of production answer quality.",
  },
  {
    icon: Cpu,
    title: "Small specialised models",
    body: "Task-tuned compact models delivering enterprise accuracy at a fraction of inference cost.",
  },
];

const partnerships = [
  {
    icon: Handshake,
    title: "Strategic Partnerships",
    body: "Long-term engineering alliances with cloud, data and security vendors that back our delivery stack.",
    items: ["Cloud infrastructure partners", "Data platform vendors", "Security & compliance advisors"],
  },
  {
    icon: Users2,
    title: "Future Partners",
    body: "We are actively opening conversations with organisations that want automation-first delivery.",
    items: ["Health & bio-research groups", "Logistics and supply chain", "Public sector innovation units"],
  },
  {
    icon: Building2,
    title: "Collaboration Opportunities",
    body: "Joint R&D, co-funded prototypes and shared-IP programs for teams solving hard problems.",
    items: ["Joint research programs", "Co-developed products", "University collaborations"],
  },
];

const futureCollaborations = [
  { title: "University research labs", body: "Co-supervised applied research with shared publication rights." },
  { title: "Industry pilot programs", body: "Co-funded prototypes that graduate into production contracts." },
  { title: "Open-source tooling", body: "Shared evaluation and automation tooling maintained in public." },
  { title: "Public sector innovation", body: "Modernisation programs for legacy civic systems." },
];

const techStats = [
  { value: "40+", label: "Technologies in production" },
  { value: "2M+", label: "Documents indexed for retrieval" },
  { value: "99.9%", label: "Platform uptime across programs" },
  { value: "6", label: "Active research tracks" },
];

const contracts = [
  {
    client: "Enterprise Logistics Group",
    scope: "Operations platform · multi-year",
    model: "Retainer + delivery milestones",
    status: "Active",
  },
  {
    client: "Regional Health Network",
    scope: "Field data capture rollout",
    model: "Fixed-scope program",
    status: "Active",
  },
  {
    client: "Industrial Manufacturing Client",
    scope: "Computer-vision QA deployment",
    model: "Pilot → scale agreement",
    status: "Pilot",
  },
  {
    client: "Financial Services Firm",
    scope: "Back-office automation suite",
    model: "Managed automation contract",
    status: "In review",
  },
];

const roadmap = [
  { period: "2026 · H2", title: "Automation platform GA", body: "Open our internal delivery loop to client teams." },
  { period: "2027 · H1", title: "Applied research unit", body: "Dedicated group turning papers into shippable products." },
  { period: "2027 · H2", title: "Regional expansion", body: "Delivery presence across two additional markets." },
  { period: "2028", title: "Revival programs", body: "Rebuild legacy industry systems with automation-first design." },
];

const trends = [
  { title: "Agentic workflows replace ticket queues", cat: "Technology Trend" },
  { title: "Small specialised models beat general giants on cost", cat: "AI Research" },
  { title: "Retrieval quality is the new model quality", cat: "AI Research" },
  { title: "Compliance-by-default architectures", cat: "Technology Trend" },
  { title: "Edge inference for real-time industry QA", cat: "Technology Trend" },
  { title: "Evaluation harnesses as first-class product code", cat: "AI Research" },
];

function Insights() {
  const [featured, ...rest] = news;
  const [active, setActive] = useState<Cat>("All");
  const filtered = projects.filter((p) => active === "All" || p.cat === active);

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Insights"
        title="Company news, research and partnerships"
        subtitle="Business updates, innovation notes, partner programs and the roadmap shaping where we go next."
      />

      {/* Featured news + research */}
      <Section className="pt-12 md:pt-16">
        <article className="grid lg:grid-cols-2 gap-8 items-center rounded-3xl overflow-hidden bg-card shadow-elegant hover:shadow-glow transition group">
          <div className="aspect-[4/3] lg:aspect-auto lg:h-full bg-gradient-to-br from-emerald-500 to-green-800 relative">
            <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_20%,white,transparent_60%)]" />
            <div className="absolute top-6 left-6 glass-dark text-ink text-xs px-3 py-1 rounded-full font-semibold">
              Featured · {featured.tag}
            </div>
          </div>
          <div className="p-10">
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar size={14} /> {featured.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={14} /> {featured.read}
              </span>
            </div>
            <h2 className="mt-4 text-3xl md:text-4xl font-bold group-hover:text-brand transition">{featured.title}</h2>
            <p className="mt-4 text-muted-foreground">{featured.body}</p>
            <Link
              to="/contact"
              className="mt-6 inline-flex items-center gap-2 font-semibold text-brand hover:gap-3 transition-all"
            >
              Talk to our team <ArrowRight size={18} />
            </Link>
          </div>
        </article>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {rest.map((n) => (
            <article
              key={n.title}
              className="group rounded-3xl bg-card border shadow-card p-7 hover:shadow-glow hover:-translate-y-1 transition"
            >
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand/12 text-brand-dark">
                <n.icon size={18} />
              </span>
              <span className="mt-4 inline-block rounded-full border border-brand/20 bg-brand/8 px-3 py-1 text-xs font-semibold text-brand-dark">
                {n.tag}
              </span>
              <h3 className="mt-3 text-xl font-bold group-hover:text-brand transition">{n.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{n.body}</p>
              <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar size={14} /> {n.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={14} /> {n.read}
                </span>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* Project Portfolio & Innovation (moved from Portfolio) */}
      <Section className="pt-0">
        <h2 className="text-3xl md:text-4xl font-bold text-center">Project Portfolio &amp; Innovation</h2>
        <h3 className="mt-8 text-2xl md:text-3xl font-bold text-center">Project categories</h3>
        <div className="flex flex-wrap justify-center gap-2 mt-8 mb-10">
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
            <article
              key={p.title}
              className="group rounded-3xl overflow-hidden bg-card border shadow-card hover:shadow-glow hover:-translate-y-1 transition"
            >
              <div className={`aspect-[4/3] bg-gradient-to-br ${p.tone} relative`}>
                <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_20%,white,transparent_60%)]" />
                <div className="absolute top-4 left-4 glass-dark text-ink text-xs px-3 py-1 rounded-full font-semibold">
                  {p.cat}
                </div>
                <div
                  className={`absolute top-4 right-4 text-xs px-3 py-1 rounded-full font-semibold ${
                    p.status === "Completed" ? "bg-white/85 text-brand-dark" : "bg-ink/80 text-white"
                  }`}
                >
                  {p.status}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold group-hover:text-brand transition">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>

                {p.status === "Ongoing" && typeof p.progress === "number" && (
                  <div className="mt-4">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Progress</span>
                      <span>{p.progress}%</span>
                    </div>
                    <div className="mt-1.5 h-1.5 w-full rounded-full bg-muted overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-brand" style={{ width: `${p.progress}%` }} />
                    </div>
                  </div>
                )}

                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-brand/20 bg-brand/8 px-3 py-1 text-xs font-medium text-brand-dark"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* Industry insights */}
      <Section className="pt-0">
        <h2 className="text-3xl md:text-4xl font-bold text-center">Industry insights</h2>
        <p className="mt-4 text-center text-muted-foreground max-w-2xl mx-auto">
          What we are seeing across the sectors we build in.
        </p>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {industryInsights.map((i) => (
            <article key={i.title} className="rounded-3xl bg-card border shadow-card p-7 hover:shadow-glow transition">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand/12 text-brand-dark">
                <i.icon size={20} />
              </span>
              <span className="mt-4 inline-block rounded-full border border-brand/20 bg-brand/8 px-3 py-1 text-xs font-semibold text-brand-dark">
                {i.sector}
              </span>
              <h3 className="mt-3 text-xl font-bold">{i.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{i.body}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* Research & innovation */}
      <Section className="pt-0">
        <h2 className="text-3xl md:text-4xl font-bold text-center">Research &amp; innovation</h2>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {research.map((r) => (
            <div key={r.title} className="rounded-3xl bg-card border shadow-card p-7 hover:shadow-glow transition">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-brand text-white shadow-glow">
                <r.icon size={20} />
              </span>
              <h3 className="mt-5 text-xl font-bold">{r.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{r.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Partnerships */}
      <Section className="pt-0">
        <h2 className="text-3xl md:text-4xl font-bold text-center">Strategic partnerships</h2>
        <p className="mt-4 text-center text-muted-foreground max-w-2xl mx-auto">
          How we work with vendors, research groups and future partners to deliver at scale.
        </p>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {partnerships.map((p) => (
            <div key={p.title} className="rounded-3xl bg-card border shadow-card p-7 hover:shadow-glow transition">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-brand text-white shadow-glow">
                <p.icon size={20} />
              </span>
              <h3 className="mt-5 text-xl font-bold">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.body}</p>
              <ul className="mt-4 space-y-2 text-sm">
                {p.items.map((i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                    <span className="text-ink/80">{i}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* Future collaborations */}
      <Section className="pt-0">
        <h2 className="text-3xl md:text-4xl font-bold text-center">Future collaborations</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {futureCollaborations.map((f) => (
            <div key={f.title} className="rounded-3xl bg-card border shadow-card p-6 hover:shadow-glow transition">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand/12 text-brand-dark">
                <Handshake size={18} />
              </span>
              <h3 className="mt-4 text-lg font-bold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Technology statistics */}
      <Section className="pt-0">
        <h2 className="text-3xl md:text-4xl font-bold text-center">Technology statistics</h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {techStats.map((s) => (
            <div key={s.label} className="rounded-3xl border bg-card shadow-card p-7 text-center hover:shadow-glow transition">
              <span className="block text-4xl font-bold text-gradient-brand">{s.value}</span>
              <span className="mt-2 block text-sm text-muted-foreground">{s.label}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Client contracts */}
      <Section className="pt-0">
        <h2 className="text-3xl md:text-4xl font-bold text-center">Client contracts</h2>
        <p className="mt-4 text-center text-muted-foreground max-w-2xl mx-auto">
          Sample engagement structures from our current portfolio — client names are anonymised.
        </p>
        <div className="mt-10 overflow-x-auto rounded-3xl border bg-card shadow-card">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-brand/8 text-brand-dark">
              <tr>
                <th className="px-6 py-4 font-semibold">Client</th>
                <th className="px-6 py-4 font-semibold">Scope</th>
                <th className="px-6 py-4 font-semibold">Engagement model</th>
                <th className="px-6 py-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {contracts.map((c) => (
                <tr key={c.client} className="border-t">
                  <td className="px-6 py-4 font-semibold text-ink">{c.client}</td>
                  <td className="px-6 py-4 text-muted-foreground">{c.scope}</td>
                  <td className="px-6 py-4 text-muted-foreground">{c.model}</td>
                  <td className="px-6 py-4">
                    <span className="rounded-full border border-brand/20 bg-brand/8 px-3 py-1 text-xs font-semibold text-brand-dark">
                      {c.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Vision + roadmap */}
      <Section className="pt-0">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-3xl bg-card border shadow-card p-8">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-brand text-white shadow-glow">
              <Compass size={20} />
            </span>
            <h2 className="mt-5 text-3xl font-bold">Company vision</h2>
            <p className="mt-4 text-muted-foreground">
              Build software that rebuilds industries — research-led, automation-first and delivered by small teams
              with outsized leverage. Every engagement should leave the client with systems that keep improving after
              we hand them over.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Research", "Innovation", "Recursion", "Revival", "Impact"].map((v) => (
                <span
                  key={v}
                  className="rounded-full border border-brand/20 bg-brand/8 px-3 py-1 text-xs font-semibold text-brand-dark"
                >
                  {v}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-card border shadow-card p-8">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand/12 text-brand-dark">
              <Rocket size={20} />
            </span>
            <h2 className="mt-5 text-3xl font-bold">Future roadmap</h2>
            <ol className="mt-6 space-y-6 border-l border-brand/20 pl-6">
              {roadmap.map((r) => (
                <li key={r.period} className="relative">
                  <span className="absolute -left-[1.9rem] top-1.5 h-3 w-3 rounded-full bg-gradient-brand shadow-glow" />
                  <span className="text-xs font-semibold uppercase tracking-widest text-brand-dark">{r.period}</span>
                  <h3 className="mt-1 text-lg font-bold">{r.title}</h3>
                  <p className="text-sm text-muted-foreground">{r.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      {/* Trends + AI blogs */}
      <Section className="pt-0">
        <h2 className="text-3xl md:text-4xl font-bold text-center">Technology trends &amp; AI research</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {trends.map((t) => (
            <article
              key={t.title}
              className="group rounded-3xl bg-card border shadow-card p-6 hover:shadow-glow hover:-translate-y-1 transition"
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand/12 text-brand-dark">
                <LineChart size={16} />
              </span>
              <span className="mt-4 inline-block rounded-full border border-brand/20 bg-brand/8 px-3 py-1 text-xs font-semibold text-brand-dark">
                {t.cat}
              </span>
              <h3 className="mt-3 text-lg font-bold group-hover:text-brand transition">{t.title}</h3>
              <Link to="/contact" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand">
                Discuss this <ArrowRight size={14} />
              </Link>
            </article>
          ))}
        </div>
      </Section>
    </SiteLayout>
  );
}
