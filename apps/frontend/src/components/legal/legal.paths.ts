/**
 * Public legal routes for the self-hosted "Postiz Akorda" instance.
 *
 * These paths must stay stable: they are submitted to the TikTok developer
 * program as the Terms of Service URL and the Privacy Policy URL, and they
 * are allow-listed as public (no login) in `apps/frontend/src/proxy.ts`.
 * Do not rename them without updating the TikTok app configuration.
 */
export const LEGAL_PUBLIC_PATHS = [
  '/terms-of-service',
  '/privacy-policy',
] as const;

export type LegalPublicPath = (typeof LEGAL_PUBLIC_PATHS)[number];

export type LegalLang = 'es' | 'en';

/**
 * Picks the legal-page language from the project's i18n cookie
 * (`i18next`) or the language header resolved by `proxy.ts`
 * (`x-i18next-current-language`, which already falls back to
 * `Accept-Language`). Anything that is not Spanish renders English,
 * which is also what third-party reviewers (e.g. TikTok) get by default.
 */
export function resolveLegalLang(
  cookieLang?: string | null,
  headerLang?: string | null,
): LegalLang {
  const value = (cookieLang || headerLang || '').toLowerCase();
  return value.startsWith('es') ? 'es' : 'en';
}
