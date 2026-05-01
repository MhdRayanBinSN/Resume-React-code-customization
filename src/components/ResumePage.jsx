import React from 'react';
import Navbar from './Navbar';

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

/**
 * Reusable resume page component.
 * Pass any resume data object and it renders the full visual resume.
 */
const ResumePage = ({ resume }) => (
  <>
    <Navbar />
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
          {resume.contact.linkedin && (
            <ContactItem icon="fab fa-linkedin" href={resume.contact.linkedin.href}>
              {resume.contact.linkedin.display}
            </ContactItem>
          )}
          {resume.contact.github && (
            <ContactItem icon="fab fa-github" href={resume.contact.github.href}>
              {resume.contact.github.display}
            </ContactItem>
          )}
          <ContactItem icon="fas fa-map-marker-alt">{resume.location}</ContactItem>
          {resume.contact.website && (
            <ContactItem icon="fas fa-globe" href={resume.contact.website.href}>
              {resume.contact.website.label}
            </ContactItem>
          )}
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

        {resume.certifications && resume.certifications.length > 0 && (
          <div>
            <h2>Certifications</h2>
            <ul className="sidebar-list">
              {resume.certifications.map((cert) => (
                <li key={cert}>{cert}</li>
              ))}
            </ul>
          </div>
        )}
      </aside>

      <main className="main-content">
        <div>
          <h2>Professional Summary</h2>
          <p>{resume.summary}</p>
        </div>

        {resume.experience && resume.experience.length > 0 && (
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
        )}

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

export default ResumePage;
