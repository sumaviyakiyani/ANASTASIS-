import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { ArrowRight, Eye, EyeOff, Loader2, Lock, Mail, ShieldCheck, Sparkles, User, Zap } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { useSession } from "@/hooks/useSession";
import { SiteLayout } from "@/components/SiteLayout";
import logo from "@/assets/Logo.png";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in or create an account — Anastasis Technologies" },
      {
        name: "description",
        content:
          "Secure sign in and sign up for your account. Access premium engineering, automation and research services.",
      },
      { property: "og:title", content: "Sign in · Anastasis Technologies" },
      { property: "og:description", content: "Secure access to your account and premium plan." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Sign in · Anastasis Technologies" },
      { name: "twitter:description", content: "Secure access to your account and premium plan." },
    ],
  }),
  component: AuthPage,
});

const emailSchema = z.string().trim().email("Enter a valid email address").max(255);
const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(72, "Password is too long")
  .regex(/[a-z]/, "Include at least one lowercase letter")
  .regex(/[A-Z]/, "Include at least one uppercase letter")
  .regex(/[0-9]/, "Include at least one number");

const signInSchema = z.object({ email: emailSchema, password: z.string().min(1, "Password is required") });
const signUpSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name").max(100),
  email: emailSchema,
  password: passwordSchema,
});

type Mode = "signin" | "signup";

const features = [
  { icon: ShieldCheck, title: "Fast Secure Reliable Services", body: "Built for dependable delivery" },
  { icon: Zap, title: "24/7 Operational Stages", body: "Always-on execution and support" },
  { icon: Sparkles, title: "Research - Recursion - Revival - Impact", body: "Purpose-driven innovation" },
];

