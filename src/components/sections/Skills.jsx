import { motion } from 'framer-motion';
import { skillCategories } from '../../data/skills';
import SectionWrapper from '../common/SectionWrapper';
import Card from '../common/Card';
import './Skills.css';

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function Skills() {
  return (
    <SectionWrapper id="skill">
      <div className="section-header">
        <span className="section-label">Yang Saya Gunakan</span>
        <h2 className="section-title">Skill</h2>
        <p className="section-subtitle">
          Beberapa teknologi dan tools yang saya gunakan untuk membangun project
          web, mengolah data, serta mempelajari modeling dan AI.
        </p>
      </div>

      <motion.div
        className="skills__grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        {skillCategories.map((category) => (
          <motion.div key={category.id} variants={cardVariants}>
            <Card className="skills__card" padding="lg">
              <div className="skills__card-header">
                <div className="skills__card-icon">
                  <category.icon size={20} />
                </div>
                <h3 className="skills__card-title">{category.title}</h3>
              </div>
              <div className="skills__chips">
                {category.skills.map((skill) => (
                  <span key={skill} className="skills__chip">
                    {skill}
                  </span>
                ))}
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
