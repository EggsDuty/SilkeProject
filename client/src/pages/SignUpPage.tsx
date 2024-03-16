import firebase from '../firebase.tsx';
import { FirebaseError } from '@firebase/util';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, updateProfile } from 'firebase/auth';

import { FormEvent, ReactElement, useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';

import Validator from '../components/Auth/Validator.ts';
import AuthField from '../components/Auth/AuthField.tsx';

const auth = getAuth(firebase);

interface Props {
    signedIn: boolean
}

// Add auth/email-already-exists
const errorMap: { [id: string]: ReactElement } = {
    "auth/invalid-credential": <>Wrong e-mail or password.</>,
}

function LoginPage(props: Props) {
    const [usernameField, setUsernameField] = useState("");
    const [emailField, setEmailField] = useState("");
    const [passwordField, setPasswordField] = useState("");

    const [loginError, setLoginError] = useState("");

    if (props.signedIn) {
        return <Navigate to="/home" replace={true} />
    }

    async function handleSignUp(e: FormEvent) {
        e.preventDefault();

        if (usernameField.length === 0 || emailField.length === 0 || passwordField.length === 0) {
            return;
        }

        if (Validator.ValidateUsername(usernameField).length !== 0 || Validator.ValidateEmail(emailField).length !== 0 || Validator.ValidatePassword(passwordField).length !== 0) {
            return;
        }

        let success = false;

        try {
            await createUserWithEmailAndPassword(auth, emailField, passwordField);
            success = true;
        }
        catch (error: unknown) {
            if (error instanceof FirebaseError) {
                setLoginError(error.code);
                console.log(error.code);
            }
        }

        if (!success) {
            return;
        }

        try {
            if (auth.currentUser) {
                await updateProfile(auth.currentUser, { displayName: usernameField })
            } else {
                throw new Error("nouser");
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            {/*<Background img="background_5.jpg" cover="cover" />*/}
            <div className="h-screen w-screen absolute flex items-center">
                <form onSubmit={(e) => handleSignUp(e)} className="bg-indigo-900 w-1/3 m-auto pt-5 pb-10 px-10 rounded-lg bg-opacity-70">
                    <Link to="/" className="-ml-5 text-xl text-white hover:text-indigo-200">&larr; Back</Link>
                    <h1 className="text-3xl text-white mt-5">Sign Up</h1>
                    <hr className="mb-5 mt-3" />
                    <AuthField var={usernameField} validateFunction={Validator.ValidateUsername} setter={setUsernameField} name="Username:" type="text" placeholder="username" />
                    <AuthField var={emailField} validateFunction={Validator.ValidateEmail} setter={setEmailField} name="E-mail:" type="text" placeholder="example@mail.com" />
                    <AuthField var={passwordField} validateFunction={Validator.ValidatePassword} setter={setPasswordField} name="Password:" type="password" placeholder="Must contain a letter, capital letter and digit" />
                    <button type="submit" className="py-2 px-6 mt-5 rounded-lg text-purple-200 bg-secondaryColor border border-indigo-300 hover:border-white hover:bg-indigo-200 hover:text-secondaryColor">Sign Up</button>
                    {loginError !== "" ?
                        <div className="bg-indigo-900 my-3 p-3 pl-1 mt-10 rounded-sm text-left border-2 border-red-600">
                            <p className="text-white text-2xl">{errorMap[loginError]}</p>
                        </div> :
                        ""
                    }
                </form>
            </div>
        </>
    );
}


export default LoginPage;