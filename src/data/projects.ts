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
      id: 'Saya membangun toko React dengan backend NestJS: harga dihitung di server, stok direservasi saat checkout, dan pembayaran memakai simulator.',
      en: 'I built a React store with a NestJS backend: server-calculated prices, stock reservation at checkout, and simulated payments.',
    },
    highlight: {
      id: '200 test otomatis: 105 unit dan 95 end-to-end.',
      en: '200 automated tests: 105 unit and 95 end-to-end.',
    },
    contribution: {
      id: 'Pengembangan mandiri frontend dan backend dalam monorepo React, NestJS, Prisma, dan PostgreSQL, termasuk reservasi stok atomik, akses admin per peran, serta simulator Virtual Account, QRIS, dan kartu.',
      en: 'Independent frontend and backend development in a React, NestJS, Prisma, and PostgreSQL monorepo, including atomic stock reservation, role-based admin access, and Virtual Account, QRIS, and card simulators.',
    },
    flow: [
      { id: 'Pilih produk fashion dari katalog dan masukkan ke keranjang.', en: 'Choose fashion products from the catalog and add them to the cart.' },
      { id: 'Saat checkout, server memeriksa harga dan mereservasi stok.', en: 'At checkout, the server checks prices and reserves stock.' },
      { id: 'Simulasikan pembayaran dan ikuti status pesanan.', en: 'Simulate a payment and follow the order status.' },
    ],
    evidence: { id: 'Cakupan suite backend dan perintah menjalankan pengujian tersedia di README.', en: 'Backend test coverage and commands for running the suites are documented in the README.' },
    evidenceLink: 'https://github.com/destadrns/NOVAE#6-run-automated-test-suites',
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
      id: 'Bersama tim Scrum, saya mengembangkan frontend dan backend untuk menyatukan produksi, gudang, pemeriksaan kualitas, dan pengiriman.',
      en: 'With a Scrum team, I developed the frontend and backend to connect production, warehousing, quality checks, and delivery.',
    },
    highlight: {
      id: 'Checklist QC dan bukti foto menjadi syarat sebelum pengiriman.',
      en: 'A QC checklist and photo evidence are required before shipping.',
    },
    contribution: {
      id: 'Dalam tim Scrum lima orang, saya ikut meriset alur klien, memodelkan use case dan activity dengan PlantUML, serta mengembangkan frontend React/Vite dan backend Express/PostgreSQL. Hasil tim mencakup QC, pelacakan GPS, akses berbasis JWT, dan log audit.',
      en: 'In a five-person Scrum team, I helped research the client workflow, model use cases and activities with PlantUML, and develop the React/Vite frontend and Express/PostgreSQL backend. Team deliverables include QC, GPS tracking, JWT-based access, and audit logs.',
    },
    flow: [
      { id: 'Tim produksi memperbarui status pekerjaan dan gudang.', en: 'The production team updates work and warehouse status.' },
      { id: 'Petugas QC mengisi checklist dan melampirkan bukti foto.', en: 'QC staff complete the checklist and attach photo evidence.' },
      { id: 'Pantau pengiriman lewat peta GPS dan telusuri perubahan di log audit.', en: 'Follow deliveries on the GPS map and trace changes in the audit log.' },
    ],
    evidence: { id: 'Proyek klien CV Mugi Jaya; fitur dan skenario demonstrasi didokumentasikan oleh tim.', en: 'A project for client CV Mugi Jaya; features and demonstration scenarios are documented by the team.' },
    evidenceLink: 'https://github.com/Arsyacoo/Simo-System#readme',
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
      id: 'Saya membangun buku besar bersama dengan pembukuan double-entry, kontrol peran, dan nominal yang disimpan sebagai bilangan bulat.',
      en: 'I built shared ledgers with double-entry bookkeeping, role-based access, and amounts stored as integers.',
    },
    highlight: {
      id: 'Buku besar bersama dengan empat peran: Owner, Admin, Member, dan Viewer.',
      en: 'Shared ledgers with four roles: Owner, Admin, Member, and Viewer.',
    },
    contribution: {
      id: 'Pengembangan mandiri aplikasi keuangan: pembukuan double-entry, nominal bilangan bulat untuk menghindari galat floating-point, hashing kata sandi Argon2id, dan jejak audit.',
      en: 'Independent development of the finance app: double-entry bookkeeping, integer amounts to avoid floating-point errors, Argon2id password hashing, and an audit trail.',
    },
    flow: [
      { id: 'Buat buku besar bersama dan atur peran anggota keluarga.', en: 'Create a shared ledger and assign family members their roles.' },
      { id: 'Catat transaksi sebagai pasangan debit dan kredit.', en: 'Record transactions as debit and credit entries.' },
      { id: 'Tinjau saldo dan telusuri riwayat perubahan melalui log audit.', en: 'Review balances and trace changes through the audit log.' },
    ],
    evidence: { id: 'Arsitektur pembukuan, pengujian, dan cara menjalankan aplikasi tersedia di README.', en: 'The bookkeeping architecture, tests, and setup instructions are documented in the README.' },
    evidenceLink: 'https://github.com/destadrns/Nest#readme',
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
      id: 'Saya membuat prototype untuk merapikan gejala, catatan obat, dan rencana pulih, dengan tanya jawab berbasis Gemini API.',
      en: 'I built a prototype for organizing symptoms, medication notes, and recovery plans, with Q&A powered by the Gemini API.',
    },
    highlight: {
      id: 'Alat bantu awal, bukan alat diagnosis atau pengganti dokter.',
      en: 'A first-step aid, not a diagnostic tool or a replacement for a doctor.',
    },
    contribution: {
      id: 'Capstone mandiri dengan pencatatan gejala dan obat, rencana pulih, ruang tenang, penyimpanan lokal, serta integrasi Gemini untuk rangkuman dan tanya jawab.',
      en: 'An independent capstone with symptom and medication notes, recovery planning, a calm space, local storage, and Gemini integration for summaries and Q&A.',
    },
    flow: [
      { id: 'Catat keluhan dan informasi gejala dalam satu tempat.', en: 'Record concerns and symptom information in one place.' },
      { id: 'Rapikan catatan obat dan rencana pulih untuk ditinjau kembali.', en: 'Organize medication notes and recovery plans for later review.' },
      { id: 'Gunakan tanya jawab untuk informasi umum; keputusan medis tetap bersama tenaga kesehatan.', en: 'Use Q&A for general information; make medical decisions with a healthcare professional.' },
    ],
    evidence: { id: 'Prototype pendamping pencatatan; batas penggunaan dan cara menjalankan dijelaskan di README.', en: 'A note-taking companion prototype; usage limits and setup are explained in the README.' },
    evidenceLink: 'https://github.com/destadrns/Sehatara#readme',
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
      id: 'Saya membangun pipeline SVR dari data NASA Battery Aging sampai evaluasi model dan dashboard prediksi berbasis Flask.',
      en: 'I built an SVR pipeline from NASA Battery Aging data to model evaluation and a Flask prediction dashboard.',
    },
    highlight: {
      id: 'MAE 7,55 siklus, RMSE 9,19 siklus, R² 0,91',
      en: 'MAE 7.55 cycles, RMSE 9.19 cycles, R² 0.91',
    },
    contribution: {
      id: 'Pengembangan mandiri dari persiapan data, EDA, preprocessing, pelatihan SVR, hingga evaluasi Leave-One-Battery-Out dan dashboard Flask. Satu baterai dijadikan data uji; baterai lain untuk pelatihan.',
      en: 'Independent work from data preparation, EDA, preprocessing, and SVR training to Leave-One-Battery-Out evaluation and a Flask dashboard. One battery is held out for testing; the others are used for training.',
    },
    flow: [
      { id: 'Siapkan data degradasi baterai dari dataset NASA.', en: 'Prepare battery degradation data from the NASA dataset.' },
      { id: 'Model SVR memperkirakan sisa umur baterai dalam siklus.', en: 'The SVR model estimates remaining battery life in cycles.' },
      { id: 'Periksa hasil prediksi dan performa model pada dashboard.', en: 'Inspect predictions and model performance on the dashboard.' },
    ],
    evidence: { id: 'Benchmark NASA Battery Aging dengan evaluasi Leave-One-Battery-Out. Hasil terbatas pada kondisi dataset tersebut.', en: 'NASA Battery Aging benchmark with Leave-One-Battery-Out evaluation. Results are limited to the conditions in that dataset.' },
    evidenceLink: 'https://github.com/destadrns/Lithium-Ion-RUL-Prediction-SVR#ringkasan-model',
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
      id: 'Proyek tim dengan PySpark. Pada evaluasi notebook, Random Forest mencapai akurasi sekitar 94% dan AUC 0,96, dibandingkan dengan Logistic Regression. Rincian data dan pengujian ada di notebook repo.',
      en: 'A team project with PySpark. In the notebook evaluation, Random Forest reaches about 94% accuracy and 0.96 AUC, compared with Logistic Regression. Data and evaluation details are in the repository notebook.',
    },
    stack: ['PySpark', 'Spark SQL', 'Random Forest'],
    link: 'https://github.com/destadrns/Flight-Delay-Analysis-PySpark',
  },
  {
    name: 'MLOps Tarif Transportasi Online',
    description: {
      id: 'Pipeline MLOps mini untuk estimasi tarif dan API prediksi lokal. Random Forest mencapai R² 0,92 pada evaluasi proyek; rincian tersedia di notebook repo.',
      en: 'A mini MLOps pipeline for fare estimation and a local prediction API. Random Forest reaches R² 0.92 in the project evaluation; details are in the repository notebook.',
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
