interface Props{
    img: string,
    header: string,
    text: string
}

function Box(props: Props){
    return(
        <div className="bg-red-200 w-1/4 m-auto rounded-lg">
            <img className="ml-4 mt-4 h-10 w-10" src={props.img} />
            <h2>{props.header}</h2>
            <p>{props.text}</p>
        </div>
    )
}

export default Box