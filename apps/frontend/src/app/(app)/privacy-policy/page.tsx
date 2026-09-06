export const dynamic = 'force-dynamic';
import type { Metadata } from 'next';
import { cookies, headers } from 'next/headers';
import { cookieName, headerName } from '@gitroom/react/translation/i18n.config';
import { LegalPage } from '@gitroom/frontend/components/legal/legal-page.component';
import { privacyPolicy } from '@gitroom/frontend/components/legal/legal.content';
import { resolveLegalLang } from '@gitroom/frontend/components/legal/legal.paths';

export const metadata: Metadata = {
  title: 'Privacy Policy — Postiz Akorda',
  description:
    'Privacy Policy of Postiz Akorda (postiz.akorda.es): how the private, self-hosted Postiz instance operated by Albert Álvarez Estellés (Akorda) handles TikTok and account data under the GDPR.',
};

export default async function PrivacyPolicyPage() {
  const cookieStore = await cookies();
  const headerStore = await headers();
  const lang = resolveLegalLang(
    cookieStore.get(cookieName)?.value,
    headerStore.get(headerName),
  );
  return <LegalPage doc={privacyPolicy[lang]} lang={lang} />;
}
