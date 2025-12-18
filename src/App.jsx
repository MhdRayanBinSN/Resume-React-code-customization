import React from 'react';

function App() {
  return (
    <>
      <div className="resume-container">
        
        {/* --- LEFT SIDEBAR --- */}
        <aside className="sidebar">
          
          {/* Header Info (Name/Role) */}
          <div>
            <h1 style={{ lineHeight: '0.9' }}>MUHAMMED<br/><span style={{ color: '#65a30d' }}>RAYAN</span></h1>
            <p style={{ marginTop: '0.5rem', fontWeight: 500, color: '#0f172a' }}>Computer Science Engineer</p>
          </div>

          {/* Contact Info */}
          <div className="contact-info">
            <div className="contact-item">
              <i className="fas fa-envelope"></i>
              <a href="mailto:rayan6203@gmail.com">rayan6203@gmail.com</a>
            </div>
            <div className="contact-item">
              <i className="fas fa-phone"></i>
              <span>+91 8590109268</span>
            </div>
            <div className="contact-item">
              <i className="fab fa-linkedin"></i>
              <a href="https://linkedin.com/in/mhdrayan" target="_blank" rel="noreferrer">in/mhdrayan</a>
            </div>
            <div className="contact-item">
              <i className="fab fa-github"></i>
              <a href="https://github.com/MhdRayanBinSN" target="_blank" rel="noreferrer">MhdRayanBinSN</a>
            </div>
            <div className="contact-item">
              <i className="fas fa-map-marker-alt"></i>
              <span>Kottayam, Kerala, IN</span>
            </div>
            <div className="contact-item">
              <i className="fas fa-globe"></i>
              <a href="https://portfolio-website.com">itsmerayan.vercel.app</a>
            </div>
          </div>

          {/* Education */}
          <div>
            <h2>Education</h2>
            <div style={{ marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '0.95rem' }}>B.Tech in Computer Science and Engineering</h3>
              <p style={{ fontSize: '0.85rem', marginTop: '2px' }}>College of Engineering Kidangoor</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
                <span style={{ fontSize: '0.8rem', color: '#65a30d', fontWeight: 600 }}>2022 – 2026</span>
                <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>CGPA: 8.3</span>
              </div>
            </div>
            <div>
              <h3 style={{ fontSize: '0.95rem' }}>Higher Secondary (Science)</h3>
              <p style={{ fontSize: '0.85rem', marginTop: '2px' }}>Razi International School</p>
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
                <span style={{ fontSize: '0.8rem', color: '#65a30d', fontWeight: 600 }}>2019 – 2021</span>
                <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>93.2%</span>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div>
            <h2>Skills</h2>
            <div className="skill-tags">
              <span className="skill-tag">JavaScript</span>
              <span className="skill-tag">TypeScript</span>
              <span className="skill-tag">React.js</span>
              <span className="skill-tag">Next.js</span>
              <span className="skill-tag">Node.js</span>
              <span className="skill-tag">Python</span>
              <span className="skill-tag">C/C++</span>
              <span className="skill-tag">SQL</span>
              <span className="skill-tag">MongoDB</span>
              <span className="skill-tag">Git</span>
              <span className="skill-tag">Sickit Learn </span>
              <span className="skill-tag">TensorFlow</span>
              {/* Engineering Skills */}
              <span className="skill-tag">SDLC</span>
              <span className="skill-tag">System Design</span>
              <span className="skill-tag">Testing/QA</span>
              <span className="skill-tag">CI/CD</span>
              <span className="skill-tag">Agile</span>
            </div>
          </div>

          {/* Certifications (Compact) */}
          <div>
            <h2>Certifications</h2>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '0.5rem', fontSize: '0.85rem' }}>• HackerRank SQL (Advanced)</li>
              <li style={{ marginBottom: '0.5rem', fontSize: '0.85rem' }}>• Kaggle Machine Learning</li>
              <li style={{ marginBottom: '0.5rem', fontSize: '0.85rem' }}>• Deloitte Data Analytics Sim</li>
            </ul>
          </div>

           {/* Languages */}
          <div>
            <h2>Languages</h2>
            <p>English (Fluent)<br/>Malayalam (Native)<br/>Arabic (Literate)</p>
          </div>

        </aside>

        {/* --- RIGHT MAIN CONTENT --- */}
        <main className="main-content">
          
          {/* Summary */}
          <div>
            <h2>Professional Summary</h2>
            <p>
              Computer Science Engineering student with strong expertise in full-stack web development, machine learning and Image Processing. Proficient in MERN stack, Python, and modern frameworks. Experienced in building scalable web applications and implementing machine learning models. Demonstrated leadership in technical communities.
            </p>
          </div>

          {/* Experience */}
          <div>
            <h2>Experience</h2>
            <div className="exp-item">
              <div className="exp-header">
                <div>
                  <h3>Software Development Intern</h3>
                  <p style={{ color: '#0f172a', fontWeight: 500 }}>Auctapace Technologies <span style={{ fontWeight: 400, color: '#64748b' }}>| Remote</span></p>
                </div>
                <span className="date-badge">Oct 2025 – Present</span>
              </div>
              <ul>
                <li>Developing and maintaining Contract Lifecycle Management (CLM) software applications using agile methodologies.</li>
                <li>Conducting comprehensive testing and debugging to resolve software defects.</li>
                <li>Participating in Scrum meetings and code reviews to ensure robust software delivery.</li>
                <li>Collaborating with cross-functional teams to implement new features and enhance application functionality.</li>
              </ul>
            </div>
          </div>

          {/* Projects */}
          <div>
            <h2>Key Projects</h2>
            
            <div className="exp-item">
              <div className="exp-header">
                <h3>InterLink - Event Platform</h3>
                <span className="date-badge">Jan 2025 – Mar 2025</span>
              </div>
              <ul>
                <li>Designed a <strong>premium, user-friendly UI</strong> for seamless event discovery and booking using React & TypeScript.</li>
                <li>Built a robust <strong>Organizer Dashboard</strong> to publish events, track participant bookings, and manage listings.</li>
                <li>Implemented efficient role-based features for <strong>ticket verification and attendance tracking</strong>.</li>
                <li>Secured the platform with JWT authentication and optimized MongoDB schemas for real-time analytics.</li>
              </ul>
            </div>

            <div className="exp-item">
              <div className="exp-header">
                <h3>Intracranial Aneurysm <br /> Detection</h3>
                <span className="date-badge">Aug 2025 – Ongoing</span>
              </div>
              <ul>
                <li>Developing a DL model to detect aneurysms using Kaggle medical imaging datasets.</li>
                <li>Processing MRI/CT scan images (DICOM/NIfTI) for model training.</li>
                <li>Implementing CNN architectures for spatial localization and segmentation.</li>
              </ul>
            </div>
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
