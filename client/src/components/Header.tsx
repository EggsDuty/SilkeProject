import { Link } from "react-router-dom"

function Header(){
    
    return(

        <div className="bg-darkBlue flex flex-row min-h-10 bg-opacity-70">
            {//<h1 className="text-white mx-6 text-3xl">Silkė</h1>
            }
            <img className="mx-6 h-10 w-auto" src="/test_fish.png" />
            <Link to='/home'className="text-white ml-32 leading-9 px-10 border-x-2 transition-all duration-1000 hover:bg-gradient-to-t hover:from-gray-400 hover:to-50% hover:to-transparent">Home</Link>
            <button className="text-white px-10 border-r-2 transition-all duration-1000 hover:bg-gradient-to-t hover:from-gray-400 hover:to-50% hover:to-transparent">Calculators</button>
            <button className="text-white px-10 border-r-2 transition-all duration-1000 hover:bg-gradient-to-t hover:from-gray-400 hover:to-50% hover:to-transparent">Whiteboard</button>
            <button className="text-white px-10 border-r-2 transition-all duration-1000 hover:bg-gradient-to-t hover:from-gray-400 hover:to-50% hover:to-transparent">Groups</button>
            <button className="text-white ml-auto mr-8">Profile</button>
        </div>
    )
}

export default Header