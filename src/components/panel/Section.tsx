import type { ReactNode } from 'react';
import s from './Section.module.scss';

interface SectionProps {
  id: string;
  title: string;
  children: ReactNode;
}

export function Section({ id, title, children }: SectionProps) {
  return (
    <section id={id} className={s.section} aria-labelledby={`${id}-title`}>
      <h2 id={`${id}-title`} className={s.title}>
        {title}
      </h2>
      {children}
    </section>
  );
}
