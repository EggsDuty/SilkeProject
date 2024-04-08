import { Link, useNavigate, useParams } from "react-router-dom"
import { CreateFriendInvitePromise, CreateGroupInvitePromise } from "../DatabaseFunctions"
import { useState } from "react"
import { GroupInfo } from "../DatabaseTypes"

interface Props{
    memberID: string,
    image: string,
    memberName: string,
    isLeader: boolean,
    addFunction?: boolean,
    groupID?: string,
    groupInfo?: GroupInfo
}

function MemberBox(props: Props){

    const [isButtonPressed, setIsButtonPressed] = useState(false)

    function HandleClick(){
        CreateGroupInvitePromise(props.memberID, props.groupID!, props.groupInfo?.name!, props.groupInfo?.leaderName!)
        setIsButtonPressed(true);
    }

    return(
        <div className="flex flex-row w-full bg-blue-400 bg-opacity-20 pb-3 px-3 h-14 items-center text-white border-b-[1px]">
            <img src={props.image} className="rounded-full h-8 w-8 mt-[11px] mr-4" />
            <Link to={`/profile/${props.memberID}`} className="truncate text-left min-w-[70%] mt-2 pl-3 hover:underline"> {props.memberName}</Link>
            {
            props.isLeader ? 
            <p className="truncate text-right text-gray-400 min-w-[20%] max-w-[20%] mt-2 pr-3">Leader</p>
            :
            ""
            }
            {
            props.addFunction !== undefined && props.groupInfo !== undefined && props.addFunction === true ?
            <div className="absolute z-10 mt-[8px] ml-[76%] pointer-events-auto" onClick={() => HandleClick()}>
                {
                isButtonPressed ?
                <img className="h-9 invert" src="/check_sign_picture.svg" />
                :
                <img className="h-9 invert hover:contrast-[60%] cursor-pointer" src="/plus_sign_picture.svg" />
                }

            </div>
            :
            ""
            }

        </div>
    )
}

export default MemberBox