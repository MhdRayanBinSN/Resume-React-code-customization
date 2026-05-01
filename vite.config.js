import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { Buffer } from 'node:buffer'
import { spawn } from 'node:child_process'
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const MAX_LATEX_SOURCE_SIZE = 250_000
const COMPILE_TIMEOUT_MS = 25_000

const sendJson = (response, statusCode, payload) => {
  response.statusCode = statusCode
  response.setHeader('Content-Type', 'application/json')
  response.end(JSON.stringify(payload))
}

const readJsonBody = (request) =>
  new Promise((resolve, reject) => {
    let body = ''

    request.on('data', (chunk) => {
      body += chunk

      if (body.length > MAX_LATEX_SOURCE_SIZE) {
        reject(new Error('LaTeX source is too large.'))
        request.destroy()
      }
    })

    request.on('end', () => {
      try {
        resolve(JSON.parse(body || '{}'))
      } catch {
        reject(new Error('Request body must be valid JSON.'))
      }
    })

    request.on('error', reject)
  })

const runPdflatex = (texPath, outputDirectory) =>
  new Promise((resolve) => {
    const compiler = spawn('pdflatex', [
      '-interaction=nonstopmode',
      '-halt-on-error',
      '-no-shell-escape',
      '-output-directory',
      outputDirectory,
      texPath,
    ])
    let log = ''
    const timeout = setTimeout(() => {
      log += '\nCompilation timed out.'
      compiler.kill()
    }, COMPILE_TIMEOUT_MS)

    compiler.stdout.on('data', (chunk) => {
      log += chunk.toString()
    })

    compiler.stderr.on('data', (chunk) => {
      log += chunk.toString()
    })

    compiler.on('error', (error) => {
      clearTimeout(timeout)
      resolve({ ok: false, log: `${log}\n${error.message}` })
    })

    compiler.on('close', (code) => {
      clearTimeout(timeout)
      resolve({ ok: code === 0, log })
    })
  })

const compileLatex = async (source) => {
  if (typeof source !== 'string' || !source.trim()) {
    throw new Error('LaTeX source is empty.')
  }

  const workDirectory = await mkdtemp(join(tmpdir(), 'resume-latex-'))
  const texPath = join(workDirectory, 'resume.tex')
  const pdfPath = join(workDirectory, 'resume.pdf')
  let log = ''

  try {
    await writeFile(texPath, source, 'utf8')

    const firstRun = await runPdflatex(texPath, workDirectory)
    log += firstRun.log

    if (!firstRun.ok) {
      return { ok: false, log }
    }

    const secondRun = await runPdflatex(texPath, workDirectory)
    log += secondRun.log

    if (!secondRun.ok) {
      return { ok: false, log }
    }

    const pdf = await readFile(pdfPath)
    return { ok: true, log, pdfBase64: Buffer.from(pdf).toString('base64') }
  } finally {
    await rm(workDirectory, { recursive: true, force: true })
  }
}

const latexCompilerPlugin = () => ({
  name: 'local-latex-compiler',
  configureServer(server) {
    server.middlewares.use('/api/compile-latex', async (request, response) => {
      if (request.method !== 'POST') {
        sendJson(response, 405, { error: 'Use POST to compile LaTeX.' })
        return
      }

      try {
        const body = await readJsonBody(request)
        const result = await compileLatex(body.source)

        if (!result.ok) {
          sendJson(response, 400, { error: 'LaTeX compile failed.', log: result.log.slice(-12_000) })
          return
        }

        sendJson(response, 200, {
          pdfBase64: result.pdfBase64,
          log: result.log.slice(-12_000),
        })
      } catch (error) {
        sendJson(response, 500, { error: error.message })
      }
    })
  },
  configurePreviewServer(server) {
    server.middlewares.use('/api/compile-latex', async (request, response) => {
      if (request.method !== 'POST') {
        sendJson(response, 405, { error: 'Use POST to compile LaTeX.' })
        return
      }

      try {
        const body = await readJsonBody(request)
        const result = await compileLatex(body.source)

        if (!result.ok) {
          sendJson(response, 400, { error: 'LaTeX compile failed.', log: result.log.slice(-12_000) })
          return
        }

        sendJson(response, 200, {
          pdfBase64: result.pdfBase64,
          log: result.log.slice(-12_000),
        })
      } catch (error) {
        sendJson(response, 500, { error: error.message })
      }
    })
  },
})

const saveTexPlugin = () => ({
  name: 'save-tex-to-disk',
  configureServer(server) {
    server.middlewares.use('/api/save-tex', async (request, response) => {
      if (request.method !== 'POST') {
        sendJson(response, 405, { error: 'Use POST to save.' })
        return
      }

      try {
        const body = await readJsonBody(request)
        const texPath = join(import.meta.dirname, 'public', 'ats-resume.tex')
        await writeFile(texPath, body.source, 'utf8')
        sendJson(response, 200, { saved: true, path: texPath })
      } catch (error) {
        sendJson(response, 500, { error: error.message })
      }
    })
  },
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), latexCompilerPlugin(), saveTexPlugin()],
})

