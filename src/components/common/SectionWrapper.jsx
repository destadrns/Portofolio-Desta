import { motion } from 'framer-motion';

const sectionVariants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export default function SectionWrapper({
  children,
  id,
  alt = false,
  className = '',
}) {
  return (
    <motion.section
      id={id}
      className={`${alt ? 'section-alt' : 'section'} ${className}`.trim()}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={sectionVariants}
    >
      <div className="container">
        {children}
      </div>
    </motion.section>
  );
}
