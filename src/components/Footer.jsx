import React from 'react';

const Footer = () => {
  return (
    <footer style={{
      textAlign: 'center',
      padding: '2rem',
      color: 'var(--text-muted)',
      fontSize: '0.8rem',
      borderTop: '1px solid var(--card-border)',
      marginTop: '4rem'
    }}>
      <p>&copy; {new Date().getFullYear()} Muhammed Rayan. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
