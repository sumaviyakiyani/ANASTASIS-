import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Eye, EyeOff, Loader2, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { useSession } from "@/hooks/useSession";
import { isDisposableEmail, TEMP_EMAIL_MESSAGE } from "@/lib/disposable-email";
import { Navbar } from "@/components/SiteLayout";
import logo from "@/assets/anastasis-logo-mark.png.asset.json";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in or create an account | Anastasis Technologies" },
      {
        name: "description",
        content:
          "Sign in with email, Google, Microsoft or Apple. Access premium engineering, automation and research services.",
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

const features = [
  { icon: ShieldCheck, title: "Fast Secure Reliable Services", body: "Built for dependable delivery" },
  { icon: Zap, title: "24/7 Operational Stages", body: "Always-on execution and support" },
  { icon: Sparkles, title: "Research - Recursion - Revival - Impact", body: "Purpose-driven innovation" },
];

type Provider = "google" | "microsoft" | "apple";

const providers: { id: Provider; label: string; icon: React.ReactNode }[] = [
  {
    id: "google",
    label: "Continue with Google",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
        <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.4a5.5 5.5 0 0 1-2.4 3.6v3h3.9c2.3-2.1 3.6-5.2 3.6-8.8Z" />
        <path fill="#34A853" d="M12 24c3.2 0 5.9-1.1 7.9-2.9l-3.9-3a7.2 7.2 0 0 1-10.7-3.8H1.3v3.1A12 12 0 0 0 12 24Z" />
        <path fill="#FBBC05" d="M5.3 14.3a7.2 7.2 0 0 1 0-4.6V6.6H1.3a12 12 0 0 0 0 10.8l4-3.1Z" />
        <path fill="#EA4335" d="M12 4.8c1.8 0 3.4.6 4.6 1.8l3.5-3.5A12 12 0 0 0 1.3 6.6l4 3.1A7.2 7.2 0 0 1 12 4.8Z" />
      </svg>
    ),
  },
  {
    id: "microsoft",
    label: "Continue with Microsoft (Outlook)",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
        <path fill="#F25022" d="M2 2h9.5v9.5H2z" />
        <path fill="#7FBA00" d="M12.5 2H22v9.5h-9.5z" />
        <path fill="#00A4EF" d="M2 12.5h9.5V22H2z" />
        <path fill="#FFB900" d="M12.5 12.5H22V22h-9.5z" />
      </svg>
    ),
  },
  {
    id: "apple",
    label: "Continue with Apple",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden fill="currentColor">
        <path d="M16.4 12.7c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.5-.1-2.8.9-3.5.9s-1.9-.9-3.1-.9C6.7 7.4 5 8.6 4.1 10.4c-1.7 3-.4 7.4 1.2 9.8.8 1.2 1.8 2.5 3.1 2.4 1.2 0 1.7-.8 3.2-.8s1.9.8 3.2.8 2.2-1.2 3-2.4c.9-1.4 1.3-2.7 1.3-2.8-.1 0-2.7-1-2.7-3.7ZM14.3 5.4c.7-.8 1.1-1.9 1-3-1 0-2.3.7-3 1.5-.7.8-1.2 1.9-1 3 1.1.1 2.3-.6 3-1.5Z" />
      </svg>
    ),
  },
];

