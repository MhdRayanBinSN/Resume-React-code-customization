import React from 'react';

const Header = () => {
  return (
    <header>
      <h1 className="hero-title">
        MUHAMMED <span>RAYAN</span>
      </h1>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: '#666', fontWeight: 500 }}>
         <i className="fas fa-map-marker-alt" style={{ color: 'var(--accent-lime)' }}></i>
         Kottayam, Kerala, India
      </div>

      <div className="contact-bar">
        <a href="tel:+918590109268">
          <i className="fas fa-phone"></i> +91-8590-109-268
        </a>
        <a href="mailto:rayan6203@gmail.com">
          <i className="fas fa-envelope"></i> rayan6203@gmail.com
        </a>
        <a href="https://linkedin.com/in/mhdrayan" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-linkedin"></i> linkedin.com/in/mhdrayan
        </a>
        <a href="https://github.com/MhdRayanBinSN" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-github"></i> github.com/MhdRayanBinSN
        </a>
      </div>

      <button onClick={() => window.print()} className="btn-primary no-print">
        <i className="fas fa-file-pdf"></i> Save as PDF
      </button>
    </header>
  );
};

export default Header;
