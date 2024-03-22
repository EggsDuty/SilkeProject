import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignUpPage from './pages/SignUpPage.tsx'
import LoginPage from './pages/LoginPage.tsx'
import HomePage from './pages/HomePage.tsx'
import LandingPage from './pages/LandingPage.tsx'
import WhiteBoard from './pages/WhiteBoard.tsx'
import CalculatorsPage from './pages/CalculatorsPage.tsx'
import GraphingCalculators from './pages/GraphingCalculator.tsx'
import AuthHandler from './pages/AuthPages/AuthHandler.tsx'
import PleaseVerifyPage from './pages/AuthPages/PleaseVerifyPage.tsx'
import VerifyEmailPage from './pages/AuthPages/VerifyEmailPage.tsx'
import ForgotPasswordPage from './pages/AuthPages/ForgotPasswordPage.tsx'
import ResetPasswordPage from './pages/AuthPages/ResetPasswordPage.tsx'

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
          <Route path="/calculators" element={<CalculatorsPage />} />
          <Route path="/graphing-calculator" element={<GraphingCalculators />} />
          <Route path="/auth" element={<AuthHandler />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/please-verify" element={<PleaseVerifyPage />} />
          <Route path="/verify-email" element={<VerifyEmailPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;