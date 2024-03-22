import firebase from '../../firebase.tsx';
import { FirebaseError } from '@firebase/util';
import { getAuth, confirmPasswordReset } from 'firebase/auth';

import { FormEvent, ReactElement, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';

import Validator from '../../components/Auth/Validator.ts';
import AuthField from '../../components/Auth/AuthField.tsx';

const auth = getAuth(firebase.app);

const resetErrorMap: { [id: string]: ReactElement } = {
    "auth/invalid-credential": <>Wrong e-mail or password.</>,
}

function ResetPassword() {
    const [passwordField, setPasswordField] = useState("");
    const [repeatPasswordField, setRepeatPasswordField] = useState("");

    const [resetComplete, setResetComplete] = useState(false);
    const [resetError, setResetError] = useState("");

    const params = new URLSearchParams(window.location.search);
    const code = params.get('oobCode');

    if (code === null || code === "") {
        return <Navigate to="/home" replace={true} />
    }

    async function handleLogin(e: FormEvent) {
        e.preventDefault();

        if (code === null || code === "") {
            return;
        }

        if (passwordField.length === 0) {
            return;
        }

        if (Validator.ValidatePassword(passwordField).length !== 0) {
            return;
        }

        let failed = false;

        try {
            await confirmPasswordReset(auth, code, passwordField).then(() => {
                setResetComplete(true);
            });
        }
        catch (error: unknown) {
            if (error instanceof FirebaseError) {
                failed = true;
                setResetError(error.code);
            }
        } finally {
            if (failed) {
                return <Navigate to="/home" replace={true} />
            }
        }
    }

    return (
        <>
            <div className="h-screen w-screen absolute flex items-center">
                {!resetComplete ?
                    <form onSubmit={(e) => handleLogin(e)} className="bg-indigo-900 w-1/3 m-auto pt-5 pb-10 px-10 rounded-lg bg-opacity-70">
                        <h1 className="text-3xl text-white mt-5">Reset Password</h1>
                        <hr className="mb-5 mt-3" />
                        <AuthField var={passwordField} validateFunction={Validator.ValidatePassword} setter={setPasswordField} name="New Password:" type="password" placeholder="Must contain a letter, capital letter and digit" />
                        <AuthField var={repeatPasswordField} validateFunction={() => Validator.ValidateRepeatPassword(passwordField, repeatPasswordField)} setter={setRepeatPasswordField} name="Repeat New Password:" type="password" placeholder="Must match previous box" />
                        <button type="submit" className="py-2 px-6 mt-5 rounded-lg text-purple-200 bg-secondaryColor border border-indigo-300 hover:border-white hover:bg-indigo-200 hover:text-secondaryColor">Reset</button>
                        {resetError !== "" ?
                            <div className="bg-indigo-900 my-3 p-3 pl-1 mt-10 rounded-sm text-left border-2 border-red-600">
                                <p className="text-white text-2xl">{resetErrorMap[resetError]}</p>
                            </div> :
                            ""
                        }
                    </form> :
                    <div className="bg-indigo-900 w-1/3 m-auto pt-5 pb-10 px-10 rounded-lg bg-opacity-70">
                        <h1 className="text-3xl text-white my-5">Password reset successfully.</h1>
                        <Link to="/" className="text-xl text-white hover:text-indigo-200 underline">Click here to go back.</Link>
                    </div>
                }
            </div>
        </>
    );
}


export default ResetPassword;