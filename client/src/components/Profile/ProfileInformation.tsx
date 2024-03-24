import { Link } from "react-router-dom";
import { UserInfo } from "../DatabaseTypes.ts";
import { Dispatch, SetStateAction } from "react";

interface Props {
    info: UserInfo
    own: boolean,
    setEditMode: Dispatch<SetStateAction<boolean>>
}

function ProfileInformation(props: Props) {
    return (
        <div className="text-center">
            <div className="flex flex-row relative">
                <img src={props.info.image} className="rounded-full h-64 w-64 m-auto" />
                {props.own ?
                    <div onClick={() => props.setEditMode(true)} className="flex flex-row items-center absolute right-0 bg-blue-950 bg-opacity-70 p-3 rounded-md h-10 cursor-pointer">
                        <img src="/edit.svg" className="invert h-6" />
                        <p className="text-xl text-white ml-3">Edit</p>
                    </div> :
                    ""}
            </div>
            <h1 className="text-white text-4xl font-bold mt-3">{props.info.displayName}</h1>
            <h2 className="text-neutral-300 mt-2">{props.info.email}</h2>
            <div className="bg-blue-950 bg-opacity-70 p-5 rounded-md my-10 m-auto">
                <p className="text-white">{props.info.description.length === 0 ? "No description." : props.info.description}</p>
            </div>
            <Link to="/forgot-password" className="text-purple-200 underline">Click here to change your password</Link>
        </div>
    );
}

export default ProfileInformation;