import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import CaseStudyPage from './pages/CaseStudyPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/case-study/bkb-mobile" element={<CaseStudyPage />} />
      </Routes>
    </BrowserRouter>
  )
}
