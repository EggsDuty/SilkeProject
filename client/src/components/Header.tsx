import firebase from '../firebase.tsx';
import { getAuth, signOut } from "firebase/auth";
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from "react-router-dom"
import { GetUserInfoForHeader } from './DatabaseFunctions.ts';


interface Props {
    transparent?: boolean
}

const auth = getAuth(firebase.app);

function Header(props: Props) {
    const [user, loading] = useAuthState(auth);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [uid, setUid] = useState("");
    const [image, setImage] = useState("placeholder.jpg");

    useEffect(() => {
        if (!user) {
            return;
        }

        if (localStorage.getItem("uid") !== user.uid) {
            localStorage.setItem("requireUpdate", "true");
        }

        if (localStorage.getItem("requireUpdate") === "false") {

            const _username = localStorage.getItem("username");
            const _email = localStorage.getItem("email");
            const _uid = localStorage.getItem("uid");
            const _image = localStorage.getItem("image");

            if (!(_username === null || _email === null || _uid === null || _image === null)) {
                setUsername(_username);
                setEmail(_email);
                setUid(_uid);
                setImage(_image);
                return;
            }
        }

        GetUserInfoForHeader(user.uid).then((_data: { displayName: string, email: string, image: string }) => {
            localStorage.setItem("requireUpdate", "false");
            localStorage.setItem("username", _data.displayName);
            localStorage.setItem("email", _data.email);
            localStorage.setItem("uid", user.uid);
            localStorage.setItem("image", _data.image);

            setUsername(_data.displayName);
            setEmail(_data.email);
            setUid(user.uid);
            setImage(_data.image);
        });
    }, [loading]);

    async function handleLogout() {
        await signOut(auth);
    }

    return (
        <>
            <div className={`flex flex-row min-h-10 ${props.transparent || props.transparent == null ? "bg-black bg-opacity-70 backdrop-blur-sm" : "bg-[#100524]"} sticky top-0 z-50`}>
                <img className="mx-6 h-9 w-auto" src="/fish1.png" />
                <Link to='/home' className="text-white ml-32 leading-9 px-10 border-x-2 transition-all duration-1000 hover:bg-gradient-to-t hover:from-gray-400 hover:to-50% hover:to-transparent">Home</Link>
                <Link to='/calculators' className="text-white leading-9 px-10 border-r-2 transition-all duration-1000 hover:bg-gradient-to-t hover:from-gray-400 hover:to-50% hover:to-transparent">Calculators</Link>
                <Link to='/whiteboard' className="text-white leading-9 px-10 border-r-2 transition-all duration-1000 hover:bg-gradient-to-t hover:from-gray-400 hover:to-50% hover:to-transparent">Whiteboard</Link>
                <Link to='/groups' className="text-white leading-9 px-10 border-r-2 transition-all duration-1000 hover:bg-gradient-to-t hover:from-gray-400 hover:to-50% hover:to-transparent">Groups</Link>
                <div className="flex flex-row ml-auto mr-4 group w-[12%]">
                    <img src={image} className="rounded-full h-8 w-8 mt-[2px] ml-auto mr-4" />
                    <div className="mt-10 bg-[#100524] rounded-sm w-[12%] fixed flex flex-col invisible hover:visible group-hover:visible p-2 text-white text-left bg-opacity-90">
                        <p className="text-lg text-white">{username}</p>
                        <p className="text-sm mb-3 text-neutral-300">{email}</p>
                        <Link to={`/profile/${uid}`} className="mb-5 text-lg text-center text-indigo-200 hover:text-indigo-100">Edit Profile</Link>
                        <button onClick={handleLogout} className="text-red-300 hover:text-red-200">Sign Out</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header