import Popup from "reactjs-popup"
import Header from "../components/Header"
import { GroupInfo } from "../components/DatabaseTypes"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { DeleteGroupIDPromise, DeleteUserFromGroupPromise, DeleteUserGroupIDPromise, GetGroupInfoPromise, GetUserInfoForMemberList, UpdateGroupInfoPromise, UpdateLeaderIDInGroupListPromise } from "../components/DatabaseFunctions"
import MemberBox from "../components/Groups/MemberBox"
import GroupField from "../components/Groups/GroupField"
import Validator from "../components/Auth/Validator"
import { Tooltip } from "react-tooltip"

interface MemberInfo {
    userID: string,
    displayName: string,
    image: string
}

function GroupSettingsPage() {
    const { groupID } = useParams();
    const userID = localStorage.getItem("uid");

    const [groupInfo, setGroupInfo] = useState<GroupInfo>();
    const defaultValue: MemberInfo[] = [];
    const [userNameInfo, setUserNameInfo] = useState(defaultValue)
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingMembers, setIsLoadingMembers] = useState(true);
    const navigate = useNavigate();

    const [groupName, setGroupName] = useState("");
    const [description, setDescription] = useState("");

    const trimmedGroupName = groupName.trim();
    const trimmedDescription = description.trim();

    const [savedGroupInfoStatus, setSavedGroupInfoStatus] = useState(false);

    let hasErrors = false;
    if (Validator.ValidateGroupName(trimmedGroupName).length !== 0 || Validator.ValidateGroupDescription(trimmedDescription).length !== 0) {
        hasErrors = true;
    }

    useEffect(() => {
        GetGroupInfoPromise(groupID!).then((_groupInfo) => {
            if(_groupInfo.leaderID !== userID){
                navigate("/group/"+groupID);
            }
            setGroupInfo(_groupInfo);
            setIsLoading(false);
            setGroupName(_groupInfo.name);
            setDescription(_groupInfo.description);
        })
    }, [])

    useEffect(() => {
        if (isLoading) {
            return
        }
        GetAllMemberNames().then((_membersNames) => {
            setUserNameInfo(_membersNames);
            setIsLoadingMembers(false);
        });
    }, [isLoading])

    async function GetAllMemberNames() {
        const membersInfo: MemberInfo[] = [];

        for (let i = 0; i < groupInfo?.members.length!; i++) {
            if (groupInfo?.members.at(i) === groupInfo?.leaderID) {
                membersInfo.unshift(await GetUserInfoForMemberList(groupInfo?.members.at(i)!));
            }
            else {
                membersInfo.push(await GetUserInfoForMemberList(groupInfo?.members.at(i)!));
            }
        }
        return membersInfo;
    }

    if (isLoading) {
        return (
            <div className="w-screen absolute text-center bg-repeat-y">
                <Header />
                <div className="flex flex-row  mt-6 ml-6 align-middle">
                    <img src="/loading_picture.svg" className="animate-spin invert h-10" alt="loading"/>
                    <p className="text-gray-500 text-2xl font-bold ml-2">Loading...</p>
                </div>
            </div>
        )
    }

    function HandleGroupLeaveClick() {
        DeleteUserFromGroupPromise(userID!, groupID!).then(async () => {
            if (groupInfo?.members.length === 1) {
                DeleteGroupIDPromise(groupID!);
            }
            else if(userID === groupInfo?.leaderID){
                await UpdateLeaderIDInGroupListPromise(groupID!, userNameInfo.at(1)?.userID!)
            }
            navigate("/groups");
        })
    }

    async function HandleGroupDeleteClick() {
        for (let i = 0; i < groupInfo?.members.length!; i++) {
            await DeleteUserGroupIDPromise(groupInfo?.members.at(i)!, groupID!);
        }
        await DeleteGroupIDPromise(groupID!);
        navigate("/groups");
    }

    async function HandleMemberPromoteClick(newLeaderID: string) {
        await UpdateLeaderIDInGroupListPromise(groupID!, newLeaderID);
        navigate("/group/"+groupID);
    }

    async function HandleMemberDeleteClick(memberID: string, close: any, index: number){
        await DeleteUserFromGroupPromise(memberID, groupID!);
        const newUserNameInfo = [...userNameInfo];
        newUserNameInfo.splice(index, 1);
        setUserNameInfo(newUserNameInfo);
        close();
    }

    async function HandleGroupInfoChange(newGroupName: string, newDescription: string){
        if(hasErrors){
            return;
        }
        await UpdateGroupInfoPromise(groupID!, newGroupName, newDescription);
        setSavedGroupInfoStatus(true);
        await new Promise(res => setTimeout(res, 2000));
        setSavedGroupInfoStatus(false);
    }

    return (
        <div className="h-screen w-screen absolute overflow-x-hidden">
            <Header />
            <div className="bg-extraColor1 mt-24 mb-20 mx-auto rounded-lg bg-opacity-80 w-1/2 min-w-[600px] p-12 drop-shadow-[0_6.2px_6.2px_rgba(0,0,0,0.8)]">
                <div className="-ml-5 text-xl text-white hover:text-indigo-200 select-none cursor-pointer" onClick={() => window.history.back()}>&larr; Back</div>
                <h1 className="text-4xl mt-3 text-white font-bold pb-6 border-b-2 drop-shadow-[0_6.2px_6.2px_rgba(0,0,0,0.8)]" >Settings</h1>

                <p className="text-gray-300 text-lg mt-6 mr-36 pb-1 border-b-[1px] w-[40%] mb-2">Edit group name or description</p>
                <GroupField name="Group name:" defaultValue={groupInfo?.name} placeholder="New group name..." type="text" validateFunction={Validator.ValidateGroupName} var={trimmedGroupName} setter={setGroupName} />
                <GroupField isDescription={true} name="Description (optional):" defaultValue={groupInfo?.description} placeholder="New group description..." type="text" validateFunction={Validator.ValidateGroupDescription} var={trimmedDescription} setter={setDescription} />
                <button onClick={() => HandleGroupInfoChange(trimmedGroupName, trimmedDescription)} className={`groupInfoChange w-max text-white py-1 px-5 mt-2 rounded-lg bg-primaryColor border-2 border-opacity-0 hover:border-opacity-100 border-white peer-hover:border-opacity-100 ${hasErrors ? "cursor-not-allowed" : ""}`}>Save</button>
                <Tooltip place="top" isOpen={savedGroupInfoStatus} anchorSelect=".groupInfoChange">
                    Saved!
                </Tooltip>

                <p className="text-gray-300 text-lg mt-16 mr-36 pb-1 border-b-[1px] w-[40%] mb-2">Promote or remove members</p>
                <div className="bg-blue-400 w-[400px] rounded-lg bg-opacity-20 mt-6 overflow-y-auto min-h-[400px] h-[50vh] overflow-x-hidden">
                    {isLoadingMembers ?
                        <div className="flex flex-row  mt-6 ml-6 align-middle">
                            <img src="/loading_picture.svg" className="animate-spin invert h-10" alt="loading"/>
                            <p className="text-gray-500 text-2xl font-bold ml-2">Loading...</p>
                        </div>
                        :
                        userNameInfo.map((_memberInfo, index) => (
                            <div key={_memberInfo.userID} className="flex flex-row relative">
                                <MemberBox memberID={_memberInfo.userID} image={_memberInfo.image} memberName={_memberInfo.displayName} isLeader={_memberInfo.userID === groupInfo?.leaderID} /> 
                                {_memberInfo.userID === groupInfo?.leaderID ? "" : 
                                    <div className="flex flex-row absolute z-10 ml-[76%] pointer-events-auto">
                                        <Popup
                                            trigger={
                                                <img className="mt-[11px] mr-[8px] h-8 hover:contrast-[30%] cursor-pointer brightness-[80%]" src="/full_star_picture.svg" title="Promote to leader" alt="star"/>
                                            }
                                            modal
                                            nested
                                            closeOnDocumentClick={false}
                                        >
                                            {/* @ts-ignore */}
                                            {(close) => (
                                                <div className="animate-anvil text-white bg-extraColor1 rounded-lg w-[600px] m-auto h-[260px] bg-opacity-90 brightness-125 font-bold drop-shadow-[0_6.2px_6.2px_rgba(0,0,0,0.8)]">
                                                    <button onClick={close} className="text-3xl ml-2">X</button>
                                                    <h1 className="text-2xl text-left mt-8 mx-[40px] text-gray-400">Are you sure you want to promote this member to a leader?</h1>
                                                    <h1 className="text-xl text-left mx-[40px] text-red-900">You will lose all of your leader perks</h1>
                                                    <div className="flex flex-row mt-8 ml-96">
                                                        <button className="text-2xl bg-gray-800 px-4 py-1 rounded-lg border-2 border-opacity-0 hover:border-opacity-100 border-white peer-hover:border-opacity-100" onClick={() => HandleMemberPromoteClick(_memberInfo.userID)}>Yes</button>
                                                        <button className="ml-7 text-2xl bg-primaryColor px-4 py-1 rounded-lg border-2 border-opacity-0 hover:border-opacity-100 border-white peer-hover:border-opacity-100" onClick={close}>No</button>
                                                    </div>
                                                </div>
                                            )}

                                        </Popup>

                                        <Popup
                                            trigger={
                                                <img className="mt-[11px] ml-[6px] h-8 hover:contrast-[30%] cursor-pointer brightness-[60%]" src="/member_delete_picture.svg" title="Remove from group" alt="member delete"/>
                                            }
                                            modal
                                            nested
                                            closeOnDocumentClick={false}
                                        >
                                            {/* @ts-ignore */}
                                            {(close) => (
                                            <div className="animate-anvil text-white bg-extraColor1 rounded-lg w-[600px] m-auto h-[246px] bg-opacity-90 brightness-125 font-bold drop-shadow-[0_6.2px_6.2px_rgba(0,0,0,0.8)]">
                                                <button onClick={close} className="text-3xl ml-2">X</button>
                                                <h1 className="text-2xl text-left mx-[40px] mt-10">Are you sure you want to remove this member from this group?</h1>
                                                <div className="flex flex-row mt-10 ml-96">
                                                    <button className="text-2xl bg-gray-800 px-4 py-1 rounded-lg border-2 border-opacity-0 hover:border-opacity-100 border-white peer-hover:border-opacity-100" onClick={() => HandleMemberDeleteClick(_memberInfo.userID, close, index)}>Yes</button>
                                                    <button className="ml-7 text-2xl bg-primaryColor px-4 py-1 rounded-lg border-2 border-opacity-0 hover:border-opacity-100 border-white peer-hover:border-opacity-100" onClick={close}>No</button>
                                                </div>
                                            </div>
                                                )}

                                        </Popup>
                                    </div>
                                }
                            </div>
                        ))
                    }
                </div>
                
                <p className="text-gray-300 text-lg mt-16 mr-36 pb-1 border-b-[1px] w-[40%] mb-2">Group leave</p>
                <div className="flex flex-row">
                    <Popup
                        trigger={
                            <div className="relative cursor-pointer mb-20">
                                <img src="/leave_group_picture.svg" className="invert absolute z-20 pl-4 mt-[21px] h-8 w-auto peer" alt="leave group"/>
                                <p className="w-max text-white py-2 pl-14 pr-4 mt-4 rounded-lg bg-red-950 border-2 border-opacity-0 hover:border-opacity-100 border-white peer-hover:border-opacity-100">Leave group</p>
                            </div>
                        }
                        modal
                        nested
                        closeOnDocumentClick={false}
                    >
                        {/* @ts-ignore */}
                        {(close) => (
                            <div className="animate-anvil text-white bg-extraColor1 rounded-lg w-[600px] m-auto h-[230px] bg-opacity-90 brightness-125 font-bold drop-shadow-[0_6.2px_6.2px_rgba(0,0,0,0.8)]">
                                <button onClick={close} className="text-3xl ml-2">X</button>
                                <h1 className="text-2xl text-center mt-10">Are you sure you want to leave this group?</h1>
                                <div className="flex flex-row mt-10 ml-96">
                                    <button className="text-2xl bg-gray-800 px-4 py-1 rounded-lg border-2 border-opacity-0 hover:border-opacity-100 border-white peer-hover:border-opacity-100" onClick={() => HandleGroupLeaveClick()}>Yes</button>
                                    <button className="ml-7 text-2xl bg-primaryColor px-4 py-1 rounded-lg border-2 border-opacity-0 hover:border-opacity-100 border-white peer-hover:border-opacity-100" onClick={close}>No</button>
                                </div>
                            </div>
                        )}

                    </Popup>

                    <div className="flex flex-row">
                        <p className="text-gray-300 text-lg mt-[20px] mx-6">or</p>
                        <Popup
                            trigger={
                            <div className="relative cursor-pointer mb-20">
                                <img src="/group_delete_picture.svg" className="invert absolute z-20 pl-3 mt-[21px] h-8 w-auto peer" alt="group delete"/>
                                <p className="w-max text-white py-2 pl-12 pr-4 mt-4 rounded-lg bg-red-950 border-2 border-opacity-0 hover:border-opacity-100 border-white peer-hover:border-opacity-100">Delete group</p>
                            </div>
                            }
                            modal
                            nested
                            closeOnDocumentClick={false}
                        >
                            {/* @ts-ignore */}
                            {(close) => (
                            <div className="animate-anvil text-white bg-extraColor1 rounded-lg w-[600px] m-auto h-[230px] bg-opacity-90 brightness-125 font-bold drop-shadow-[0_6.2px_6.2px_rgba(0,0,0,0.8)]">
                                <button onClick={close} className="text-3xl ml-2">X</button>
                                <h1 className="text-2xl text-center mt-10">Are you sure you want to delete this group?</h1>
                                <div className="flex flex-row mt-10 ml-96">
                                    <button className="text-2xl bg-gray-800 px-4 py-1 rounded-lg border-2 border-opacity-0 hover:border-opacity-100 border-white peer-hover:border-opacity-100" onClick={() => HandleGroupDeleteClick()}>Yes</button>
                                    <button className="ml-7 text-2xl bg-primaryColor px-4 py-1 rounded-lg border-2 border-opacity-0 hover:border-opacity-100 border-white peer-hover:border-opacity-100" onClick={close}>No</button>
                                </div>
                            </div>
                        )}

                        </Popup>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default GroupSettingsPage