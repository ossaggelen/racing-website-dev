import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import CarsPage from './pages/CarsPage'
import FormulaStudentPage from './pages/FormulaStudentPage'
import SponsorsPage from './pages/SponsorsPage'
import TeamPage from './pages/TeamPage'
import ContactPage from './pages/ContactPage'

export default function App() {
  return (
    <div className="min-h-screen bg-bg">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/formula-student" element={<FormulaStudentPage />} />
          <Route path="/cars" element={<CarsPage />} />
          <Route path="/sponsors" element={<SponsorsPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
