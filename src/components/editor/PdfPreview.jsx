import React from 'react';

/**
 * PDF preview panel with zoom controls.
 *
 * Props:
 *  - pdfUrl      : object URL of the compiled PDF (or '')
 *  - onDownload  : () => void
 */
const PdfPreview = ({ pdfUrl, onDownload }) => {
  const [zoom, setZoom] = React.useState(100);

  const zoomIn = () => setZoom((prev) => Math.min(prev + 25, 250));
  const zoomOut = () => setZoom((prev) => Math.max(prev - 25, 50));
  const zoomReset = () => setZoom(100);

  return (
    <div className="ol-preview-pane">
      {/* Header */}
      <div className="ol-preview-header">
        <span>
          <i className="fas fa-file-pdf"></i> PDF Preview
        </span>
        <div className="ol-preview-controls">
          <button className="ol-ctrl-btn" onClick={zoomOut} title="Zoom out">
            <i className="fas fa-minus"></i>
          </button>
          <span className="ol-zoom-label">{zoom}%</span>
          <button className="ol-ctrl-btn" onClick={zoomIn} title="Zoom in">
            <i className="fas fa-plus"></i>
          </button>
          <button className="ol-ctrl-btn" onClick={zoomReset} title="Reset zoom">
            <i className="fas fa-expand"></i>
          </button>
          {pdfUrl && (
            <button className="ol-ctrl-btn" onClick={onDownload} title="Download PDF">
              <i className="fas fa-download"></i>
            </button>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="ol-preview-body">
        {pdfUrl ? (
          <div className="ol-preview-scaler" style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}>
            <iframe title="Compiled PDF preview" src={pdfUrl} />
          </div>
        ) : (
          <div className="ol-preview-empty">
            <i className="fas fa-file-pdf"></i>
            <p>
              Press <kbd>Ctrl + S</kbd> to compile &amp; preview
            </p>
            <p className="ol-preview-hint">Requires pdflatex installed locally</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PdfPreview;
