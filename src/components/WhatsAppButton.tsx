const PHONE = "923708808903";
const MESSAGE = "Hello Anastasis Technologies";

interface WhatsAppButtonProps {
  iconOnly?: boolean;
  phone?: string;
  message?: string;
}

export function WhatsAppButton({ iconOnly = false, phone = PHONE, message = MESSAGE }: WhatsAppButtonProps) {
  const href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className={`fixed bottom-5 right-4 z-[60] inline-flex items-center justify-center rounded-full bg-[#25D366] text-white shadow-glow transition-transform hover:scale-105 sm:bottom-6 sm:right-6 ${
        iconOnly ? "p-3" : "gap-2 px-4 py-3 font-semibold"
      }`}
    >
      <svg viewBox="0 0 24 24" className="h-6 w-6 shrink-0" fill="currentColor" aria-hidden>
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm5.8 14.02c-.25.7-1.45 1.34-2 1.39-.55.05-1.06.25-3.66-.78-3.13-1.24-5.1-4.5-5.26-4.71-.15-.2-1.23-1.66-1.23-3.17 0-1.5.79-2.24 1.07-2.55.28-.3.6-.38.8-.38.2 0 .4 0 .58.01.19.01.44-.07.68.53.25.6.85 2.09.92 2.24.08.15.13.33.03.53-.1.2-.35.54-.55.75-.2.2-.28.3-.13.55.15.25.68 1.14 1.47 1.85 1.01.9 1.86 1.18 2.11 1.31.25.13.4.11.55-.07.15-.17.63-.74.8-.99.17-.25.35-.2.58-.12.23.08 1.47.7 1.72.82.25.13.42.19.48.3.06.1.06.64-.19 1.34Z" />
      </svg>
      {!iconOnly && <span className="hidden text-sm sm:inline">WhatsApp</span>}
    </a>
  );
}
