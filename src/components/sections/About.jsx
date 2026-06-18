import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import SectionWrapper from '../common/SectionWrapper';
import './About.css';

// Profile photo — replace with updated photo if needed
import profilePhoto from '../../assets/profile.jpg';

export default function About() {
  return (
    <SectionWrapper id="tentang" alt>
      <div className="about__grid">
        <div className="about__story">
          <span className="section-label">Profil Singkat</span>
          <h2 className="about__title">Tentang Saya</h2>
          <p className="about__text">
            Saya adalah mahasiswa Informatika yang sedang membangun kemampuan di
            bidang web development, data analytics, dan AI. Dalam proses belajar,
            saya cukup sering mencoba berbagai project kecil maupun project
            berbasis data untuk memahami bagaimana sebuah ide bisa diubah menjadi
            sesuatu yang lebih terstruktur dan berguna.
          </p>
          <p className="about__text">
            Saat mengerjakan project, saya biasanya memulai dari layout dan alur
            utama terlebih dahulu, lalu memecah fitur menjadi bagian-bagian kecil
            agar prosesnya lebih terarah. Saya suka membuat tampilan yang rapi
            dan responsif, tetapi akhir-akhir ini saya juga semakin tertarik
            mendalami data analytics, modeling, dan penggunaan AI dengan Python
            serta Jupyter Notebook.
          </p>
          <p className="about__text">
            Bagi saya, project bukan hanya tentang membuat sesuatu yang berjalan,
            tetapi juga tentang memahami masalah, merapikan struktur, dan
            memperbaiki hasilnya sedikit demi sedikit.
          </p>
          <div className="about__focus" aria-label="Fokus utama">
            <span className="about__focus-chip">Web Development</span>
            <span className="about__focus-chip">Data Analytics</span>
            <span className="about__focus-chip">AI &amp; Modeling</span>
            <span className="about__focus-chip">Problem Solving</span>
          </div>
        </div>

        <motion.div
          className="about__photo-card"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <div className="about__photo-wrapper">
            <img
              src={profilePhoto}
              alt="Foto profil Desta Adriyan Saputra"
              className="about__photo"
              loading="lazy"
            />
          </div>
          <div className="about__photo-info">
            <span className="about__photo-name">Desta Adriyan Saputra</span>
            <span className="about__photo-badge">Web Developer &amp; Informatics Student</span>
            <span className="about__photo-badge">
              <MapPin size={13} />
              Yogyakarta, Indonesia
            </span>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
