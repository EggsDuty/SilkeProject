import firebase from '../firebase.tsx';
import { getAuth, signOut } from "firebase/auth";
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate, useParams } from "react-router-dom"
import { GetUserInfoForHeaderPromise } from './DatabaseFunctions.ts';
import { Tooltip } from 'react-tooltip'


interface Props {
    transparent?: boolean
}

const auth = getAuth(firebase.app);

function Header(props: Props) {
    const navigate = useNavigate();
    const pathMatch = window.location.href.match(/(?<=\/)[\w-]+$/);
    let pageName = "";
    if(pathMatch !== null){
        pageName = pathMatch[0];
    }

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

        GetUserInfoForHeaderPromise(user.uid).then((_data: { displayName: string, email: string, image: string }) => {
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

    const guest = localStorage.getItem("username") === null;

    async function handleLogout() {
        localStorage.setItem("requireUpdate", "true");
        localStorage.removeItem("username");
        localStorage.removeItem("email");
        localStorage.removeItem("uid");
        localStorage.removeItem("image");
        await signOut(auth);
        navigate("/");
    }

    if (loading) {
        return <></>;
    }

    return (
        <>
            <div className={`flex flex-row min-h-10 ${props.transparent || props.transparent == null ? "bg-black bg-opacity-70 backdrop-blur-sm" : "bg-[#100524]"} sticky top-0 z-50`}>
                <img className="mx-6 h-9 w-auto cursor-pointer" src="/fish1.png" onClick={() => navigate("/")} />
                <Link to='/home' className={`text-white ml-32 leading-9 px-10 border-x-2 transition-all duration-1000 hover:bg-gradient-to-t hover:from-gray-400 hover:to-50% hover:to-transparent ${pageName === "home" ? "bg-gradient-to-t from-gray-400 to-50% to-transparent" : "" }`}>Home</Link>
                <Link to='/calculators' className={`text-white leading-9 px-10 border-r-2 transition-all duration-1000 hover:bg-gradient-to-t hover:from-gray-400 hover:to-50% hover:to-transparent ${pageName === "calculators" ? "bg-gradient-to-t from-gray-400 to-50% to-transparent" : "" }`}>Calculators</Link>
                <Link to='/whiteboard' className={`text-white leading-9 px-10 border-r-2 transition-all duration-1000 hover:bg-gradient-to-t hover:from-gray-400 hover:to-50% hover:to-transparent ${pageName === "whiteboard" ? "bg-gradient-to-t from-gray-400 to-50% to-transparent" : "" }`}>Whiteboard</Link>
                {!guest ?
                    <Link to='/groups' className={`text-white leading-9 px-10 border-r-2 transition-all duration-1000 hover:bg-gradient-to-t hover:from-gray-400 hover:to-50% hover:to-transparent ${pageName === "groups" ? "bg-gradient-to-t from-gray-400 to-50% to-transparent" : "" }`}>Groups</Link> :
                    <>
                        <p className="button-group-disabled text-neutral-400 leading-9 px-10 border-r-2 cursor-help">Groups</p>
                        <Tooltip anchorSelect={".button-group-disabled"} place="bottom" delayShow={300}>
                            Create an account to create a group!
                        </Tooltip>
                    </>
                }
                {!guest ?
                    <div className="flex flex-row ml-auto mr-4 group w-16 hover:w-52">
                        <img src={image} className="rounded-full h-8 w-8 mt-[2px] ml-auto mr-4" />
                        <div className="mt-10 bg-[#100524] rounded-sm w-[12%] right-3 fixed flex flex-col invisible hover:visible group-hover:visible p-2 text-white text-left bg-opacity-90">
                            <p className="text-lg text-white">{username}</p>
                            <p className="text-sm mb-3 text-neutral-300">{email}</p>
                            <Link to={`/profile/${uid}`} className="mb-5 text-lg text-center text-indigo-200 hover:text-indigo-100">View Profile</Link>
                            <button onClick={handleLogout} className="text-red-300 hover:text-red-200">Sign Out</button>
                        </div>
                    </div> :
                    <div className="flex flex-row items-center ml-auto mr-4 space-x-5">
                        <Link className="text-white hover:underline" to="/login">Login</Link>
                        <Link className="text-white border-secondaryColor border-2 px-2 py-1 rounded-lg hover:underline" to="/signup">Sign up</Link>
                    </div>}
            </div>
        </>
    )
}

export default Header