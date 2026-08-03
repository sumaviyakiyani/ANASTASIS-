import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Code2,
  Smartphone,
  Brain,
  Cpu,
  FlaskConical,
  Briefcase,
  Sparkles,
  Shield,
  Zap,
  Users,
} from "lucide-react";
import { SiteLayout, Section } from "@/components/SiteLayout";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Anastasis Technologies — Research-Driven Software Solutions" },
      { property: "og:image", content: "https://cdn.gpteng.co/blank-app-v1.svg" },
    ],
  }),
  component: HomePage,
});

const services = [
  { icon: Code2, title: "Web Development", desc: "Modern, scalable web platforms built with cutting-edge frameworks." },
  { icon: Smartphone, title: "App Development", desc: "Native & cross-platform mobile experiences that users love." },
  { icon: Brain, title: "AI Solutions", desc: "Custom ML models, LLM integrations & intelligent automation." },
  { icon: Briefcase, title: "IT Consulting", desc: "Strategic technology guidance for digital transformation." },
  { icon: FlaskConical, title: "R&D Services", desc: "Applied research turning ideas into shippable products." },
  { icon: Cpu, title: "Software Engineering", desc: "End-to-end engineering from architecture to deployment." },
];

const stats = [
  { value: 120, suffix: "+", label: "Projects Delivered" },
  { value: 60, suffix: "+", label: "Happy Clients" },
  { value: 8, suffix: "+", label: "Years of Excellence" },
  { value: 25, suffix: "+", label: "Expert Engineers" },
];

const partners = ["NEXORA", "BIOTRACE", "HELIX LABS", "ORBITAL", "QUANTA", "AXIS ONE"];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        const start = performance.now();
        const dur = 1500;
        const tick = (t: number) => {
          const p = Math.min((t - start) / dur, 1);
          setN(Math.floor(p * value));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        obs.disconnect();
      }
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, [value]);
  return (
    <span ref={ref} className="tabular-nums">
      {n}
      {suffix}
    </span>
  );
}

