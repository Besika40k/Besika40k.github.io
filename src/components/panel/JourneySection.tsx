import { education } from '@/data/education';
import { experience } from '@/data/experience';
import type { Localized, YearMonth } from '@/data/types';
import { useI18n } from '@/i18n/context';
import { formatRange } from '@/lib/format';
import { Section } from './Section';
import s from './JourneySection.module.scss';

// One rune per stop on the spine, in timeline order.
const RUNES = 'ᚹᛗᛚᛈᚷᛏᛒᚠᚢᚦᚨᚱ';

interface Stop {
  id: string;
  kind: 'work' | 'study';
  title: Localized;
  org: Localized;
  start?: YearMonth;
  end?: YearMonth | null;
  points: Localized[];
}

// Work and study merged into one timeline, newest start first.
const stops: Stop[] = [
  ...experience.map((job) => ({
    id: job.id,
    kind: 'work' as const,
    title: job.role,
    org: job.org,
    start: job.start,
    end: job.end,
    points: job.points,
  })),
  ...education.map((item) => ({
    id: item.id,
    kind: 'study' as const,
    title: item.title,
    org: item.org,
    start: item.start,
    end: item.end,
    points: [],
  })),
].sort((a, b) => (b.start ?? '').localeCompare(a.start ?? ''));

export function JourneySection() {
  const { t, l, locale } = useI18n();
  return (
    <Section id="journey" title={t('journey')}>
      <div className={s.legend} aria-hidden="true">
        <span className={s.key} data-kind="work">
          {t('work')}
        </span>
        <span className={s.key} data-kind="study">
          {t('study')}
        </span>
      </div>

      <ol className={s.spine}>
        {stops.map((stop, i) => (
          <li key={stop.id} className={s.stop} data-kind={stop.kind}>
            <span className={s.node} aria-hidden="true">
              {RUNES[i % RUNES.length]}
            </span>
            <p className={s.when}>
              <span className="visually-hidden">{t(stop.kind)}: </span>
              {formatRange(stop.start, stop.end, locale, t('present'))}
            </p>
            <h3 className={s.title}>
              {l(stop.title)}, {l(stop.org)}
            </h3>
            {stop.points.length > 0 && (
              <ul className={s.points}>
                {stop.points.map((point) => (
                  <li key={point.en}>{l(point)}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ol>
    </Section>
  );
}
