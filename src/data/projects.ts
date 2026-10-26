import type { OtherProject, Project } from '../types';

export const projects: Project[] = [
  {
    id: 'novae',
    number: '01',
    name: 'NOVAÉ',
    kind: { id: 'Aplikasi web full-stack', en: 'Full-stack web application' },
    year: 2026,
    role: { id: 'Full-Stack Developer (solo)', en: 'Full-Stack Developer (solo)' },
    tagline: {
      id: 'Platform e-commerce fashion digital',
      en: 'Digital fashion commerce platform',
    },
    problem: {
      id: 'Toko fashion digital butuh tampilan editorial yang bercerita, tetapi tetap harus seketat toko sungguhan dalam urusan harga, stok, dan pesanan.',
      en: 'A digital fashion store needs an editorial look that tells a story, yet it must be as strict as a real store about prices, stock, and orders.',
    },
    solution: {
      id: 'Saya membangun monorepo React dengan backend NestJS, Prisma, dan PostgreSQL. Harga dihitung di server, stok direservasi secara atomik saat checkout, akses admin diperiksa per peran, dan simulator pembayaran (Virtual Account, QRIS, kartu) membuat seluruh alur pesanan bisa didemokan dengan aman.',
      en: 'I built a React monorepo with a NestJS, Prisma, and PostgreSQL backend. Prices are calculated on the server, stock is reserved atomically at checkout, admin access is checked per role, and a payment simulator (Virtual Account, QRIS, card) lets the full order flow be demonstrated safely.',
    },
    highlight: {
      id: '200 test otomatis: 105 unit dan 95 end-to-end.',
      en: '200 automated tests: 105 unit and 95 end-to-end.',
    },
    stack: ['React', 'TypeScript', 'NestJS', 'Prisma', 'PostgreSQL', 'Supabase Auth'],
    // Base name only: the 1760 px master lives in assets-src/; components serve the sized copies.
    image: './img/novae.webp',
    imageAlt: {
      id: 'Tangkapan layar NOVAÉ, platform e-commerce fashion digital',
      en: 'Screenshot of NOVAÉ, a digital fashion commerce platform',
    },
    link: 'https://github.com/destadrns/NOVAE',
  },
  {
    id: 'simo-mugi-jaya',
    number: '02',
    name: 'SIMO Mugi Jaya',
    kind: { id: 'Aplikasi web full-stack', en: 'Full-stack web application' },
    year: 2026,
    role: {
      id: 'Full-Stack Developer (tim Scrum 5 orang)',
      en: 'Full-Stack Developer (5-person Scrum team)',
    },
    tagline: {
      id: 'Sistem informasi operasional manufaktur',
      en: 'Operational information system for manufacturing',
    },
    problem: {
      id: 'CV Mugi Jaya mencatat produksi, gudang, dan quality control secara manual dan tersebar.',
      en: 'CV Mugi Jaya tracked production, warehousing, and quality control manually, in scattered records.',
    },
    solution: {
      id: 'Bersama tim Scrum lima orang, saya meriset alur kerja klien dari produksi sampai pengiriman, memodelkannya dengan diagram use case dan activity (PlantUML), lalu membangun frontend React/Vite dan backend Express/PostgreSQL: checklist QC dengan bukti foto sebagai syarat kirim, pelacakan GPS pengiriman, akses berbasis peran dengan JWT, dan jejak audit.',
      en: 'With a five-person Scrum team, I researched the client’s workflow from production to delivery, modeled it with use case and activity diagrams (PlantUML), then built a React/Vite frontend and an Express/PostgreSQL backend: a QC checklist with photo evidence required before shipping, GPS delivery tracking, role-based access with JWT, and an audit trail.',
    },
    highlight: {
      id: 'Project untuk klien nyata, diawali riset alur produksi sampai pengiriman.',
      en: 'A real client project that began with research into the production-to-delivery workflow.',
    },
    stack: ['React', 'Vite', 'Express', 'PostgreSQL', 'Leaflet', 'JWT'],
    image: './img/simo-mugi-jaya.webp',
    imageAlt: {
      id: 'Tangkapan layar SIMO Mugi Jaya, sistem informasi operasional manufaktur',
      en: 'Screenshot of SIMO Mugi Jaya, an operational information system for manufacturing',
    },
    // Team repo, not Desta's SIMO-Trial repo.
    link: 'https://github.com/Arsyacoo/Simo-System',
  },
  {
    id: 'nest',
    number: '03',
    name: 'NEST',
    kind: { id: 'Aplikasi web full-stack', en: 'Full-stack web application' },
    year: 2026,
    role: { id: 'Full-Stack Developer (solo)', en: 'Full-Stack Developer (solo)' },
    tagline: { id: 'Platform keuangan rumah tangga', en: 'Household finance platform' },
    problem: {
      id: 'Kebanyakan aplikasi keuangan hanya mencatat saldo, sehingga kurang cocok untuk akun bersama keluarga, dua mata uang, dan anggaran yang bergulir.',
      en: 'Most finance apps only track balances, so they fit poorly with shared family accounts, two currencies, and rolling budgets.',
    },
    solution: {
      id: 'Saya menerapkan pembukuan double-entry dengan nominal disimpan sebagai bilangan bulat agar bebas galat pembulatan, buku besar bersama dengan peran Owner, Admin, Member, dan Viewer, serta hashing kata sandi Argon2id dan log audit.',
      en: 'I implemented double-entry bookkeeping with amounts stored as integers to avoid rounding errors, shared ledgers with Owner, Admin, Member, and Viewer roles, plus Argon2id password hashing and audit logs.',
    },
    highlight: {
      id: 'Nominal disimpan sebagai bilangan bulat, jadi bebas galat pembulatan.',
      en: 'Amounts are stored as integers, so there are no rounding errors.',
    },
    stack: ['React', 'TypeScript', 'NestJS', 'Prisma', 'PostgreSQL', 'Redis', 'Docker'],
    image: './img/nest.webp',
    imageAlt: {
      id: 'Tangkapan layar NEST, platform keuangan rumah tangga',
      en: 'Screenshot of NEST, a household finance platform',
    },
    link: 'https://github.com/destadrns/Nest',
  },
  {
    id: 'sehatara',
    number: '04',
    name: 'Sehatara',
    kind: { id: 'Aplikasi berbasis AI', en: 'AI-based application' },
    year: 2026,
    role: {
      id: 'Full-Stack Developer (solo, capstone)',
      en: 'Full-Stack Developer (solo, capstone)',
    },
    tagline: { id: 'Asisten kesehatan berbasis AI', en: 'AI-based health assistant' },
    problem: {
      id: 'Informasi keluhan dan catatan kesehatan ringan sering tersebar, sehingga pengguna membutuhkan ruang sederhana untuk merapikan informasi sebelum mengambil langkah berikutnya.',
      en: 'Notes on symptoms and minor health concerns are often scattered, so people need a simple space to organize them before deciding on their next step.',
    },
    solution: {
      id: 'Saya membuat prototype web dengan fitur pencatatan gejala, catatan obat, rencana pulih, ruang tenang, dan tanya jawab berbasis Gemini API. Project ini tetap diposisikan sebagai alat bantu awal, bukan pengganti dokter.',
      en: 'I built a web prototype with symptom logging, medication notes, recovery plans, a calm space, and Q&A powered by the Gemini API. The project stays positioned as a first-step aid, not a replacement for a doctor.',
    },
    highlight: {
      id: 'Dirancang sebagai alat bantu awal, bukan alat diagnosis.',
      en: 'Designed as a first-step aid, not a diagnostic tool.',
    },
    stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Gemini API'],
    image: './img/sehatara.webp',
    imageAlt: {
      id: 'Tangkapan layar Sehatara, asisten kesehatan berbasis AI',
      en: 'Screenshot of Sehatara, an AI-based health assistant',
    },
    link: 'https://github.com/destadrns/Sehatara',
  },
  {
    id: 'lithium-ion-rul',
    number: '05',
    name: 'Lithium-Ion RUL',
    kind: { id: 'Model machine learning', en: 'Machine learning model' },
    year: 2026,
    role: { id: 'Data Scientist / ML (solo)', en: 'Data Scientist / ML (solo)' },
    tagline: {
      id: 'Prediksi sisa umur baterai lithium-ion',
      en: 'Remaining useful life prediction for lithium-ion batteries',
    },
    problem: {
      id: 'Umur pakai baterai perlu diprediksi agar degradasi performa dapat dipahami dan dianalisis lebih awal.',
      en: 'Battery lifespan needs to be predicted so performance degradation can be understood and analyzed early.',
    },
    solution: {
      id: 'Saya membangun pipeline prediksi RUL menggunakan data NASA Battery Aging, mulai dari data preparation, EDA, preprocessing, training SVR, evaluasi model, hingga dashboard sederhana untuk melihat hasil prediksi.',
      en: 'I built an RUL prediction pipeline using NASA Battery Aging data, from data preparation, EDA, and preprocessing to SVR training, model evaluation, and a simple dashboard for viewing predictions.',
    },
    highlight: {
      id: 'MAE 7,55 siklus, RMSE 9,19, R² 0,91',
      en: 'MAE 7.55 cycles, RMSE 9.19, R² 0.91',
    },
    stack: ['Python', 'scikit-learn', 'SVR', 'Flask'],
    image: './img/lithium-ion-rul.webp',
    imageAlt: {
      id: 'Tangkapan layar Lithium-Ion RUL, prediksi sisa umur baterai lithium-ion',
      en: 'Screenshot of Lithium-Ion RUL, remaining useful life prediction for lithium-ion batteries',
    },
    link: 'https://github.com/destadrns/Lithium-Ion-RUL-Prediction-SVR',
  },
];

