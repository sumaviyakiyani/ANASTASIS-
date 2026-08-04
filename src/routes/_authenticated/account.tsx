import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Crown, Loader2, LogOut, Sparkles } from "lucide-react";
import { z } from "zod";
import { SiteLayout, Section, PageHero } from "@/components/SiteLayout";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@/hooks/useSession";
import { getMyProfile, setPlan, updateMyName } from "@/lib/plan.functions";

export const Route = createFileRoute("/_authenticated/account")({
  head: () => ({
    meta: [
      { title: "Your account — Anastasis Technologies" },
      { name: "description", content: "Manage your profile, plan and account security settings." },
      { property: "og:title", content: "Your account · Anastasis Technologies" },
      { property: "og:description", content: "Manage your profile and plan." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Your account · Anastasis Technologies" },
      { name: "twitter:description", content: "Manage your profile and plan." },
    ],
  }),
  component: Account,
});

const nameSchema = z.string().trim().min(2, "Enter your full name").max(100);

function Account() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useSession();
  const fetchProfile = useServerFn(getMyProfile);
  const changePlan = useServerFn(setPlan);
  const saveName = useServerFn(updateMyName);

  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: () => fetchProfile(),
  });

  const [name, setName] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (profile?.full_name) setName(profile.full_name);
  }, [profile?.full_name]);

  const isPremium = profile?.plan === "premium";

  const onSaveName = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    const parsed = nameSchema.safeParse(name);
    if (!parsed.success) return setError(parsed.error.issues[0].message);
    setBusy(true);
    try {
      await saveName({ data: { fullName: parsed.data } });
      await queryClient.invalidateQueries({ queryKey: ["profile"] });
      setMessage("Profile updated.");
    } catch {
      setError("Could not save your profile.");
    } finally {
      setBusy(false);
    }
  };

  const togglePlan = async () => {
    setError(null);
    setMessage(null);
    setBusy(true);
    try {
      await changePlan({ data: { plan: isPremium ? "free" : "premium" } });
      await queryClient.invalidateQueries({ queryKey: ["profile"] });
      setMessage(isPremium ? "Switched to the Starter plan." : "Premium is active. Welcome aboard!");
    } catch {
      setError("Could not update your plan.");
    } finally {
      setBusy(false);
    }
  };

  const signOut = async () => {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  };

  return (
    <SiteLayout>
      <PageHero eyebrow="Account" title="Your workspace" subtitle={user?.email ?? undefined} />

      <Section className="pt-4">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <form onSubmit={onSaveName} className="p-8 rounded-3xl bg-card border shadow-elegant space-y-5">
              <h2 className="text-xl font-bold">Profile</h2>
              <div>
                <label className="text-sm font-semibold">Full name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={100}
                  className="mt-2 w-full rounded-xl border bg-background px-4 py-3 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/30"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="text-sm font-semibold">Email</label>
                <input
                  value={user?.email ?? ""}
                  readOnly
                  className="mt-2 w-full rounded-xl border bg-muted px-4 py-3 text-ink/60"
                />
              </div>
              {error && <p className="text-sm text-destructive">{error}</p>}
              {message && <p className="text-sm font-semibold text-brand-dark">{message}</p>}
              <button
                type="submit"
                disabled={busy}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-7 py-3 font-semibold text-white shadow-glow transition-transform hover:scale-105 disabled:opacity-60"
              >
                {busy && <Loader2 size={16} className="animate-spin" />} Save changes
              </button>
            </form>

            <div className="p-8 rounded-3xl bg-card border shadow-card">
              <h2 className="text-xl font-bold">Security</h2>
              <ul className="mt-4 space-y-2 text-sm text-ink/70">
                <li>· Your session is encrypted and refreshed automatically.</li>
                <li>· Profile and plan data are readable only by your own account.</li>
                <li>· Plan changes are authorised on the server from your signed-in session.</li>
              </ul>
              <button
                onClick={signOut}
                className="mt-6 inline-flex items-center gap-2 rounded-full border bg-background px-6 py-3 font-semibold transition hover:bg-brand/5"
              >
                <LogOut size={16} /> Sign out
              </button>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-gradient-dark border shadow-elegant relative overflow-hidden h-fit">
            <div className="absolute inset-0 bg-gradient-radial opacity-50 pointer-events-none" />
            <div className="relative">
              <div className="grid place-items-center h-12 w-12 rounded-2xl bg-gradient-brand text-white shadow-glow">
                {isPremium ? <Crown size={20} /> : <Sparkles size={20} />}
              </div>
              <h2 className="mt-5 text-xl font-bold">{isLoading ? "Loading…" : isPremium ? "Premium" : "Starter"}</h2>
              <p className="mt-2 text-sm text-ink/60">
                {isPremium
                  ? "Dedicated delivery pod, automation blueprints and priority support."
                  : "Upgrade for a dedicated pod, automation blueprints and priority support."}
              </p>
              {profile?.plan_started_at && (
                <p className="mt-3 text-xs text-ink/50">
                  Active since {new Date(profile.plan_started_at).toLocaleDateString()}
                </p>
              )}
              <button
                onClick={togglePlan}
                disabled={busy || isLoading}
                className={`mt-6 w-full inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 font-semibold transition-transform hover:scale-[1.02] disabled:opacity-60 ${
                  isPremium ? "border bg-background text-ink" : "bg-gradient-brand text-white shadow-glow"
                }`}
              >
                {busy && <Loader2 size={16} className="animate-spin" />}
                {isPremium ? "Switch to Starter" : "Activate Premium"}
              </button>
            </div>
          </div>
        </div>
      </Section>
    </SiteLayout>
  );
}
