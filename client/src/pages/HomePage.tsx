import Header from "../components/Header"
import Box from "../components/HomePage/Box";
import firebase from '../firebase.tsx';

import { Navigate } from "react-router-dom"

import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

const auth = getAuth(firebase);

function HomePage() {
    const isFirstTime = true;

    const [user, loading] = useAuthState(auth);

    if (loading) {
        return <></>
    }

    if (!user) {
        return <Navigate to="/" replace={true} />
    }

    return (
        <>
            <div className="w-screen absolute text-center bg-repeat-y">
                <Header />
                <h1 className="mt-28 text-7xl bg-gradient-to-r from-blue-400 via-gray-50 to-blue-400 w-max m-auto text-transparent bg-clip-text font-bold drop-shadow-[0_6.2px_6.2px_rgba(0,0,0,0.8)]">Welcome{isFirstTime ? "" : " back"}!</h1>
                <p className="mt-10 m-auto text-white font-medium">What would you like to choose?</p>
                <div className="flex flex-wrap mt-20 mx-auto space-x-20 justify-center">
                    <Box link="/calculators" img="test_calculator_picture.png" header="Calculators" text="Choose from our wide variety of calculators" />
                    <Box link="/whiteboard" img="test_whiteboard_picture.png" header="Whiteboard" text="Write down anything you need while still having any calculator on the board" />
                    <Box link="/groups" img="test_groups_picture.png" header="Groups" text="Make a group with your colleagues and work on the same board" />
                </div>
            </div>
        </>
    )
}

export default HomePage