import firebase from '../firebase.tsx';
import { getAuth, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';

import { useState } from 'react';

import ValidateEmail from '../components/login/ValidateEmail.ts';
import ValidatePassword from '../components/login/ValidatePassword.ts';

const auth = getAuth(firebase);

interface Props {
    login: boolean
}

function LandingPage(props: Props) {
    const [createdAccount, setCreatedAccount] = useState(false);
    const [emailInvalid, setEmailInvalid] = useState(false);
    const [passwordInvalid, setPasswordInvalid] = useState(false);
    const [signedIn, setSignedIn] = useState(false);

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

    async function handleSignUp() {
        const email = (document.getElementById("landingPage_email") as HTMLTextAreaElement).value;
        const password = (document.getElementById("landingPage_password") as HTMLTextAreaElement).value;

        let somethingWrong = false;

        if (!ValidateEmail(email)) {
            somethingWrong = true;
            setEmailInvalid(true);
        } else {
            setEmailInvalid(false);
        }

        if (!ValidatePassword(password)) {
            somethingWrong = true;
            setPasswordInvalid(true);
        } else {
            setPasswordInvalid(false);
        }

        if (somethingWrong) {
            return;
        }

        if (props.login == true) {
            await signInWithEmailAndPassword(auth, email, password);
        } else if (props.login == false) {
            await createUserWithEmailAndPassword(auth, email, password);
            setCreatedAccount(true);
        }
    }

    async function handleLogout() {
        await signOut(auth);
    }

    return (
        <div className="flex flex-col ml-10 mt-5 max-w-52">
            <p>Username:</p>
            <input id="landingPage_email" type="text" className="border-2 border-slate-950"></input>
            {emailInvalid ? <p className="font-bold">Invalid email!</p> : ""}
            <p>Password:</p>
            <input id="landingPage_password" type="password" className="border-2 border-slate-950"></input>
            {passwordInvalid ? <p className="font-bold">Invalid password!</p> : ""}
            <button onClick={handleSignUp} className="mt-5 border-2 border-slate-950">{props.login ? "Login" : "Sign Up"}</button>
            {signedIn ? <button onClick={handleLogout} className="mt-3 border-2 border-slate-950">Logout</button> : ""}
            {createdAccount ? "Account has been created!" : ""}
        </div>
    )
}

export default LandingPage