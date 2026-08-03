import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, EyeOff, Globe, Mail, Lock, Shield, Sparkles, Zap } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [{ title: "Sign In — Anastasis Technologies" }],
  }),
  component: LoginPage,
});

function LoginPage() {
  const [tab, setTab] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const formTitle = tab === "signin" ? "Sign in to your Anastasis account" : "Create your Anastasis account";
  const formCta = tab === "signin" ? "Sign In" : "Sign Up";

  return (
    <SiteLayout>
      <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(48,168,84,0.16),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(48,168,84,0.1),transparent_40%)] pt-24">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-[#f7fcf5] to-[#f2faf0]" />
        <div className="absolute -top-16 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-brand/15 blur-3xl" />
        <div className="absolute top-24 right-0 h-64 w-64 rounded-full bg-brand/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-brand/10 blur-3xl" />

        <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 py-10 lg:py-14">
          <div className="grid w-full gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
            <section className="relative overflow-hidden rounded-[3rem] border border-white/80 bg-white/85 p-8 shadow-[0_40px_120px_-80px_rgba(45,185,115,0.45)] backdrop-blur-2xl lg:p-12">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(120,214,137,0.16),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(83,178,133,0.12),transparent_40%)]" />
              <div className="relative flex h-full flex-col justify-between gap-10">
                <div className="space-y-8">
                  <div className="flex items-center gap-4">
                    <img
                      src="/LOGO.png"
                      alt="Anastasis Technologies"
                      className="h-14 w-auto max-w-[180px]"
                    />
                    <div className="text-sm uppercase tracking-[0.32em] text-ink/60">Anastasis Technologies Pvt Ltd</div>
                  </div>

                  <div className="max-w-2xl space-y-5">
                    <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-dark/90">Engineering the</p>
                    <h1 className="text-5xl font-black leading-[0.98] tracking-[-0.04em] text-ink sm:text-6xl">
                      <span className="block">Engineering the</span>
                      <span className="block text-brand">resurrection of</span>
                      <span className="block text-ink">tech.</span>
                    </h1>
                    <p className="max-w-xl text-base leading-8 text-ink/70">
                      Anastasis Technologies Pvt Ltd crafts premium digital systems where minimalism meets depth — secure, fast, and beautifully human.
                    </p>
                  </div>
                </div>

                <div className="grid gap-4">
                  {[
                    {
                      icon: Shield,
                      title: "Fast Secure Reliable Services",
                      desc: "Built for dependable delivery",
                    },
                    {
                      icon: Zap,
                      title: "24/7 Operational Stages",
                      desc: "Always-on execution and support",
                    },
                    {
                      icon: Sparkles,
                      title: "Research · Recursion · Revival · Impact",
                      desc: "Purpose-driven innovation",
                    },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.title}
                        className="rounded-3xl border border-emerald-200/80 bg-white/85 p-5 shadow-[0_18px_45px_-30px_rgba(48,168,84,0.45)]"
                      >
                        <div className="flex items-start gap-4">
                          <div className="grid h-12 w-12 place-items-center rounded-3xl bg-brand/10 text-brand shadow-glow">
                            <Icon size={20} />
                          </div>
                          <div>
                            <h2 className="text-base font-semibold text-ink">{item.title}</h2>
                            <p className="mt-1 text-sm leading-6 text-ink/60">{item.desc}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            <section className="relative overflow-hidden rounded-[3rem] border border-white/80 bg-white/90 p-8 shadow-glow backdrop-blur-2xl lg:p-10">
              <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-brand/10 blur-3xl" />
              <div className="relative space-y-8">
                <div className="space-y-3">
                  <p className="text-xs uppercase tracking-[0.36em] text-brand-dark/80">Welcome back</p>
                  <h2 className="text-3xl font-bold tracking-[-0.03em] text-ink sm:text-4xl">
                    {formTitle}
                  </h2>
                  <p className="text-sm leading-6 text-ink/60">
                    Continue building the future of technology.
                  </p>
                </div>

                <Tabs defaultValue="signin" onValueChange={(value) => setTab(value as "signin" | "signup")}> 
                  <TabsList className="rounded-full bg-slate-100/80 p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
                    <TabsTrigger
                      value="signin"
                      className="rounded-full px-5 py-2 text-sm font-semibold text-ink data-[state=active]:bg-brand data-[state=active]:text-white"
                    >
                      Sign In
                    </TabsTrigger>
                    <TabsTrigger
                      value="signup"
                      className="rounded-full px-5 py-2 text-sm font-semibold text-ink data-[state=active]:bg-brand data-[state=active]:text-white"
                    >
                      Sign Up
                    </TabsTrigger>
                  </TabsList>

                  {(["signin", "signup"] as const).map((value) => (
                    <TabsContent key={value} value={value}>
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                          <div className="relative">
                            <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/50" />
                            <Input
                              id="email"
                              type="email"
                              value={email}
                              onChange={(event) => setEmail(event.target.value)}
                              placeholder="you@anastasis.tech"
                              className="pl-11"
                              required
                            />
                          </div>

                          <div className="relative">
                            <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/50" />
                            <Input
                              id="password"
                              type={showPassword ? "text" : "password"}
                              value={password}
                              onChange={(event) => setPassword(event.target.value)}
                              placeholder="Password"
                              className="pr-11 pl-11"
                              required
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword((value) => !value)}
                              className="absolute right-3 top-1/2 inline-flex h-9 w-9 items-center justify-center rounded-full text-ink/50 transition hover:text-ink"
                              aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                          </div>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                          <div className="text-sm text-ink/60">&nbsp;</div>
                          <a href="#" className="text-sm font-medium text-brand-dark transition hover:text-brand">
                            Forgot password?
                          </a>
                        </div>

                        <div className="space-y-4">
                          <Button type="submit" className="w-full rounded-3xl bg-brand px-5 py-3 text-base font-semibold shadow-glow hover:bg-brand-dark">
                            {formCta}
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            className="w-full rounded-3xl border-slate-200 bg-white text-ink shadow-sm hover:bg-slate-50"
                          >
                            <Globe size={18} />
                            Sign in with Google
                          </Button>
                        </div>
                      </form>
                    </TabsContent>
                  ))}
                </Tabs>

                <div className="rounded-3xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-center text-xs uppercase tracking-[0.32em] text-ink/50">
                  Secure connection
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
