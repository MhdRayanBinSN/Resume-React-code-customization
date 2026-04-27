import React from 'react';

const resume = {
  fullName: 'Muhammed Rayan',
  firstName: 'MUHAMMED',
  lastName: 'RAYAN',
  role: 'Software Engineer',
  location: 'Kottayam, Kerala, IN',
  contact: {
    email: 'rayan6203@gmail.com',
    phone: '+91 8590109268',
    linkedin: {
      label: 'linkedin.com/in/mhdrayan',
      display: 'in/mhdrayan',
      href: 'https://linkedin.com/in/mhdrayan',
    },
    github: {
      label: 'github.com/MhdRayanBinSN',
      display: 'MhdRayanBinSN',
      href: 'https://github.com/MhdRayanBinSN',
    },
    website: {
      label: 'mhdrayan.netlify.app',
      href: 'https://mhdrayan.netlify.app/',
    },
  },
  summary:
    'Solutions-driven Computer Science student focused on developing robust systems using clean engineering practices. Experienced in full-stack development, machine learning, and agile methodologies, with a proven ability to solve complex problems and deliver reliable software.',
  education: [
    {
      degree: 'B.Tech in Computer Science and Engineering',
      institution: 'College of Engineering Kidangoor',
      date: '2022 - 2026',
      result: 'CGPA: 8.42',
    },
    {
      degree: 'Higher Secondary (Science)',
      institution: 'Razi International School',
      date: '2019 - 2021',
      result: '93.2%',
    },
  ],
  skills: [
    'Python',
    'C/C++',
    'JavaScript',
    'React.js',
    'Next.js',
    'Node.js',
    'REST APIs',
    'Web Development',
    'SQL',
    'MongoDB',
    'Git',
    'CI/CD',
    'Machine Learning',
    'Deep Learning',
    'Image Processing',
    'PyTorch',
    'Scikit-learn',
    'TensorFlow',
    'SDLC',
    'System Design',
    'Testing/QA',
    'Agile',
    'Documentation',
  ],

  certifications: [
    'HackerRank SQL (Advanced)',
    'Kaggle Machine Learning',
    'Deloitte Data Analytics Simulation',
  ],
  languages: ['English (Conversational)', 'Malayalam (Native)', 'Arabic (Literate)'],
  experience: [
    {
      title: 'Software Engineer Intern',
      company: 'Auctapace Technologies',
      location: 'Remote',
      date: 'Oct 2025 - Feb 2026',
      bullets: [
        'Building and enhancing Contract Lifecycle Management (CLM) features using React, Node.js, and reusable front-end components.',
        'Integrated REST API responses into front-end screens to populate contract data, workflow status, user actions, and dashboard views.',
        'Implemented feature updates, defect fixes, form validations, and UI improvements across agile sprint cycles.',
        'Tested features through manual QA, debugging, and review feedback to improve reliability before delivery.',
        'Prepared technical documentation, API notes, and implementation references for smoother handoff and team collaboration.',
      ],
    },
  ],
  projects: [
    {
      title: 'InterLink - Event Platform',
      date: 'Jan 2025 - Mar 2025',
      technologies: 'React, TypeScript, MongoDB, JWT',
      bullets: [
        'Designed a premium UI for event discovery and booking with React, TypeScript, and MongoDB.',
        'Built an Organizer Dashboard for event publishing, participant tracking, and ticket verification.',
        'Secured the platform with JWT authentication and optimized schemas for real-time analytics.',
      ],
    },
    {
      title: 'Intracranial Aneurysm Detection',
      date: 'Aug 2025 - Apr 2026',
      technologies: 'Python, PyTorch, nnU-Net, SimpleITK, pydicom, DICOM, MedGemma',
      bullets: [
        'Developed a 3D full-resolution nnU-Net (PyTorch) for spatial localization and multi-label binary segmentation of intracranial aneurysms across 13 distinct anatomical zones.',
        'Engineered robust 3D medical image preprocessing pipelines using SimpleITK and pydicom to handle dynamic Hounsfield Unit (HU) normalization, orientation correction, and voxel-spacing alignment.',
        'Architected a memory-efficient inference and evaluation pipeline capable of processing 4,300+ DICOM series directly from compressed archives, computing real-world metrics without disk-write overhead.',
        'Designed a comparative model analysis framework to benchmark the primary CNN model against MedGemma, analyzing bounding box accuracy and classification performance.',
      ],
    },
    {
      title: 'CLM User Dashboard',
      date: 'Dec 2025',
      technologies: 'React, Node.js, Syncfusion',
      bullets: [
        'Built a role-based contract tracking dashboard with real-time status updates and workflow management.',
        'Implemented bulk assignment and approval workflows, advanced filtering, and infinite scroll for contract navigation.',
        "Developed a version history panel with document comparison using Syncfusion's Track Changes integration.",
      ],
    },
  ],
};



