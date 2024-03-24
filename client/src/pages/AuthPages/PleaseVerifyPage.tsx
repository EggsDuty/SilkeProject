import { useState } from "react";
import firebase from '../../firebase.tsx';
import { getAuth, sendEmailVerification } from "firebase/auth";
import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

const auth = getAuth(firebase.app);

function PleaseVerify() {
    const [user] = useAuthState(auth);
    const [clicked, setClicked] = useState(false);

    async function sendAgainClicked() {

        if (!auth.currentUser) {
            return;
        }

        setClicked(true);
        await sendEmailVerification(auth.currentUser)
    }

    if (user) {
        if (user.emailVerified) {
            return <Navigate to="/home" replace={true} />
        }
    }

    return (
        <>
            <div className="h-screen w-screen absolute flex items-center">
                <div className="bg-indigo-900 my-3 p-3 pl-1 mt-10 rounded-md text-center mx-auto">
                    <p className="text-white text-4xl mb-3">Please verify your e-mail.</p>
                    <p className="text-neutral-300 text-xl mb-5">You should have received an e-mail from us with further instructions.</p>
                    <p className="text-sky-200 text-xl mb-5">If you've verified, try refreshing this page. It can take some time to update.</p>
                    {!clicked ?
                        <>
                            <p className="text-neutral-300">Didn't get one?</p>
                            <button onClick={sendAgainClicked} className="text-purple-200 underline">Click here to get a new one</button>
                        </> :
                        <p className="text-neutral-300">Sent! Try checking again.</p>
                    }
                </div>
            </div>
        </>
    );
}


export default PleaseVerify;