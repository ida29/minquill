type Dictionary = Record<string, string>;
type Locale = string;

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import("@/dictionaries/en.json").then((module) => module.default),
  ja: () => import("@/dictionaries/ja.json").then((module) => module.default),
};

export const getDictionary = async (locale: Locale): Promise<Dictionary> => {
  if (!dictionaries[locale]) {
    throw new Error(`Dictionary for locale "${locale}" not found`);
  }
  return dictionaries[locale]();
};
