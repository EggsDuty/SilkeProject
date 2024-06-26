import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import LandingPage from "./pages/LandingPage.tsx";
import WhiteBoard from "./pages/WhiteBoard.tsx";
import CalculatorsPage from "./pages/CalculatorsPage.tsx";
import GraphingCalculators from "./pages/GraphingCalculatorPage.tsx";
import ProgrammersCalculator from "./pages/ProgrammersCalculator.tsx";
import AuthHandler from "./pages/AuthPages/AuthHandler.tsx";
import PleaseVerifyPage from "./pages/AuthPages/PleaseVerifyPage.tsx";
import VerifyEmailPage from "./pages/AuthPages/VerifyEmailPage.tsx";
import ForgotPasswordPage from "./pages/AuthPages/ForgotPasswordPage.tsx";
import ResetPasswordPage from "./pages/AuthPages/ResetPasswordPage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import AllGroupsPage from "./pages/AllGroupsPage.tsx";
import GroupPage from "./pages/GroupPage.tsx";
import Background from "./components/Background.tsx";
import ScientificCalculatorPage from "./pages/ScientificCalculatorPage.tsx";
import StandardCalculatorPage from "./pages/StandardCalculatorPage.tsx";
import { getAuth } from "firebase/auth";
import firebase from "./firebase.tsx";
import { useAuthState } from "react-firebase-hooks/auth";
import NoRoute from "./pages/NoRoute.tsx";
import GroupSettingsPage from "./pages/GroupSettingsPage.tsx";

const auth = getAuth(firebase.app);

function App() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return;
  }

  return (
    <>
      <Background img="/background_5.jpg" cover="cover" />
      <BrowserRouter>
        <Routes>
          {
            user ?
              (user.emailVerified ?
                <> {/* Routes only accessible by logged in users */}
                  <Route index element={<LandingPage />} />
                  <Route path="/signup" element={<SignUpPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/auth" element={<AuthHandler />} />
                  <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                  <Route path="/reset-password" element={<ResetPasswordPage />} />

                  <Route path="/home" element={<HomePage />} />
                  <Route path="/whiteboard" element={<WhiteBoard />} />
                  <Route path="/whiteboard/:groupID" element={<WhiteBoard />} />
                  <Route path="/calculators" element={<CalculatorsPage />} />
                  <Route path="/standard-calculator" element={<StandardCalculatorPage />} />
                  <Route path="/scientific-calculator" element={<ScientificCalculatorPage />} />
                  <Route path="/graphing-calculator" element={<GraphingCalculators />} />
                  <Route path="/programmers-calculator" element={<ProgrammersCalculator />} />
                  <Route path="/profile/:uid" element={<ProfilePage />} />
                  <Route path="/groups" element={<AllGroupsPage />} />
                  <Route path="/group/:groupID" element={<GroupPage />} />
                  <Route path="/group/:groupID/settings" element={<GroupSettingsPage />} />

                  <Route path="*" element={<NoRoute guest={false} />} />
                </> :
                <> {/* Routes accessible by people who have an account, but have not yet verified */}
                  <Route index element={<LandingPage />} />
                  <Route path="/signup" element={<SignUpPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/auth" element={<AuthHandler />} />
                  <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                  <Route path="/reset-password" element={<ResetPasswordPage />} />
                  <Route path="/please-verify" element={<PleaseVerifyPage />} />
                  <Route path="/verify-email" element={<VerifyEmailPage />} />
                </>) :
              <> {/* Routes accessible by anyone (guests) */}
                <Route index element={<LandingPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/auth" element={<AuthHandler />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/reset-password" element={<ResetPasswordPage />} />
                <Route path="/please-verify" element={<PleaseVerifyPage />} />
                <Route path="/verify-email" element={<VerifyEmailPage />} />

                <Route path="/home" element={<HomePage />} />
                <Route path="/whiteboard" element={<WhiteBoard />} />
                <Route path="/calculators" element={<CalculatorsPage />} />
                <Route path="/standard-calculator" element={<StandardCalculatorPage />} />
                <Route path="/scientific-calculator" element={<ScientificCalculatorPage />} />
                <Route path="/graphing-calculator" element={<GraphingCalculators />} />
                <Route path="/programmers-calculator" element={<ProgrammersCalculator />} />

                <Route path="*" element={<NoRoute guest={true} />} />
              </>
          }
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;