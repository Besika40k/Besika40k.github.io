import { useState } from 'react';
import { MotionConfig } from 'motion/react';
import { projects } from '@/data/projects';
import type { ProjectCategory } from '@/data/types';
import { scrollToId } from '@/hooks/useMediaQuery';
import { ContactBar } from '@/components/sidebar/ContactBar';
import { PinnedProjects } from '@/components/sidebar/PinnedProjects';
import { ProfileCard } from '@/components/sidebar/ProfileCard';
import { StackMarquee } from '@/components/sidebar/StackMarquee';
import { TopBar, type SidebarView } from '@/components/sidebar/TopBar';
import { Panel } from '@/components/panel/Panel';
import s from './App.module.scss';

export default function App() {
  const [view, setView] = useState<SidebarView>('info');
  const [category, setCategory] = useState<ProjectCategory>('frontend');
  const [openProject, setOpenProject] = useState<string | null>(null);

  // Pinned cards jump to the full project card on the right and open it.
  const focusProject = (id: string) => {
    const project = projects.find((p) => p.id === id);
    if (!project) return;
    setCategory(project.category);
    setOpenProject(id);
    requestAnimationFrame(() => requestAnimationFrame(() => scrollToId(`project-${id}`)));
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className={s.app}>
        <aside className={s.sidebar}>
          <TopBar view={view} onViewChange={setView} />
          <ProfileCard view={view} />
          <StackMarquee />
          <PinnedProjects onOpen={focusProject} />
          <ContactBar />
        </aside>
        <Panel
          category={category}
          onCategoryChange={(next) => {
            setCategory(next);
            setOpenProject(null);
          }}
          openProject={openProject}
          onToggleProject={(id) => setOpenProject((current) => (current === id ? null : id))}
        />
      </div>
    </MotionConfig>
  );
}
