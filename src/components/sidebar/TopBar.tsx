import { LayoutGroup, motion } from 'motion/react';
import { useI18n } from '@/i18n/context';
import { useRuneScramble } from '@/hooks/useRuneScramble';
import { Serpent } from '../Serpent';
import s from './TopBar.module.scss';

export type SidebarView = 'info' | 'contact';

interface TopBarProps {
  view: SidebarView;
  onViewChange: (view: SidebarView) => void;
}

export function TopBar({ view, onViewChange }: TopBarProps) {
  return (
    <div className={s.bar}>
      <Serpent className={s.mark} />
      <LayoutGroup id="sidebar-views">
        <div className={s.views}>
          {(['info', 'contact'] as const).map((id) => (
            <ViewToggle key={id} id={id} active={view === id} onSelect={() => onViewChange(id)} />
          ))}
        </div>
      </LayoutGroup>
    </div>
  );
}

interface ViewToggleProps {
  id: SidebarView;
  active: boolean;
  onSelect: () => void;
}

function ViewToggle({ id, active, onSelect }: ViewToggleProps) {
  const { t } = useI18n();
  const text = t(id);
  const { label, hoverProps } = useRuneScramble(text);

  return (
    <button
      type="button"
      className={s.view}
      aria-pressed={active}
      aria-label={text}
      onClick={onSelect}
      {...hoverProps}
    >
      {/* The ember fill glides between the two buttons. */}
      {active && (
        <motion.span
          layoutId="view-highlight"
          className={s.highlight}
          transition={{ duration: 0.15, ease: [0.34, 0, 0.36, 1] }}
        />
      )}
      <span className={s.label} aria-hidden="true">
        <span className={s.sizer}>{text}</span>
        <span>{label}</span>
      </span>
      {/* ⊕ that turns half a revolution into ⊖ when active. */}
      <span className={s.icon} aria-hidden="true">
        <span />
        <span />
      </span>
    </button>
  );
}
