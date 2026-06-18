import { motion } from 'framer-motion';
import { ArrowDown, MapPin } from 'lucide-react';
import Button from '../common/Button';
import './Hero.css';

export default function Hero() {
  return (
    <section id="beranda" className="hero">
      {/* Decorative blobs */}
      <div className="hero__blobs" aria-hidden="true">
        <div className="hero__blob hero__blob--1" />
        <div className="hero__blob hero__blob--2" />
        <div className="hero__blob hero__blob--3" />
      </div>

      <div className="container hero__container">
        <div className="hero__content">
          <motion.div
            className="hero__badge"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="hero__badge-dot" />
            Saat ini mendalami Web Development, Data Analytics, dan AI
          </motion.div>

          <motion.h1
            className="hero__title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Halo, saya <span className="hero__name">Desta</span>
          </motion.h1>

          <motion.p
            className="hero__role"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            Web Developer &amp; Data Analytics Enthusiast
          </motion.p>

          <motion.p
            className="hero__description"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
          >
            Saya mahasiswa Informatika yang tertarik pada pengembangan web,
            analisis data, dan pemodelan berbasis AI. Saya suka membangun
            tampilan yang rapi, responsif, dan mencoba memahami bagaimana data
            bisa diolah menjadi insight yang berguna.
          </motion.p>

          <motion.div
            className="hero__location"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
          >
            <MapPin size={15} />
            <span>Yogyakarta, Indonesia</span>
          </motion.div>

          <motion.div
            className="hero__buttons"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Button variant="primary" size="lg" href="#proyek">
              Lihat Proyek
            </Button>
            <Button variant="secondary" size="lg" href="#kontak">
              Hubungi Saya
            </Button>
          </motion.div>
        </div>

        {/* Abstract visual card */}
        <motion.div
          className="hero__visual"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <div className="hero__card">
            <div className="hero__card-header">
              <div className="hero__card-dots">
                <span /><span /><span />
              </div>
            </div>
            <div className="hero__card-body">
              <div className="hero__card-line hero__card-line--accent" />
              <div className="hero__card-line hero__card-line--medium" />
              <div className="hero__card-line hero__card-line--short" />
              <div className="hero__card-block" />
              <div className="hero__card-line hero__card-line--long" />
              <div className="hero__card-line hero__card-line--medium" />
            </div>
          </div>

          {/* Floating badges */}
          <motion.div
            className="hero__float hero__float--react"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            React
          </motion.div>
          <motion.div
            className="hero__float hero__float--css"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          >
            CSS
          </motion.div>
          <motion.div
            className="hero__float hero__float--js"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          >
            JS
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="hero__scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <a href="#tentang" className="hero__scroll-link" aria-label="Scroll ke bawah">
          <ArrowDown size={18} />
        </a>
      </motion.div>
    </section>
  );
}
