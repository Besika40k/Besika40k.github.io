import { useCallback, useSyncExternalStore } from 'react';

// Theme = the OS preference, unless the visitor overrode it with the toggle.
// The override lives in localStorage and as data-theme on <html>; index.html
// applies it before first paint so there is no flash.

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'theme';
const CHANGE_EVENT = 'themechange';
const systemQuery = () => window.matchMedia('(prefers-color-scheme: dark)');

const systemTheme = (): Theme => (systemQuery().matches ? 'dark' : 'light');

export const resolvedTheme = (): Theme => {
  const override = document.documentElement.dataset.theme;
  return override === 'light' || override === 'dark' ? override : systemTheme();
};

function setOverride(theme: Theme | null) {
  const root = document.documentElement;
  if (theme) root.dataset.theme = theme;
  else delete root.dataset.theme;
  try {
    if (theme) localStorage.setItem(STORAGE_KEY, theme);
    else localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Storage blocked: the choice lasts for this visit only.
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

/** Calls `onChange` whenever the resolved theme may have changed. */
export function subscribeToTheme(onChange: () => void) {
  const query = systemQuery();
  query.addEventListener('change', onChange);
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => {
    query.removeEventListener('change', onChange);
    window.removeEventListener(CHANGE_EVENT, onChange);
  };
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribeToTheme, resolvedTheme);

  const toggle = useCallback(() => {
    const next: Theme = resolvedTheme() === 'dark' ? 'light' : 'dark';
    // Landing back on the OS preference clears the override, so the site follows the OS again.
    setOverride(next === systemTheme() ? null : next);
  }, []);

  return { theme, toggle };
}
