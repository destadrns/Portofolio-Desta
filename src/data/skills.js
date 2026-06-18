import {
  Code2,
  Palette,
  Wrench,
  BookOpen,
} from 'lucide-react';

export const skillCategories = [
  {
    id: 'web-development',
    title: 'Web Development',
    icon: Code2,
    skills: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Vite'],
  },
  {
    id: 'ui-frontend',
    title: 'Tools & Workflow',
    icon: Palette,
    skills: [
      'Git',
      'GitHub',
      'VS Code',
      'Project Structure',
      'Problem Breakdown',
      'Mobile-first Check',
      'Iteration',
    ],
  },
  {
    id: 'data-modeling',
    title: 'Data & Modeling',
    icon: Wrench,
    skills: ['Python', 'Jupyter Notebook', 'Pandas', 'NumPy', 'Scikit-learn', 'PySpark'],
  },
  {
    id: 'learning',
    title: 'Sedang Dipelajari',
    icon: BookOpen,
    skills: [
      'Data Analytics',
      'Machine Learning',
      'AI',
      'Modeling',
      'Gemini API',
      'Big Data',
    ],
  },
];
