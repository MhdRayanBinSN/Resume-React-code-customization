/**
 * Tobin Tom's resume data.
 */
export const tobinResume = {
  fullName: 'Tobin Tom',
  firstName: 'TOBIN',
  lastName: 'TOM',
  role: 'Software Engineer',
  location: 'Kottayam, Kerala, IN',
  contact: {
    email: 'tobintom222@gmail.com',
    phone: '+91 6238646331',
    linkedin: {
      label: 'linkedin.com/in/tobintom',
      display: 'in/tobintom',
      href: 'https://linkedin.com/in/tobintom',
    },
    github: {
      label: 'github.com/TobinTom',
      display: 'TobinTom',
      href: 'https://github.com/TobinTom',
    },
    website: null,
  },
  summary:
    'Solutions-driven Computer Science student focused on developing robust systems using clean engineering practices. Experienced in full-stack development, machine learning, and agile methodologies, with a proven ability to solve complex problems and deliver reliable software.',
  education: [
    {
      degree: 'B.Tech in Computer Science and Engineering',
      institution: 'College of Engineering Kidangoor',
      date: '2022 - 2026',
      result: 'CGPA: 7.7',
    },
    {
      degree: 'Higher Secondary (Science)',
      institution: 'St. Paul\'s HSS Valiyakumaramangalam',
      date: '2020 - 2022',
      result: '93.6%',
    },
  ],
  skills: [
    'JavaScript',
    'React.js',
    'Python',
    'C/C++',
    'HTML',
    'CSS',
    'Web Development',
    'SQL',
    'Git',
    'Scikit Learn',
    'Machine Learning',
    'Image Processing',
    'Data Mining',
  ],
  skillGroups: [
    {
      label: 'Languages',
      items: ['JavaScript', 'Python', 'C/C++', 'SQL'],
    },
    {
      label: 'Web Development',
      items: ['React.js'],
    },
    {
      label: 'ML & Tools',
      items: ['Scikit Learn', 'Git'],
    },
  ],
  certifications: [
    'HackerRank SQL (Advanced)',
    'Kaggle Machine Learning',
    'Deloitte Data Analytics Sim',
  ],
  languages: ['English (Conversational)', 'Malayalam (Native)'],
  experience: [],
  projects: [
    {
      title: 'InterLink - Event Platform',
      date: 'Jan 2025 - Mar 2025',
      technologies: 'React, TypeScript, MongoDB, JWT',
      bullets: [
        'Designed a premium UI for event discovery & booking with React, TypeScript, and MongoDB.',
        'Built Organizer Dashboard for event publishing, participant tracking, and ticket verification.',
        'Secured with JWT authentication and optimized schemas for real-time analytics.',
      ],
    },
    {
      title: 'Intracranial Aneurysm Detection',
      date: 'Aug 2025 - Apr 2026',
      technologies: 'Python, PyTorch, nnU-Net, SimpleITK, pydicom, MedGemma',
      bullets: [
        'Developed a 3D full-resolution nnU-Net (PyTorch) for spatial localization and multi-label binary segmentation of intracranial aneurysms across 13 distinct anatomical zones.',
        'Engineered robust 3D medical image preprocessing pipelines using SimpleITK and pydicom to handle dynamic Hounsfield Unit (HU) normalization, orientation correction, and voxel-spacing alignment.',
        'Architected a memory-efficient inference and evaluation pipeline capable of processing 4,300+ DICOM series directly from compressed archives, computing real-world metrics without disk-write overhead.',
        'Designed a comparative model analysis framework to benchmark the primary CNN model against MedGemma (a medical Vision-Language Model), analyzing bounding box accuracy and classification performance.',
      ],
    },
  ],
};