function AuthPage() {
  const navigate = useNavigate();
  const { session, loading } = useSession();
  const [mode, setMode] = useState<Mode>("signin");
  const [form, setForm] = useState({ fullName: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && session) navigate({ to: "/account", replace: true });
  }, [loading, session, navigate]);

  const switchMode = (next: Mode) => {
    setMode(next);
    setError(null);
    setNotice(null);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setNotice(null);

    if (mode === "signin") {
      const parsed = signInSchema.safeParse(form);
      if (!parsed.success) return setError(parsed.error.issues[0].message);
      setBusy(true);
      const { error: err } = await supabase.auth.signInWithPassword({
        email: parsed.data.email,
        password: parsed.data.password,
      });
      setBusy(false);
      if (err) return setError("Invalid email or password.");
      navigate({ to: "/account", replace: true });
      return;
    }

    const parsed = signUpSchema.safeParse(form);
    if (!parsed.success) return setError(parsed.error.issues[0].message);
    setBusy(true);
    const { data, error: err } = await supabase.auth.signUp({
      email: parsed.data.email,
      password: parsed.data.password,
      options: {
        emailRedirectTo: `${window.location.origin}/account`,
        data: { full_name: parsed.data.fullName },
      },
    });
    setBusy(false);
    if (err) return setError(err.message);
    if (!data.session) {
      setNotice("Account created — check your email to confirm your address, then sign in.");
      setForm({ fullName: "", email: "", password: "" });
      return;
    }
    navigate({ to: "/account", replace: true });
  };

  const google = async () => {
    setError(null);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) return setError("Google sign-in failed. Please try again.");
    if (result.redirected) return;
    navigate({ to: "/account", replace: true });
  };

  const forgot = async () => {
    setError(null);
    setNotice(null);
    const parsed = emailSchema.safeParse(form.email);
    if (!parsed.success) return setError("Enter your email above, then tap Forgot password.");
    setBusy(true);
    const { error: err } = await supabase.auth.resetPasswordForEmail(parsed.data, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setBusy(false);
    if (err) return setError(err.message);
    setNotice("Password reset link sent — check your inbox.");
  };

  return (
    <SiteLayout>
      <div className="relative min-h-screen w-full overflow-hidden bg-background lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
        {/* Left column */}
        <section className="relative z-10 flex flex-col justify-center px-6 py-14 sm:px-10 lg:px-16 lg:py-20">
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(circle at 75% 30%, oklch(0.85 0.16 148 / 0.22), transparent 60%)",
          }}
        />
        <h1 className="mt-10 text-4xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:mt-14 lg:text-6xl">
          Engineering the{" "}
          <span className="text-brand">
            resurrection of tech.
          </span>
        </h1>

        <p className="mt-6 max-w-lg text-base leading-relaxed text-ink-soft sm:text-lg">
          Anastasis Technologies Pvt Ltd crafts premium digital systems where minimalism meets depth — secure,
          fast, and beautifully human.
        </p>

        <div className="mt-10 max-w-xl space-y-4">
          {features.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="flex items-center gap-4 rounded-2xl border border-brand/15 bg-card/70 px-5 py-4 shadow-card backdrop-blur-md"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand/12 text-brand-dark">
                <Icon size={18} />
              </span>
              <span className="min-w-0">
                <span className="block font-semibold text-ink">{title}</span>
                <span className="block text-sm text-ink-soft">{body}</span>
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Right column */}
      <section className="relative flex items-center justify-center px-6 py-14 sm:px-10 lg:px-16 lg:py-20">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.99 0.01 120) 0%, oklch(0.93 0.09 145) 55%, oklch(0.88 0.13 148) 100%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "linear-gradient(to right, oklch(0.75 0.18 148 / 0.12) 1px, transparent 1px), linear-gradient(to bottom, oklch(0.75 0.18 148 / 0.12) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage: "radial-gradient(circle at 30% 40%, black, transparent 70%)",
          }}
        />

        <div className="relative z-10 w-full max-w-md rounded-[2rem] border border-white/50 bg-white/55 p-7 shadow-glow backdrop-blur-2xl sm:p-9">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-brand-dark">
            {mode === "signin" ? "Welcome back" : "Get started"}
          </p>
          <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-ink sm:text-[2rem]">
            {mode === "signin" ? (
              <>
                Sign in to your <span className="block text-brand">Anastasis account</span>
              </>
            ) : (
              <>
                Create your <span className="block text-brand">Anastasis account</span>
              </>
            )}
          </h2>
          <p className="mt-3 text-sm text-ink-soft">Continue building the future of technology.</p>

          {/* Tabs */}
          <div className="mt-7 grid grid-cols-2 gap-1 rounded-full bg-muted/70 p-1">
            {(["signin", "signup"] as Mode[]).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => switchMode(m)}
                className={`rounded-full px-4 py-2.5 text-sm font-semibold transition ${
                  mode === m
                    ? "bg-gradient-brand text-primary-foreground shadow-glow"
                    : "text-ink-soft hover:text-ink"
                }`}
              >
                {m === "signin" ? "Sign In" : "Sign Up"}
              </button>
            ))}
          </div>

          <form onSubmit={submit} className="mt-6 space-y-4">
            {mode === "signup" && (
              <Field
                icon={User}
                label="Full name"
                value={form.fullName}
                onChange={(v) => setForm({ ...form, fullName: v })}
                placeholder="Your full name"
                maxLength={100}
                autoComplete="name"
              />
            )}
            <Field
              icon={Mail}
              label="Email"
              type="email"
              value={form.email}
              onChange={(v) => setForm({ ...form, email: v })}
              placeholder="you@anastasis.tech"
              maxLength={255}
              autoComplete="email"
            />
            <Field
              icon={Lock}
              label="Password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={(v) => setForm({ ...form, password: v })}
              placeholder="••••••••••"
              maxLength={72}
              autoComplete={mode === "signin" ? "current-password" : "new-password"}
              trailing={
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="text-ink/45 transition hover:text-brand-dark"
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              }
            />

            {mode === "signin" ? (
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={forgot}
                  className="text-sm font-semibold text-brand-dark hover:underline"
                >
                  Forgot password?
                </button>
              </div>
            ) : (
              <p className="text-xs text-ink/55">
                Minimum 8 characters with an uppercase letter, a lowercase letter and a number.
              </p>
            )}

            {error && <div className="text-sm text-destructive">{error}</div>}
            {notice && <div className="text-sm font-semibold text-brand-dark">{notice}</div>}

            <button
              type="submit"
              disabled={busy}
              className="mt-1 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-brand px-6 py-4 font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.01] disabled:opacity-60"
            >
              {busy && <Loader2 size={18} className="animate-spin" />}
              {mode === "signin" ? "Sign In" : "Create account"}
              {!busy && <ArrowRight size={18} />}
            </button>
          </form>

          <button
            type="button"
            onClick={google}
            className="mt-4 inline-flex w-full items-center justify-center gap-3 rounded-2xl border border-white/70 bg-card px-4 py-3.5 font-semibold text-ink shadow-card transition hover:bg-brand/5"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
              <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.4a5.5 5.5 0 0 1-2.4 3.6v3h3.9c2.3-2.1 3.6-5.2 3.6-8.8Z" />
              <path fill="#34A853" d="M12 24c3.2 0 5.9-1.1 7.9-2.9l-3.9-3a7.2 7.2 0 0 1-10.7-3.8H1.3v3.1A12 12 0 0 0 12 24Z" />
              <path fill="#FBBC05" d="M5.3 14.3a7.2 7.2 0 0 1 0-4.6V6.6H1.3a12 12 0 0 0 0 10.8l4-3.1Z" />
              <path fill="#EA4335" d="M12 4.8c1.8 0 3.4.6 4.6 1.8l3.5-3.5A12 12 0 0 0 1.3 6.6l4 3.1A7.2 7.2 0 0 1 12 4.8Z" />
            </svg>
            {mode === "signin" ? "Sign in with Google" : "Sign up with Google"}
          </button>

          <div className="mt-7 flex items-center gap-3 text-[0.65rem] font-medium uppercase tracking-[0.24em] text-ink/45">
            <span className="h-px flex-1 bg-ink/10" /> Secure connection <span className="h-px flex-1 bg-ink/10" />
          </div>
        </div>
      </section>
    </div>
    </SiteLayout>
  );
}

function Field({
  icon: Icon,
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  maxLength,
  autoComplete,
  trailing,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  maxLength?: number;
  autoComplete?: string;
  trailing?: React.ReactNode;
}) {
  return (
    <div>
      <label className="text-sm font-semibold text-ink">{label}</label>
      <div className="relative mt-2">
        <Icon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-dark/70" />
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          maxLength={maxLength}
          autoComplete={autoComplete}
          className="w-full rounded-2xl border border-white/70 bg-white/70 py-3.5 pl-11 pr-11 text-ink outline-none transition placeholder:text-ink/40 focus:border-brand focus:ring-2 focus:ring-brand/25"
        />
        {trailing && <span className="absolute right-4 top-1/2 -translate-y-1/2">{trailing}</span>}
      </div>
    </div>
  );
}
