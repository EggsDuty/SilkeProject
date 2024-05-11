import { useNavigate } from "react-router-dom"

interface Props{
    img: string,
    header: string,
    text: string,
    link: string
}

function Box(props: Props){
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(props.link);
    }
    return(
        <div onClick={handleClick} className="cursor-pointer my-8 select-none bg-blue-400 w-[300px] rounded-lg bg-opacity-20 border-2 border-white border-opacity-0 hover:border-opacity-100 pb-3 px-3 transition-transform hover:scale-105 duration-300 hover:drop-shadow-[0_8.2px_8.2px_rgb(55,65,81)]">
            <div className="flex flex-row py-2 border-b-2 border-white">
                <img className="ml-3 my-auto h-10 w-10 invert" src={props.img} />
                <h2 className="text-white my-auto mx-3 font-bold drop-shadow-[0_2.2px_2.2px_rgba(0,0,0,0.8)]">{props.header}</h2>
            </div>
            <p className="text-white mt-2 text-left mx-3">{props.text}</p>
        </div>
    )
}

export default Box