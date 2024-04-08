import { Link } from "react-router-dom"

interface Props {
    memberID: string,
    image: string,
    memberName: string,
    isLeader: boolean
}

function MemberBox(props: Props) {

    return (
        <div className="flex flex-row w-full bg-blue-400 bg-opacity-20 pb-3 px-3 h-14 items-center text-white border-b-[1px]">
            <img src={props.image} className="rounded-full h-8 w-8 mt-[11px] mr-4" />
            <div className="min-w-[70%] mt-2 pl-3 text-left">
                <Link to={`/profile/${props.memberID}`} className="truncate hover:underline">{props.memberName}</Link>
            </div>
            {props.isLeader ?
                <p className="truncate text-right text-gray-400 min-w-[20%] max-w-[20%] mt-2 pr-3">Leader</p>
                :
                ""
            }
        </div>
    )
}

export default MemberBox