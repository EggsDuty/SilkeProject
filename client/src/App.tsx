import {BrowserRouter, Routes, Route} from 'react-router-dom'
import LoginTest from './pages/LoginTest.tsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginTest />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
