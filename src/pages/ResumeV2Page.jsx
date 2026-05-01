import React from 'react';
import { resume } from '../data/resume';
import Navbar from '../components/Navbar';

/* ── Tiny helpers ──────────────────────────────────────────── */
const Icon = ({ name }) => <i className={name}></i>;

const TimelineDot = () => <span className="v2-timeline-dot" aria-hidden="true" />;

/* ── Page ──────────────────────────────────────────────────── */
const ResumeV2Page = () => (
  <>
    <Navbar />

    <div className="v2-sheet">
      {/* ════════ HERO HEADER ════════ */}
      <header className="v2-hero">
        <div className="v2-hero-name">
          <h1>{resume.fullName}</h1>
          <span className="v2-hero-role">{resume.role}</span>
        </div>

        <div className="v2-hero-contact">
          <a href={`mailto:${resume.contact.email}`}>
            <Icon name="fas fa-envelope" /> {resume.contact.email}
          </a>
          <span>
            <Icon name="fas fa-phone" /> {resume.contact.phone}
          </span>
          <a href={resume.contact.linkedin.href} target="_blank" rel="noreferrer">
            <Icon name="fab fa-linkedin" /> {resume.contact.linkedin.display}
          </a>
          <a href={resume.contact.github.href} target="_blank" rel="noreferrer">
            <Icon name="fab fa-github" /> {resume.contact.github.display}
          </a>
          <span>
            <Icon name="fas fa-map-marker-alt" /> {resume.location}
          </span>
          {resume.contact.website && (
            <a href={resume.contact.website.href} target="_blank" rel="noreferrer">
              <Icon name="fas fa-globe" /> {resume.contact.website.label}
            </a>
          )}
        </div>
      </header>

      {/* ════════ BODY ════════ */}
      <div className="v2-body">
        {/* ──── LEFT COLUMN (main) ──── */}
        <div className="v2-main">
          {/* Summary */}
          <section className="v2-section">
            <h2 className="v2-section-title">
              <Icon name="fas fa-user" /> About Me
            </h2>
            <p className="v2-summary">{resume.summary}</p>
          </section>

          {/* Experience */}
          {resume.experience.length > 0 && (
            <section className="v2-section">
              <h2 className="v2-section-title">
                <Icon name="fas fa-briefcase" /> Experience
              </h2>
              <div className="v2-timeline">
                {resume.experience.map((exp) => (
                  <div className="v2-timeline-item" key={`${exp.title}-${exp.company}`}>
                    <TimelineDot />
                    <div className="v2-timeline-content">
                      <div className="v2-timeline-head">
                        <div>
                          <h3>{exp.title}</h3>
                          <span className="v2-company">
                            {exp.company} · {exp.location}
                          </span>
                        </div>
                        <span className="v2-date">{exp.date}</span>
                      </div>
                      <ul>
                        {exp.bullets.map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          <section className="v2-section">
            <h2 className="v2-section-title">
              <Icon name="fas fa-rocket" /> Key Projects
            </h2>
            <div className="v2-timeline">
              {resume.projects.map((proj) => (
                <div className="v2-timeline-item" key={proj.title}>
                  <TimelineDot />
                  <div className="v2-timeline-content">
                    <div className="v2-timeline-head">
                      <h3>{proj.title}</h3>
                      <span className="v2-date">{proj.date}</span>
                    </div>
                    <ul>
                      {proj.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* ──── RIGHT COLUMN (sidebar) ──── */}
        <aside className="v2-aside">
          {/* Education */}
          <section className="v2-section">
            <h2 className="v2-section-title">
              <Icon name="fas fa-graduation-cap" /> Education
            </h2>
            {resume.education.map((edu) => (
              <div className="v2-edu-card" key={edu.degree}>
                <h3>{edu.degree}</h3>
                <p className="v2-edu-inst">{edu.institution}</p>
                <div className="v2-edu-meta">
                  <span>{edu.date}</span>
                  <span className="v2-edu-result">{edu.result}</span>
                </div>
              </div>
            ))}
          </section>

          {/* Skills — categorized */}
          <section className="v2-section">
            <h2 className="v2-section-title">
              <Icon name="fas fa-cogs" /> Skills
            </h2>
            <div className="v2-skill-categories">
              {resume.skillGroups.map((group, idx) => (
                <div className="v2-skill-cat" key={group.label} data-cat={idx}>
                  <h4 className="v2-skill-cat-label">
                    <Icon name={
                      idx === 0 ? 'fas fa-code' :
                      idx === 1 ? 'fas fa-cubes' :
                      idx === 2 ? 'fas fa-tools' :
                      'fas fa-layer-group'
                    } />
                    {group.label}
                  </h4>
                  <div className="v2-skill-grid">
                    {group.items.map((skill) => (
                      <span className="v2-skill-chip" key={skill} data-cat={idx}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Certifications */}
          {resume.certifications && resume.certifications.length > 0 && (
            <section className="v2-section">
              <h2 className="v2-section-title">
                <Icon name="fas fa-award" /> Certifications
              </h2>
              <ul className="v2-cert-list">
                {resume.certifications.map((cert) => (
                  <li key={cert}>
                    <Icon name="fas fa-check-circle" /> {cert}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Languages */}
          {resume.languages && resume.languages.length > 0 && (
            <section className="v2-section">
              <h2 className="v2-section-title">
                <Icon name="fas fa-language" /> Languages
              </h2>
              <ul className="v2-cert-list">
                {resume.languages.map((lang) => (
                  <li key={lang}>
                    <Icon name="fas fa-circle" /> {lang}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </aside>
      </div>
    </div>

    <button className="save-btn" onClick={() => window.print()}>
      <i className="fas fa-file-pdf"></i> Save as PDF
    </button>
  </>
);

export default ResumeV2Page;
