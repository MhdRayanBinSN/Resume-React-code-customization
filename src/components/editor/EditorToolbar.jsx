import React from 'react';

/**
 * LaTeX formatting snippets. Each entry inserts LaTeX around the current
 * selection (or at the cursor) via the `onInsert` callback.
 */
const FORMATTING_ACTIONS = [
  { icon: 'fa-bold',           label: 'Bold',        before: '\\textbf{', after: '}' },
  { icon: 'fa-italic',         label: 'Italic',      before: '\\textit{', after: '}' },
  { icon: 'fa-underline',      label: 'Underline',   before: '\\underline{', after: '}' },
  { icon: 'fa-heading',        label: 'Section',     before: '\\section{', after: '}' },
  { icon: 'fa-list-ul',        label: 'Itemize',     before: '\\begin{itemize}\n  \\item ', after: '\n\\end{itemize}' },
  { icon: 'fa-list-ol',        label: 'Enumerate',   before: '\\begin{enumerate}\n  \\item ', after: '\n\\end{enumerate}' },
  { icon: 'fa-link',           label: 'Link',        before: '\\href{url}{', after: '}' },
  { icon: 'fa-quote-left',     label: 'Environment', before: '\\begin{', after: '}\n\n\\end{}' },
];

const EditorToolbar = ({ onInsert }) => (
  <div className="ol-format-toolbar" role="toolbar" aria-label="LaTeX formatting">
    {FORMATTING_ACTIONS.map(({ icon, label, before, after }) => (
      <button
        key={label}
        type="button"
        className="ol-format-btn"
        title={label}
        onClick={() => onInsert(before, after)}
      >
        <i className={`fas ${icon}`}></i>
      </button>
    ))}
  </div>
);

export default EditorToolbar;
