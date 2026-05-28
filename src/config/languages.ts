/** Supported API languages (IANA primary subtags). */
export const SUPPORTED_LANGS = ['fr', 'en', 'ar'] as const;

export type AppLang = (typeof SUPPORTED_LANGS)[number];

/** Default when `lang` header is missing or unsupported. */
export const DEFAULT_LANG: AppLang = 'fr';

export function isAppLang(value: string): value is AppLang {
  return (SUPPORTED_LANGS as readonly string[]).includes(value);
}
