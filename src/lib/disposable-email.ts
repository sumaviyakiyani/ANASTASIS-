/** Blocklist of common temporary / disposable email providers. */
const DISPOSABLE_DOMAINS = new Set([
  "10minutemail.com",
  "20minutemail.com",
  "33mail.com",
  "anonbox.net",
  "burnermail.io",
  "dispostable.com",
  "emailondeck.com",
  "fakeinbox.com",
  "getairmail.com",
  "getnada.com",
  "guerrillamail.com",
  "guerrillamail.info",
  "harakirimail.com",
  "inboxbear.com",
  "mail-temp.com",
  "mail7.io",
  "mailcatch.com",
  "maildrop.cc",
  "mailinator.com",
  "mailnesia.com",
  "mailsac.com",
  "mintemail.com",
  "moakt.com",
  "mohmal.com",
  "mytemp.email",
  "nada.email",
  "sharklasers.com",
  "spam4.me",
  "temp-mail.io",
  "temp-mail.org",
  "tempail.com",
  "tempinbox.com",
  "tempm.com",
  "tempmail.com",
  "tempmail.dev",
  "tempmail.plus",
  "tempmailo.com",
  "tempr.email",
  "throwawaymail.com",
  "trashmail.com",
  "trashmail.de",
  "tmail.ws",
  "yopmail.com",
  "yopmail.fr",
  "yopmail.net",
]);

const DISPOSABLE_PATTERNS = [/(^|\.)temp-?mail\./i, /(^|\.)throwaway/i, /(^|\.)trashmail\./i, /(^|\.)mailinator\./i];

export const TEMP_EMAIL_MESSAGE =
  "Temporary email addresses are not supported. Please use a valid Google, Microsoft, or Apple account.";

export function isDisposableEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  const domain = email.trim().toLowerCase().split("@")[1];
  if (!domain) return false;
  if (DISPOSABLE_DOMAINS.has(domain)) return true;
  return DISPOSABLE_PATTERNS.some((re) => re.test(domain));
}
