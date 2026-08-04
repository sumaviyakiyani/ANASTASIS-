import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Loader2, Lock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: "Set a new password — Anastasis Technologies" },
      { name: "description", content: "Choose a new password for your Anastasis Technologies account." },
      { property: "og:title", content: "Set a new password · Anastasis Technologies" },
      { property: "og:description", content: "Choose a new password for your account." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ResetPasswordPage,
});

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(72, "Password is too long")
  .regex(/[a-z]/, "Include at least one lowercase letter")
  .regex(/[A-Z]/, "Include at least one uppercase letter")
  .regex(/[0-9]/, "Include at least one number");

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setNotice(null);
    const parsed = passwordSchema.safeParse(password);
    if (!parsed.success) return setError(parsed.error.issues[0].message);
    setBusy(true);
    const { error: err } = await supabase.auth.updateUser({ password: parsed.data });
    setBusy(false);
    if (err) return setError(err.message);
    setNotice("Password updated. Redirecting…");
    setTimeout(() => navigate({ to: "/account", replace: true }), 1200);
  };

  return (
    <main className="grid min-h-screen place-items-center bg-background px-6 py-16">
      <div className="w-full max-w-md rounded-[2rem] border border-white/60 bg-white/60 p-8 shadow-glow backdrop-blur-2xl">
        <h1 className="text-2xl font-bold text-ink">
          Set a new <span className="text-brand">password</span>
        </h1>
        <p className="mt-2 text-sm text-ink-soft">Enter a strong password to finish resetting your account.</p>

        <form onSubmit={submit} className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-semibold text-ink">New password</label>
            <div className="relative mt-2">
              <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-dark/70" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••"
                maxLength={72}
                autoComplete="new-password"
                className="w-full rounded-2xl border border-white/70 bg-white/70 py-3.5 pl-11 pr-4 text-ink outline-none transition placeholder:text-ink/40 focus:border-brand focus:ring-2 focus:ring-brand/25"
              />
            </div>
          </div>

          {error && <div className="text-sm text-destructive">{error}</div>}
          {notice && <div className="text-sm font-semibold text-brand-dark">{notice}</div>}

          <button
            type="submit"
            disabled={busy}
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-brand px-6 py-4 font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.01] disabled:opacity-60"
          >
            {busy && <Loader2 size={18} className="animate-spin" />}
            Update password
          </button>
        </form>
      </div>
    </main>
  );
}
