import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Commission from './pages/Commission'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/commission" element={<Commission />} />
    </Routes>
  )
}
