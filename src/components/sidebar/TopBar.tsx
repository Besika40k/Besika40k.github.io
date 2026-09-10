import { useI18n } from '@/i18n/context';
import { Serpent } from '../Serpent';
import s from './TopBar.module.scss';

export type SidebarView = 'info' | 'contact';

interface TopBarProps {
  view: SidebarView;
  onViewChange: (view: SidebarView) => void;
}

export function TopBar({ view, onViewChange }: TopBarProps) {
  const { t } = useI18n();
  return (
    <div className={s.bar}>
      <Serpent className={s.mark} />
      <div className={s.views}>
        {(['info', 'contact'] as const).map((id) => (
          <button
            key={id}
            type="button"
            className={s.view}
            aria-pressed={view === id}
            onClick={() => onViewChange(id)}
          >
            {t(id)}
          </button>
        ))}
      </div>
    </div>
  );
}
