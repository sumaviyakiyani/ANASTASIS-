import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Check, Crown, Loader2, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { SiteLayout, Section, PageHero } from "@/components/SiteLayout";
import { useSession } from "@/hooks/useSession";
import { getMyProfile, setPlan } from "@/lib/plan.functions";

export const Route = createFileRoute("/premium")({
  head: () => ({
    meta: [
      { title: "Premium Plan — Dedicated Engineering Capacity" },
      {
        name: "description",
        content:
          "Upgrade to Premium for a dedicated delivery pod, automation blueprints, priority support and quarterly research reviews.",
      },
      { property: "og:title", content: "Premium Plan · Anastasis Technologies" },
      {
        property: "og:description",
        content: "Dedicated delivery pod, automation blueprints and priority support.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Premium Plan · Anastasis Technologies" },
      {
        name: "twitter:description",
        content: "Dedicated delivery pod, automation blueprints and priority support.",
      },
    ],
  }),
  component: Premium,
});

const plans = [
  {
    id: "free" as const,
    name: "Starter",
    price: "$0",
    cadence: "forever",
    icon: Sparkles,
    blurb: "Explore how automation-first delivery could work for your team.",
    features: [
      "Discovery call with an engineer",
      "Automation readiness checklist",
      "Access to public research notes",
      "Email support within 3 business days",
    ],
  },
  {
    id: "premium" as const,
    name: "Premium",
    price: "$499",
    cadence: "per month",
    icon: Crown,
    highlight: true,
    blurb: "A dedicated pod that ships, automates and maintains your product.",
    features: [
      "Dedicated delivery pod (engineering + QA)",
      "Custom automation & AI workflow blueprints",
      "Unlimited private project workspaces",
      "Priority support with 4-hour response",
      "Quarterly research & architecture review",
      "Security hardening and audit reports",
    ],
  },
];

function Premium() {
  const navigate = useNavigate();
  const { session, loading } = useSession();
  const queryClient = useQueryClient();
  const fetchProfile = useServerFn(getMyProfile);
  const changePlan = useServerFn(setPlan);
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: () => fetchProfile(),
    enabled: !!session,
  });

  const choose = async (plan: "free" | "premium") => {
    setError(null);
    if (!session) {
      navigate({ to: "/auth" });
      return;
    }
    setBusy(plan);
    try {
      await changePlan({ data: { plan } });
      await queryClient.invalidateQueries({ queryKey: ["profile"] });
      navigate({ to: "/account" });
    } catch {
      setError("Could not update your plan. Please try again.");
    } finally {
      setBusy(null);
    }
  };

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Pricing"
        title="Premium plan"
        subtitle="Pick the plan that matches how fast you want to ship. Upgrade or downgrade anytime."
      />

      <Section className="pt-4">
        <div className="grid gap-8 lg:grid-cols-2">
          {plans.map((p) => {
            const active = profile?.plan === p.id;
            return (
              <div
                key={p.id}
                className={`relative p-8 md:p-10 rounded-3xl border shadow-card transition hover:shadow-elegant ${
                  p.highlight ? "bg-gradient-dark overflow-hidden" : "bg-card"
                }`}
              >
                {p.highlight && <div className="absolute inset-0 bg-gradient-radial opacity-50 pointer-events-none" />}
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <div className="grid place-items-center h-12 w-12 rounded-2xl bg-gradient-brand text-white shadow-glow">
                      <p.icon size={20} />
                    </div>
                    {p.highlight && (
                      <span className="px-3 py-1 rounded-full glass-dark text-[11px] font-semibold uppercase tracking-widest text-brand-dark">
                        Most popular
                      </span>
                    )}
                  </div>

                  <h2 className="mt-6 text-2xl font-bold">{p.name}</h2>
                  <p className="mt-2 text-sm text-ink/60">{p.blurb}</p>

                  <div className="mt-6 flex items-end gap-2">
                    <span className="text-4xl md:text-5xl font-bold text-gradient-brand">{p.price}</span>
                    <span className="pb-2 text-sm text-ink/50">{p.cadence}</span>
                  </div>

                  <ul className="mt-8 space-y-3">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm">
                        <Check size={16} className="mt-0.5 shrink-0 text-brand-dark" />
                        <span className="text-ink/80">{f}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => choose(p.id)}
                    disabled={busy !== null || loading || active}
                    className={`mt-8 w-full inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 font-semibold transition-transform hover:scale-[1.02] disabled:opacity-60 ${
                      p.highlight
                        ? "bg-gradient-brand text-white shadow-glow"
                        : "border bg-background text-ink"
                    }`}
                  >
                    {busy === p.id && <Loader2 size={18} className="animate-spin" />}
                    {active
                      ? "Your current plan"
                      : !session
                        ? p.id === "premium"
                          ? "Sign up to go Premium"
                          : "Create free account"
                        : p.id === "premium"
                          ? "Activate Premium"
                          : "Switch to Starter"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {error && <p className="mt-6 text-center text-sm text-destructive">{error}</p>}

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {[
            { icon: ShieldCheck, title: "Account security", text: "Encrypted sessions, strong password rules and per-account data isolation enforced in the database." },
            { icon: Zap, title: "No lock-in", text: "Change or cancel your plan whenever you like — your workspace data stays yours." },
            { icon: Sparkles, title: "Research included", text: "Every Premium engagement includes applied research reviews with our engineering team." },
          ].map((c) => (
            <div key={c.title} className="p-6 rounded-2xl bg-card border shadow-card">
              <c.icon size={20} className="text-brand-dark" />
              <h3 className="mt-3 font-semibold">{c.title}</h3>
              <p className="mt-2 text-sm text-ink/60">{c.text}</p>
            </div>
          ))}
        </div>
      </Section>
    </SiteLayout>
  );
}
