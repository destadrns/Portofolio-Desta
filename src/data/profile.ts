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
    role: 'Full-Stack Developer & Machine Learning',
    intro: {
      id: 'Saya mahasiswa Informatika yang tertarik pada pengembangan web, analisis data, dan pemodelan berbasis AI. Saya suka membangun tampilan yang rapi, responsif, dan mencoba memahami bagaimana data bisa diolah menjadi insight yang berguna.',
      en: "I'm an Informatics student interested in web development, data analysis, and AI-based modeling. I enjoy building clean, responsive interfaces and figuring out how data can be turned into useful insight.",
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
        id: 'Saya adalah mahasiswa Informatika yang sedang membangun kemampuan di bidang web development, data analytics, dan AI. Dalam proses belajar, saya cukup sering mencoba berbagai project kecil maupun project berbasis data untuk memahami bagaimana sebuah ide bisa diubah menjadi sesuatu yang lebih terstruktur dan berguna.',
        en: "I'm an Informatics student building my skills in web development, data analytics, and AI. While learning, I often take on small projects as well as data-driven ones to understand how an idea can be turned into something more structured and useful.",
      },
      {
        id: 'Saat mengerjakan project, saya biasanya memulai dari layout dan alur utama terlebih dahulu, lalu memecah fitur menjadi bagian-bagian kecil agar prosesnya lebih terarah. Saya suka membuat tampilan yang rapi dan responsif, tetapi akhir-akhir ini saya juga semakin tertarik mendalami data analytics, modeling, dan penggunaan AI dengan Python serta Jupyter Notebook.',
        en: "When working on a project, I usually start with the layout and main flow, then break features into smaller parts so the process stays focused. I like building clean, responsive interfaces, but lately I've grown more interested in data analytics, modeling, and using AI with Python and Jupyter Notebook.",
      },
      {
        id: 'Bagi saya, project bukan hanya tentang membuat sesuatu yang berjalan, tetapi juga tentang memahami masalah, merapikan struktur, dan memperbaiki hasilnya sedikit demi sedikit.',
        en: "For me, a project isn't only about making something that runs, but also about understanding the problem, tidying up the structure, and improving the result bit by bit.",
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
