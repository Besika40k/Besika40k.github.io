import { achievements } from '@/data/achievements';
import { useI18n } from '@/i18n/context';
import { formatMonth } from '@/lib/format';
import { Section } from './Section';
import s from './AchievementsSection.module.scss';

export function AchievementsSection() {
  const { t, l, locale } = useI18n();
  return (
    <Section id="achievements" title={t('achievements')}>
      <ul className={s.grid}>
        {achievements.map((item) => (
          <li key={item.id} className={item.placeholder ? `${s.card} ${s.placeholder}` : s.card}>
            <h3 className={s.title}>{l(item.title)}</h3>
            <p className={s.detail}>{l(item.detail)}</p>
            {item.placeholder ? (
              <p className={s.meta}>{t('comingSoon')}</p>
            ) : (
              item.date && <p className={s.meta}>{formatMonth(item.date, locale)}</p>
            )}
          </li>
        ))}
      </ul>
    </Section>
  );
}
