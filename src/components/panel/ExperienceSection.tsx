import { experience } from '@/data/experience';
import { useI18n } from '@/i18n/context';
import { formatRange } from '@/lib/format';
import { Section } from './Section';
import s from './Timeline.module.scss';

export function ExperienceSection() {
  const { t, l, locale } = useI18n();
  return (
    <Section id="experience" title={t('experience')}>
      <ol className={s.timeline}>
        {experience.map((job) => (
          <li key={job.id} className={s.entry}>
            <p className={s.when}>{formatRange(job.start, job.end, locale, t('present'))}</p>
            <div className={s.what}>
              <h3 className={s.heading}>{l(job.role)}</h3>
              <p className={s.where}>
                {l(job.org)}, {l(job.place)}
              </p>
              <ul className={s.points}>
                {job.points.map((point) => (
                  <li key={point.en}>{l(point)}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
