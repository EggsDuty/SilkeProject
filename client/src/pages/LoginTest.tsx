import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBynSYYVIUya4sfaxHkp9OnCPCbHIWCzOc",
    authDomain: "silkeproject.firebaseapp.com",
    projectId: "silkeproject",
    storageBucket: "silkeproject.appspot.com",
    messagingSenderId: "209873359964",
    appId: "1:209873359964:web:807907766873de6f434299"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
connectAuthEmulator(auth, "https://localhost:9099");

function LoginTest() {
    return(
        <h1>Test!</h1>
    )
}

export default LoginTest