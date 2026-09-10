import { stackIcons } from '@/data/skills';
import { useI18n } from '@/i18n/context';
import { brandIcons } from '@/lib/brandIcons';
import { BrandIcon } from '../BrandIcon';
import s from './StackMarquee.module.scss';

export function StackMarquee() {
  const { t } = useI18n();
  return (
    <section className={s.card} aria-label={t('stack')}>
      <div className={s.track}>
        {/* The list is rendered twice so the loop has no seam. */}
        {[false, true].map((copy) => (
          <ul key={String(copy)} className={s.list} aria-hidden={copy || undefined}>
            {stackIcons.map((name) => (
              <li key={name} title={brandIcons[name].title}>
                <BrandIcon
                  name={name}
                  className={s.icon}
                  label={copy ? undefined : brandIcons[name].title}
                />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}
