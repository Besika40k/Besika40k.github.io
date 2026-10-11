import { projectCategories, projects } from '@/data/projects';
import type { ProjectFilter } from '@/data/types';
import { useI18n } from '@/i18n/context';
import { ProjectCard } from './ProjectCard';
import { Section } from './Section';
import s from './ProjectsSection.module.scss';

interface ProjectsSectionProps {
  filter: ProjectFilter;
  onFilterChange: (filter: ProjectFilter) => void;
  openId: string | null;
  onToggle: (id: string) => void;
}

export function ProjectsSection({
  filter,
  onFilterChange,
  openId,
  onToggle,
}: ProjectsSectionProps) {
  const { t, l } = useI18n();
  const visible = filter === 'all' ? projects : projects.filter((p) => p.category === filter);
  const filters = [
    { id: 'all' as const, label: t('allProjects'), count: projects.length },
    ...projectCategories.map((cat) => ({
      id: cat.id,
      label: l(cat.label),
      count: projects.filter((p) => p.category === cat.id).length,
    })),
  ];

  return (
    <Section id="projects" title={t('projects')}>
      <div className={s.filters} role="group" aria-label={t('projects')}>
        {filters.map((item) => (
          <button
            key={item.id}
            type="button"
            className={s.filter}
            aria-pressed={filter === item.id}
            onClick={() => onFilterChange(item.id)}
          >
            {item.label}
            <span className={s.count}>{item.count}</span>
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
