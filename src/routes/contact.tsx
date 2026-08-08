import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Phone, MapPin, Send, Linkedin, Twitter, Github, CheckCircle2 } from "lucide-react";
import { z } from "zod";
import { SiteLayout, Section, PageHero } from "@/components/SiteLayout";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact | Anastasis Technologies" },
      { name: "description", content: "Get in touch with Anastasis Technologies and start your project today." },
      { property: "og:title", content: "Contact · Anastasis Technologies" },
      { property: "og:description", content: "Talk to our team about your next project." },
    ],
  }),
  component: Contact,
});

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  message: z.string().trim().min(5, "Message too short").max(1000),
});

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      return;
    }
    setSent(true);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Contact"
        title="Let's build something great"
        subtitle="Tell us about your project. We'll get back within 1 business day."
      />

      <Section>
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Info card */}
          <div className="lg:col-span-2 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-dark text-ink shadow-elegant relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-radial opacity-50" />
              <div className="relative space-y-5">
                <h3 className="text-2xl font-bold">Reach us directly</h3>
                {[
                  { icon: Mail, label: "hello@anastasis.tech" },
                  { icon: Phone, label: "+92 300 000 0000" },
                  { icon: MapPin, label: "Islamabad, Pakistan" },
                ].map((c) => (
                  <div key={c.label} className="flex items-center gap-4">
                    <div className="grid place-items-center h-12 w-12 rounded-2xl bg-gradient-brand shadow-glow">
                      <c.icon size={20} />
                    </div>
                    <span className="text-ink/90">{c.label}</span>
                  </div>
                ))}
                <div className="pt-4 border-t border-white/10">
                  <div className="text-xs uppercase tracking-widest text-brand-glow mb-3">Follow us</div>
                  <div className="flex gap-3">
                    {[Linkedin, Twitter, Github].map((Icon, i) => (
                      <a key={i} href="#" className="grid place-items-center h-11 w-11 rounded-full glass-dark hover:bg-gradient-brand transition" aria-label="Social">
                        <Icon size={16} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl overflow-hidden shadow-card border">
              <iframe
                title="Map"
                src="https://www.google.com/maps?q=Islamabad,Pakistan&output=embed"
                className="w-full h-64 border-0"
                loading="lazy"
              />
            </div>
          </div>

          {/* Form */}
          <form onSubmit={onSubmit} className="lg:col-span-3 p-6 sm:p-8 md:p-10 rounded-3xl bg-card border shadow-elegant space-y-5">
            <h3 className="text-2xl font-bold">Send us a message</h3>

            <div>
              <label className="text-sm font-semibold">Name</label>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                maxLength={100}
                className="mt-2 w-full rounded-xl border bg-background px-4 py-3 focus:border-brand focus:ring-2 focus:ring-brand/30 outline-none transition"
                placeholder="Your full name"
              />
            </div>
            <div>
              <label className="text-sm font-semibold">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                maxLength={255}
                className="mt-2 w-full rounded-xl border bg-background px-4 py-3 focus:border-brand focus:ring-2 focus:ring-brand/30 outline-none transition"
                placeholder="you@company.com"
              />
            </div>
            <div>
              <label className="text-sm font-semibold">Message</label>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                maxLength={1000}
                rows={6}
                className="mt-2 w-full rounded-xl border bg-background px-4 py-3 focus:border-brand focus:ring-2 focus:ring-brand/30 outline-none transition resize-none"
                placeholder="Tell us about your project…"
              />
            </div>

            {error && <div className="text-sm text-destructive">{error}</div>}
            {sent && (
              <div className="flex items-center gap-2 text-sm text-brand font-semibold">
                <CheckCircle2 size={18} /> Message sent. We'll be in touch soon.
              </div>
            )}

            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-brand text-white px-8 py-3.5 font-semibold shadow-glow hover:scale-105 transition-transform"
            >
              Send Message <Send size={18} />
            </button>
          </form>
        </div>
      </Section>
    </SiteLayout>
  );
}
