export const dynamic = 'force-dynamic';
import type { Metadata } from 'next';
import { cookies, headers } from 'next/headers';
import { cookieName, headerName } from '@gitroom/react/translation/i18n.config';
import { LegalPage } from '@gitroom/frontend/components/legal/legal-page.component';
import { termsOfService } from '@gitroom/frontend/components/legal/legal.content';
import { resolveLegalLang } from '@gitroom/frontend/components/legal/legal.paths';

export const metadata: Metadata = {
  title: 'Terms of Service — Postiz Akorda',
  description:
    'Terms of Service of Postiz Akorda (postiz.akorda.es): private, self-hosted Postiz instance operated by Albert Álvarez Estellés (Akorda), including the TikTok integration rules.',
};

export default async function TermsOfServicePage() {
  const cookieStore = await cookies();
  const headerStore = await headers();
  const lang = resolveLegalLang(
    cookieStore.get(cookieName)?.value,
    headerStore.get(headerName),
  );
  return <LegalPage doc={termsOfService[lang]} lang={lang} />;
}
