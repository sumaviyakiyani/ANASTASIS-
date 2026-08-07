import { createFileRoute } from "@tanstack/react-router";
import { Award, CheckCircle2, Loader2, Quote, Star, TrendingUp, Trophy, Users } from "lucide-react";
import { SiteLayout, Section, PageHero } from "@/components/SiteLayout";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio — Projects, Teams, Clients and Achievements | Anastasis" },
      {
        name: "description",
        content:
          "Company projects, the team behind every delivery, client showcase, success stories and achievements from Anastasis Technologies.",
      },
      { property: "og:title", content: "Portfolio · Anastasis Technologies" },
      {
        property: "og:description",
        content: "Company projects, teams, clients, success stories and achievements.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Portfolio · Anastasis Technologies" },
      { name: "twitter:description", content: "Company projects, teams, clients and achievements." },
    ],
  }),
  component: Portfolio,
});

type Status = "Completed" | "Ongoing";

const projects: { title: string; status: Status; desc: string; tone: string }[] = [
  {
    title: "NexoraOS Platform",
    status: "Completed",
    desc: "SaaS operations platform for logistics teams with live fleet tracking and operations insight.",
    tone: "from-emerald-500 to-green-800",
  },
  {
    title: "BioTrace Mobile",
    status: "Completed",
    desc: "Offline-first field health data capture app for rural clinics and outreach teams.",
    tone: "from-green-400 to-emerald-700",
  },
  {
    title: "Helix RAG Engine",
    status: "Ongoing",
    desc: "Enterprise retrieval engine that reasons over 2M internal documents.",
    tone: "from-lime-500 to-green-700",
  },
  {
    title: "Orbital Dashboard",
    status: "Completed",
    desc: "Real-time telemetry visualization for satellite ground stations and operators.",
    tone: "from-emerald-600 to-green-900",
  },
  {
    title: "Quanta Vision",
    status: "Ongoing",
    desc: "Computer-vision quality assurance for high-throughput factory operations.",
    tone: "from-green-500 to-emerald-800",
  },
  {
    title: "FlowForge Automation",
    status: "Ongoing",
    desc: "Back-office automation suite for finance teams that reduces manual effort.",
    tone: "from-emerald-500 to-green-700",
  },
];

const team = [
  { name: "Ayesha Karim", role: "Head of Engineering", focus: "Platform & Cloud" },
  { name: "Hamza Iqbal", role: "AI Research Lead", focus: "LLMs & Vision" },
  { name: "Sara Malik", role: "Product Designer", focus: "Design Systems" },
  { name: "Bilal Ahmed", role: "Automation Architect", focus: "Workflow Engines" },
  { name: "Noor Fatima", role: "Data Engineer", focus: "Pipelines & Analytics" },
  { name: "Usman Raza", role: "Delivery Manager", focus: "Client Programs" },
];

const clients = [
  { name: "Enterprise Logistics Group", sector: "Logistics" },
  { name: "Regional Health Network", sector: "Healthcare" },
  { name: "Industrial Manufacturing Co.", sector: "Manufacturing" },
  { name: "Financial Services Firm", sector: "Finance" },
  { name: "National Education Trust", sector: "Education" },
  { name: "Public Innovation Unit", sector: "Public Sector" },
];

const stories = [
  {
    client: "Enterprise Logistics Group",
    result: "38% faster dispatch cycles",
    body: "Replaced manual routing with an automated operations platform and live fleet telemetry.",
    quote: "Delivery velocity we could not reach with a much larger in-house team.",
  },
  {
    client: "Regional Health Network",
    result: "12,000+ field records / month",
    body: "Offline-first capture rolled out across rural clinics with zero data loss during outages.",
    quote: "Our field teams finally trust the data they collect.",
  },
  {
    client: "Industrial Manufacturing Co.",
    result: "92% defect detection accuracy",
    body: "Edge computer-vision QA deployed on the production line with real-time alerts.",
    quote: "Pilot to production in a single quarter.",
  },
];

const achievements = [
  { icon: Trophy, title: "Automation-first delivery model", body: "Recognised for shipping enterprise programs with lean teams." },
  { icon: Award, title: "Applied research published", body: "Recursion and retrieval patterns shared with the wider community." },
  { icon: TrendingUp, title: "100% program continuity", body: "Every active client engagement renewed or expanded." },
  { icon: Star, title: "Client satisfaction 4.9 / 5", body: "Measured across delivery, communication and outcomes." },
];

