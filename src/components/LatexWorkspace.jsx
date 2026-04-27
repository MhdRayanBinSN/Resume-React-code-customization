import React, { useEffect, useMemo, useState } from 'react';
import { buildLatexSource, cloneResume } from '../utils/latexResume';

const splitLines = (value) =>
  value
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean);

const splitCommaList = (value) =>
  value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

const portfolioLabel = (url) => url.replace(/^https?:\/\//, '').replace(/\/$/, '');

const sourceToPdfUrl = (pdfBase64) => {
  const binary = atob(pdfBase64);
  const bytes = new Uint8Array(binary.length);

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return URL.createObjectURL(new Blob([bytes], { type: 'application/pdf' }));
};

const Field = ({ label, value, onChange, type = 'text' }) => (
  <label className="editor-field">
    <span>{label}</span>
    <input type={type} value={value} onChange={(event) => onChange(event.target.value)} />
  </label>
);

const TextAreaField = ({ label, value, onChange, rows = 4, hint }) => (
  <label className="editor-field editor-field-wide">
    <span>{label}</span>
    {hint && <small>{hint}</small>}
    <textarea rows={rows} value={value} onChange={(event) => onChange(event.target.value)} />
  </label>
);

const LatexWorkspace = ({ baseResume }) => {
  const [draft, setDraft] = useState(() => cloneResume(baseResume));
  const generatedSource = useMemo(() => buildLatexSource(draft), [draft]);
  const [sourceMode, setSourceMode] = useState('generated');
  const [customSource, setCustomSource] = useState(generatedSource);
  const [copyStatus, setCopyStatus] = useState('idle');
  const [compileStatus, setCompileStatus] = useState('idle');
  const [compileLog, setCompileLog] = useState('');
  const [compiledPdfUrl, setCompiledPdfUrl] = useState('');

  const latexSource = sourceMode === 'generated' ? generatedSource : customSource;

  useEffect(() => {
    return () => {
      if (compiledPdfUrl) {
        URL.revokeObjectURL(compiledPdfUrl);
      }
    };
  }, [compiledPdfUrl]);

  const updateDraft = (updater) => {
    setDraft((previous) => {
      const next = cloneResume(previous);
      updater(next);
      return next;
    });
  };

  const updateProject = (projectIndex, updater) => {
    updateDraft((next) => {
      updater(next.projects[projectIndex]);
    });
  };

  const updateSkillGroup = (groupIndex, value) => {
    updateDraft((next) => {
      next.skillGroups[groupIndex].items = splitCommaList(value);
    });
  };

  const resetSourceFromForm = () => {
    setSourceMode('generated');
    setCustomSource(generatedSource);
  };

  const copyLatex = async () => {
    try {
      await navigator.clipboard.writeText(latexSource);
      setCopyStatus('copied');
      window.setTimeout(() => setCopyStatus('idle'), 2000);
    } catch (error) {
      console.error(error);
      setCopyStatus('failed');
      window.setTimeout(() => setCopyStatus('idle'), 2500);
    }
  };

  const downloadLatex = () => {
    const url = URL.createObjectURL(new Blob([latexSource], { type: 'application/x-tex' }));
    const link = document.createElement('a');

    link.href = url;
    link.download = 'muhammed-rayan-ats-resume.tex';
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const compileLatex = async () => {
    setCompileStatus('compiling');
    setCompileLog('');

    try {
      const response = await fetch('/api/compile-latex', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ source: latexSource }),
      });
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.log || payload.error || 'LaTeX compile failed.');
      }

      const pdfUrl = sourceToPdfUrl(payload.pdfBase64);
      setCompiledPdfUrl(pdfUrl);
      setCompileLog(payload.log || '');
      setCompileStatus('compiled');
    } catch (error) {
      console.error(error);
      setCompileLog(error.message);
      setCompileStatus('failed');
    }
  };

  return (
    <section className="latex-workspace" aria-labelledby="latex-workspace-title">
      <div className="latex-workspace-header">
        <div>
          <p className="section-kicker">LaTeX Studio</p>
          <h2 id="latex-workspace-title">Edit, Copy, Compile</h2>
        </div>
        <div className="latex-status">
          {sourceMode === 'generated' ? 'Synced with form' : 'Manual source edit'}
        </div>
      </div>

      <div className="latex-workspace-grid">
        <div className="latex-form-panel">
          <details open>
            <summary>Personal Details</summary>
            <div className="editor-grid">
              <Field label="Name" value={draft.fullName} onChange={(value) => updateDraft((next) => { next.fullName = value; })} />
              <Field label="Role" value={draft.role} onChange={(value) => updateDraft((next) => { next.role = value; })} />
              <Field label="Phone" value={draft.contact.phone} onChange={(value) => updateDraft((next) => { next.contact.phone = value; })} />
              <Field label="Email" value={draft.contact.email} onChange={(value) => updateDraft((next) => { next.contact.email = value; })} type="email" />
              <Field label="Location" value={draft.location} onChange={(value) => updateDraft((next) => { next.location = value; })} />
              <Field
                label="Portfolio"
                value={draft.contact.website.href}
                onChange={(value) =>
                  updateDraft((next) => {
                    next.contact.website.href = value;
                    next.contact.website.label = portfolioLabel(value);
                  })
                }
              />
            </div>
            <TextAreaField label="Professional Summary" value={draft.summary} rows={4} onChange={(value) => updateDraft((next) => { next.summary = value; })} />
          </details>

          <details open>
            <summary>Education</summary>
            {draft.education.map((item, index) => (
              <div className="editor-card" key={item.degree}>
                <div className="editor-grid">
                  <Field label="Institution" value={item.institution} onChange={(value) => updateDraft((next) => { next.education[index].institution = value; })} />
                  <Field label="Date" value={item.date} onChange={(value) => updateDraft((next) => { next.education[index].date = value; })} />
                  <Field label="Degree" value={item.degree} onChange={(value) => updateDraft((next) => { next.education[index].degree = value; })} />
                  <Field label="Result" value={item.result} onChange={(value) => updateDraft((next) => { next.education[index].result = value; })} />
                </div>
              </div>
            ))}
          </details>

          <details open>
            <summary>Experience</summary>
            {draft.experience.map((item, index) => (
              <div className="editor-card" key={`${item.title}-${item.company}`}>
                <div className="editor-grid">
                  <Field label="Title" value={item.title} onChange={(value) => updateDraft((next) => { next.experience[index].title = value; })} />
                  <Field label="Date" value={item.date} onChange={(value) => updateDraft((next) => { next.experience[index].date = value; })} />
                  <Field label="Company" value={item.company} onChange={(value) => updateDraft((next) => { next.experience[index].company = value; })} />
                  <Field label="Location" value={item.location} onChange={(value) => updateDraft((next) => { next.experience[index].location = value; })} />
                </div>
                <TextAreaField
                  label="Bullet Points"
                  hint="One bullet per line"
                  rows={6}
                  value={item.bullets.join('\n')}
                  onChange={(value) => updateDraft((next) => { next.experience[index].bullets = splitLines(value); })}
                />
              </div>
            ))}
          </details>

          <details>
            <summary>Skills</summary>
            {draft.skillGroups.map((group, index) => (
              <TextAreaField
                key={group.label}
                label={group.label}
                hint="Separate skills with commas"
                rows={2}
                value={group.items.join(', ')}
                onChange={(value) => updateSkillGroup(index, value)}
              />
            ))}
          </details>

          <details>
            <summary>Projects</summary>
            {draft.projects.map((project, index) => (
              <div className="editor-card" key={project.title}>
                <div className="editor-grid">
                  <Field label="Project" value={project.title} onChange={(value) => updateProject(index, (next) => { next.title = value; })} />
                  <Field label="Date" value={project.date} onChange={(value) => updateProject(index, (next) => { next.date = value; })} />
                </div>
                <TextAreaField label="Technologies" rows={2} value={project.technologies} onChange={(value) => updateProject(index, (next) => { next.technologies = value; })} />
                <TextAreaField
                  label="Bullet Points"
                  hint="One bullet per line"
                  rows={5}
                  value={project.bullets.join('\n')}
                  onChange={(value) => updateProject(index, (next) => { next.bullets = splitLines(value); })}
                />
              </div>
            ))}
          </details>
        </div>

        <div className="latex-code-panel">
          <div className="latex-code-toolbar">
            <button type="button" className="ats-action" onClick={resetSourceFromForm}>
              <i className="fas fa-rotate-right"></i> Refresh Code
            </button>
            <button type="button" className="ats-action" onClick={copyLatex}>
              <i className="fas fa-copy"></i>
              {copyStatus === 'copied' ? 'Copied' : copyStatus === 'failed' ? 'Copy Failed' : 'Copy LaTeX'}
            </button>
            <button type="button" className="ats-action" onClick={downloadLatex}>
              <i className="fas fa-file-code"></i> Download .tex
            </button>
            <button type="button" className="ats-action primary-action" onClick={compileLatex} disabled={compileStatus === 'compiling'}>
              <i className="fas fa-gears"></i>
              {compileStatus === 'compiling' ? 'Compiling...' : 'Compile PDF'}
            </button>
          </div>

          <textarea
            className="latex-source-editor"
            spellCheck="false"
            value={latexSource}
            onChange={(event) => {
              setSourceMode('custom');
              setCustomSource(event.target.value);
            }}
          />

          <div className={`compile-message ${compileStatus}`}>
            {compileStatus === 'compiled' && 'Compiled successfully. Preview and download are ready.'}
            {compileStatus === 'compiling' && 'Running pdflatex locally...'}
            {compileStatus === 'failed' && 'Compile failed. Check the log below and fix the LaTeX source.'}
            {compileStatus === 'idle' && 'Edit the form or source, then compile when you are ready.'}
          </div>

          {compiledPdfUrl && (
            <div className="compiled-preview">
              <div className="compiled-preview-header">
                <strong>Compiled PDF Preview</strong>
                <a className="ats-action" href={compiledPdfUrl} download="muhammed-rayan-ats-resume.pdf">
                  <i className="fas fa-download"></i> Download PDF
                </a>
              </div>
              <iframe title="Compiled ATS resume preview" src={compiledPdfUrl} />
            </div>
          )}

          {compileLog && (
            <details className="compile-log">
              <summary>Compiler Log</summary>
              <pre>{compileLog}</pre>
            </details>
          )}
        </div>
      </div>
    </section>
  );
};

export default LatexWorkspace;
