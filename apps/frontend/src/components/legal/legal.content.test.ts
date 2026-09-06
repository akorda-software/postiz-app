import { describe, expect, it } from 'vitest';
import { LEGAL_PUBLIC_PATHS, resolveLegalLang } from './legal.paths';
import { legalNav, privacyPolicy, termsOfService } from './legal.content';

const CONTACT_EMAIL = 'hola@akorda.es';

describe('public legal routes', () => {
  it('exposes stable TikTok-review paths', () => {
    expect([...LEGAL_PUBLIC_PATHS]).toEqual([
      '/terms-of-service',
      '/privacy-policy',
    ]);
  });
});

describe('resolveLegalLang', () => {
  it('renders Spanish for es cookie/header values', () => {
    expect(resolveLegalLang('es')).toBe('es');
    expect(resolveLegalLang(null, 'es-ES')).toBe('es');
    expect(resolveLegalLang(undefined, 'es')).toBe('es');
  });

  it('defaults to English (third-party reviewers included)', () => {
    expect(resolveLegalLang()).toBe('en');
    expect(resolveLegalLang(null, 'en-US')).toBe('en');
    expect(resolveLegalLang('fr', 'fr-FR')).toBe('en');
  });
});

describe.each([
  ['termsOfService', termsOfService],
  ['privacyPolicy', privacyPolicy],
] as const)('%s', (_name, doc) => {
  it('has complete es and en versions with sections', () => {
    for (const lang of ['es', 'en'] as const) {
      expect(doc[lang].title.length).toBeGreaterThan(0);
      expect(doc[lang].intro.length).toBeGreaterThan(0);
      expect(doc[lang].sections.length).toBeGreaterThanOrEqual(10);
      for (const section of doc[lang].sections) {
        expect(section.heading.length).toBeGreaterThan(0);
        expect(section.paragraphs.length).toBeGreaterThan(0);
      }
    }
  });

  it('identifies the real operator and contact (no invented company)', () => {
    for (const lang of ['es', 'en'] as const) {
      const text = JSON.stringify(doc[lang]);
      expect(text).toContain('Albert');
      expect(text).toContain(CONTACT_EMAIL);
      // Akorda is a brand operated by a sole trader, never a corporation.
      expect(text).not.toMatch(/Akorda (Inc|LLC|Ltd|S\.L\.|GmbH)/);
    }
  });

  it('covers TikTok integration, revocation and contact', () => {
    for (const lang of ['es', 'en'] as const) {
      const text = JSON.stringify(doc[lang]);
      expect(text).toContain('TikTok');
      expect(text).toContain(CONTACT_EMAIL);
    }
  });

  it('privacy lists the exact TikTok scopes requested', () => {
    if (_name !== 'privacyPolicy') {
      return;
    }
    for (const lang of ['es', 'en'] as const) {
      const text = JSON.stringify(doc[lang]);
      expect(text).toContain('video.upload');
      expect(text).toContain('video.publish');
      expect(text).toContain('user.info.basic');
    }
  });

  it('terms reference TikTok rules and revocation', () => {
    if (_name !== 'termsOfService') {
      return;
    }
    for (const lang of ['es', 'en'] as const) {
      const text = JSON.stringify(doc[lang]);
      expect(text).toContain('https://www.tiktok.com/legal/terms-of-service');
      expect(text).toContain('https://postiz.akorda.es/privacy-policy');
    }
  });

  it('shows effective and last-updated dates', () => {
    for (const lang of ['es', 'en'] as const) {
      expect(doc[lang].effectiveDate).toContain('2026');
      expect(doc[lang].lastUpdated).toContain('2026');
    }
  });

  it('makes no unverifiable security claims', () => {
    for (const lang of ['es', 'en'] as const) {
      const text = JSON.stringify(doc[lang]).toLowerCase();
      // Tokens are stored without at-rest encryption (verified in
      // integration.repository.ts), so the legal text must not claim it.
      expect(text).not.toContain('encrypt');
      expect(text).not.toContain('cifrad');
    }
  });

  it('does not point to Postiz Cloud legal pages', () => {
    for (const lang of ['es', 'en'] as const) {
      expect(JSON.stringify(doc[lang])).not.toContain('postiz.com');
    }
  });
});

describe('legalNav', () => {
  it('has es and en labels', () => {
    expect(legalNav.es.backToLogin.length).toBeGreaterThan(0);
    expect(legalNav.en.backToLogin.length).toBeGreaterThan(0);
  });
});
