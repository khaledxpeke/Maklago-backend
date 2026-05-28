import { describe, expect, it } from 'vitest';
import { createTranslator, normalizeLang } from './index';

describe('normalizeLang', () => {
  it('defaults to fr', () => {
    expect(normalizeLang(undefined)).toBe('fr');
    expect(normalizeLang('')).toBe('fr');
    expect(normalizeLang('de')).toBe('fr');
  });

  it('accepts primary subtags and regions', () => {
    expect(normalizeLang('en')).toBe('en');
    expect(normalizeLang('en-US')).toBe('en');
    expect(normalizeLang('ar-TN')).toBe('ar');
    expect(normalizeLang('FR')).toBe('fr');
  });
});

describe('createTranslator', () => {
  it('translates known keys', () => {
    expect(createTranslator('fr')('errors.invalid_credentials')).toContain('mot de passe');
    expect(createTranslator('ar')('errors.invalid_credentials')).toMatch(/[\u0600-\u06FF]/);
  });

  it('falls back to fr then key', () => {
    const t = createTranslator('en');
    expect(t('errors.not_found')).toBe('Not found');
    expect(t('missing.key.xyz')).toBe('missing.key.xyz');
  });
});
