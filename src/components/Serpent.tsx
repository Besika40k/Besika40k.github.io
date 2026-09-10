import type { CSSProperties } from 'react';
import serpentUrl from '@/assets/serpent.svg';
import s from './Serpent.module.scss';

interface SerpentProps {
  className?: string;
  /** Light the eye with the ember accent. */
  glowingEye?: boolean;
}

/** The ouroboros from the rsschool-cv site, recoloured through currentColor. */
export function Serpent({ className, glowingEye = false }: SerpentProps) {
  return (
    <span
      className={[s.serpent, className].filter(Boolean).join(' ')}
      style={{ '--art': `url(${serpentUrl})` } as CSSProperties}
      aria-hidden="true"
    >
      {glowingEye && <span className={s.eye} />}
      <span className={s.art} />
    </span>
  );
}
