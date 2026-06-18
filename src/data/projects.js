export const projects = [
  {
    id: 1,
    name: 'Sehatara',
    description:
      'Prototype web kesehatan awal yang membantu pengguna merapikan keluhan, mencatat obat, menyusun rencana pulih ringan, dan bertanya melalui asisten AI berbasis Gemini.',
    problem:
      'Informasi keluhan dan catatan kesehatan ringan sering tersebar, sehingga pengguna membutuhkan ruang sederhana untuk merapikan informasi sebelum mengambil langkah berikutnya.',
    solution:
      'Saya membuat prototype web dengan fitur pencatatan gejala, catatan obat, rencana pulih, ruang tenang, dan tanya jawab berbasis Gemini API. Project ini tetap diposisikan sebagai alat bantu awal, bukan pengganti dokter.',
    techStack: ['React', 'Vite', 'TypeScript', 'CSS', 'Lucide React', 'Gemini API', 'LocalStorage'],
    status: 'Prototype',
    category: 'Web',
    github: 'https://github.com/destadrns/Sehatara.git',
    color: '#34423A',
  },
  {
    id: 2,
    name: 'Smart Home Energy Consumption Analysis',
    description:
      'Project analisis konsumsi energi rumah tangga berbasis data smart home dan faktor cuaca.',
    problem:
      'Pola konsumsi listrik rumah tangga dapat berubah karena perilaku pengguna dan kondisi cuaca, sehingga perlu dianalisis agar lebih mudah dipahami.',
    solution:
      'Saya melakukan analisis data dengan pendekatan data mining, termasuk clustering untuk mengelompokkan profil penggunaan listrik dan predictive modeling untuk memperkirakan konsumsi energi berdasarkan cuaca dan waktu.',
    techStack: ['Python', 'Jupyter Notebook', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Scikit-learn', 'K-Means', 'Linear Regression'],
    status: 'Final Project',
    category: 'Data',
    github: 'https://github.com/destadrns/smart-home-energy-consumption-analysis.git',
    color: '#25312B',
  },
  {
    id: 3,
    name: 'Prediksi SOC Baterai Kendaraan Listrik',
    description:
      'Project data mining untuk memprediksi State of Charge baterai lithium-ion pada kendaraan listrik.',
    problem:
      'SOC baterai merupakan parameter penting dalam Battery Management System, tetapi tidak selalu dapat diukur langsung oleh sensor.',
    solution:
      'Saya mengolah data eksperimen baterai, melakukan eksplorasi data, simulasi data preparation, feature selection, dan eksperimen model untuk mendukung estimasi SOC.',
    techStack: ['Python', 'Jupyter Notebook', 'Data Mining', 'Feature Selection', 'Data Preparation', 'Machine Learning'],
    status: 'Project Data Mining',
    category: 'Data',
    github: 'https://github.com/destadrns/Prediksi-SOC-Baterai-Kendaraan-Listrik.git',
    color: '#56645A',
  },
  {
    id: 4,
    name: 'Flight Delay Analysis PySpark',
    description:
      'Project analisis dan prediksi keterlambatan penerbangan menggunakan PySpark.',
    problem:
      'Keterlambatan penerbangan dipengaruhi banyak faktor, sehingga diperlukan pipeline data yang mampu mengolah, menganalisis, dan memodelkan data dalam skala besar.',
    solution:
      'Saya membangun pipeline analisis menggunakan PySpark, mulai dari pemrosesan data, EDA, manipulasi data, hingga perbandingan model machine learning untuk memahami faktor keterlambatan penerbangan.',
    techStack: ['Python', 'PySpark', 'Spark SQL', 'RDD', 'Machine Learning', 'Logistic Regression', 'Random Forest'],
    status: 'Big Data Project',
    category: 'Big Data',
    github: 'https://github.com/destadrns/Flight-Delay-Analysis-PySpark.git',
    color: '#34423A',
  },
  {
    id: 5,
    name: 'ETH Price Prediction Gradient Boosting',
    description:
      'Project prediksi arah pergerakan harga Ethereum menggunakan Gradient Boosting dan analisis sentimen.',
    problem:
      'Prediksi harga kripto sulit dilakukan karena pergerakannya dipengaruhi momentum pasar, indikator teknikal, dan sentimen berita atau sosial.',
    solution:
      'Saya membuat pipeline machine learning yang menggabungkan fitur teknikal, sentimen, lag, rolling feature, dan Gradient Boosting untuk memprediksi arah pergerakan harga dalam horizon waktu tertentu.',
    techStack: ['Python', 'Gradient Boosting', 'Sentiment Analysis', 'FinRoBERTa', 'Pandas', 'Scikit-learn', 'Jupyter Notebook'],
    status: 'Modeling Project',
    category: 'AI / Modeling',
    github: 'https://github.com/destadrns/ETH-Price-Prediction-Gradient-Boosting.git',
    color: '#25312B',
  },
  {
    id: 6,
    name: 'Lithium-Ion RUL Prediction SVR',
    description:
      'Project prediksi Remaining Useful Life baterai lithium-ion menggunakan Support Vector Regression.',
    problem:
      'Umur pakai baterai perlu diprediksi agar degradasi performa dapat dipahami dan dianalisis lebih awal.',
    solution:
      'Saya membangun pipeline prediksi RUL menggunakan data NASA Battery Aging, mulai dari data preparation, EDA, preprocessing, training SVR, evaluasi model, hingga dashboard sederhana untuk melihat hasil prediksi.',
    techStack: ['Python', 'SVR', 'Scikit-learn', 'Jupyter Notebook', 'Flask', 'Data Preparation', 'Machine Learning'],
    status: 'Modeling Project',
    category: 'AI / Modeling',
    github: 'https://github.com/destadrns/Lithium-Ion-RUL-Prediction-SVR.git',
    color: '#56645A',
  },
];
