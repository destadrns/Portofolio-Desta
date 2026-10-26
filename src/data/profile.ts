import type { Profile, SkillGroup, TimelineItem } from '../types';

// Sources: the old portfolio (portofolio-desta.vercel.app, copied as written) and the CV (PRD Appendix A).
export const profile: Profile = {
  name: 'Desta Adriyan Saputra',
  photo: './img/profile.webp',
  // Same English CV for both languages (PRD: "File CV").
  cv: './cv/CV_Desta_Adriyan_Saputra_General.pdf',
  location: 'Yogyakarta, Indonesia',
  hero: {
    greeting: { id: 'Halo, saya Desta', en: "Hi, I'm Desta" },
    role: 'Full-Stack Developer · AI/ML Projects',
    intro: {
      id: 'Mahasiswa Informatika Amikom Yogyakarta, IPK 3,96. Saya membangun aplikasi web full-stack dan proyek AI/ML, dari e-commerce sampai sistem operasional manufaktur.',
      en: 'Informatics student at Amikom Yogyakarta, GPA 3.96. I build full-stack web apps and AI/ML projects, from e-commerce to manufacturing operations.',
    },
    // Added 2026-10-22 at Desta's request (animate pass).
    openTo: {
      id: 'Terbuka untuk peran software engineering, backend, dan AI/ML engineering',
      en: 'Open to software engineering, backend, and AI/ML engineering roles',
    },
  },
  about: {
    paragraphs: [
      {
        id: 'Saya mengerjakan antarmuka, REST API, dan database, secara mandiri maupun dalam tim Scrum. Di SIMO Mugi Jaya, saya ikut meriset alur klien dan membangun sistem dari produksi sampai pengiriman.',
        en: 'I work on interfaces, REST APIs, and databases, independently and in a Scrum team. For SIMO Mugi Jaya, I helped research the client workflow and build an operations system from production to delivery.',
      },
      {
        id: 'Saya memulai dari masalah dan alur pengguna, memecah fitur menjadi bagian kecil, lalu memeriksa hasilnya. Untuk proyek data, saya memakai Python dan Jupyter Notebook, termasuk evaluasi prediksi umur baterai dengan data NASA.',
        en: 'I start with the problem and user flow, break features into small parts, then check the results. For data projects, I use Python and Jupyter Notebook, including battery lifespan evaluation with NASA data.',
      },
    ],
    cardRole: 'Full-Stack Developer & Informatics Student',
    facts: [
      { value: { id: '3,96', en: '3.96' }, label: { id: 'IPK', en: 'GPA' } },
      { value: { id: '7', en: '7th' }, label: { id: 'Semester', en: 'Semester' } },
      { value: { id: 'S1', en: 'B.S.' }, label: { id: 'Informatika', en: 'Informatics' } },
    ],
    focus: ['Web Development', 'Data Analytics', 'AI & Modeling', 'Problem Solving'],
  },
  contact: {
    email: 'dstaasptra@gmail.com',
    github: 'https://github.com/destadrns',
    linkedin: 'https://linkedin.com/in/dstaasptra',
    instagram: 'https://www.instagram.com/dstaadrns',
    note: {
      id: 'Saya biasanya membalas dalam 1–2 hari kerja.',
      en: 'I usually reply within 1–2 business days.',
    },
  },
};

