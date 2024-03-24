import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignUpPage from './pages/SignUpPage.tsx'
import LoginPage from './pages/LoginPage.tsx'
import HomePage from './pages/HomePage.tsx'
import LandingPage from './pages/LandingPage.tsx'
import WhiteBoard from './pages/WhiteBoard.tsx'
import GraphingCalculators from './pages/GraphingCalculator.tsx'

import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'
import firebase from './firebase.tsx'
import Background from './components/Background.tsx'
import CalculatorsPage from './pages/CalculatorsPage.tsx'
import AllGroupsPage from './pages/AllGroupsPage.tsx'
import GroupPage from './pages/GroupPage.tsx'

const auth = getAuth(firebase.app);

function App() {
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    const monitorAuthState = async () => {
      onAuthStateChanged(auth, user => {
        if (user) {
          setSignedIn(true);
        } else {
          setSignedIn(false);
        }
      })
    }

    monitorAuthState();
  }, []);

  return (
    <>
      <Background img="background_5.jpg" cover="cover" />
      <BrowserRouter>
        <Routes>
          <Route index element={<LandingPage />} />
          <Route path="/signup" element={<SignUpPage signedIn={signedIn} />} />
          <Route path="/login" element={<LoginPage signedIn={signedIn} />} />
          <Route path="/home" element={<HomePage signedIn={signedIn} />} />
          <Route path="/whiteboard" element={<WhiteBoard />} />
          <Route path="/calculators" element={<CalculatorsPage />} />
          <Route path="/graphing-calculator" element={<GraphingCalculators />} />
          <Route path="/groups" element={<AllGroupsPage />} />
          <Route path="/group/:groupID" element={<GroupPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;