import { shallowRef, ShallowRef } from 'vue';
import { translations as defaultTranslations } from '../i18n';

export interface TranslationKeys {
  [key: string]: {
    [key: string]: string;
  };
}

export interface FinalTranslationKeys extends TranslationKeys {
  en: {
    [key: string]: string;
  };
}

export interface TranslationSupport {
  lang: ShallowRef<string>;
  translations: FinalTranslationKeys;
  updateLang: (l: string) => void;
  t: (k: string, ...rest: unknown[]) => string;
}

export const langSupport = (l: string) => {
  const lang = shallowRef(l);

  const updateLang = (val: string) => {
    lang.value = val;
  }

  return { lang, updateLang };
}

export const translationSupport = (userTranslations: TranslationKeys): FinalTranslationKeys => {
 return {
    ...userTranslations,
    en: { ...defaultTranslations, ...userTranslations.en },
  }
}

export const rtlSupport = (d: boolean) => {
  const rtl = shallowRef(d);
  const updateRtl = (b: boolean) => {
    rtl.value = b;
  }

  return { rtl, updateRtl };
};

export const i18n = (l: string, userTranslations: TranslationKeys): TranslationSupport => {
  const { lang, updateLang } = langSupport(l);
  const translations = translationSupport(userTranslations);

  const t = (k: string, ...rest: unknown[]): string => {
    let s: string = (translations as TranslationKeys)[lang.value][k];
    const arr: string[] = [];
    
    for (let i = 0; i < s.length; i += 1) {
      if (s[i] === '{') {
        let j = i + 1;
        while (s[j] !== '}') {
          j += 1
        }
        arr.push(s.slice(i, j + 1))
        i = j;
      }
    }

    if (arr.length > 1) {
      arr.sort((a, b) => {
        return +(a.slice(1, -1)) - +(b.slice(1, -1));
      });
    }

    for (let i = 0; i < arr.length; i += 1) {
      s = s.replace(arr[i], `${rest[i]}`);
    }

    return s;
  }

  return {
    lang,
    translations,
    updateLang,
    t,
  }
}
