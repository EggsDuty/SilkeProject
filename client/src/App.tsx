import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignUpPage from './pages/SignUpPage.tsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUpPage login={false} />} />
        <Route path="/login" element={<SignUpPage login={true} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
