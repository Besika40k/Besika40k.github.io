import { useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import { projects } from '@/data/projects';
import type { ProjectCategory } from '@/data/types';
import { scrollToId } from '@/hooks/useMediaQuery';
import { ContactBar } from '@/components/sidebar/ContactBar';
import { PinnedProjects } from '@/components/sidebar/PinnedProjects';
import { ProfileCard } from '@/components/sidebar/ProfileCard';
import { SerpentRunner } from '@/components/sidebar/SerpentRunner';
import { StackMarquee } from '@/components/sidebar/StackMarquee';
import { TopBar, type SidebarView } from '@/components/sidebar/TopBar';
import { slide } from '@/components/sidebar/slide';
import { Panel } from '@/components/panel/Panel';
import s from './App.module.scss';

// Variant labels the cards inherit from their view container.
const viewStates = { initial: 'initial', animate: 'animate', exit: 'exit' } as const;

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
    // Interface animations play even when the OS asks for reduced motion (owner's choice,
    // matching jkane.co). Only the automatic avatar spin and smooth scrolling honour it.
    <MotionConfig reducedMotion="never">
      <div className={s.app}>
        <aside className={s.sidebar}>
          <TopBar view={view} onViewChange={setView} />
          {/* Info cards slide out to the left (bottom first) before the Contact cards
              slide in from the right (top first), and the reverse. */}
          <AnimatePresence mode="wait">
            {view === 'info' ? (
              <motion.div key="info" className={s.views} {...viewStates}>
                <ProfileCard view="info" variants={slide(-1, 0, 0.3)} />
                <StackMarquee variants={slide(-1, 0.1, 0.2)} />
                <PinnedProjects onOpen={focusProject} variants={slide(-1, 0.2, 0.1)} />
                <ContactBar variants={slide(-1, 0.3, 0)} />
              </motion.div>
            ) : (
              <motion.div key="contact" className={s.views} {...viewStates}>
                <ProfileCard view="contact" variants={slide(1, 0, 0.2)} />
                <SerpentRunner variants={slide(1, 0.1, 0.1)} />
                <ContactBar variants={slide(1, 0.2, 0)} />
              </motion.div>
            )}
          </AnimatePresence>
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
