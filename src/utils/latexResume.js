export const cloneResume = (resume) => JSON.parse(JSON.stringify(resume));

const latexEscape = (value) =>
  String(value ?? '')
    .replace(/\\/g, '\\textbackslash{}')
    .replace(/&/g, '\\&')
    .replace(/%/g, '\\%')
    .replace(/\$/g, '\\$')
    .replace(/#/g, '\\#')
    .replace(/_/g, '\\_')
    .replace(/{/g, '\\{')
    .replace(/}/g, '\\}')
    .replace(/~/g, '\\textasciitilde{}')
    .replace(/\^/g, '\\textasciicircum{}');

const itemLines = (items, indent = '        ') =>
  items.map((item) => `${indent}\\resumeItem{${latexEscape(item)}}`).join('\n');

const educationEntries = (education) =>
  education
    .map(
      (item) => String.raw`    \resumeEducationHeading
      {${latexEscape(item.institution)}}{${latexEscape(item.date)}}
      {${latexEscape(item.degree)}}{${latexEscape(item.result)}}`,
    )
    .join('\n');

const experienceEntries = (experience) =>
  experience
    .map(
      (item) => String.raw`    \resumeSubheading
      {${latexEscape(item.title)}}{${latexEscape(item.date)}}
      {${latexEscape(item.company)}}{${latexEscape(item.location)}}
      \resumeItemListStart
${itemLines(item.bullets)}
      \resumeItemListEnd`,
    )
    .join('\n');

const projectEntries = (projects) =>
  projects
    .map(
      (project) => String.raw`      \resumeProjectHeading
          {${latexEscape(project.title)}}{${latexEscape(project.date)}}{${latexEscape(project.technologies)}}
          \resumeItemListStart
${itemLines(project.bullets, '            ')}
          \resumeItemListEnd`,
    )
    .join('\n');

const skillLines = (skillGroups) =>
  skillGroups
    .map((group) => `     \\textbf{${latexEscape(group.label)}}{: ${group.items.map(latexEscape).join(', ')}} \\\\`)
    .join('\n')
    .replace(/ \\\\$/, '');

export const buildLatexSource = (resume) => String.raw`%-------------------------
% ATS-Friendly Resume in LaTeX
% Generated from the React resume editor
%------------------------

\documentclass[letterpaper,10pt]{article}

\usepackage{lmodern}
\usepackage{latexsym}
\usepackage[empty]{fullpage}
\usepackage{titlesec}
\usepackage{marvosym}
\usepackage[usenames,dvipsnames]{color}
\usepackage{verbatim}
\usepackage{enumitem}
\usepackage[hidelinks]{hyperref}
\usepackage{fancyhdr}
\usepackage[english]{babel}
\input{glyphtounicode}

\pagestyle{fancy}
\fancyhf{}
\fancyfoot{}
\renewcommand{\headrulewidth}{0pt}
\renewcommand{\footrulewidth}{0pt}

\addtolength{\oddsidemargin}{-0.5in}
\addtolength{\evensidemargin}{-0.5in}
\addtolength{\textwidth}{1in}
\addtolength{\topmargin}{-.65in}
\addtolength{\textheight}{1.3in}
\setlength{\footskip}{4.08003pt}

\urlstyle{same}
\raggedbottom
\raggedright
\setlength{\tabcolsep}{0in}

\titleformat{\section}{
  \vspace{-6pt}\scshape\raggedright\large
}{}{0em}{}[\color{black}\titlerule \vspace{-6pt}]

\pdfgentounicode=1

\newcommand{\resumeItem}[1]{
  \item\small{
    {#1 \vspace{-2pt}}
  }
}

\newcommand{\resumeSubheading}[4]{
  \vspace{-2pt}\item
    \textbf{#1}\hfill \small #2 \\
    \textit{\small #3}\hfill \textit{\small #4}
    \vspace{-6pt}
}

\newcommand{\resumeProjectHeading}[3]{
    \item
    \small \textbf{#1}\hfill #2 \\
    \small \emph{#3}
    \vspace{-7pt}
}

\newcommand{\resumeEducationHeading}[4]{
  \vspace{-2pt}\item
    \textbf{#1} $|$ \small #2 \\
    \textit{\small #3} $|$ \textit{\small #4}
    \vspace{-6pt}
}

\renewcommand\labelitemii{$\vcenter{\hbox{\tiny$\bullet$}}$}

\newcommand{\resumeSubHeadingListStart}{\begin{itemize}[leftmargin=0.15in, label={}, itemsep=0pt, topsep=2pt]}
\newcommand{\resumeSubHeadingListEnd}{\end{itemize}}
\newcommand{\resumeItemListStart}{\begin{itemize}[itemsep=0pt, topsep=1pt]}
\newcommand{\resumeItemListEnd}{\end{itemize}\vspace{-7pt}}

\begin{document}

\begin{center}
    \textbf{\Huge \rmfamily ${latexEscape(resume.fullName)}} \\ \vspace{1pt}
    \small ${latexEscape(resume.role)} \\ \vspace{1pt}
    \small ${latexEscape(resume.contact.phone)} $|$ \href{mailto:${latexEscape(resume.contact.email)}}{\underline{${latexEscape(resume.contact.email)}}} $|$
    ${latexEscape(resume.location)} $|$
    \href{${latexEscape(resume.contact.linkedin.href)}}{\underline{${latexEscape(resume.contact.linkedin.label)}}} $|$
    \href{${latexEscape(resume.contact.github.href)}}{\underline{${latexEscape(resume.contact.github.label)}}} $|$
    \href{${latexEscape(resume.contact.website.href)}}{\underline{${latexEscape(resume.contact.website.label)}}}
\end{center}

\section{Professional Summary}
\small{${latexEscape(resume.summary)}}

\section{Education}
  \resumeSubHeadingListStart
${educationEntries(resume.education)}
  \resumeSubHeadingListEnd

\section{Technical Skills}
 \begin{itemize}[leftmargin=0.15in, label={}]
    \small{\item{
${skillLines(resume.skillGroups)}
    }}
 \end{itemize}

\section{Experience}
  \resumeSubHeadingListStart
${experienceEntries(resume.experience)}
  \resumeSubHeadingListEnd

\section{Projects}
    \resumeSubHeadingListStart
${projectEntries(resume.projects)}
    \resumeSubHeadingListEnd

\section{Certifications}
 \begin{itemize}[leftmargin=0.15in, label={}]
    \small{\item{${resume.certifications.map(latexEscape).join(' $|$ ')}}}
 \end{itemize}

\section{Languages}
 \begin{itemize}[leftmargin=0.15in, label={}]
    \small{\item{${resume.languages.map(latexEscape).join(' $|$ ')}}}
 \end{itemize}

\end{document}
`;
