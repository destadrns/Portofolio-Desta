import { motion } from 'framer-motion';
import { GraduationCap, Calendar } from 'lucide-react';
import { educationItems } from '../../data/education';
import SectionWrapper from '../common/SectionWrapper';
import Card from '../common/Card';
import './Education.css';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.5, ease: 'easeOut' },
  }),
};

export default function Education() {
  return (
    <SectionWrapper id="pendidikan">
      <div className="section-header">
        <span className="section-label">Background</span>
        <h2 className="section-title">Riwayat Pendidikan</h2>
        <p className="section-subtitle">
          Latar pendidikan saya menjadi bagian dari proses untuk memahami
          pemrograman, analisis data, dan pengembangan teknologi secara lebih
          terarah.
        </p>
      </div>

      <div className="education__list">
        {educationItems.map((item, i) => (
          <motion.div
            key={item.id}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Card className="education__card" padding="lg">
              <div className="education__card-header">
                <div className="education__icon">
                  <GraduationCap size={22} />
                </div>
                <div className="education__header-text">
                  <h3 className="education__institution">{item.institution}</h3>
                  <p className="education__degree">{item.degree}</p>
                </div>
                <span className="education__period">
                  <Calendar size={13} />
                  {item.period}
                </span>
              </div>
              <p className="education__description">{item.description}</p>
            </Card>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
