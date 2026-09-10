import { education } from '@/data/education';
import { useI18n } from '@/i18n/context';
import { formatRange } from '@/lib/format';
import { Section } from './Section';
import s from './Timeline.module.scss';

export function EducationSection() {
  const { t, l, locale } = useI18n();
  return (
    <Section id="education" title={t('education')}>
      <ol className={s.timeline}>
        {education.map((item) => (
          <li key={item.id} className={s.entry}>
            <p className={s.when}>{formatRange(item.start, item.end, locale, t('present'))}</p>
            <div className={s.what}>
              <h3 className={s.heading}>{l(item.title)}</h3>
              <p className={s.where}>{l(item.org)}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
