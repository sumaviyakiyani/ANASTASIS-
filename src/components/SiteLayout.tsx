import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { Menu, X, Mail, Phone, MapPin, Linkedin, Twitter, Github, Facebook, UserCircle } from "lucide-react";
import headerLogo from "@/assets/LOGO.png";
import defaultLogo from "@/assets/anastasis-logo-mark.png.asset.json";
import { useSession } from "@/hooks/useSession";

const nav = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/premium", label: "Premium" },
  { to: "/blog", label: "Insights" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;


export function Navbar({ logoSrc }: { logoSrc?: string }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { session } = useSession();


  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 border-b border-brand/10 backdrop-blur-xl transition-all duration-300 ${
        scrolled
          ? "bg-[linear-gradient(135deg,oklch(0.995_0.008_95/0.96)_0%,oklch(0.97_0.015_100/0.94)_100%)] shadow-[0_10px_35px_-20px_oklch(0.45_0.05_150/0.16)]"
          : "bg-[linear-gradient(135deg,oklch(0.998_0.004_95/0.9)_0%,oklch(0.973_0.012_100/0.86)_100%)]"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link to="/" className="flex shrink-0 items-center gap-2">
          <img
            src={logoSrc ?? headerLogo}
            alt=""
            className="h-8 w-auto object-contain sm:h-9 md:h-10"
          />
        </Link>


        <nav className="hidden lg:flex items-center gap-1">
          {nav.map((n) => {
            const active = pathname === n.to;
            return (
              <Link
                key={n.to}
                to={n.to}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  active
                    ? "bg-gradient-brand text-white shadow-glow"
                    : "text-ink/80 hover:text-ink hover:bg-brand/10"
                }`}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-2">
          {session ? (
            <Link
              to="/account"
              className="inline-flex items-center gap-2 rounded-full border border-brand/30 px-4 py-2.5 text-sm font-semibold text-ink transition hover:bg-brand/10"
            >
              <UserCircle size={16} /> Account
            </Link>
          ) : (
            <Link
              to="/auth"
              className="rounded-full px-4 py-2.5 text-sm font-semibold text-ink/80 transition hover:text-ink hover:bg-brand/10"
            >
              Sign in
            </Link>
          )}
          <Link
            to={session ? "/premium" : "/auth"}
            className="rounded-full bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-105"
          >
            {session ? "Go Premium" : "Get Started"}
          </Link>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden rounded-lg border border-brand/10 bg-[linear-gradient(135deg,oklch(0.995_0.008_95/0.96)_0%,oklch(0.97_0.015_100/0.94)_100%)] p-2 text-ink shadow-sm backdrop-blur"
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-brand/10 bg-[linear-gradient(135deg,oklch(0.995_0.008_95/0.96)_0%,oklch(0.97_0.015_100/0.94)_100%)] animate-fade-up backdrop-blur-xl">

          <div className="mx-auto flex max-h-[70vh] max-w-7xl flex-col gap-1 overflow-y-auto px-4 py-4 sm:px-6">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="px-4 py-3 rounded-lg text-ink/90 hover:bg-brand/10 font-medium"
              >
                {n.label}
              </Link>
            ))}
            <Link
              to={session ? "/account" : "/auth"}
              className="px-4 py-3 rounded-lg text-ink/90 hover:bg-brand/10 font-medium"
            >
              {session ? "My account" : "Sign in"}
            </Link>
            <Link
              to={session ? "/premium" : "/auth"}
              className="mt-2 text-center rounded-full bg-gradient-brand px-5 py-3 font-semibold text-white"
            >
              {session ? "Go Premium" : "Get Started"}
            </Link>
          </div>
        </div>

      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="relative mt-24 bg-gradient-dark text-ink/80 border-t border-brand/20">
      <div className="absolute inset-0 bg-gradient-radial opacity-40 pointer-events-none" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 md:py-16 lg:grid-cols-4">
        <div>
          <img src={defaultLogo.url} alt="Anastasis" className="h-12 w-auto" />
          <p className="mt-4 text-sm text-ink/60 leading-relaxed">
            Research · Innovation · Recursion · Revival · Impact. Building tomorrow's software today.
          </p>
        </div>

        <div>
          <h4 className="text-ink font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            {nav.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="hover:text-brand-dark transition">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-ink font-semibold mb-4">Contact</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2"><MapPin size={16} className="mt-0.5 text-brand-dark shrink-0" /> Islamabad, Pakistan</li>
            <li className="flex items-center gap-2 min-w-0"><Mail size={16} className="text-brand-dark shrink-0" /> <span className="truncate">hello@anastasis.tech</span></li>
            <li className="flex items-center gap-2"><Phone size={16} className="text-brand-dark shrink-0" /> +92 370 880 8903</li>
          </ul>

        </div>

        <div>
          <h4 className="text-ink font-semibold mb-4">Follow</h4>
          <div className="flex gap-3">
            {[Linkedin, Twitter, Github, Facebook].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="grid place-items-center h-10 w-10 rounded-full glass-dark text-ink hover:bg-gradient-brand hover:text-white transition"
                aria-label="Social link"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="relative border-t border-brand/20">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-2 px-4 py-5 text-xs text-ink/60 sm:px-6">
          <span>© {new Date().getFullYear()} Anastasis Technologies Pvt Ltd. All rights reserved.</span>
          <span>Research | Innovation | Recursion | Revival | Impact</span>
        </div>
      </div>
    </footer>
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`px-4 py-16 sm:px-6 sm:py-20 md:py-28 ${className}`}>
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  );
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-dark px-4 pb-16 pt-32 text-ink sm:px-6 sm:pt-36 md:pb-20 lg:pt-40">
      <div className="absolute inset-0 bg-gradient-radial opacity-60" />
      <div className="absolute -top-32 -right-32 h-72 w-72 rounded-full bg-brand/20 blur-3xl sm:h-96 sm:w-96" />
      <div className="relative mx-auto max-w-4xl text-center animate-fade-up">
        {eyebrow && (
          <span className="inline-block rounded-full glass-dark px-4 py-1.5 text-[0.65rem] font-medium uppercase tracking-widest text-brand-dark sm:text-xs">
            {eyebrow}
          </span>
        )}
        <h1 className="mt-6 text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl">
          <span className="text-gradient-brand">{title}</span>
        </h1>
        {subtitle && <p className="mx-auto mt-6 max-w-2xl text-base text-ink/70 sm:text-lg">{subtitle}</p>}
      </div>
    </section>
  );
}

