import type { Localized, SectionHead } from '../types';

// Section heads in page order: small label, title (also the nav label), and one purpose sentence.
// Purpose sentences for Experience, Education, Skills, and Contact are the old portfolio's openers.
export const sections: SectionHead[] = [
  {
    id: 'about',
    label: { id: 'Profil singkat', en: 'Short profile' },
    title: { id: 'Tentang Saya', en: 'About Me' },
    purpose: {
      id: 'Dari alur pengguna sampai API, database, dan evaluasi model.',
      en: 'From user flows to APIs, databases, and model evaluation.',
    },
  },
  {
    id: 'projects',
    label: { id: 'Karya pilihan', en: 'Selected work' },
    title: { id: 'Proyek', en: 'Projects' },
    purpose: {
      id: 'Tiga aplikasi web full-stack, satu asisten AI, dan satu model prediksi. Lihat alur, kontribusi, dan bukti teknisnya.',
      en: 'Three full-stack web apps, an AI assistant, and a prediction model. Explore the workflows, my contributions, and the technical evidence.',
    },
  },
  {
    id: 'experience',
    label: { id: 'Pengalaman', en: 'Experience' },
    title: { id: 'Pengalaman & Aktivitas', en: 'Experience & Activities' },
    purpose: {
      id: 'Pengalaman profesional yang melatih ketelitian saya dalam mengolah data dan bekerja sesuai standar instansi.',
      en: 'Professional experience that sharpened my accuracy in handling data and working to institutional standards.',
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
    id: 'certifications',
    label: { id: 'Kredensial', en: 'Credentials' },
    title: { id: 'Sertifikasi', en: 'Certifications' },
    purpose: {
      id: 'Sertifikat dari Google, Cisco, dan bootcamp AI yang mendukung pengembangan aplikasi berbasis AI.',
      en: 'Certificates from Google, Cisco, and an AI bootcamp that back my work on AI-powered applications.',
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
  // Accessible name of the main CV button; it starts with the visible text (WCAG 2.5.3).
  downloadCvLabel: { id: 'Unduh CV (PDF, Bahasa Indonesia)', en: 'Download CV (PDF, English)' },
  // The secondary link offers the other language, so its text is in that language.
  cvOtherVersion: { id: 'English version (PDF)', en: 'Versi Bahasa Indonesia (PDF)' },
  verify: { id: 'Verifikasi', en: 'Verify' },
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
  copyFailed: {
    id: 'Salin otomatis gagal. Pilih alamat email di atas untuk menyalinnya secara manual, atau gunakan Kirim Email.',
    en: 'Automatic copy failed. Select the email address above to copy it manually, or use Send Email.',
  },
  viewScreenshot: { id: 'Perbesar tangkapan layar', en: 'Open full screenshot' },
  projectDetails: { id: 'Jelajahi alur & bukti teknis', en: 'Explore workflow & technical evidence' },
  contribution: { id: 'Kontribusi saya', en: 'My contribution' },
  workflow: { id: 'Alur penggunaan', en: 'User workflow' },
  workflowNote: { id: 'Panduan berdasarkan dokumentasi proyek.', en: 'A walkthrough based on the project documentation.' },
  viewEvidence: { id: 'Lihat bukti & panduan menjalankan', en: 'View evidence & setup guide' },
  projectIndex: { id: 'Langsung ke proyek', en: 'Jump to a project' },
  socialLabel: { id: 'Media sosial', en: 'Social media' },
} satisfies Record<string, Localized>;
