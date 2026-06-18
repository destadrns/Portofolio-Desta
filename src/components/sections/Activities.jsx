import { motion } from 'framer-motion';
import { activities } from '../../data/activities';
import SectionWrapper from '../common/SectionWrapper';
import Card from '../common/Card';
import './Activities.css';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: 'easeOut' },
  }),
};

export default function Activities() {
  return (
    <SectionWrapper id="pengalaman">
      <div className="section-header">
        <span className="section-label">Experience</span>
        <h2 className="section-title">Pengalaman &amp; Aktivitas</h2>
        <p className="section-subtitle">
          Beberapa aktivitas yang ikut membentuk cara saya belajar, membangun
          project, dan mengeksplorasi teknologi.
        </p>
      </div>

      <div className="activities__grid">
        {activities.map((item, i) => (
          <motion.div
            key={item.id}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Card className="activities__card" padding="lg">
              <div className="activities__icon">
                <item.icon size={22} />
              </div>
              <h3 className="activities__title">{item.title}</h3>
              <p className="activities__desc">{item.description}</p>
            </Card>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
