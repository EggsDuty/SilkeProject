import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyBynSYYVIUya4sfaxHkp9OnCPCbHIWCzOc",
    authDomain: "silkeproject.firebaseapp.com",
    projectId: "silkeproject",
    storageBucket: "silkeproject.appspot.com",
    messagingSenderId: "209873359964",
    appId: "1:209873359964:web:807907766873de6f434299"
};

const firebase = initializeApp(firebaseConfig);

export default firebase;