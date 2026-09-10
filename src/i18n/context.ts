import { createContext, useContext } from 'react';
import type { Locale, Localized } from '@/data/types';
import type { StringKey } from './strings';

interface I18nValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  /** UI string by key */
  t: (key: StringKey) => string;
  /** Pick the current language from a Localized value */
  l: (text: Localized) => string;
}

export const I18nContext = createContext<I18nValue | null>(null);

export function useI18n() {
  const value = useContext(I18nContext);
  if (!value) throw new Error('useI18n must be used inside <I18nProvider>');
  return value;
}
