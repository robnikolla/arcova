import type { Locale } from '@/i18n';

const dictionaries = {
  en: () => import('./en.json').then((m) => m.default),
} satisfies Record<Locale, () => Promise<unknown>>;

export const getDictionary = async (locale: Locale) =>
  (dictionaries[locale] ?? dictionaries.en)();

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;
