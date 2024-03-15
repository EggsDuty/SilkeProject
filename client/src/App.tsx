import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignUpPage from './pages/SignUpPage.tsx'
import LoginPage from './pages/LoginPage.tsx'
import HomePage from './pages/HomePage.tsx'
import LandingPage from './pages/LandingPage.tsx'
import WhiteBoard from './pages/WhiteBoard.tsx'
import GraphingCalculators from './pages/GraphingCalculator.tsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<LandingPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/whiteboard" element={<WhiteBoard />} />
        <Route path="/GraphingCalculator" element={<GraphingCalculators />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
