import { useState } from 'react';
import type { ProjectFilter } from '@/data/types';
import { useI18n } from '@/i18n/context';
import type { StringKey } from '@/i18n/strings';
import { scrollToId, useMediaQuery } from '@/hooks/useMediaQuery';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import { Serpent } from '../Serpent';
import { AchievementsSection } from './AchievementsSection';
import { JourneySection } from './JourneySection';
import { ProjectsSection } from './ProjectsSection';
import { SkillsSection } from './SkillsSection';
import s from './Panel.module.scss';

const sections: { id: string; label: StringKey }[] = [
  { id: 'journey', label: 'journey' },
  { id: 'projects', label: 'projects' },
  { id: 'skills', label: 'skills' },
  { id: 'achievements', label: 'achievementsShort' },
];
const sectionIds = sections.map((section) => section.id);

interface PanelProps {
  filter: ProjectFilter;
  onFilterChange: (filter: ProjectFilter) => void;
  openProject: string | null;
  onToggleProject: (id: string) => void;
}

export function Panel(props: PanelProps) {
  const { t } = useI18n();
  const wide = useMediaQuery('(min-width: 1000px)');
  // On wide screens the panel scrolls on its own; on narrow ones the page does.
  const [scroller, setScroller] = useState<HTMLDivElement | null>(null);
  const active = useScrollSpy(sectionIds, wide ? scroller : null, !wide || scroller !== null);

  return (
    <main className={s.panel}>
      <Serpent className={s.watermark} />

      <nav className={s.nav} aria-label={t('sections')}>
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className={s.navLink}
            aria-current={active === section.id || undefined}
            onClick={(event) => {
              event.preventDefault();
              scrollToId(section.id);
              history.replaceState(null, '', `#${section.id}`);
            }}
          >
            {t(section.label)}
          </a>
        ))}
      </nav>

      <div className={s.scroller} ref={setScroller}>
        <div className={s.content}>
          <JourneySection />
          <ProjectsSection
            filter={props.filter}
            onFilterChange={props.onFilterChange}
            openId={props.openProject}
            onToggle={props.onToggleProject}
          />
          <SkillsSection />
          <AchievementsSection />
          <footer className={s.footer}>
            <p>{t('footer')}</p>
            <p>© {new Date().getFullYear()} Besik Meskhia</p>
          </footer>
        </div>
      </div>
    </main>
  );
}
