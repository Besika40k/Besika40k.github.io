import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { Locale, Localized } from '@/data/types';
import { strings, type StringKey } from './strings';
import { I18nContext } from './context';

const STORAGE_KEY = 'locale';

const readStoredLocale = (): Locale => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'en' || stored === 'ka') return stored;
  } catch {
    // Storage can be blocked; fall through to the default.
  }
  return 'en';
};

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(readStoredLocale);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Non-essential preference; ignore.
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      t: (key: StringKey) => strings[key][locale],
      l: (text: Localized) => text[locale],
    }),
    [locale, setLocale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}
