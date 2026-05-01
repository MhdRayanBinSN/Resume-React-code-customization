import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import LatexEditorPage from './components/LatexEditorPage.jsx'
import TobinPage from './pages/TobinPage.jsx'
import ResumeV2Page from './pages/ResumeV2Page.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/latex" element={<LatexEditorPage />} />
        <Route path="/tobin" element={<TobinPage />} />
        <Route path="/v2" element={<ResumeV2Page />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
