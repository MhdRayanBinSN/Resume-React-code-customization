import React from 'react';

const ProjectCard = ({ title, description, technologies, link }) => {
  return (
    <div className="card">
      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
        {title}
      </h3>
      
      <div style={{ marginBottom: '1rem', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
        {description}
      </div>
      
      <div style={{ marginBottom: '1rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
          {technologies.map((tech, index) => (
            <span key={index} className="badge">
              {tech}
            </span>
          ))}
        </div>
      </div>

      {link && (
        <a href={link} target="_blank" rel="noopener noreferrer" style={{
          fontSize: '0.9rem',
          fontWeight: 600,
          color: 'black',
          borderBottom: '2px solid var(--accent-lime)',
          display: 'inline-block',
          paddingBottom: '2px'
        }}>
          View Project <i className="fas fa-arrow-right" style={{ fontSize: '0.8rem', marginLeft: '5px' }}></i>
        </a>
      )}
    </div>
  );
};

export default ProjectCard;
