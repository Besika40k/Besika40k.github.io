import { Pin } from 'lucide-react';
import { projects } from '@/data/projects';
import { useI18n } from '@/i18n/context';
import { BrandIcon } from '../BrandIcon';
import s from './PinnedProjects.module.scss';

const pinned = projects.filter((project) => project.pinned);

export function PinnedProjects({ onOpen }: { onOpen: (id: string) => void }) {
  const { t, l } = useI18n();
  return (
    <section className={s.card} aria-labelledby="pinned-title">
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
    </section>
  );
}
