import type { Experience } from './types';

// Newest first.
export const experience: Experience[] = [
  {
    id: 'kiu',
    role: { en: 'Web programmer', ka: 'ვებ პროგრამისტი' },
    org: { en: 'Kutaisi International University', ka: 'ქუთაისის საერთაშორისო უნივერსიტეტი' },
    place: { en: 'Kutaisi, Georgia', ka: 'ქუთაისი, საქართველო' },
    start: '2025-10',
    end: null,
    points: [
      {
        en: 'Build responsive, accessible interfaces for the university website with React, Next.js and Tailwind CSS.',
        ka: 'React-ით, Next.js-ითა და Tailwind CSS-ით ვქმნი უნივერსიტეტის ვებსაიტის ადაპტირებად და ხელმისაწვდომ ინტერფეისებს.',
      },
      {
        en: 'Write reusable components and mobile-first layouts tuned for performance.',
        ka: 'ვწერ მრავალჯერადად გამოყენებად კომპონენტებს და მობილურზე ორიენტირებულ, ოპტიმიზებულ განლაგებებს.',
      },
      {
        en: 'Connect front-end features to back-end APIs and dynamic data sources.',
        ka: 'ფრონტენდის ფუნქციონალს ვაკავშირებ ბექენდის API-ებთან და დინამიკურ მონაცემებთან.',
      },
      {
        en: 'Turn designers’ UI/UX work into clean, maintainable code and keep iterating on usability and visual consistency.',
        ka: 'დიზაინერების UI/UX ნამუშევარს ვაქცევ სუფთა, მარტივად შესანარჩუნებელ კოდად და მუდმივად ვხვეწ გამოყენებადობასა და ვიზუალურ თანმიმდევრულობას.',
      },
    ],
  },
  {
    id: 'sjaa',
    role: { en: 'Robotics and coding mentor', ka: 'რობოტიკისა და პროგრამირების მენტორი' },
    org: { en: 'Steve Jobs American Academy', ka: 'სტივ ჯობსის ამერიკული აკადემია' },
    place: { en: 'Kutaisi, Georgia', ka: 'ქუთაისი, საქართველო' },
    start: '2025-09',
    end: null,
    points: [
      {
        en: 'Teach robotics and programming to students aged 7–16 through hands-on LEGO kits: motors, sensors, basic automation and the physics behind them.',
        ka: '7–16 წლის მოსწავლეებს ვასწავლი რობოტიკასა და პროგრამირებას LEGO-ს ნაკრებებით: ძრავები, სენსორები, მარტივი ავტომატიზაცია და მათ უკან მდგომი ფიზიკა.',
      },
      {
        en: 'Cover programming fundamentals with Python, MIT App Inventor, HTML, CSS and JavaScript.',
        ka: 'პროგრამირების საფუძვლებს ვასწავლი Python-ით, MIT App Inventor-ით, HTML-ით, CSS-ითა და JavaScript-ით.',
      },
      {
        en: 'Co-author “AI-Powered Product Development for Young Creators”, a new course for ages 12–16. The first 16 lessons are written and being tested in class.',
        ka: 'თანაავტორი ვარ ახალი კურსისა „AI-ზე დაფუძნებული პროდუქტის შექმნა ახალგაზრდა შემქმნელებისთვის“ 12–16 წლის ასაკისთვის. პირველი 16 გაკვეთილი მზადაა და კლასში იცდება.',
      },
      {
        en: 'Adapt lesson plans to each age group and keep students, parents and academic managers informed on progress.',
        ka: 'გაკვეთილების გეგმებს ვარგებ თითოეულ ასაკობრივ ჯგუფს და პროგრესის შესახებ ვაწვდი ინფორმაციას მოსწავლეებს, მშობლებსა და აკადემიურ მენეჯერებს.',
      },
    ],
  },
  {
    id: 'startup',
    role: { en: 'Web programmer and team lead', ka: 'ვებ პროგრამისტი და გუნდის ლიდერი' },
    org: { en: 'Startup', ka: 'სტარტაპი' },
    place: { en: 'Kutaisi, Georgia', ka: 'ქუთაისი, საქართველო' },
    start: '2025-04',
    end: '2025-06',
    points: [
      {
        en: 'Built the entire front end of an e-book, article and essay platform for Georgian high-school graduates.',
        ka: 'სრულად ავაწყე ფრონტენდი ელწიგნების, სტატიებისა და ესეების პლატფორმისთვის, რომელიც საქართველოს სკოლის კურსდამთავრებულებისთვისაა.',
      },
      {
        en: 'Worked closely with the back-end developer and the UI/UX designer to ship features that matched the design.',
        ka: 'მჭიდროდ ვთანამშრომლობდი ბექენდ დეველოპერთან და UI/UX დიზაინერთან, რომ ფუნქციები დიზაინის შესაბამისად გაგვეშვა.',
      },
      {
        en: 'Managed the team: split the work, set deadlines and made sure they were met.',
        ka: 'ვმართავდი გუნდს: ვანაწილებდი დავალებებს, ვაწესებდი ვადებს და ვაკონტროლებდი მათ შესრულებას.',
      },
      {
        en: 'Tested manually and advised our tester on automated tests.',
        ka: 'ვატარებდი მანუალურ ტესტირებას და ტესტერს ავტომატური ტესტების შესახებ ვურჩევდი.',
      },
    ],
  },
];