// Newest first. SIMO Mugi Jaya sits above the bootcamp (both 2026), confirmed by Desta on 2026-10-26.
export const experience: TimelineItem[] = [
  {
    period: { id: '2026', en: '2026' },
    title: { id: 'SIMO Mugi Jaya untuk CV Mugi Jaya', en: 'SIMO Mugi Jaya for CV Mugi Jaya' },
    role: { id: 'Full-Stack Developer, tim Scrum 5 orang', en: 'Full-Stack Developer, 5-person Scrum team' },
    text: {
      id: 'Meriset alur produksi sampai pengiriman, lalu membangun frontend dan backend sistem operasional.',
      en: 'Researched the flow from production to shipping, then built the frontend and backend of the operations system.',
    },
  },
  {
    period: { id: '2026', en: '2026' },
    title: { id: 'Bootcamp Last Mile, Gemini AI Developer', en: 'Bootcamp Last Mile, Gemini AI Developer' },
    role: { id: 'Peserta', en: 'Participant' },
    text: {
      id: 'Mengikuti bootcamp Gemini AI Developer sebagai bagian dari proses mendalami pemanfaatan AI dalam pengembangan aplikasi.',
      en: 'Took part in the Gemini AI Developer bootcamp as part of going deeper into using AI in application development.',
    },
  },
  {
    period: { id: '2023–2024', en: '2023–2024' },
    title: { id: 'AMCC (Amikom Computer Club)', en: 'AMCC (Amikom Computer Club)' },
    role: { id: 'Anggota', en: 'Member' },
    text: {
      id: 'Bergabung dalam lingkungan organisasi teknologi untuk terus belajar, berdiskusi, dan mengembangkan kemampuan di bidang informatika.',
      en: 'Joined a technology organization to keep learning, discussing, and growing my skills in informatics.',
    },
  },
];

export const education: TimelineItem[] = [
  {
    period: { id: '2023–sekarang', en: '2023–present' },
    title: { id: 'Universitas Amikom Yogyakarta', en: 'Universitas Amikom Yogyakarta' },
    role: { id: 'S1 Informatika', en: 'B.S. in Informatics' },
    text: {
      id: 'Sedang menempuh pendidikan di bidang Informatika dengan minat pada pemrograman, web development, big data, data analytics, modeling, dan AI.',
      en: 'Currently studying Informatics with interests in programming, web development, big data, data analytics, modeling, and AI.',
    },
    details: [
      { id: 'IPK 3,96 · Semester 7', en: 'GPA 3.96 · 7th semester' },
      {
        id: 'Mata kuliah relevan: Algoritma, Rekayasa Perangkat Lunak, Sistem Basis Data, Machine Learning, Kecerdasan Buatan, Pemrograman Web.',
        en: 'Relevant coursework: Algorithms, Software Engineering, Database Systems, Machine Learning, Artificial Intelligence, Web Programming.',
      },
    ],
  },
  {
    period: { id: '2020–2023', en: '2020–2023' },
    title: { id: 'SMA N 1 Depok', en: 'SMA N 1 Depok' },
    role: { id: 'MIPA', en: 'Science (MIPA)' },
    text: {
      id: 'Menempuh pendidikan dengan dasar sains yang membantu membangun cara berpikir analitis dan sistematis.',
      en: 'Studied with a science foundation that helped build analytical and systematic thinking.',
    },
  },
];

// Groups from the old portfolio, plus CV skills it lacked. "Sedang Dipelajari" removed 2026-10-26;
// its one tool (Gemini API) moved to Web Development.
export const skills: SkillGroup[] = [
  {
    name: { id: 'Web Development', en: 'Web Development' },
    description: {
      id: 'Membangun antarmuka dan backend aplikasi web, dari tampilan sampai API dan database.',
      en: 'Building web interfaces and backends, from the UI to APIs and databases.',
    },
    items: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Vite', 'Node.js', 'Express', 'Flask', 'REST API', 'PostgreSQL', 'Gemini API'],
  },
  {
    name: { id: 'Tools & Workflow', en: 'Tools & Workflow' },
    description: {
      id: 'Alat yang menjaga kode dan project tetap rapi dan terlacak.',
      en: 'Tools that keep code and projects organized and traceable.',
    },
    items: ['Git', 'GitHub', 'GitHub Actions', 'VS Code'],
  },
  {
    name: { id: 'Data & Modeling', en: 'Data & Modeling' },
    description: {
      id: 'Mengolah data dan membangun model machine learning dengan Python.',
      en: 'Processing data and building machine learning models with Python.',
    },
    items: ['Python', 'Jupyter Notebook', 'Pandas', 'NumPy', 'Scikit-learn', 'XGBoost', 'PySpark'],
  },
];
