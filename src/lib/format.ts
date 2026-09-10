import type { Locale, YearMonth } from '@/data/types';

const intlLocale: Record<Locale, string> = { en: 'en-US', ka: 'ka-GE' };

export function formatMonth(value: YearMonth, locale: Locale) {
  const [year, month] = value.split('-').map(Number);
  return new Intl.DateTimeFormat(intlLocale[locale], { month: 'short', year: 'numeric' }).format(
    new Date(year, month - 1, 1),
  );
}

/** "Oct 2025 – Present", or a single month when start and end match. */
export function formatRange(
  start: YearMonth | undefined,
  end: YearMonth | null | undefined,
  locale: Locale,
  presentLabel: string,
) {
  if (!start) return '';
  const from = formatMonth(start, locale);
  if (end === undefined) return from;
  if (end === start) return from;
  return `${from} – ${end === null ? presentLabel : formatMonth(end, locale)}`;
}

export function formatClock(date: Date, timeZone: string) {
  return new Intl.DateTimeFormat('en-GB', {
    timeZone,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(date);
}
