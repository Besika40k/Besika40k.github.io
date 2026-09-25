import type { Localized } from '@/data/types';

export const strings = {
  info: { en: 'Info', ka: 'ინფო' },
  contact: { en: 'Contact', ka: 'კონტაქტი' },
  language: { en: 'Language', ka: 'ენა' },
  localTime: { en: 'Local time in Kutaisi', ka: 'ადგილობრივი დრო ქუთაისში' },
  pinned: { en: 'Pinned', ka: 'მიმაგრებული' },
  stack: { en: 'Tools I work with', ka: 'ტექნოლოგიები, რომლებითაც ვმუშაობ' },

  gameLabel: { en: 'Mini-game', ka: 'მინი-თამაში' },
  gameHelp: {
    en: 'Serpent runner. Press Space, the up arrow or tap to jump over the runestones.',
    ka: 'მორბენალი გველი. რუნული ქვების გადასახტომად დააჭირე Space-ს, ზედა ისარს ან შეეხე ეკრანს.',
  },
  gameStart: { en: 'Space or tap to start', ka: 'დასაწყებად დააჭირე Space-ს ან შეეხე' },
  gameOver: { en: 'Ragnarök', ka: 'რაგნარიოკი' },
  gameRetry: { en: 'Space or tap to try again', ka: 'თავიდან საცდელად დააჭირე Space-ს ან შეეხე' },
  gameBest: { en: 'Best', ka: 'რეკორდი' },

  email: { en: 'Email', ka: 'ელფოსტა' },
  copyEmail: { en: 'Copy email address', ka: 'ელფოსტის კოპირება' },
  copied: { en: 'Copied', ka: 'დაკოპირდა' },
  downloadCv: { en: 'Download CV', ka: 'CV-ის ჩამოტვირთვა' },
  contactLead: {
    en: 'The quickest way to reach me is email. I usually reply within a day.',
    ka: 'ჩემთან დაკავშირების უსწრაფესი გზა ელფოსტაა. ჩვეულებრივ, ერთ დღეში გპასუხობთ.',
  },

  sections: { en: 'Sections', ka: 'სექციები' },
  experience: { en: 'Experience', ka: 'გამოცდილება' },
  projects: { en: 'Projects', ka: 'პროექტები' },
  skills: { en: 'Skills', ka: 'უნარები' },
  education: { en: 'Education', ka: 'განათლება' },
  spokenLanguages: { en: 'Spoken languages', ka: 'სასაუბრო ენები' },
  achievements: { en: 'Hackathons and achievements', ka: 'ჰაკათონები და მიღწევები' },
  achievementsShort: { en: 'Achievements', ka: 'მიღწევები' },

  present: { en: 'Present', ka: 'დღემდე' },
  sourceCode: { en: 'Source code', ka: 'კოდი' },
  liveDemo: { en: 'Live demo', ka: 'დემო' },
  closedSource: { en: 'Closed source', ka: 'დახურული კოდი' },
  showDetails: { en: 'Show details', ka: 'დეტალების ნახვა' },
  hideDetails: { en: 'Hide details', ka: 'დეტალების დამალვა' },
  myRole: { en: 'My role', ka: 'ჩემი როლი' },
  techStack: { en: 'Tech stack', ka: 'ტექნოლოგიები' },
  highlights: { en: 'Highlights', ka: 'მთავარი' },
  comingSoon: { en: 'Details coming soon', ka: 'დეტალები მალე დაემატება' },
  footer: {
    en: 'Built with React, TypeScript and Sass. The serpent comes from my first CV site.',
    ka: 'შექმნილია React-ით, TypeScript-ითა და Sass-ით. გველი ჩემი პირველი CV საიტიდანაა.',
  },
} satisfies Record<string, Localized>;

export type StringKey = keyof typeof strings;
