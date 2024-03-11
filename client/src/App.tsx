import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignUpPage from './pages/SignUpPage.tsx'
import HomePage from './pages/HomePage.tsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUpPage login={false} />} />
        <Route path="/login" element={<SignUpPage login={true} />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
