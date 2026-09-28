import type { CSSProperties } from 'react';
import { motion, type Variants } from 'motion/react';
import { stackIcons } from '@/data/skills';
import { useI18n } from '@/i18n/context';
import { brandIcons } from '@/lib/brandIcons';
import { BrandIcon } from '../BrandIcon';
import s from './StackMarquee.module.scss';

export function StackMarquee({ variants }: { variants?: Variants }) {
  const { t } = useI18n();
  return (
    <motion.section className={s.card} aria-label={t('stack')} variants={variants}>
      <div className={s.track}>
        {/* The list is rendered twice so the loop has no seam. */}
        {[false, true].map((copy) => (
          <ul key={String(copy)} className={s.list} aria-hidden={copy || undefined}>
            {stackIcons.map((name) => (
              <li
                key={name}
                className={s.item}
                title={brandIcons[name].title}
                style={{ '--brand': `#${brandIcons[name].hex}` } as CSSProperties}
              >
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
    </motion.section>
  );
}
