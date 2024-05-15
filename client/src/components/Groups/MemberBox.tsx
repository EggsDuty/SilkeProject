import { Link } from "react-router-dom"
import { CreateGroupInvitePromise } from "../DatabaseFunctions"
import { useState } from "react"
import { GroupInfo } from "../DatabaseTypes"

interface Props {
    memberID: string,
    image: string,
    memberName: string,
    isLeader: boolean,
    addFunction?: boolean,
    groupID?: string,
    groupInfo?: GroupInfo
}

function MemberBox(props: Readonly<Props>){

    const [isButtonPressed, setIsButtonPressed] = useState(false)

    function handleClick(){
        CreateGroupInvitePromise(props.memberID, props.groupID!, props.groupInfo?.name!, props.groupInfo?.leaderID!)
        setIsButtonPressed(true);
    }

    return (
        <div className="flex flex-row w-full bg-blue-400 bg-opacity-20 pb-3 px-3 h-14 items-center text-white border-b-[1px]">
            <img src={props.image} className="rounded-full h-8 min-w-8 mt-[11px] mr-4" alt="profile"/>
            <div className="min-w-[70%] mt-2 pl-3 text-left">
                <Link to={`/profile/${props.memberID}`} className="truncate hover:underline">{props.memberName}</Link>
            </div>
            {props.isLeader ?
                <p className="truncate text-right text-gray-400 w-[20%] mt-2 pr-3">Leader</p>
                :
                ""
            }
            {
            props.addFunction !== undefined && props.groupInfo !== undefined && props.addFunction === true ?
            <div className="absolute z-10 mt-[8px] ml-[76%] pointer-events-auto" onClick={() => handleClick()}>
                {
                isButtonPressed ?
                <img alt="Check sign" className="h-9 invert" src="/check_sign_picture.svg" />
                :
                <img alt="Plus sign" className="h-9 invert hover:contrast-[60%] cursor-pointer" src="/plus_sign_picture.svg" />
                }

            </div>
            :
            ""
            }

        </div>
    )
}

export default MemberBox