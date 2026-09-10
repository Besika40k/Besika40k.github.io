import type { Achievement } from './types';

// Placeholders until the real entries are in. Remove `placeholder: true` once filled.
export const achievements: Achievement[] = [
  {
    id: 'hackathon-1',
    title: { en: 'Hackathon', ka: 'ჰაკათონი' },
    detail: {
      en: 'Event, team, what you built and how it placed.',
      ka: 'ღონისძიება, გუნდი, რა შექმენით და რა ადგილი დაიკავეთ.',
    },
    placeholder: true,
  },
  {
    id: 'award-1',
    title: { en: 'Award or certificate', ka: 'ჯილდო ან სერტიფიკატი' },
    detail: {
      en: 'What it was for, who gave it, and when.',
      ka: 'რისთვის, ვისგან და როდის.',
    },
    placeholder: true,
  },
  {
    id: 'community-1',
    title: { en: 'Community', ka: 'საზოგადოება' },
    detail: {
      en: 'Clubs, talks, volunteering or open-source work.',
      ka: 'კლუბები, გამოსვლები, მოხალისეობა ან ღია კოდის პროექტები.',
    },
    placeholder: true,
  },
];
