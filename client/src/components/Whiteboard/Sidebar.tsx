
function Sidebar(){
    return(
        <div className="flex flex-col h-[calc(100vh-2.5rem)] w-32 bg-[#100524] sticky left-0 z-50 text-white text-center pt-32 space-y-4 overflow-hidden">

            <p className=" text-gray-400 font-bold border-b-2 mx-3 pb-2 border-gray-400">Drag your calculators</p>
            <div className="border-2 mx-3 rounded-lg hover:cursor-move py-1 bg-secondaryColor bg-opacity-40 ">Standard Calculator</div>
            <div className="border-2 mx-3 rounded-lg hover:cursor-move py-1 bg-secondaryColor bg-opacity-40">Scientific Calculator</div>
            <div className="border-2 mx-3 rounded-lg hover:cursor-move py-1 bg-secondaryColor bg-opacity-40">Graphing Calculator</div>

        </div>
    )

}

export default Sidebar