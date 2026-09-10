import type { Localized, Project, ProjectCategory } from './types';

export const projectCategories: { id: ProjectCategory; label: Localized }[] = [
  { id: 'frontend', label: { en: 'Front-end', ka: 'ფრონტენდი' } },
  { id: 'ml', label: { en: 'Machine and deep learning', ka: 'მანქანური და ღრმა სწავლება' } },
  { id: 'backend', label: { en: 'Back-end', ka: 'ბექენდი' } },
  { id: 'misc', label: { en: 'Miscellaneous', ka: 'სხვადასხვა' } },
];

// Content carried over from the previous site; replace or extend freely.
export const projects: Project[] = [
  // ── Front-end
  {
    id: 'bandersnatch',
    title: 'Bandersnatch',
    category: 'frontend',
    year: '2026',
    pinned: true,
    icon: 'siNextdotjs',
    summary: {
      en: 'A mobile-first web app that gives KIU students an honest, live status of the campus bus before they head to the stop.',
      ka: 'მობილურზე ორიენტირებული ვებაპლიკაცია, რომელიც KIU-ს სტუდენტებს გაჩერებაზე გასვლამდე კამპუსის ავტობუსის რეალურ სტატუსს აჩვენებს.',
    },
    overview: {
      en: 'Capstone for the “Product Development for Software Developers” course. The official tracking tools showed unreliable countdowns, so we built clearer status info, route context, crowding signals and peer-reported updates.',
      ka: 'კაპსტოუნ პროექტი კურსისთვის „პროდუქტის შექმნა პროგრამისტებისთვის“. ოფიციალური თვალთვალის ხელსაწყოები არასანდო დროს აჩვენებდა, ამიტომ შევქმენით უფრო მკაფიო სტატუსი, მარშრუტის კონტექსტი, გადატვირთულობის სიგნალები და მომხმარებლების მიერ გაზიარებული განახლებები.',
    },
    role: {
      en: 'Front-end and UI/UX design on a four-person team.',
      ka: 'ფრონტენდი და UI/UX დიზაინი ოთხკაციან გუნდში.',
    },
    stack: [
      'Next.js',
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Firebase',
      'Leaflet',
      'OpenStreetMap',
      'Vercel',
    ],
    repo: 'https://github.com/Nok1on1/product-capstone-2026',
    demo: 'https://product-capstone-2026.vercel.app/en',
  },
  {
    id: 'kiu-website',
    title: 'KIU website',
    category: 'frontend',
    year: '2026',
    icon: 'siNextdotjs',
    summary: {
      en: 'The official website of Kutaisi International University, built by the university’s development team.',
      ka: 'ქუთაისის საერთაშორისო უნივერსიტეტის ოფიციალური ვებსაიტი, რომელსაც უნივერსიტეტის დეველოპერთა გუნდი ქმნის.',
    },
    role: {
      en: 'Front-end developer. Launch is planned for 2026; screenshots and a link will follow.',
      ka: 'ფრონტენდ დეველოპერი. გაშვება 2026 წელსაა დაგეგმილი; სქრინშოტები და ბმული მოგვიანებით დაემატება.',
    },
    stack: ['Next.js', 'React', 'Tailwind CSS'],
    closedSource: true,
  },
  {
    id: 'gragnily',
    title: 'Gragnily',
    category: 'frontend',
    year: '2025',
    icon: 'siReact',
    summary: {
      en: 'A platform where Georgian high-school graduates read books and news and upload their essays.',
      ka: 'პლატფორმა, სადაც საქართველოს სკოლის კურსდამთავრებულები კითხულობენ წიგნებსა და სიახლეებს და ტვირთავენ ესეებს.',
    },
    overview: {
      en: 'Shows the essential reading list, accepts essays in Georgian or English, collects news about universities, and has full registration and login.',
      ka: 'აჩვენებს აუცილებელ საკითხავ სიას, იღებს ესეებს ქართულად ან ინგლისურად, აგროვებს სიახლეებს უნივერსიტეტების შესახებ და აქვს სრული რეგისტრაცია და ავტორიზაცია.',
    },
    role: {
      en: 'Built the entire front end and led the team; the Node.js back end was written by a teammate.',
      ka: 'სრულად ავაწყე ფრონტენდი და ვხელმძღვანელობდი გუნდს; Node.js ბექენდი გუნდის წევრმა დაწერა.',
    },
    stack: ['React', 'Tailwind CSS', 'Node.js'],
    repo: 'https://github.com/Besika40k/Gragnily',
  },

  // ── Machine and deep learning
  {
    id: 'image-captioning',
    title: 'Image captioning',
    category: 'ml',
    pinned: true,
    icon: 'siPytorch',
    summary: {
      en: 'A neural network that writes natural-language captions for images, pairing a ResNet50 encoder with an LSTM decoder.',
      ka: 'ნეირონული ქსელი, რომელიც სურათებს ბუნებრივ ენაზე აღწერს: ResNet50 ენკოდერი და LSTM დეკოდერი.',
    },
    overview: {
      en: 'Trained in PyTorch on a standard dataset, with most of the work in preprocessing, tokenisation and tuning the LSTM’s hyperparameters until the captions made sense.',
      ka: 'გაწვრთნილია PyTorch-ში სტანდარტულ მონაცემთა ნაკრებზე. სამუშაოს დიდი ნაწილი წინასწარ დამუშავებას, ტოკენიზაციასა და LSTM-ის ჰიპერპარამეტრების მორგებას დაეთმო, სანამ აღწერები აზრიანი გახდებოდა.',
    },
    stack: ['Python', 'PyTorch', 'ResNet50', 'LSTM', 'Jupyter'],
    repo: 'https://github.com/Besika40k/image-captioning-final-project',
  },
  {
    id: 'fuel-prices',
    title: 'UK fuel price analysis',
    category: 'ml',
    icon: 'siPandas',
    summary: {
      en: 'Twenty years of weekly UK fuel prices, explored and modelled to predict pump prices.',
      ka: 'დიდი ბრიტანეთის საწვავის ფასების ოცწლიანი ყოველკვირეული მონაცემების ანალიზი და ფასების პროგნოზირების მოდელები.',
    },
    overview: {
      en: 'A reproducible pipeline covering cleaning, exploratory analysis, feature engineering and model comparison, looking at petrol versus diesel and how duty and VAT shape the price.',
      ka: 'განმეორებადი პროცესი: მონაცემების გასუფთავება, კვლევითი ანალიზი, ნიშნების ინჟინერია და მოდელების შედარება. ბენზინისა და დიზელის ფასები და აქციზისა და დღგ-ის გავლენა.',
    },
    role: {
      en: 'Team project. I made the visualisations and ran the statistical analysis.',
      ka: 'გუნდური პროექტი. მე შევქმენი ვიზუალიზაციები და ჩავატარე სტატისტიკური ანალიზი.',
    },
    highlights: [
      {
        en: 'Seasonal features engineered from timestamps',
        ka: 'სეზონური ნიშნები, მიღებული დროის ნიშნულებიდან',
      },
      {
        en: 'Linear regression, decision tree and random forest compared on MAE, RMSE and R²',
        ka: 'წრფივი რეგრესია, გადაწყვეტილების ხე და შემთხვევითი ტყე შედარებული MAE, RMSE და R² მეტრიკებით',
      },
    ],
    stack: ['Python', 'pandas', 'scikit-learn'],
    repo: 'https://github.com/gegasnake/Fuel-Price-Analysis-and-Prediction',
  },

  // ── Back-end
  {
    id: 'loan-api',
    title: 'Loan management API',
    category: 'backend',
    pinned: true,
    icon: 'siDotnet',
    summary: {
      en: 'A REST API for loan applications with JWT auth, user and accountant roles, and approval workflows.',
      ka: 'REST API სესხის განაცხადებისთვის: JWT ავტორიზაცია, მომხმარებლისა და ბუღალტრის როლები და დამტკიცების პროცესი.',
    },
    overview: {
      en: 'Covers registration and login, loan creation, approval and rejection, and blocking users. Fully documented with Swagger.',
      ka: 'მოიცავს რეგისტრაციასა და ავტორიზაციას, სესხის შექმნას, დამტკიცებასა და უარყოფას, მომხმარებლების დაბლოკვას. სრულად დოკუმენტირებულია Swagger-ით.',
    },
    role: {
      en: 'Solo project: architecture, authentication, business logic and tests.',
      ka: 'ინდივიდუალური პროექტი: არქიტექტურა, ავტორიზაცია, ბიზნეს ლოგიკა და ტესტები.',
    },
    highlights: [
      {
        en: 'Controllers → services → data layering',
        ka: 'ფენები: კონტროლერები → სერვისები → მონაცემები',
      },
      { en: '16 passing xUnit tests', ka: '16 წარმატებული xUnit ტესტი' },
      {
        en: 'Global exception-handling middleware',
        ka: 'გლობალური შეცდომების დამუშავების middleware',
      },
    ],
    stack: [
      'ASP.NET Core 8',
      'Entity Framework Core',
      'SQL Server',
      'JWT',
      'FluentValidation',
      'Serilog',
      'xUnit',
    ],
    repo: 'https://github.com/Besika40k/loan-management-api',
  },
  {
    id: 'finalcomm',
    title: 'finalCOMM',
    category: 'backend',
    icon: 'siDotnet',
    summary: {
      en: 'Final project for the RS School .NET course: a layered C# back end with separate data, logic and logging modules.',
      ka: 'RS School-ის .NET კურსის ფინალური პროექტი: ფენოვანი C# ბექენდი ცალკე მოდულებით მონაცემებისთვის, ლოგიკისა და ლოგირებისთვის.',
    },
    overview: {
      en: 'Implements use-case handling and data persistence with a focus on separation of concerns, with structured logging through NLog.',
      ka: 'ახორციელებს მოქმედებების დამუშავებასა და მონაცემების შენახვას პასუხისმგებლობების მკაფიო გამიჯვნით; სტრუქტურირებული ლოგირება NLog-ით.',
    },
    stack: ['C#', '.NET', 'NLog'],
    repo: 'https://github.com/Besika40k/finalCOMM',
  },

  // ── Miscellaneous
  {
    id: 'kvati-town',
    title: 'Kvati Town',
    category: 'misc',
    icon: 'siGodotengine',
    summary: {
      en: 'A robotics teaching platform where students write tasks that run in a Godot simulation or on a real Duckiebot.',
      ka: 'რობოტიკის სასწავლო პლატფორმა, სადაც მოსწავლეების დაწერილი დავალებები Godot-ის სიმულაციაში ან ნამდვილ Duckiebot-ზე ეშვება.',
    },
    overview: {
      en: 'A rebuild of DuckieTown for the Duckiebot DB21J, with vision-based navigation tasks and a Flask dashboard for the robot’s camera feed, live configuration and task status.',
      ka: 'DuckieTown-ის ხელახალი ვერსია Duckiebot DB21J-ისთვის: ხედვაზე დაფუძნებული ნავიგაციის დავალებები და Flask-ის პანელი რობოტის კამერისთვის, პარამეტრების რეალურ დროში შეცვლისა და დავალებების სტატუსისთვის.',
    },
    role: {
      en: 'Wrote the simulation, designed the UI for the simulation and the robot dashboard, refactored the codebase, split the work, and implemented navigation, object detection and object removal.',
      ka: 'დავწერე სიმულაცია, დავაპროექტე სიმულაციისა და რობოტის პანელის ინტერფეისი, გადავაწყე კოდი, გავანაწილე სამუშაო და შევქმენი ნავიგაცია, ობიექტების ამოცნობა და მოცილება.',
    },
    stack: ['Python', 'Flask', 'Godot', 'Computer vision'],
    repo: 'https://github.com/Besika40k/KvatiTown-yesking',
  },
  {
    id: 'rsschool-cv',
    title: 'rsschool-cv',
    category: 'misc',
    icon: 'siHtml5',
    summary: {
      en: 'My first CV site, built for RS School with semantic HTML, responsive CSS and a branch-and-PR workflow. Its serpent and colours live on here.',
      ka: 'ჩემი პირველი CV საიტი RS School-ისთვის: სემანტიკური HTML, ადაპტირებადი CSS და Git-ის ბრენჩებითა და PR-ებით მუშაობა. მისი გველი და ფერები აქაც გადმოვიდა.',
    },
    stack: ['HTML', 'CSS'],
    repo: 'https://github.com/Besika40k/rsschool-cv',
    demo: 'https://besika40k.github.io/rsschool-cv/',
  },
];
