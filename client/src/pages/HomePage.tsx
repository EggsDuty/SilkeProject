import Header from "../components/Header"
import Box from "../components/HomePage/Box";
import firebase from '../firebase.tsx';

import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { useState } from "react";

const auth = getAuth(firebase);

function HomePage() {
    const [signedIn, setSignedIn] = useState(false);

    const isFirstTime = true;

    async function handleSignOut() {
        await signOut(auth);
    }


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

    return (
        <div className="bg-test h-screen w-screen absolute bg-cover text-center">
            <Header />
            {signedIn ? <button onClick={handleSignOut} className="text-white">Sign out</button> : ""}
            <h1 className="mt-28 text-7xl bg-gradient-to-r from-blue-400 via-gray-50 to-blue-400 w-max m-auto text-transparent bg-clip-text font-bold">Welcome{isFirstTime ? "" : " back"}!</h1>
            <p className="mt-10 m-auto text-white font-medium">What would you like to choose?</p>
            <div className="flex flex-wrap mt-20 mx-auto space-x-20 justify-center">
                <Box img="test_calculator_picture.png" header="Calculators" text="Choose from our wide variety of calculators???" />
                <Box img="test_whiteboard_picture.png" header="Whiteboard" text="Write down all your calculations while still having any calculator on the board??" />
                <Box img="test_groups_picture.png" header="Groups" text="Make a group with your colleagues and work on the same board!" />
            </div>
        </div>
    )
}

export default HomePage