import { langSupport, translationSupport, rtlSupport } from './i18n';

describe('i18n functions', () => {
  test('langSupport returns object containing current language', () => {
    expect(langSupport('fr').lang.value).toBe('fr');
  });

  test('langSupport returns object containing function for changing language', () => {
    const curLang = langSupport('fr');
    expect(curLang.lang.value).toBe('fr');
    curLang.updateLang('en');
    expect(curLang.lang.value).toBe('en');
  });

  test('translationSupport returns object containing all languages', () => {
    const curLang = translationSupport({
      fr: { slider: 'glisseur' }
    });
    expect(curLang.fr.slider.toLowerCase()).toBe('glisseur');
    expect(curLang.en.close.toLowerCase()).toBe('close');
  });

  test('translationSupport allows overwrite of original translations', () => {
    const curLang = translationSupport({
      fr: { slider: 'glisseur' },
      en: { close: 'shut' }
    });
    expect(curLang.en.close).toBe('shut');
  });

  test('rtlSupport returns object containing set rtl state', () => {
    expect(rtlSupport(true).rtl.value).toBe(true);
  });

  test('rtlSupport returns object containing function for changing rtl state', () => {
    const curRtl = rtlSupport(false);
    expect(curRtl.rtl.value).toBe(false);
    curRtl.updateRtl(true);
    expect(curRtl.rtl.value).toBe(true);
  });
});