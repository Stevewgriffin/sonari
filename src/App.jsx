import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Commission from './pages/Commission'
import AssessmentPage from './pages/AssessmentPage'
import AssessmentTest from './pages/AssessmentTest'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/commission" element={<Commission />} />
      <Route path="/assessment" element={<AssessmentPage />} />
      <Route path="/test/assessment" element={<AssessmentTest />} />
    </Routes>
  )
}
