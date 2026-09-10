import type { BrandIconName } from '@/lib/brandIcons';
import type { SkillGroup } from './types';

export const skillGroups: SkillGroup[] = [
  {
    id: 'languages',
    label: { en: 'Programming languages', ka: 'პროგრამირების ენები' },
    items: ['TypeScript', 'JavaScript', 'Python', 'C#', 'C++', 'SQL'],
  },
  {
    id: 'frontend',
    label: { en: 'Front-end', ka: 'ფრონტენდი' },
    items: ['React', 'Next.js', 'HTML', 'CSS', 'Sass', 'Tailwind CSS'],
  },
  {
    id: 'backend',
    label: { en: 'Back-end and data', ka: 'ბექენდი და მონაცემები' },
    items: [
      'ASP.NET Core',
      'Entity Framework Core',
      'PostgreSQL',
      'SQL Server',
      'Firebase',
      'Flask',
    ],
  },
  {
    id: 'ml',
    label: { en: 'Machine learning', ka: 'მანქანური სწავლება' },
    items: ['PyTorch', 'pandas', 'scikit-learn', 'Jupyter'],
  },
  {
    id: 'tools',
    label: { en: 'Tools', ka: 'ხელსაწყოები' },
    items: ['Git', 'GitHub', 'Vercel', 'Godot', 'Pygame', 'xUnit', 'Swagger'],
  },
  {
    id: 'practices',
    label: { en: 'Practices', ka: 'პრაქტიკები' },
    items: [
      'SOLID',
      'Design patterns',
      'Clean architecture',
      'Unit testing',
      'Teaching and mentoring',
    ],
  },
];

/** Logos for the scrolling strip in the left column. */
export const stackIcons: BrandIconName[] = [
  'siReact',
  'siNextdotjs',
  'siTypescript',
  'siJavascript',
  'siSass',
  'siTailwindcss',
  'siPython',
  'siPytorch',
  'siDotnet',
  'siCplusplus',
  'siPostgresql',
  'siFirebase',
  'siFlask',
  'siPandas',
  'siScikitlearn',
  'siGodotengine',
  'siGit',
  'siVercel',
];
