import { useEffect, useState } from "react";
import firebase from '../../firebase.tsx';
import { applyActionCode, getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const auth = getAuth(firebase.app);

function VerifyEmail() {
    const navigate = useNavigate();
    const [triedToVerify, setTriedToVerify] = useState(false);
    const params = new URLSearchParams(window.location.search);
    const code = params.get('oobCode')!;

    async function tryVerifyEmail() {
        try {
            await applyActionCode(auth, code);
        } catch {
            setTriedToVerify(true);
        }
    }

    useEffect(() => {
        if (code === null || code === "") {
            navigate("/home");
            return;
        }
        tryVerifyEmail().then(() => {
            setTriedToVerify(true);
        });
    }, [])

    if (triedToVerify) {
        navigate("/home");
    }

    return (
        <></>
    );
}

export default VerifyEmail;