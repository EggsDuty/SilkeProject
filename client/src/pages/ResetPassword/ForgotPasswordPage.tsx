import firebase from '../../firebase.tsx';
import { FirebaseError } from '@firebase/util';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

import { FormEvent, ReactElement, useState } from 'react';
import { Link } from 'react-router-dom';

import Validator from '../../components/Auth/Validator.ts';
import AuthField from '../../components/Auth/AuthField.tsx';

const auth = getAuth(firebase);

function ForgotPassword() {
    const [emailField, setEmailField] = useState("");

    const [emailSent, setEmailSent] = useState(false);

    async function handleLogin(e: FormEvent) {
        e.preventDefault();

        if (emailField.length === 0) {
            return;
        }

        if (Validator.ValidateEmail(emailField).length !== 0) {
            return;
        }

        await sendPasswordResetEmail(auth, emailField).then(() => {
            setEmailSent(true);
        });
    }

    return (
        <>
            {/*<Background img="background_5.jpg" cover="cover" />*/}
            <div className="h-screen w-screen absolute flex items-center">
                <form onSubmit={(e) => handleLogin(e)} className="bg-indigo-900 w-1/3 m-auto pt-5 pb-10 px-10 rounded-lg bg-opacity-70">
                    <Link to="/login" className="-ml-5 text-xl text-white hover:text-indigo-200">&larr; Back</Link>
                    <h1 className="text-3xl text-white mt-5">Reset Password</h1>
                    <hr className="mb-5 mt-3" />
                    <AuthField var={emailField} validateFunction={Validator.ValidateEmail} setter={setEmailField} name="E-mail:" type="text" placeholder="example@mail.com" />
                    <button type="submit" className="py-2 px-6 mt-5 rounded-lg text-purple-200 bg-secondaryColor border border-indigo-300 hover:border-white hover:bg-indigo-200 hover:text-secondaryColor">Send</button>
                    {emailSent ?
                        <div className="bg-indigo-900 my-3 p-3 pl-1 mt-10 rounded-sm text-left border-2 border-green-300">
                            <p className="text-white text-2xl">You should receive an e-mail soon.</p>
                            <p className="text-neutral-300 text-sm">If you do not receive one, check the e-mail is spelled correctly.</p>
                        </div> :
                        ""
                    }
                </form>
            </div>
        </>
    );
}


export default ForgotPassword;