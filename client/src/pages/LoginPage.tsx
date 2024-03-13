import firebase from '../firebase.tsx';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';

import { FormEvent, useEffect, useState } from 'react';
import { FormEncType, Navigate } from 'react-router-dom';

import Validator from '../components/Auth/Validator.ts';

const auth = getAuth(firebase);

function LoginPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [signedIn, setSignedIn] = useState(false);
    const [usernameField, setUsernameField] = useState("");

    useEffect(() => {
        const debounce = setTimeout(() => {
            console.log(usernameField);
        }, 2000)

        return () => clearTimeout(debounce);
    }, [usernameField]);

    const monitorAuthState = async () => {
        onAuthStateChanged(auth, user => {
            if (user) {
                setSignedIn(true);
            } else {
                setSignedIn(false);
            }
            setIsLoading(false);
        })
    }

    monitorAuthState();

    if (isLoading) {
        return <div></div>
    }

    if (signedIn) {
        return <Navigate to="/home" replace={true} />
    }

    async function handleLogin(e: FormEvent) {
        e.preventDefault();
        const email = (document.getElementById("login_email") as HTMLTextAreaElement).value.trim();
        const password = (document.getElementById("login_password") as HTMLTextAreaElement).value;

        console.log(email);
        console.log(password);
        // await signInWithEmailAndPassword(auth, email, password);
    }

    return (
        <form onSubmit={(e) => handleLogin(e)} className="flex flex-col ml-10 mt-5 max-w-52">
            <p>E-mail:</p>
            <input onChange={(e) => setUsernameField(e.target.value)} id="login_email" type="text" className="border-2 border-slate-950"></input>
            <p>Password:</p>
            <input id="login_password" type="password" className="border-2 border-slate-950"></input>
            <input type="submit" value="Login" className="mt-5 border-2 border-slate-950 cursor-pointer" />
        </form>
    );
}


export default LoginPage;