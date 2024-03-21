import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignUpPage from './pages/SignUpPage.tsx'
import LoginPage from './pages/LoginPage.tsx'
import HomePage from './pages/HomePage.tsx'
import LandingPage from './pages/LandingPage.tsx'
import WhiteBoard from './pages/WhiteBoard.tsx'
import GraphingCalculators from './pages/GraphingCalculator.tsx'
import ForgotPasswordPage from './pages/ResetPassword/ForgotPasswordPage.tsx'
import ResetPasswordPage from './pages/ResetPassword/ResetPasswordPage.tsx'

import Background from './components/Background.tsx'

function App() {

  return (
    <>
      <Background img="background_5.jpg" cover="cover" />
      <BrowserRouter>
        <Routes>
          <Route index element={<LandingPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/whiteboard" element={<WhiteBoard />} />
          <Route path="/GraphingCalculator" element={<GraphingCalculators />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;