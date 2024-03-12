interface Props{
    img: string,
    header: string,
    text: string
}

function Box(props: Props){
    return(
        <div className="bg-indigo-900 w-1/5 rounded-lg bg-opacity-80 border-2 border-white border-opacity-0 hover:border-opacity-100 pb-3 px-3">
            <div className="flex flex-row py-2 border-b-2 border-white">
                <img className="ml-3 my-auto h-10 w-10" src={props.img} />
                <h2 className="text-white my-auto mx-3">{props.header}</h2>
            </div>
            <p className="text-white mt-2 text-left">{props.text}</p>
        </div>
    )
}

export default Box