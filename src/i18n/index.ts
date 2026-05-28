import { DEFAULT_LANG, isAppLang, type AppLang } from '../config/languages';
import ar from './locales/ar.json';
import en from './locales/en.json';
import fr from './locales/fr.json';

type Catalog = Record<string, string>;

const catalogs: Record<AppLang, Catalog> = { fr, en, ar };

export type TranslateFn = (key: string, vars?: Record<string, string | number>) => string;

/** Normalize `lang` header / query (e.g. `fr`, `fr-TN`, `en-US`). */
export function normalizeLang(input: string | undefined | null): AppLang {
  if (!input?.trim()) return DEFAULT_LANG;
  const base = input.trim().toLowerCase().split(/[-_]/)[0] ?? '';
  return isAppLang(base) ? base : DEFAULT_LANG;
}

export function createTranslator(lang: AppLang): TranslateFn {
  const primary = catalogs[lang];
  const fallback = catalogs[DEFAULT_LANG];

  return (key: string, vars?: Record<string, string | number>) => {
    let message = primary[key] ?? fallback[key] ?? key;
    if (vars) {
      for (const [name, value] of Object.entries(vars)) {
        message = message.replaceAll(`{{${name}}}`, String(value));
      }
    }
    return message;
  };
}

/** English defaults when no request context (startup / tests). */
export function tDefault(key: string, vars?: Record<string, string | number>): string {
  return createTranslator('en')(key, vars);
}
