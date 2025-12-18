import React from 'react';

// Force a page break in the PDF
export const PageBreak = () => (
  <div style={{ pageBreakAfter: 'always', height: 0, display: 'block', clear: 'both' }} />
);

// Content visible only when printing
export const PrintOnly = ({ children }) => (
  <div className="print-only" style={{ display: 'none' }}>
    <style>{`
      @media print {
        .print-only { display: block !important; }
      }
    `}</style>
    {children}
  </div>
);

// Content visible only on screen
export const ScreenOnly = ({ children }) => (
  <div className="screen-only">
    <style>{`
      @media print {
        .screen-only { display: none !important; }
      }
    `}</style>
    {children}
  </div>
);
