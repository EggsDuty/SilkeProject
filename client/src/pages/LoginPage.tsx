import firebase from '../firebase.tsx';
import { FirebaseError } from '@firebase/util';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import { FormEvent, ReactElement, useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';

import Validator from '../components/Auth/Validator.ts';
import AuthField from '../components/Auth/AuthField.tsx';
import Background from '../components/Background.tsx';

const auth = getAuth(firebase);

interface Props {
    signedIn: boolean
}

const errorMap: { [id: string]: ReactElement } = {
    "auth/invalid-credential": <>Wrong e-mail or password.</>,
}

function LoginPage(props: Props) {
    const [emailField, setEmailField] = useState("");
    const [passwordField, setPasswordField] = useState("");

    const [loginError, setLoginError] = useState("");

    async function handleLogin(e: FormEvent) {
        e.preventDefault();

        if (emailField.length === 0 || passwordField.length === 0) {
            return;
        }

        if (Validator.ValidateEmail(emailField).length !== 0 || Validator.ValidatePassword(passwordField).length !== 0) {
            return;
        }

        try {
            await signInWithEmailAndPassword(auth, emailField, passwordField);
        }
        catch (error: unknown) {
            if (error instanceof FirebaseError) {
                setLoginError(error.code);
                console.log(error.code);
            }
        }
    }

    if (props.signedIn) {
        return <Navigate to="/home" replace={true} />
    }

    return (
        <>
            {/*<Background img="background_5.jpg" cover="cover" />*/}
            <div className="h-screen w-screen absolute flex items-center">
                <form onSubmit={(e) => handleLogin(e)} className="bg-indigo-900 w-1/3 m-auto pt-5 pb-10 px-10 rounded-lg bg-opacity-70">
                    <Link to="/" className="-ml-5 text-xl text-white hover:text-indigo-200">&larr; Back</Link>
                    <h1 className="text-3xl text-white mt-5">Login</h1>
                    <hr className="mb-5 mt-3" />
                    <AuthField var={emailField} validateFunction={Validator.ValidateEmail} setter={setEmailField} name="E-mail:" type="text" placeholder="example@mail.com" />
                    <AuthField var={passwordField} validateFunction={Validator.ValidatePassword} setter={setPasswordField} name="Password:" type="password" placeholder="Must contain a letter, capital letter and digit" />
                    <button type="submit" className="py-2 px-6 mt-5 rounded-lg text-purple-200 bg-secondaryColor border border-indigo-300 hover:border-white hover:bg-indigo-200 hover:text-secondaryColor">Login</button>
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