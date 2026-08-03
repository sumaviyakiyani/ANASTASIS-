import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { Menu, X, Mail, Phone, MapPin, Linkedin, Twitter, Github, Facebook } from "lucide-react";

const nav = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/premium", label: "Premium" },
  { to: "/blog", label: "Insights" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass-dark shadow-elegant"
          : "bg-white/85 backdrop-blur-xl shadow-sm"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img
            src="/LOGO.png"
            alt="Anastasis Technologies"
            className="h-12 w-auto"
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

        <div className="hidden lg:flex items-center gap-5">
          <Link to="/login" className="text-sm font-medium text-ink/80 transition hover:text-brand">
            Sign in
          </Link>
          <Link
            to="/contact"
            className="rounded-full bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-105"
          >
            Get Started
          </Link>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden rounded-lg p-2 text-ink glass-dark"
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden glass-dark border-t border-brand/20 animate-fade-up">

          <div className="mx-auto max-w-7xl px-6 py-4 flex flex-col gap-1">
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
              to="/contact"
              className="mt-2 text-center rounded-full bg-gradient-brand px-5 py-3 font-semibold text-white"
            >
              Get Started
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
      <div className="relative mx-auto max-w-7xl px-6 py-16 grid gap-10 md:grid-cols-4">
        <div>
          <img
            src="/LOGO.png"
            alt="Anastasis"
            className="h-14 w-auto max-w-[220px]"
          />
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
            <li className="flex items-center gap-2"><Mail size={16} className="text-brand-dark shrink-0" /> hello@anastasis.tech</li>
            <li className="flex items-center gap-2"><Phone size={16} className="text-brand-dark shrink-0" /> +92 300 000 0000</li>
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
        <div className="mx-auto max-w-7xl px-6 py-5 text-xs text-ink/60 flex flex-wrap gap-2 justify-between">
          <span>© {new Date().getFullYear()} Anastasis Technologies Pvt Ltd. All rights reserved.</span>
          <span>Research | Innovation | Recursion | Revival | Impact</span>
        </div>
      </div>
    </footer>
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
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
    <section id={id} className={`py-20 md:py-28 px-6 ${className}`}>
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
    <section className="relative pt-40 pb-20 px-6 bg-gradient-dark text-ink overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial opacity-60" />
      <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-brand/20 blur-3xl" />
      <div className="relative mx-auto max-w-4xl text-center animate-fade-up">
        {eyebrow && (
          <span className="inline-block px-4 py-1.5 rounded-full glass-dark text-xs font-medium tracking-widest uppercase text-brand-dark">
            {eyebrow}
          </span>
        )}
        <h1 className="mt-6 text-4xl md:text-6xl font-bold">
          <span className="text-gradient-brand">{title}</span>
        </h1>
        {subtitle && <p className="mt-6 text-lg text-ink/70 max-w-2xl mx-auto">{subtitle}</p>}
      </div>
    </section>
  );
}
