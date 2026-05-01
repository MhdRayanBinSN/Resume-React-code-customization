import React, { useCallback, useRef } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { keymap } from '@codemirror/view';
import { EditorView } from '@codemirror/view';

/**
 * CodeMirror wrapper for LaTeX editing.
 *
 * Props:
 *  - value       : current source string
 *  - onChange     : (newValue) => void
 *  - onSave      : () => void  (Ctrl+S handler)
 *  - onCursorChange : ({ line, col }) => void
 *  - editorRef   : React ref to store the EditorView instance
 */

let latexExtension = null;

const loadLatex = async () => {
  if (!latexExtension) {
    try {
      const mod = await import('codemirror-lang-latex');
      latexExtension = mod.latex ? mod.latex() : mod.default ? mod.default() : null;
    } catch {
      latexExtension = null;
    }
  }
  return latexExtension;
};

const CodeEditor = ({ value, onChange, onSave, onCursorChange, editorRef }) => {
  const extensionsRef = useRef(null);
  const [extensions, setExtensions] = React.useState([]);
  const initialized = useRef(false);

  React.useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    loadLatex().then((latexExt) => {
      const exts = [
        EditorView.lineWrapping,
        keymap.of([
          {
            key: 'Mod-s',
            run: () => {
              onSave?.();
              return true;
            },
          },
        ]),
      ];

      if (latexExt) {
        exts.push(latexExt);
      }

      setExtensions(exts);
    });
  }, []);

  const handleUpdate = useCallback(
    (viewUpdate) => {
      if (viewUpdate.selectionSet && onCursorChange) {
        const pos = viewUpdate.state.selection.main.head;
        const line = viewUpdate.state.doc.lineAt(pos);
        onCursorChange({
          line: line.number,
          col: pos - line.from + 1,
        });
      }
    },
    [onCursorChange],
  );

  const handleCreateEditor = useCallback(
    (view) => {
      if (editorRef) {
        editorRef.current = view;
      }
    },
    [editorRef],
  );

  return (
    <div className="ol-codemirror-wrap">
      <CodeMirror
        value={value}
        theme={dracula}
        extensions={extensions}
        onChange={onChange}
        onUpdate={handleUpdate}
        onCreateEditor={handleCreateEditor}
        basicSetup={{
          lineNumbers: true,
          highlightActiveLineGutter: true,
          highlightActiveLine: true,
          foldGutter: true,
          bracketMatching: true,
          closeBrackets: true,
          autocompletion: true,
          searchKeymap: true,
          indentOnInput: true,
          history: true,
        }}
        style={{ height: '100%', fontSize: '13px' }}
      />
    </div>
  );
};

export default CodeEditor;
