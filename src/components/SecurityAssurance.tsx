import { KeyRound, Lock, ShieldCheck, UserCheck } from "lucide-react";
import { Section } from "@/components/SiteLayout";

const pillars = [
  {
    icon: KeyRound,
    title: "Secure Authentication",
    body: "Sign in with email or a trusted provider such as Google, Microsoft or Apple. Sessions are managed by our authentication service.",
  },
  {
    icon: Lock,
    title: "Data Protection",
    body: "Traffic is served over HTTPS and account records are stored with row-level access rules so each account only reads its own data.",
  },
  {
    icon: ShieldCheck,
    title: "Privacy & Security",
    body: "We collect only the details needed to run your account, and disposable email domains are rejected at sign-up.",
  },
  {
    icon: UserCheck,
    title: "Access Control",
    body: "Roles are stored separately from profiles and checked on the server before any protected action runs.",
  },
];

export function SecurityAssurance() {
  return (
    <Section id="security" className="bg-muted/40">
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-xs font-semibold uppercase tracking-widest text-brand">Trust &amp; security</span>
        <h2 className="mt-3 text-3xl font-bold sm:text-4xl md:text-5xl">
          Built with <span className="text-gradient-brand">security in mind</span>
        </h2>
        <p className="mt-4 text-sm text-muted-foreground sm:text-base">
          Practical safeguards around accounts, data access and privacy across every product we ship.
        </p>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 md:mt-14">
        {pillars.map((p) => (
          <div key={p.title} className="rounded-3xl border bg-card p-6 shadow-card transition hover:shadow-glow">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-brand text-white shadow-glow">
              <p.icon size={20} />
            </span>
            <h3 className="mt-4 text-lg font-bold">{p.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
