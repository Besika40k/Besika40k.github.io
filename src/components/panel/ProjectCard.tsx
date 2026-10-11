import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, ChevronDown, Lock } from 'lucide-react';
import type { Project } from '@/data/types';
import { useI18n } from '@/i18n/context';
import { projectCategories } from '@/data/projects';
import s from './ProjectCard.module.scss';

interface ProjectCardProps {
  project: Project;
  open: boolean;
  onToggle: () => void;
}

const categoryLabel = (id: Project['category']) =>
  projectCategories.find((cat) => cat.id === id)!.label;

export function ProjectCard({ project, open, onToggle }: ProjectCardProps) {
  const { t, l } = useI18n();
  const hasDetails = Boolean(project.overview || project.role || project.highlights?.length);
  const detailsId = `project-${project.id}-details`;

  return (
    <article id={`project-${project.id}`} className={s.card} data-open={open || undefined}>
      {project.image && <img className={s.image} src={project.image} alt="" loading="lazy" />}

      <header className={s.header}>
        <p className={s.eyebrow}>
          {[l(categoryLabel(project.category)), project.year].filter(Boolean).join(' · ')}
        </p>
        <h3 className={s.title}>{project.title}</h3>
      </header>

      <p className={s.summary}>{l(project.summary)}</p>

      <ul className={s.stack} aria-label={t('techStack')}>
        {project.stack.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <AnimatePresence initial={false}>
        {open && hasDetails && (
          <motion.div
            id={detailsId}
            className={s.detailsWrap}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.2, 0, 0, 1] }}
          >
            <div className={s.details}>
              {project.overview && <p>{l(project.overview)}</p>}
              {project.role && (
                <div>
                  <h4>{t('myRole')}</h4>
                  <p>{l(project.role)}</p>
                </div>
              )}
              {project.highlights && (
                <div>
                  <h4>{t('highlights')}</h4>
                  <ul>
                    {project.highlights.map((item) => (
                      <li key={item.en}>{l(item)}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className={s.footer}>
        <div className={s.links}>
          {project.repo && (
            <a href={project.repo} target="_blank" rel="noreferrer">
              {t('sourceCode')}
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          )}
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noreferrer">
              {t('liveDemo')}
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          )}
          {project.closedSource && (
            <span className={s.closed}>
              <Lock size={13} aria-hidden="true" />
              {t('closedSource')}
            </span>
          )}
        </div>
        {hasDetails && (
          <button
            type="button"
            className={s.toggle}
            aria-expanded={open}
            aria-controls={detailsId}
            onClick={onToggle}
          >
            {open ? t('hideDetails') : t('showDetails')}
            <ChevronDown size={14} aria-hidden="true" />
          </button>
        )}
      </footer>
    </article>
  );
}
