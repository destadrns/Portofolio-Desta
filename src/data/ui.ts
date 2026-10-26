import type { Localized, SectionHead } from '../types';

// Section heads in page order: small label, title (also the nav label), and one purpose sentence.
// Purpose sentences for Experience, Education, Skills, and Contact are the old portfolio's openers.
export const sections: SectionHead[] = [
  {
    id: 'about',
    label: { id: 'Profil singkat', en: 'Short profile' },
    title: { id: 'Tentang Saya', en: 'About Me' },
    purpose: {
      id: 'Siapa saya, apa yang sedang saya dalami, dan bagaimana saya mengerjakan project.',
      en: "Who I am, what I'm currently learning, and how I approach projects.",
    },
  },
  {
    id: 'projects',
    label: { id: 'Karya pilihan', en: 'Selected work' },
    title: { id: 'Proyek', en: 'Projects' },
    purpose: {
      id: 'Lima project yang paling mewakili kemampuan saya: tiga aplikasi web full-stack, satu aplikasi berbasis AI, dan satu model machine learning.',
      en: 'Five projects that best represent my skills: three full-stack web applications, one AI-based application, and one machine learning model.',
    },
  },
  {
    id: 'experience',
    label: { id: 'Pengalaman', en: 'Experience' },
    title: { id: 'Pengalaman & Aktivitas', en: 'Experience & Activities' },
    purpose: {
      id: 'Beberapa aktivitas yang ikut membentuk cara saya belajar, membangun project, dan mengeksplorasi teknologi.',
      en: 'Activities that have shaped how I learn, build projects, and explore technology.',
    },
  },
  {
    id: 'education',
    label: { id: 'Latar belakang', en: 'Background' },
    title: { id: 'Riwayat Pendidikan', en: 'Education' },
    purpose: {
      id: 'Latar pendidikan saya menjadi bagian dari proses untuk memahami pemrograman, analisis data, dan pengembangan teknologi secara lebih terarah.',
      en: 'My educational background is part of how I learn programming, data analysis, and technology development in a more focused way.',
    },
  },
  {
    id: 'skills',
    label: { id: 'Yang saya gunakan', en: 'What I use' },
    title: { id: 'Skill', en: 'Skills' },
    purpose: {
      id: 'Beberapa teknologi dan tools yang saya gunakan untuk membangun project web, mengolah data, serta mempelajari modeling dan AI.',
      en: 'Technologies and tools I use to build web projects, process data, and learn modeling and AI.',
    },
  },
  {
    id: 'contact',
    // Differs from the title on purpose (decided 2026-10-22).
    label: { id: 'Kontak', en: 'Contact' },
    title: { id: 'Mari terhubung', en: "Let's connect" },
    purpose: {
      id: 'Kalau kamu ingin berdiskusi tentang project, kolaborasi, atau sekadar terhubung, saya terbuka untuk ngobrol.',
      en: "If you'd like to discuss a project, collaborate, or just connect, I'm happy to talk.",
    },
  },
];

export function sectionHead(id: string): SectionHead {
  const head = sections.find((s) => s.id === id);
  if (!head) throw new Error(`Unknown section: ${id}`);
  return head;
}

// Interface text: navigation, buttons, labels, page title and meta description.
export const ui = {
  pageTitle: { id: 'Desta Adriyan Saputra — Portofolio', en: 'Desta Adriyan Saputra — Portfolio' },
  metaDescription: {
    id: 'Saya membangun aplikasi web full-stack dan model machine learning.',
    en: 'I build full-stack web applications and machine learning models.',
  },
  skipToContent: { id: 'Langsung ke konten', en: 'Skip to content' },
  navLabel: { id: 'Navigasi utama', en: 'Main navigation' },
  menu: { id: 'Menu', en: 'Menu' },
  closeMenu: { id: 'Tutup', en: 'Close' },
  languageLabel: { id: 'Bahasa', en: 'Language' },
  newTab: { id: '(tab baru)', en: '(new tab)' },
  downloadCv: { id: 'Unduh CV', en: 'Download CV' },
  viewProjects: { id: 'Lihat Proyek', en: 'View Projects' },
  problem: { id: 'Masalah', en: 'Problem' },
  solution: { id: 'Solusi', en: 'Solution' },
  highlight: { id: 'Sorotan', en: 'Highlight' },
  stack: { id: 'Stack', en: 'Stack' },
  viewRepo: { id: 'Lihat repo', en: 'View repo' },
  otherProjects: { id: 'Project lainnya', en: 'Other projects' },
  sendEmail: { id: 'Kirim Email', en: 'Send Email' },
  copyEmail: { id: 'Salin Email', en: 'Copy Email' },
  copied: { id: 'Tersalin', en: 'Copied' },
  copiedStatus: { id: 'Email berhasil disalin.', en: 'Email copied.' },
  socialLabel: { id: 'Media sosial', en: 'Social media' },
} satisfies Record<string, Localized>;