const credentials = z.object({
  email: z.string().trim().email("Enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

function AuthPage() {
  const navigate = useNavigate();
  const { session, loading } = useSession();
  const [tab, setTab] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [busy, setBusy] = useState<Provider | "email" | "reset" | null>(null);

  useEffect(() => {
    if (loading || !session) return;
    if (isDisposableEmail(session.user.email)) {
      setError(TEMP_EMAIL_MESSAGE);
      void supabase.auth.signOut();
      return;
    }
    navigate({ to: "/account", replace: true });
  }, [loading, session, navigate]);

  const submitEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setNotice(null);

    const parsed = credentials.safeParse({ email, password });
    if (!parsed.success) return setError(parsed.error.issues[0].message);
    if (isDisposableEmail(parsed.data.email)) return setError(TEMP_EMAIL_MESSAGE);

    setBusy("email");
    if (tab === "signup") {
      const { data, error: err } = await supabase.auth.signUp({
        email: parsed.data.email,
        password: parsed.data.password,
        options: { emailRedirectTo: window.location.origin },
      });
      setBusy(null);
      if (err) return setError(err.message);
      if (!data.session) return setNotice("Check your email to confirm your account, then sign in.");
      return;
    }

    const { error: err } = await supabase.auth.signInWithPassword({
      email: parsed.data.email,
      password: parsed.data.password,
    });
    setBusy(null);
    if (err) return setError(err.message);
  };

  const forgotPassword = async () => {
    setError(null);
    setNotice(null);
    const parsed = z.string().trim().email().safeParse(email);
    if (!parsed.success) return setError("Enter your email address first, then tap forgot password.");
    if (isDisposableEmail(parsed.data)) return setError(TEMP_EMAIL_MESSAGE);
    setBusy("reset");
    const { error: err } = await supabase.auth.resetPasswordForEmail(parsed.data, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setBusy(null);
    if (err) return setError(err.message);
    setNotice("Password reset link sent. Check your inbox.");
  };

  const signIn = async (provider: Provider) => {
    setError(null);
    setNotice(null);
    setBusy(provider);
    const result = await lovable.auth.signInWithOAuth(provider, {
      redirect_uri: window.location.origin,
    });

    if ("error" in result && result.error) {
      setBusy(null);
      return setError("Sign-in failed. Please try again.");
    }
    if ("redirected" in result && result.redirected) return;

    const { data } = await supabase.auth.getUser();
    setBusy(null);
    if (data.user && isDisposableEmail(data.user.email)) {
      await supabase.auth.signOut();
      return setError(TEMP_EMAIL_MESSAGE);
    }
    navigate({ to: "/account", replace: true });
  };

  return (
    <>
      <Navbar />
      <main className="relative min-h-screen w-full overflow-hidden bg-background lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
        {/* Left column */}
        <section className="relative z-10 flex flex-col justify-center px-4 pb-12 pt-28 sm:px-10 lg:px-16 lg:pb-20 lg:pt-32">
          <div
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              background: "radial-gradient(circle at 75% 30%, oklch(0.85 0.16 148 / 0.22), transparent 60%)",
            }}
          />
          <Link to="/" className="flex items-center gap-4">
            <img src={logo.url} alt="Anastasis Technologies" className="h-14 w-auto sm:h-20" />
          </Link>

          <h1 className="mt-8 text-3xl font-extrabold leading-[1.1] tracking-tight text-ink sm:text-5xl lg:mt-14 lg:text-6xl">
            Engineering the <span className="text-brand">resurrection of tech.</span>
          </h1>

          <p className="mt-5 max-w-lg text-sm leading-relaxed text-ink-soft sm:mt-6 sm:text-lg">
            Anastasis Technologies Pvt Ltd crafts premium digital systems where minimalism meets depth: secure,
            fast and beautifully human.
          </p>

          <div className="mt-8 max-w-xl space-y-3 sm:mt-10 sm:space-y-4">
            {features.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="flex items-center gap-3 rounded-2xl border border-brand/15 bg-card/70 px-4 py-3.5 shadow-card backdrop-blur-md sm:gap-4 sm:px-5 sm:py-4"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand/12 text-brand-dark">
                  <Icon size={18} />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-ink sm:text-base">{title}</span>
                  <span className="block text-xs text-ink-soft sm:text-sm">{body}</span>
                </span>
              </div>
            ))}
          </div>
        </section>


        {/* Right column */}
        <section className="relative flex items-center justify-center px-4 pb-14 pt-12 sm:px-10 lg:px-16 lg:pb-20 lg:pt-32">
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

          <div className="relative z-10 w-full max-w-md rounded-[1.5rem] border border-white/50 bg-white/55 p-5 shadow-glow backdrop-blur-2xl sm:rounded-[2rem] sm:p-9">
            <div className="grid grid-cols-2 gap-1 rounded-2xl bg-white/60 p-1">
              {(["signin", "signup"] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => {
                    setTab(t);
                    setError(null);
                    setNotice(null);
                  }}
                  className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                    tab === t ? "bg-gradient-brand text-white shadow-glow" : "text-ink/70 hover:text-ink"
                  }`}
                >
                  {t === "signin" ? "Sign In" : "Sign Up"}
                </button>
              ))}
            </div>

            <h2 className="mt-6 text-2xl font-bold leading-tight tracking-tight text-ink sm:text-[1.75rem]">
              {tab === "signin" ? "Continue to your account" : "Create your account"}
            </h2>

            <form className="mt-6 space-y-4" onSubmit={submitEmail}>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-ink">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="mt-1.5 w-full rounded-2xl border border-white/70 bg-card px-4 py-3 text-ink shadow-card outline-none transition focus:border-brand/50 focus:ring-2 focus:ring-brand/25"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-ink">
                  Password
                </label>
                <div className="relative mt-1.5">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete={tab === "signin" ? "current-password" : "new-password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-2xl border border-white/70 bg-card px-4 py-3 pr-12 text-ink shadow-card outline-none transition focus:border-brand/50 focus:ring-2 focus:ring-brand/25"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute inset-y-0 right-0 grid w-12 place-items-center rounded-r-2xl text-ink/50 hover:text-ink"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {tab === "signin" && (
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={forgotPassword}
                    disabled={busy !== null}
                    className="rounded-lg px-1 text-sm font-semibold text-brand-dark hover:underline disabled:opacity-60"
                  >
                    {busy === "reset" ? "Sending…" : "Forgot password?"}
                  </button>
                </div>
              )}

              <button
                type="submit"
                disabled={busy !== null}
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-brand px-4 py-3.5 font-semibold text-white shadow-glow transition hover:brightness-105 disabled:opacity-60"
              >
                {busy === "email" && <Loader2 size={18} className="animate-spin" />}
                {tab === "signin" ? "Sign In" : "Create account"}
              </button>
            </form>

            <div className="mt-6 flex items-center gap-3 text-[0.65rem] font-medium uppercase tracking-[0.24em] text-ink/45">
              <span className="h-px flex-1 bg-ink/10" /> or continue with <span className="h-px flex-1 bg-ink/10" />
            </div>

            <div className="mt-5 space-y-3">
              {providers.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => signIn(p.id)}
                  disabled={busy !== null}
                  className="inline-flex w-full items-center justify-center gap-2.5 rounded-2xl border border-white/70 bg-card px-3 py-3.5 text-sm font-semibold text-ink shadow-card transition hover:bg-brand/5 disabled:opacity-60 sm:gap-3 sm:px-4 sm:text-base"
                >
                  <span className="shrink-0">
                    {busy === p.id ? <Loader2 size={18} className="animate-spin" /> : p.icon}
                  </span>
                  <span className="truncate">{p.label}</span>
                </button>
              ))}
            </div>

            {error && <div className="mt-5 text-sm font-semibold text-destructive">{error}</div>}
            {notice && <div className="mt-5 text-sm font-semibold text-brand-dark">{notice}</div>}

            <div className="mt-6 flex items-start gap-2 rounded-2xl border border-brand/20 bg-brand/8 px-3 py-2.5">
              <ShieldCheck size={16} className="mt-0.5 shrink-0 text-brand-dark" />
              <p className="text-xs leading-relaxed text-ink/70">
                Secure sign-in over an encrypted connection. Temporary or disposable email addresses are not
                supported, so please use a valid Google, Microsoft (Outlook), Apple or personal email account.
              </p>
            </div>

          </div>
        </section>
      </main>
    </>
  );
}