const ContactItem = ({ icon, href, children }) => (
  <div className="contact-item">
    <i className={icon}></i>
    {href ? (
      <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noreferrer' : undefined}>
        {children}
      </a>
    ) : (
      <span>{children}</span>
    )}
  </div>
);

const BulletList = ({ items }) => (
  <ul>
    {items.map((item) => (
      <li key={item}>{item}</li>
    ))}
  </ul>
);

function App() {


  return (
    <>
      <div className="resume-container">
        <aside className="sidebar">
          <div>
            <h1 style={{ lineHeight: '0.9' }}>
              {resume.firstName}
              <br />
              <span style={{ color: '#65a30d' }}>{resume.lastName}</span>
            </h1>
            <p style={{ marginTop: '0.5rem', fontWeight: 500, color: '#0f172a' }}>{resume.role}</p>
          </div>

          <div className="contact-info">
            <ContactItem icon="fas fa-envelope" href={`mailto:${resume.contact.email}`}>
              {resume.contact.email}
            </ContactItem>
            <ContactItem icon="fas fa-phone">{resume.contact.phone}</ContactItem>
            <ContactItem icon="fab fa-linkedin" href={resume.contact.linkedin.href}>
              {resume.contact.linkedin.display}
            </ContactItem>
            <ContactItem icon="fab fa-github" href={resume.contact.github.href}>
              {resume.contact.github.display}
            </ContactItem>
            <ContactItem icon="fas fa-map-marker-alt">{resume.location}</ContactItem>
            <ContactItem icon="fas fa-globe" href={resume.contact.website.href}>
              {resume.contact.website.label}
            </ContactItem>
          </div>

          <div>
            <h2>Education</h2>
            {resume.education.map((item) => (
              <div key={item.degree} style={{ marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '0.95rem' }}>{item.degree}</h3>
                <p style={{ fontSize: '0.85rem', marginTop: '2px' }}>{item.institution}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
                  <span style={{ fontSize: '0.8rem', color: '#65a30d', fontWeight: 600 }}>{item.date}</span>
                  <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>{item.result}</span>
                </div>
              </div>
            ))}
          </div>

          <div>
            <h2>Skills</h2>
            <div className="skill-tags">
              {resume.skills.map((skill) => (
                <span className="skill-tag" key={skill}>
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h2>Certifications</h2>
            <ul className="sidebar-list">
              {resume.certifications.map((certification) => (
                <li key={certification}>{certification}</li>
              ))}
            </ul>
          </div>

          
        </aside>

        <main className="main-content">
          <div>
            <h2>Professional Summary</h2>
            <p>{resume.summary}</p>
          </div>

          <div>
            <h2>Experience</h2>
            {resume.experience.map((item) => (
              <div className="exp-item" key={`${item.title}-${item.company}`}>
                <div className="exp-header">
                  <div>
                    <h3>{item.title}</h3>
                    <p style={{ color: '#0f172a', fontWeight: 500 }}>
                      {item.company} <span style={{ fontWeight: 400, color: '#64748b' }}>| {item.location}</span>
                    </p>
                  </div>
                  <span className="date-badge">{item.date}</span>
                </div>
                <BulletList items={item.bullets} />
              </div>
            ))}
          </div>

          <div>
            <h2>Key Projects</h2>
            {resume.projects.map((project) => (
              <div className="exp-item" key={project.title}>
                <div className="exp-header">
                  <h3>{project.title}</h3>
                  <span className="date-badge">{project.date}</span>
                </div>
                <BulletList items={project.bullets} />
              </div>
            ))}
          </div>
        </main>
      </div>

      <button className="save-btn" onClick={() => window.print()}>
        <i className="fas fa-file-pdf"></i> Save as PDF
      </button>
    </>
  );
}

export default App;
