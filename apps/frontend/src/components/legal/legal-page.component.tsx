'use client';

import { useRouter } from 'next/navigation';
import useCookie from 'react-use-cookie';
import clsx from 'clsx';
import { LogoTextComponent } from '@gitroom/frontend/components/ui/logo-text.component';
import { cookieName } from '@gitroom/react/translation/i18n.config';
import type { LegalDoc } from './legal.content';
import { legalNav } from './legal.content';
import type { LegalLang } from './legal.paths';

export function LegalPage({ doc, lang }: { doc: LegalDoc; lang: LegalLang }) {
  const router = useRouter();
  const [, setCookie] = useCookie(cookieName, lang);
  const nav = legalNav[lang];

  const switchLang = (next: LegalLang) => {
    if (next === lang) {
      return;
    }
    setCookie(next);
    router.refresh();
  };

  return (
    <div className="min-h-screen w-full bg-[#0E0E0E] text-white flex justify-center px-[12px] py-[24px]">
      <div className="w-full max-w-[820px] rounded-[12px] bg-[#1A1919] p-[24px] md:p-[40px]">
        <div className="flex items-center justify-between gap-[16px]">
          <a href="/auth/login" aria-label="Postiz Akorda">
            <LogoTextComponent />
          </a>
          <div
            className="flex items-center gap-[8px] text-[12px]"
            aria-label={nav.switchLanguage}
          >
            <span className="text-white/50">{nav.switchLanguage}:</span>
            {(['es', 'en'] as const).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => switchLang(option)}
                className={clsx(
                  'rounded-[6px] px-[10px] py-[4px] uppercase',
                  option === lang
                    ? 'bg-[#612BD3] text-white'
                    : 'bg-[#2A2929] text-white/70 hover:text-white',
                )}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <h1 className="mt-[32px] text-[32px] font-[500] -tracking-[0.8px]">
          {doc.title}
        </h1>
        <p className="mt-[8px] text-[12px] text-white/50">
          {doc.effectiveLabel}: {doc.effectiveDate} · {doc.updatedLabel}:{' '}
          {doc.lastUpdated}
        </p>
        <p className="mt-[16px] text-[14px] leading-[1.7] text-white/80">
          {doc.intro}
        </p>

        {doc.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="mb-[12px] mt-[28px] text-[20px] font-[600]">
              {section.heading}
            </h2>
            {section.paragraphs.map((paragraph, index) => (
              <p
                key={`${section.heading}-p-${index}`}
                className="mb-[10px] text-[14px] leading-[1.7] text-white/80"
              >
                {paragraph}
              </p>
            ))}
            {section.list && (
              <ul className="mb-[10px] list-disc ps-[20px]">
                {section.list.map((item, index) => (
                  <li
                    key={`${section.heading}-li-${index}`}
                    className="mb-[8px] text-[14px] leading-[1.7] text-white/80"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}

        <div className="mt-[40px] flex flex-wrap items-center justify-center gap-[12px] border-t border-white/10 pt-[24px] text-[13px]">
          <a href="/terms-of-service" className="underline hover:font-bold">
            {nav.termsLink}
          </a>
          <span className="text-white/30">·</span>
          <a href="/privacy-policy" className="underline hover:font-bold">
            {nav.privacyLink}
          </a>
          <span className="text-white/30">·</span>
          <a href="/auth/login" className="underline hover:font-bold">
            {nav.backToLogin}
          </a>
        </div>
        <p className="mt-[16px] text-center text-[12px] text-white/40">
          {nav.brandNote}
        </p>
      </div>
    </div>
  );
}
