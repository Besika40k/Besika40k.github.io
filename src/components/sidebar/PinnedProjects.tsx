import { Pin } from 'lucide-react';
import { motion, type Variants } from 'motion/react';
import { projects } from '@/data/projects';
import { useI18n } from '@/i18n/context';
import { BrandIcon } from '../BrandIcon';
import s from './PinnedProjects.module.scss';

const pinned = projects.filter((project) => project.pinned);

interface PinnedProjectsProps {
  onOpen: (id: string) => void;
  variants?: Variants;
}

export function PinnedProjects({ onOpen, variants }: PinnedProjectsProps) {
  const { t, l } = useI18n();
  return (
    <motion.section className={s.card} aria-labelledby="pinned-title" variants={variants} data-grow>
      <h2 id="pinned-title" className={s.title}>
        <Pin size={14} aria-hidden="true" />
        {t('pinned')}
      </h2>
      <ul className={s.list}>
        {pinned.map((project) => (
          <li key={project.id}>
            <button type="button" className={s.item} onClick={() => onOpen(project.id)}>
              <span className={s.thumb}>
                {project.icon && <BrandIcon name={project.icon} className={s.thumbIcon} />}
              </span>
              <span className={s.text}>
                <span className={s.name}>{project.title}</span>
                <span className={s.summary}>{l(project.summary)}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </motion.section>
  );
}
