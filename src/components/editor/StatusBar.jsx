import React from 'react';

/**
 * Bottom status bar — mirrors Overleaf's footer.
 *
 * Props:
 *  - cursor         : { line, col }
 *  - wordCount      : number
 *  - charCount      : number
 *  - compileStatus  : 'idle' | 'compiling' | 'compiled' | 'failed'
 *  - saveStatus     : 'idle' | 'saving' | 'saved' | 'failed'
 */
const StatusBar = ({ cursor, wordCount, charCount, compileStatus, saveStatus }) => (
  <footer className="ol-statusbar">
    <div className="ol-statusbar-left">
      <span className="ol-stat">
        <i className="fas fa-map-marker-alt"></i> Ln {cursor.line}, Col {cursor.col}
      </span>
      <span className="ol-stat-sep">|</span>
      <span className="ol-stat">{wordCount} words</span>
      <span className="ol-stat-sep">|</span>
      <span className="ol-stat">{charCount} chars</span>
    </div>
    <div className="ol-statusbar-right">
      {saveStatus === 'saved' && (
        <span className="ol-stat ol-stat-ok">
          <i className="fas fa-check-circle"></i> Saved to disk
        </span>
      )}
      {saveStatus === 'saving' && (
        <span className="ol-stat ol-stat-busy">
          <i className="fas fa-spinner fa-spin"></i> Saving...
        </span>
      )}
      {saveStatus === 'failed' && (
        <span className="ol-stat ol-stat-err">
          <i className="fas fa-exclamation-circle"></i> Save failed
        </span>
      )}
      <span className="ol-stat-sep">|</span>
      <span className={`ol-stat ol-compile-${compileStatus}`}>
        {compileStatus === 'compiled' && <><i className="fas fa-check-circle"></i> Compiled</>}
        {compileStatus === 'compiling' && <><i className="fas fa-spinner fa-spin"></i> Compiling</>}
        {compileStatus === 'failed' && <><i className="fas fa-exclamation-circle"></i> Compile failed</>}
        {compileStatus === 'idle' && <><i className="fas fa-circle"></i> Ready</>}
      </span>
      <span className="ol-stat-sep">|</span>
      <span className="ol-stat ol-stat-hint">
        <kbd>Ctrl+S</kbd> save &amp; compile
      </span>
    </div>
  </footer>
);

export default StatusBar;
