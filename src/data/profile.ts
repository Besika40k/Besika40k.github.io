import type { Localized } from './types';

export const profile = {
  name: { en: 'Besik Meskhia', ka: 'ბესიკ მესხია' } satisfies Localized,
  handle: 'Jormungandr',
  /** Elder Futhark spelling of the handle, shown under the name. */
  handleRunes: 'ᛃᛟᚱᛗᚢᚾᚷᚨᚾᛞᚱ',
  location: { en: 'Kutaisi, Georgia', ka: 'ქუთაისი, საქართველო' } satisfies Localized,
  timeZone: 'Asia/Tbilisi',
  bio: {
    en: 'Front-end developer and computer science student. I build accessible React and Next.js interfaces at Kutaisi International University, reach for .NET or PyTorch when a project calls for it, and teach kids robotics and code.',
    ka: 'ფრონტენდ დეველოპერი და კომპიუტერული მეცნიერებების სტუდენტი. ქუთაისის საერთაშორისო უნივერსიტეტში React-ითა და Next.js-ით ვქმნი ხელმისაწვდომ ინტერფეისებს, საჭიროებისას ვიყენებ .NET-სა და PyTorch-ს, ბავშვებს კი რობოტიკასა და პროგრამირებას ვასწავლი.',
  } satisfies Localized,
  email: 'besomeskhia40k@gmail.com',
  github: 'https://github.com/Besika40k',
  linkedin: 'https://www.linkedin.com/in/besik-meskhia-743149208/',
  discord: 'Besika40k',
  cv: '/CV.pdf',
};