function Portfolio() {
  const completed = projects.filter((p) => p.status === "Completed").length;
  const ongoing = projects.filter((p) => p.status === "Ongoing").length;

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Portfolio"
        title="Company projects that ship and scale"
        subtitle="The projects we deliver, the team behind them, the clients we serve and the outcomes we are proud of."
      />

      <Section className="pt-12 md:pt-16">
        <div className="grid gap-5 sm:grid-cols-3">
          {[
            { icon: CheckCircle2, label: "Completed projects", value: completed },
            { icon: Loader2, label: "Ongoing projects", value: ongoing },
            { icon: Users, label: "Team members", value: team.length },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="rounded-3xl bg-card border shadow-card p-6 flex items-center gap-4">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand/12 text-brand-dark">
                <Icon size={20} />
              </span>
              <span>
                <span className="block text-3xl font-bold text-ink">{value}</span>
                <span className="block text-sm text-muted-foreground">{label}</span>
              </span>
            </div>
          ))}
        </div>
      </Section>

      {/* Company projects */}
      <Section className="pt-0">
        <h2 className="text-3xl md:text-4xl font-bold text-center">Company projects</h2>
        <p className="mt-4 text-center text-muted-foreground max-w-2xl mx-auto">
          Platforms, apps, automation and research work delivered by our teams.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <article
              key={p.title}
              className="group rounded-3xl overflow-hidden bg-card border shadow-card hover:shadow-glow hover:-translate-y-1 transition"
            >
              <div className={`aspect-[4/3] bg-gradient-to-br ${p.tone} relative`}>
                <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_20%,white,transparent_60%)]" />
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
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* Team */}
      <Section className="pt-0">
        <h2 className="text-3xl md:text-4xl font-bold text-center">Team members</h2>
        <p className="mt-4 text-center text-muted-foreground max-w-2xl mx-auto">
          The engineers, researchers and designers delivering every project in this portfolio.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((m) => (
            <div
              key={m.name}
              className="rounded-3xl bg-card border shadow-card p-6 hover:shadow-glow transition text-center"
            >
              <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gradient-brand text-white text-xl font-bold shadow-glow">
                {m.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
              <h3 className="mt-4 text-lg font-bold">{m.name}</h3>
              <p className="text-sm font-semibold text-brand-dark">{m.role}</p>
              <p className="mt-1 text-sm text-muted-foreground">{m.focus}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Client showcase */}
      <Section className="pt-0">
        <h2 className="text-3xl md:text-4xl font-bold text-center">Client showcase</h2>
        <p className="mt-4 text-center text-muted-foreground max-w-2xl mx-auto">
          Organisations we build with across logistics, health, industry, finance and the public sector.
        </p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {clients.map((c) => (
            <div
              key={c.name}
              className="rounded-3xl border bg-card shadow-card p-6 hover:shadow-glow transition flex items-center gap-4"
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand/12 text-brand-dark font-bold">
                {c.name
                  .split(" ")
                  .map((w) => w[0])
                  .slice(0, 2)
                  .join("")}
              </span>
              <span className="min-w-0">
                <span className="block font-semibold text-ink truncate">{c.name}</span>
                <span className="block text-sm text-muted-foreground">{c.sector}</span>
              </span>
            </div>
          ))}
        </div>
      </Section>

      {/* Success stories */}
      <Section className="pt-0">
        <h2 className="text-3xl md:text-4xl font-bold text-center">Success stories</h2>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {stories.map((s) => (
            <article key={s.client} className="rounded-3xl bg-card border shadow-card p-7 hover:shadow-glow transition">
              <span className="inline-block rounded-full border border-brand/20 bg-brand/8 px-3 py-1 text-xs font-semibold text-brand-dark">
                {s.result}
              </span>
              <h3 className="mt-4 text-xl font-bold">{s.client}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
              <p className="mt-5 flex gap-2 text-sm italic text-ink/80">
                <Quote size={16} className="mt-0.5 shrink-0 text-brand" />
                {s.quote}
              </p>
            </article>
          ))}
        </div>
      </Section>

      {/* Achievements */}
      <Section className="pt-0">
        <h2 className="text-3xl md:text-4xl font-bold text-center">Achievements</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {achievements.map((a) => (
            <div key={a.title} className="rounded-3xl bg-card border shadow-card p-6 hover:shadow-glow transition">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-brand text-white shadow-glow">
                <a.icon size={20} />
              </span>
              <h3 className="mt-5 text-lg font-bold">{a.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{a.body}</p>
            </div>
          ))}
        </div>
      </Section>
    </SiteLayout>
  );
}
