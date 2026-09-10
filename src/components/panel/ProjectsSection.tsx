import { projectCategories, projects } from '@/data/projects';
import type { ProjectCategory } from '@/data/types';
import { useI18n } from '@/i18n/context';
import { ProjectCard } from './ProjectCard';
import { Section } from './Section';
import s from './ProjectsSection.module.scss';

interface ProjectsSectionProps {
  category: ProjectCategory;
  onCategoryChange: (category: ProjectCategory) => void;
  openId: string | null;
  onToggle: (id: string) => void;
}

export function ProjectsSection({
  category,
  onCategoryChange,
  openId,
  onToggle,
}: ProjectsSectionProps) {
  const { t, l } = useI18n();
  const visible = projects.filter((project) => project.category === category);

  return (
    <Section id="projects" title={t('projects')}>
      <div className={s.filters} role="group" aria-label={t('projects')}>
        {projectCategories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            className={s.filter}
            aria-pressed={category === cat.id}
            onClick={() => onCategoryChange(cat.id)}
          >
            {l(cat.label)}
            <span className={s.count}>
              {projects.filter((project) => project.category === cat.id).length}
            </span>
          </button>
        ))}
      </div>

      <ul className={s.grid}>
        {visible.map((project) => (
          <li key={project.id}>
            <ProjectCard
              project={project}
              open={openId === project.id}
              onToggle={() => onToggle(project.id)}
            />
          </li>
        ))}
      </ul>
    </Section>
  );
}
