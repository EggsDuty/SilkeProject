import Header from "../components/Header"
import Box from "../components/HomePage/Box";
import firebase from '../firebase.tsx';
import Background from "../components/Background";
//
import { Link, Navigate } from "react-router-dom"

import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { useEffect, useState } from "react";

const auth = getAuth(firebase);

function HomePage() {
    const [signedIn, setSignedIn] = useState(false);

    const isFirstTime = true;

    async function handleSignOut() {
        await signOut(auth);
    }

    useEffect(() => {
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
    }, []);

    if (auth.currentUser == null) {
        return <Navigate to="/" replace={true} />
    }

    return (
        <>
            <Background img="background_5.jpg" cover="cover" />
            <div className="w-screen absolute text-center bg-repeat-y">
                <Header />
                {signedIn ? <button onClick={handleSignOut} className="text-white">Sign out for {auth.currentUser?.displayName}</button> : ""}
                <h1 className="mt-28 text-7xl bg-gradient-to-r from-blue-400 via-gray-50 to-blue-400 w-max m-auto text-transparent bg-clip-text font-bold">Welcome{isFirstTime ? "" : " back"}!</h1>
                <p className="mt-10 m-auto text-white font-medium">What would you like to choose?</p>
                <div className="flex flex-wrap mt-20 mx-auto space-x-20 justify-center">
                    <Box link="/calculators" img="test_calculator_picture.png" header="Calculators" text="Choose from our wide variety of calculators???" />
                    <Box link="/whiteboard" img="test_whiteboard_picture.png" header="Whiteboard" text="Write down all your calculations while still having any calculator on the board??" />
                    <Box link="/groups" img="test_groups_picture.png" header="Groups" text="Make a group with your colleagues and work on the same board!" />
                </div>

            </div>
        </>
    )
}

export default HomePage