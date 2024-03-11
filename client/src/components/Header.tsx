function Header(){
    
    return(

        <div className="bg-darkBlue flex flex-row min-h-10 bg-opacity-70">
            <h1 className="text-white mx-6 text-3xl">Silkė</h1>
            <button className="text-white ml-32 px-10 border-x-2 transition-all duration-1000 hover:bg-gradient-to-t hover:from-gray-400 hover:to-50% hover:to-transparent">Home</button>
            <button className="text-white px-10 border-r-2">Calculators</button>
            <button className="text-white px-10 border-r-2">Whiteboard</button>
            <button className="text-white px-10 border-r-2">Groups</button>
            <button className="text-white ml-auto mr-8">Profile</button>
        </div>
    )
}

export default Header