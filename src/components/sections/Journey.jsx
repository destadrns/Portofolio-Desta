import { motion } from 'framer-motion';
import { journeyItems } from '../../data/journey';
import SectionWrapper from '../common/SectionWrapper';
import './Journey.css';

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: 'easeOut' },
  }),
};

export default function Journey() {
  return (
    <SectionWrapper id="perjalanan">
      <div className="section-header">
        <h2 className="section-title">Perjalanan Belajar</h2>
        <p className="section-subtitle">
          Setiap project dan latihan kecil menjadi bagian dari proses saya untuk
          memahami web development dengan lebih baik.
        </p>
      </div>

      <div className="journey__timeline" role="list">
        {journeyItems.map((item, i) => (
          <motion.div
            key={item.id}
            className="journey__item"
            role="listitem"
            custom={i}
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="journey__dot-wrap">
              <div className="journey__dot" />
              {i < journeyItems.length - 1 && <div className="journey__line" />}
            </div>
            <div className="journey__content">
              <p className="journey__text">{item.text}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
