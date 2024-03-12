import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignUpPage from './pages/SignUpPage.tsx'
import HomePage from './pages/HomePage.tsx'
import LandingPage from './pages/LandingPage.tsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route index element={<LandingPage />} />
        <Route path="/signup" element={<SignUpPage login={false} />} />
        <Route path="/login" element={<SignUpPage login={true} />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