export const otherProjects: OtherProject[] = [
  {
    name: 'ETH Price Prediction',
    description: {
      id: 'Gradient Boosting dengan sentimen berita (FinRoBERTa) untuk memprediksi arah harga Ethereum 4 jam ke depan.',
      en: 'Gradient Boosting with news sentiment (FinRoBERTa) to predict Ethereum price direction four hours ahead.',
    },
    stack: ['Python', 'Gradient Boosting', 'FinRoBERTa'],
    link: 'https://github.com/destadrns/ETH-Price-Prediction-Gradient-Boosting',
  },
  {
    name: 'Flight Delay Analysis',
    description: {
      id: 'Analisis dan prediksi keterlambatan penerbangan dengan PySpark. Random Forest mencapai akurasi sekitar 94%. Project tim.',
      en: 'Flight delay analysis and prediction with PySpark. Random Forest reaches about 94% accuracy. Team project.',
    },
    stack: ['PySpark', 'Spark SQL', 'Random Forest'],
    link: 'https://github.com/destadrns/Flight-Delay-Analysis-PySpark',
  },
  {
    name: 'MLOps Tarif Transportasi Online',
    description: {
      id: 'Rancangan pipeline MLOps mini untuk estimasi tarif. Random Forest dengan R² 0,92 dan API prediksi lokal.',
      en: 'A mini MLOps pipeline design for ride-hailing fare estimation. Random Forest with R² 0.92 and a local prediction API.',
    },
    stack: ['Python', 'scikit-learn', 'FastAPI'],
    link: 'https://github.com/destadrns/MLOps-Tarif-Transportasi-Online',
  },
  {
    name: 'Prediksi SOC Baterai Kendaraan Listrik',
    description: {
      id: 'Project data mining bertahap: pemahaman data, penanganan missing value, dan seleksi fitur untuk estimasi State of Charge.',
      en: 'A staged data mining project: data understanding, missing-value handling, and feature selection for State of Charge estimation.',
    },
    stack: ['Python', 'Jupyter', 'Data Mining'],
    link: 'https://github.com/destadrns/Prediksi-SOC-Baterai-Kendaraan-Listrik',
  },
  {
    name: 'Smart Home Energy Analysis',
    description: {
      id: 'Pengelompokan profil pemakaian listrik rumah tangga dan prediksi konsumsi berdasarkan cuaca dan waktu.',
      en: 'Clustering household electricity usage profiles and predicting consumption from weather and time.',
    },
    stack: ['Python', 'K-Means', 'Linear Regression'],
    link: 'https://github.com/destadrns/smart-home-energy-consumption-analysis',
  },
];
