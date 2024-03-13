import firebase from '../firebase.tsx';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';

import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

import Validator from '../components/Auth/Validator.ts';

const auth = getAuth(firebase);

function SignUpPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [signedIn, setSignedIn] = useState(false);

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

    async function handleSignUp() {
        const email = (document.getElementById("signup_email") as HTMLTextAreaElement).value.trim();
        const password = (document.getElementById("signup_password") as HTMLTextAreaElement).value;

        await createUserWithEmailAndPassword(auth, email, password);
    }

    return (
        <div className="flex flex-col ml-10 mt-5 max-w-52">
            <p>Username:</p>
            <input id="signup_email" type="text" className="border-2 border-slate-950"></input>
            <p>Password:</p>
            <input id="signup_password" type="password" className="border-2 border-slate-950"></input>
            <button onClick={handleSignUp} className="mt-5 border-2 border-slate-950">Sign Up</button>
        </div>
    );
}


export default SignUpPage;