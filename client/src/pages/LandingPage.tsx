import { Link } from "react-router-dom";

function LandingPage() {
    return (
        <div className="h-screen w-screen absolute">
            <div className="ml-40 border-l-4 pl-5">
                <h1 className="mt-28 text-8xl bg-gradient-to-r from-blue-400 via-gray-50 to-blue-400 w-max text-transparent bg-clip-text font-bold drop-shadow-[0_6.2px_6.2px_rgba(0,0,0,0.8)]">SilkeBoard</h1>
                <p className="mt-10 m-auto text-white font-medium text-2xl">The best collaboration platform when numbers are king</p>
            </div>
            <div className="flex flex-row space-x-10 mt-32 ml-52 text-white">
                <Link to='/signup' className="py-2 px-8 rounded-lg bg-primaryColor border-2 border-opacity-0 hover:border-opacity-100 border-white">Sign up</Link>
                <Link to='/login' className="py-2 px-6 rounded-lg bg-secondaryColor border-2 border-opacity-0 hover:border-opacity-100 border-white">Log in</Link>
                <Link to='/home' className="py-2 px-6 underline hover:opacity-60">Use as guest</Link>
            </div>
        </div>
    )
}

export default LandingPage