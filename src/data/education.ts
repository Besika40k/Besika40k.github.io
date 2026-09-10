import type { Education, SpokenLanguage } from './types';

// Newest first.
export const education: Education[] = [
  {
    id: 'kiu-bsc',
    title: { en: 'BSc in Computer Science', ka: 'კომპიუტერული მეცნიერებების ბაკალავრი' },
    org: { en: 'Kutaisi International University', ka: 'ქუთაისის საერთაშორისო უნივერსიტეტი' },
    start: '2023-09',
    end: null,
  },
  {
    id: 'tsc-dotnet',
    title: {
      en: 'Introduction to Programming (C# and .NET)',
      ka: 'პროგრამირების შესავალი (C# და .NET)',
    },
    org: { en: 'Tbilisi School of Communication', ka: 'თბილისის კომუნიკაციის სკოლა' },
    start: '2025-09',
    end: '2025-12',
  },
  {
    id: 'ibm-python',
    title: {
      en: 'Python for Data Science, AI and Development',
      ka: 'Python მონაცემთა მეცნიერებისთვის, AI-სა და დეველოპმენტისთვის',
    },
    org: { en: 'IBM (Coursera)', ka: 'IBM (Coursera)' },
    start: '2025-07',
    end: '2025-07',
  },
  {
    id: 'tbc-python',
    title: { en: 'Introduction to Python', ka: 'Python-ის შესავალი' },
    org: { en: 'TBC IT Academy × USAID', ka: 'TBC IT აკადემია × USAID' },
    start: '2024-09',
    end: '2025-01',
  },
  {
    id: 'bc-english',
    title: { en: 'C1 certificate in English', ka: 'ინგლისური ენის C1 სერტიფიკატი' },
    org: { en: 'British Council', ka: 'ბრიტანეთის საბჭო' },
    start: '2023-09',
    end: '2024-07',
  },
];

export const spokenLanguages: SpokenLanguage[] = [
  { name: { en: 'Georgian', ka: 'ქართული' }, level: { en: 'Native', ka: 'მშობლიური' } },
  { name: { en: 'English', ka: 'ინგლისური' }, level: { en: 'C1', ka: 'C1' } },
  { name: { en: 'Russian', ka: 'რუსული' }, level: { en: 'B1–B2', ka: 'B1–B2' } },
  { name: { en: 'German', ka: 'გერმანული' }, level: { en: 'A1', ka: 'A1' } },
];
