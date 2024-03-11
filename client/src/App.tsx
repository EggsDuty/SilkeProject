import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginTest from './pages/LoginTest.tsx'
import HomePage from './pages/HomePage.tsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginTest />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
