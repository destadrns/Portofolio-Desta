import type { Certification, CloudCourseGroup, Profile, SkillGroup, TimelineItem } from '../types';

// Sources: the old portfolio (copied as written) and the CV (PRD Appendix A).
export const profile: Profile = {
  name: 'Desta Adriyan Saputra',
  photo: './img/profile.webp',
  // One CV per language; the download follows the active language (v2.1).
  cv: { id: './cv/CV_Desta_Adriyan_Saputra_ID.pdf', en: './cv/CV_Desta_Adriyan_Saputra_EN.pdf' },
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

// One entry (v2.1). SIMO Mugi Jaya stays in Projects; the Gemini bootcamp moved to Certifications.
export const experience: TimelineItem[] = [
  {
    period: { id: 'Agu 2026 – Okt 2026 · Yogyakarta', en: 'Aug 2026 – Oct 2026 · Yogyakarta' },
    title: { id: 'Badan Pusat Statistik (BPS) Kota Yogyakarta', en: 'BPS-Statistics of Yogyakarta Municipality' },
    role: {
      id: 'Magang – Pengolahan Data Statistik & Dukungan Operasional',
      en: 'Intern – Statistical Data Processing & Operations Support',
    },
    points: [
      {
        id: 'Berkontribusi dalam pengolahan data statistik di BPS Kota Yogyakarta, melakukan entri dan validasi data dari dokumen sumber agar data akurat dan siap diolah lebih lanjut.',
        en: "Contributed to statistical data processing at the municipal office of Indonesia's national statistics agency, entering and validating records from source documents so datasets were accurate and ready for further processing.",
      },
      {
        id: 'Menerapkan pemeriksaan kualitas data dengan mencocokkan hasil entri terhadap dokumen sumber dan mengidentifikasi inkonsistensi untuk diperbaiki.',
        en: 'Applied data-quality checks by cross-referencing entries against source documents and identifying inconsistencies for correction.',
      },
      {
        id: 'Memberikan dukungan lintas fungsi kepada berbagai unit kerja, meliputi kompilasi data, pengelolaan dokumen, dan operasional administrasi.',
        en: 'Provided cross-functional support to multiple work units, handling data compilation, document management, and administrative operations.',
      },
      {
        id: 'Menangani beragam penugasan dari staf lintas tim, mengelola prioritas dan tenggat yang dinamis, serta cepat beradaptasi dengan standar kerja instansi pemerintah.',
        en: 'Handled a wide range of assignments from staff across teams, managing shifting priorities and deadlines while adapting quickly to government work standards.',
      },
    ],
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

// Names stay in English. Each link opens the public credential for verification.
export const certifications: Certification[] = [
  {
    name: 'Google Gemini AI Developer',
    issuer: 'SmartBridge Indonesia',
    date: { id: 'Jul 2026', en: 'Jul 2026' },
    description: {
      id: 'Lulusan LastMile 2026 Bootcamp (Mar–Jun 2026): dasar LLM, prompt engineering, dan pengembangan aplikasi dengan Gemini API.',
      en: 'LastMile 2026 Bootcamp graduate (Mar–Jun 2026): LLM fundamentals, prompt engineering, and Gemini API app development.',
    },
    verifyUrl: 'https://id.myskillwallet.ai/verify/certificate/5f799b77-b75c-4ddc-80b5-3ef12c2e0514',
  },
  {
    name: 'Deploy Multi-Agent Architectures',
    issuer: 'Google',
    date: { id: 'Jun 2026', en: 'Jun 2026' },
    verifyUrl: 'https://www.credly.com/badges/edd6cd4e-e18a-4302-bd10-668b14aa7461',
  },
  {
    name: 'Develop GenAI Apps with Gemini and Streamlit Skill Badge',
    issuer: 'Google',
    date: { id: 'Jun 2026', en: 'Jun 2026' },
    verifyUrl: 'https://www.credly.com/badges/c11b1e48-1b21-4f1a-a839-75472096f1f3',
  },
  {
    name: 'Inspect Rich Documents with Gemini Multimodality and Multimodal RAG Skill Badge',
    issuer: 'Google',
    date: { id: 'Jun 2026', en: 'Jun 2026' },
    verifyUrl: 'https://www.credly.com/badges/e5408755-2665-436f-bdf1-3521662e6cab',
  },
  {
    name: 'Prompt Design in Vertex AI Skill Badge',
    issuer: 'Google',
    date: { id: 'Mar 2026', en: 'Mar 2026' },
    verifyUrl: 'https://www.credly.com/badges/f8656181-a34e-46a3-9ab2-61f955edcaef',
  },
  {
    name: 'CCNA: Introduction to Networks',
    issuer: 'Cisco Networking Academy',
    date: { id: 'Apr 2025', en: 'Apr 2025' },
    verifyUrl: 'https://www.credly.com/badges/207b47e3-e921-4de6-8b0c-d520dca5e727',
  },
];

// Google Skills public profile; a course's badge page is cloudCourseUrl(badgeId).
const GOOGLE_SKILLS_PROFILE = 'https://www.skills.google/public_profiles/014fcc9a-389f-4af9-8647-7e6b5ee35960/badges';
export const cloudCourseUrl = (badgeId: string) => `${GOOGLE_SKILLS_PROFILE}/${badgeId}`;

// Completion badges that complement the skill badges above, newest first within each theme.
export const cloudCourseGroups: CloudCourseGroup[] = [
  {
    name: 'AI Agents & Generative AI',
    courses: [
      { name: 'Build Intelligent Agents with Agent Development Kit (ADK)', date: { id: 'Jun 2026', en: 'Jun 2026' }, badgeId: '24758009' },
      { name: 'Deploy Multi-Agent Systems with Gemini Enterprise Agent Platform', date: { id: 'Jun 2026', en: 'Jun 2026' }, badgeId: '24758007' },
      { name: 'Build AI Agents with Enterprise Databases', date: { id: 'Jun 2026', en: 'Jun 2026' }, badgeId: '24760646' },
      { name: 'Vector Search and Embeddings', date: { id: 'Jun 2026', en: 'Jun 2026' }, badgeId: '24772906' },
      { name: 'Generate and Edit Media in Agent Platform', date: { id: 'Jun 2026', en: 'Jun 2026' }, badgeId: '24766797' },
      { name: 'Generative AI Explorer – Agent Platform', date: { id: 'Jun 2026', en: 'Jun 2026' }, badgeId: '24716904' },
    ],
  },
  {
    name: 'MLOps & Responsible AI',
    courses: [
      { name: 'Responsible AI for Developers: Privacy & Safety', date: { id: 'Jun 2026', en: 'Jun 2026' }, badgeId: '24781577' },
      { name: 'Machine Learning Operations (MLOps) for Generative AI', date: { id: 'Apr 2026', en: 'Apr 2026' }, badgeId: '23593430' },
      { name: 'MLOps with Agent Platform: Model Evaluation', date: { id: 'Apr 2026', en: 'Apr 2026' }, badgeId: '23593506' },
      { name: 'Model Armor: Securing AI Deployments', date: { id: 'Apr 2026', en: 'Apr 2026' }, badgeId: '23597461' },
      { name: 'Responsible AI: Applying AI Principles with Google Cloud', date: { id: 'Apr 2026', en: 'Apr 2026' }, badgeId: '23593367' },
    ],
  },
  {
    name: 'Cloud Foundations',
    courses: [
      { name: 'Google Cloud Essentials', date: { id: 'Jun 2026', en: 'Jun 2026' }, badgeId: '24686541' },
      { name: 'Google Developer Essentials', date: { id: 'Jun 2026', en: 'Jun 2026' }, badgeId: '24687229' },
    ],
  },
];
