import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { resume } from '../data/resume';
import { buildLatexSource, cloneResume } from '../utils/latexResume';
import Navbar from './Navbar';
import EditorToolbar from './editor/EditorToolbar';
import CodeEditor from './editor/CodeEditor';
import PdfPreview from './editor/PdfPreview';
import StatusBar from './editor/StatusBar';
import ResizableSplit from './editor/ResizableSplit';

/* ── helpers ────────────────────────────────────────────────── */

const b64ToPdfUrl = (pdfBase64) => {
  const bin = atob(pdfBase64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return URL.createObjectURL(new Blob([bytes], { type: 'application/pdf' }));
};

const countWords = (text) =>
  text
    .replace(/\\[a-zA-Z]+\{?/g, '') // strip commands
    .replace(/[{}\\%$#&_^~]/g, '')  // strip special chars
    .split(/\s+/)
    .filter(Boolean).length;

/* ── page component ─────────────────────────────────────────── */

const LatexEditorPage = () => {
  // generate initial source from resume data
  const draft = useMemo(() => cloneResume(resume), []);
  const generatedSource = useMemo(() => buildLatexSource(draft), [draft]);

  // state
  const [source, setSource] = useState(generatedSource);
  const [compileStatus, setCompileStatus] = useState('idle');   // idle | compiling | compiled | failed
  const [saveStatus, setSaveStatus] = useState('idle');         // idle | saving | saved | failed
  const [compileLog, setCompileLog] = useState('');
  const [pdfUrl, setPdfUrl] = useState('');
  const [cursor, setCursor] = useState({ line: 1, col: 1 });

  const editorViewRef = useRef(null);

  // cleanup PDF blob on unmount
  useEffect(() => () => { if (pdfUrl) URL.revokeObjectURL(pdfUrl); }, [pdfUrl]);

  /* ── compile ────────────────────────────────────────────── */
  const compile = useCallback(async (src) => {
    setCompileStatus('compiling');
    setCompileLog('');
    try {
      const res = await fetch('/api/compile-latex', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ source: src }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.log || data.error || 'Compile failed.');
      setPdfUrl(b64ToPdfUrl(data.pdfBase64));
      setCompileLog(data.log || '');
      setCompileStatus('compiled');
    } catch (err) {
      setCompileLog(err.message);
      setCompileStatus('failed');
    }
  }, []);

  /* ── save to disk ───────────────────────────────────────── */
  const saveToDisk = useCallback(async (src) => {
    setSaveStatus('saving');
    try {
      const res = await fetch('/api/save-tex', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ source: src }),
      });
      if (!res.ok) throw new Error('Save failed');
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch {
      setSaveStatus('failed');
      setTimeout(() => setSaveStatus('idle'), 3000);
    }
  }, []);

  /* ── Ctrl+S = save + compile ─────────────────────────── */
  const handleSave = useCallback(() => {
    saveToDisk(source);
    compile(source);
  }, [source, saveToDisk, compile]);

  /* ── toolbar compile button ──────────────────────────── */
  const handleCompileClick = useCallback(() => compile(source), [source, compile]);

  /* ── format insertion ────────────────────────────────── */
  const handleInsert = useCallback((before, after) => {
    const view = editorViewRef.current;
    if (!view) return;
    const { from, to } = view.state.selection.main;
    const selected = view.state.sliceDoc(from, to);
    const insert = before + selected + after;
    view.dispatch({
      changes: { from, to, insert },
      selection: { anchor: from + before.length, head: from + before.length + selected.length },
    });
    view.focus();
  }, []);

  /* ── copy ─────────────────────────────────────────────── */
  const [copyLabel, setCopyLabel] = useState('Copy');
  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(source);
      setCopyLabel('Copied!');
      setTimeout(() => setCopyLabel('Copy'), 2000);
    } catch {
      setCopyLabel('Failed');
      setTimeout(() => setCopyLabel('Copy'), 2000);
    }
  }, [source]);

  /* ── downloads ─────────────────────────────────────────── */
  const downloadTex = useCallback(() => {
    const url = URL.createObjectURL(new Blob([source], { type: 'application/x-tex' }));
    const a = Object.assign(document.createElement('a'), { href: url, download: 'resume.tex' });
    a.click();
    URL.revokeObjectURL(url);
  }, [source]);

  const downloadPdf = useCallback(() => {
    if (!pdfUrl) return;
    const a = Object.assign(document.createElement('a'), { href: pdfUrl, download: 'resume.pdf' });
    a.click();
  }, [pdfUrl]);

  /* ── reset ─────────────────────────────────────────────── */
  const resetSource = useCallback(() => setSource(generatedSource), [generatedSource]);

  /* ── metrics ───────────────────────────────────────────── */
  const wordCount = useMemo(() => countWords(source), [source]);

  /* ── render ────────────────────────────────────────────── */
  return (
    <>
      <Navbar />
      <div className="ol-page">
        {/* ── Main toolbar ──────────────────────────────── */}
        <header className="ol-toolbar">
          <div className="ol-toolbar-left">
            <div className="ol-file-tab">
              <i className="fas fa-file-code"></i>
              <span>resume.tex</span>
            </div>
          </div>
          <div className="ol-toolbar-right">
            <button className="ol-btn" onClick={resetSource} title="Reset to generated source">
              <i className="fas fa-rotate-right"></i> Reset
            </button>
            <button className="ol-btn" onClick={handleCopy} title="Copy LaTeX source">
              <i className="fas fa-copy"></i> {copyLabel}
            </button>
            <button className="ol-btn" onClick={downloadTex} title="Download .tex file">
              <i className="fas fa-file-code"></i> .tex
            </button>
            {pdfUrl && (
              <button className="ol-btn" onClick={downloadPdf} title="Download compiled PDF">
                <i className="fas fa-file-pdf"></i> PDF
              </button>
            )}
            <button
              className="ol-btn ol-btn-compile"
              onClick={handleCompileClick}
              disabled={compileStatus === 'compiling'}
              title="Compile LaTeX to PDF (Ctrl+S)"
            >
              <i className="fas fa-play"></i>
              {compileStatus === 'compiling' ? 'Compiling...' : 'Recompile'}
            </button>
          </div>
        </header>

        {/* ── Formatting toolbar ────────────────────────── */}
        <EditorToolbar onInsert={handleInsert} />

        {/* ── Editor + Preview split ────────────────────── */}
        <ResizableSplit
          left={
            <div className="ol-editor-pane">
              <CodeEditor
                value={source}
                onChange={setSource}
                onSave={handleSave}
                onCursorChange={setCursor}
                editorRef={editorViewRef}
              />
            </div>
          }
          right={
            <>
              <PdfPreview pdfUrl={pdfUrl} onDownload={downloadPdf} />
              {compileLog && (
                <details className="ol-log-panel">
                  <summary>
                    <i className="fas fa-terminal"></i> Compiler Log
                  </summary>
                  <pre>{compileLog}</pre>
                </details>
              )}
            </>
          }
        />

        {/* ── Status bar ────────────────────────────────── */}
        <StatusBar
          cursor={cursor}
          wordCount={wordCount}
          charCount={source.length}
          compileStatus={compileStatus}
          saveStatus={saveStatus}
        />
      </div>
    </>
  );
};

export default LatexEditorPage;
