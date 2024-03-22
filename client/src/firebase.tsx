import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBynSYYVIUya4sfaxHkp9OnCPCbHIWCzOc",
    authDomain: "silkeproject.firebaseapp.com",
    projectId: "silkeproject",
    storageBucket: "silkeproject.appspot.com",
    messagingSenderId: "209873359964",
    appId: "1:209873359964:web:807907766873de6f434299"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default { app, db };