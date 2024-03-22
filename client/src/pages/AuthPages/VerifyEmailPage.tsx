import { useEffect, useState } from "react";
import firebase from '../../firebase.tsx';
import { applyActionCode, getAuth } from "firebase/auth";
import { Navigate } from "react-router-dom";

const auth = getAuth(firebase.app);

function VerifyEmail() {
    const [triedToVerify, setTryToVerify] = useState(false);
    const params = new URLSearchParams(window.location.search);
    const code = params.get('oobCode')!;
    // ! means that I am sure a variable is not null
    // I am sure of this because I will be checking below
    // Without the !, typescript could not know that I am checking this and would throw an error.

    if (code === null || code === "") {
        return <Navigate to="/home" replace={true} />
    }

    async function tryVerifyEmail() {
        try {
            await applyActionCode(auth, code);
        } catch {
            setTryToVerify(true);
        }
    }

    useEffect(() => {
        tryVerifyEmail().then(() => {
            setTryToVerify(true);
        });
    }, [])

    if (triedToVerify) {
        return <Navigate to="/home" replace={true} />
    }

    return (
        <></>
    );
}

export default VerifyEmail;