function HomePage() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative min-h-[calc(100vh-5.5rem)] flex items-center overflow-hidden pt-24 pb-12 bg-[radial-gradient(circle_at_top_left,#f1fdea_15%,transparent_45%),radial-gradient(circle_at_bottom_right,#d6f4d6_0%,transparent_55%)] text-ink">
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-[#e9f9ea]/80 to-[#f3fbf1]/90" />
        <div className="absolute top-16 -left-16 h-80 w-80 rounded-full bg-brand/25 blur-3xl" />
        <div className="absolute bottom-8 right-0 h-72 w-72 rounded-full bg-brand/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-14 grid lg:grid-cols-[1.05fr_0.95fr] gap-10 items-center">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-dark text-xs font-medium tracking-widest uppercase text-ink">
              <Sparkles size={14} /> Research · Innovation · Impact
            </span>
            <h2 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[0.95] tracking-tight">
              <span
                className="bg-clip-text text-transparent drop-shadow-[0_2px_20px_rgba(26,122,60,0.25)]"
                style={{ backgroundImage: "linear-gradient(135deg, #0f5132 0%, #1a7a3c 45%, #2ecc71 100%)" }}
              >
                No More Employees
              </span>
            </h2>
            <h1 className="mt-5 text-3xl md:text-5xl font-bold leading-[1.1] text-ink/90">
              Engineering <span className="text-gradient-brand">tomorrow's</span> software today
            </h1>
            <p className="mt-6 text-lg text-ink/70 max-w-xl">
              We combine applied research, AI and modern engineering to deliver automation-first products that replace manual work
              with intelligent systems, faster releases, and measurable business outcomes.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-brand px-7 py-3.5 font-semibold shadow-glow transition-transform hover:scale-105"
              >
                Get Started
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 rounded-full glass-dark px-7 py-3.5 font-semibold hover:bg-white/10 transition"
              >
                Our Services
              </Link>
            </div>

            <div className="mt-10 flex items-center gap-6 text-sm text-ink/60">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-9 w-9 rounded-full bg-gradient-brand border-2 border-ink"
                  />
                ))}
              </div>
              <span>Trusted by 60+ innovative teams worldwide</span>
            </div>
          </div>

          <div className="relative animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <div className="relative max-w-md mx-auto lg:max-w-[520px]">
              <div className="absolute inset-0 bg-brand/10 rounded-[3rem] blur-3xl opacity-40" />
              <div className="relative rounded-[3rem] border border-white/80 bg-white/90 p-6 md:p-8 shadow-[0_28px_80px_-48px_rgba(46,125,50,0.32)]">
                <div className="flex items-center gap-3">
                  <div className="grid place-items-center h-11 w-11 rounded-2xl bg-gradient-brand text-white shadow-glow">
                    <Brain size={20} />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-brand-glow">Autonomous Delivery</div>
                    <div className="text-lg font-bold leading-tight">AI-Run Engineering</div>
                  </div>
                </div>

                <p className="mt-4 text-sm text-ink/70 leading-relaxed">
                  Intelligent agents plan, build and ship — while humans stay on strategy. From data
                  pipelines to production releases, the loop keeps running without hiring more hands.
                </p>

                {/* Neural / automation flow illustration */}
                <svg viewBox="0 0 320 140" className="mt-6 w-full h-auto" role="img" aria-label="AI automation workflow diagram">
                  <defs>
                    <linearGradient id="heroFlow" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#0f5132" />
                      <stop offset="55%" stopColor="#1a7a3c" />
                      <stop offset="100%" stopColor="#2ecc71" />
                    </linearGradient>
                  </defs>
                  {[
                    [40, 30, 160, 70], [40, 70, 160, 70], [40, 110, 160, 70],
                    [160, 70, 280, 40], [160, 70, 280, 100],
                  ].map(([x1, y1, x2, y2], i) => (
                    <line
                      key={i}
                      x1={x1} y1={y1} x2={x2} y2={y2}
                      stroke="url(#heroFlow)" strokeWidth="1.5" strokeLinecap="round" opacity="0.55"
                    >
                      <animate attributeName="opacity" values="0.2;0.8;0.2" dur="3s" begin={`${i * 0.35}s`} repeatCount="indefinite" />
                    </line>
                  ))}
                  {[
                    [40, 30, 7], [40, 70, 7], [40, 110, 7],
                    [160, 70, 13],
                    [280, 40, 7], [280, 100, 7],
                  ].map(([cx, cy, r], i) => (
                    <circle key={i} cx={cx} cy={cy} r={r} fill="url(#heroFlow)">
                      <animate attributeName="r" values={`${r};${Number(r) + 2};${r}`} dur="2.4s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
                    </circle>
                  ))}
                </svg>

                <div className="mt-6 rounded-3xl border border-white/10 bg-white/60 p-5 backdrop-blur-sm">
                  <div className="flex items-start gap-3">
                    <div className="grid place-items-center h-11 w-11 rounded-2xl bg-brand text-white shadow-glow">
                      <Sparkles size={18} />
                    </div>
                    <div>
                      <p className="text-sm uppercase tracking-[0.24em] text-brand-glow">Digital transformation</p>
                      <p className="mt-2 text-base font-semibold text-ink">
                        AI-powered systems that reduce complexity, accelerate delivery, and keep product momentum alive.
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-ink/70">
                    A connected automation layer turns strategy into shipped software while engineering teams stay focused on outcomes.
                  </p>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-3">
                  {[
                    { icon: Zap, label: "Automation" },
                    { icon: Code2, label: "Engineering" },
                    { icon: Sparkles, label: "Innovation" },
                  ].map((c) => (
                    <div key={c.label} className="rounded-2xl bg-brand/10 p-3 text-center">
                      <c.icon size={18} className="mx-auto text-brand" />
                      <div className="mt-1.5 text-[11px] font-semibold uppercase tracking-wide text-ink/70">
                        {c.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners strip */}
      <div className="border-y bg-muted/50">
        <div className="mx-auto max-w-7xl px-6 py-8 flex flex-wrap items-center justify-around gap-x-10 gap-y-4">
          {partners.map((p) => (
            <div key={p} className="text-sm font-bold tracking-[0.2em] text-muted-foreground/70 hover:text-brand transition">
              {p}
            </div>
          ))}
        </div>
      </div>

      {/* Services overview */}
      <Section>
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-semibold tracking-widest uppercase text-brand">What we do</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold">
            Solutions that <span className="text-gradient-brand">move you forward</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            From research prototypes to production-grade platforms — a full-stack technology partner.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <div
              key={s.title}
              className="group relative p-8 rounded-3xl bg-card border shadow-card hover:shadow-glow hover:-translate-y-2 transition-all duration-300 overflow-hidden"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-brand transition-opacity duration-500 -z-0" />
              <div className="relative">
                <div className="inline-grid place-items-center h-14 w-14 rounded-2xl bg-gradient-brand text-white shadow-glow group-hover:scale-110 transition-transform">
                  <s.icon size={26} />
                </div>
                <h3 className="mt-5 text-xl font-bold group-hover:text-white transition-colors">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground group-hover:text-ink/90 transition-colors">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Why choose us */}
      <Section className="bg-gradient-dark text-ink relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial opacity-40" />
        <div className="relative grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-xs font-semibold tracking-widest uppercase text-brand-glow">Why work with us</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-bold">
              A partner obsessed with <span className="text-gradient-brand">outcomes</span>
            </h2>
            <p className="mt-4 text-ink/70">
              We combine deep research with pragmatic engineering — so every line of code we ship
              connects to a measurable business result.
            </p>

            <div className="mt-8 space-y-4">
              {[
                { icon: Shield, t: "Secure by default", d: "Enterprise-grade practices baked into every build." },
                { icon: Zap, t: "Fast to value", d: "Weekly delivery cadence with measurable milestones." },
                { icon: Users, t: "Senior team", d: "Small, senior squads — no hand-offs, no juniors on the wheel." },
              ].map((f) => (
                <div key={f.t} className="flex gap-4 items-start glass-dark p-4 rounded-2xl hover:bg-brand/10 transition">
                  <div className="grid place-items-center h-11 w-11 rounded-xl bg-gradient-brand shrink-0">
                    <f.icon size={20} />
                  </div>
                  <div>
                    <div className="font-semibold">{f.t}</div>
                    <div className="text-sm text-ink/70">{f.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            {stats.map((s) => (
              <div
                key={s.label}
                className="glass-dark rounded-3xl p-8 text-center hover:scale-105 transition-transform"
              >
                <div className="text-5xl font-bold text-gradient-brand">
                  <Counter value={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-2 text-sm uppercase tracking-widest text-ink/60">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-brand p-12 md:p-20 text-center text-white shadow-glow">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_20%,white,transparent_50%)]" />
          <div className="relative">
            <h2 className="text-4xl md:text-5xl font-bold">Have a bold idea? Let's build it.</h2>
            <p className="mt-4 text-ink/90 max-w-xl mx-auto">
              Book a free discovery call and turn your vision into a shipping product.
            </p>
            <Link
              to="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-8 py-4 font-semibold hover:bg-white hover:text-ink transition"
            >
              Start Your Project <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </Section>
    </SiteLayout>
  );
}
