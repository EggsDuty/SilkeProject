import { useNavigate, Link, useParams } from "react-router-dom"
import Header from "../components/Header"
import { GroupInfo } from "../components/DatabaseTypes";
import { useEffect, useState } from "react";
import { DeleteUserFromGroupPromise, GetGroupInfoPromise, GetUserInfoForMemberList } from "../components/DatabaseFunctions";
import MemberBox from "../components/Groups/MemberBox";
import Popup from "reactjs-popup";
import MemberAdd from "../components/Groups/MemberAdd";
import MyCalendar from "../components/Groups/MyCalendar";
import EventCreation from "../components/Groups/EventCreation";
import ChatComponent from "../components/Groups/ChatComponent";

interface MemberInfo {
    userID: string,
    displayName: string,
    image: string
}

function GroupPage() {
    const { groupID } = useParams();
    const userID = localStorage.getItem("uid");

    const [groupInfo, setGroupInfo] = useState<GroupInfo | null>();
    const defaultValue: MemberInfo[] = [];
    const [userNameInfo, setUserNameInfo] = useState(defaultValue);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingMembers, setIsLoadingMembers] = useState(true);
    const [isLoadingEvents, setIsLoadingEvents] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoadingEvents) {
            return;
        }
        GetGroupInfoPromise(groupID!).then((_groupInfo) => {
            if(_groupInfo.members === undefined){
                navigate("/groups");
                return;
            }

            let isPartOfGroup = false;
            for (let i = 0; i < _groupInfo.members.length; i++) {
                if (_groupInfo.members.at(i) === userID) {
                    isPartOfGroup = true;
                    break;
                }
            }
            if (!isPartOfGroup) {
                navigate("/groups");
                return;
            }
            setGroupInfo(_groupInfo);
            setIsLoading(false);
            setIsLoadingEvents(false);
        })
    }, [isLoadingEvents])

    useEffect(() => {
        if (isLoading) {
            return
        }
        getAllMemberNames().then((_membersNames) => {
            setUserNameInfo(_membersNames);
            setIsLoadingMembers(false);
        });
    }, [isLoading])

    async function getAllMemberNames() {
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

    function handleGroupLeaveClick() {
        DeleteUserFromGroupPromise(userID!, groupID!).then(async () => {
            navigate("/groups");
        })
    }

    function addEvent() {
        setIsLoadingEvents(true);
        setGroupInfo(null);
    }

    if (isLoading) {
        return (
            <div className="w-screen absolute text-center bg-repeat-y">
                <Header />
                <div className="flex flex-row  mt-6 ml-6 align-middle">
                    <img src="/loading_picture.svg" className="animate-spin invert h-10" alt="Loading"/>
                    <p className="text-gray-500 text-2xl font-bold ml-2">Loading...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="w-[99vw] absolute text-center bg-repeat-y">
            <Header />
            <div className="border-l-4 ml-[9vw] pl-5 text-left mt-24 overflow-x-hidden w-max">
                <h1 className="text-4xl text-white w-max font-bold drop-shadow-[0_6.2px_6.2px_rgba(0,0,0,0.8)]" >{groupInfo?.name}</h1>
                <p className="text-gray-300 text-lg mt-6 mr-36">{groupInfo?.description}</p>
            </div>

            <div className="flex flex-row mt-6 overflow-x-hidden">
                <h2 className="text-left ml-[9vw] pl-5 text-white mt-10 text-2xl font-bold drop-shadow-[0_6.2px_6.2px_rgba(0,0,0,0.8)]">Members</h2>
                <Popup
                    trigger={
                        <img alt="Add member" src="/member_add_picture.svg" className="cursor-pointer mt-[42px] ml-3 invert z-20 h-[31px] w-auto hover:contrast-[60%] mr-[250px] drop-shadow-[0_6.2px_6.2px_rgba(0,0,0,0.8)]" />
                    }

                    modal
                    nested
                    closeOnDocumentClick={false}
                >
                    {/* @ts-ignore */}
                    {(close) => (
                        <div className="animate-anvil text-white bg-extraColor1 rounded-lg w-[700px] m-auto overflow-y-scroll h-[80vh] min-h-[600px] bg-opacity-90 font-bold drop-shadow-[0_6.2px_6.2px_rgba(0,0,0,0.8)]">
                            <button onClick={close} className="text-3xl ml-2">X</button>
                            <h1 className="text-4xl text-center mt-10">Add a member</h1>
                            <MemberAdd groupInfo={groupInfo!} groupID={groupID!} />
                        </div>
                    )}

                </Popup>
                <h2 className="text-left ml-[9vw] pl-5 text-white mt-10 text-2xl font-bold drop-shadow-[0_6.2px_6.2px_rgba(0,0,0,0.8)]">Calendar</h2>
            </div>

            <div className="flex flex-row w-max overflow-x-hidden">
                <div className="bg-blue-400 min-w-[400px] rounded-lg bg-opacity-20 mt-3 ml-[9vw] mr-[9vw] overflow-y-scroll min-h-[430px] h-[50vh] overflow-x-hidden">
                    {isLoadingMembers ?
                        <div className="flex flex-row  mt-6 ml-6 align-middle">
                            <img src="/loading_picture.svg" className="animate-spin invert h-10" alt="Loading" />
                            <p className="text-gray-500 text-2xl font-bold ml-2">Loading...</p>
                        </div>
                        :
                        userNameInfo.map((_memberInfo) => (
                            <MemberBox key={_memberInfo.userID} memberID={_memberInfo.userID} image={_memberInfo.image} memberName={_memberInfo.displayName} isLeader={_memberInfo.userID === groupInfo?.leaderID} />
                        ))
                    }
                </div>

                <div className="bg-blue-400 min-w-[600px] rounded-lg bg-opacity-20 mt-3 ml-[1vw] min-h-[430px] overflow-x-hidden w-max drop-shadow-[0_6.2px_6.2px_rgba(0,0,0,0.8)]">
                    {groupInfo?.events === undefined ? 
                        <MyCalendar events={[]} reload={addEvent} />
                        :
                        <MyCalendar events={groupInfo.events} key={groupInfo.events.length} reload={addEvent} />
                    }
                </div>
            </div>

            <div className="flex flex-row mb-20 overflow-x-hidden">

                <Link className="absolute ml-[calc(9vw+8px)] mt-[13px] text-gray-300 bg-gradient-to-br from-purple-800 to-blue-700 hover:bg-gradient-to-bl rounded-lg py-[5px] text-center w-[160px] h-[38px] drop-shadow-[0_6.2px_6.2px_rgba(0,0,0,0.8)] text-nowrap font-bold border-2 border-opacity-0 hover:border-opacity-100 border-white peer-hover:border-opacity-100" to={"/whiteboard/" + groupID}>Go to whiteboard</Link>
                
                {isLoadingEvents ?
                <div className="ml-[calc(396px+9vw)]"></div>
                :
                groupInfo?.leaderID === userID ?
                <div className="relative w-max cursor-pointer ml-[calc(270px+9vw)]" onClick={() => navigate("/group/"+groupID+"/settings")}>
                    <img src="/group_settings_picture.svg" className="invert absolute z-20 pl-3 mt-[18px] h-[30px] w-auto peer" alt="group settings"/>
                    <p className="w-max text-white py-1 pl-12 pr-4 mt-4 rounded-lg bg-primaryColor border-2 border-opacity-0 hover:border-opacity-100 border-white peer-hover:border-opacity-100">Settings</p>
                </div>
                :
                <Popup
                    trigger={
                    <div className="relative w-max cursor-pointer ml-[calc(240px+9vw)]">
                        <img src="/leave_group_picture.svg" className="invert absolute z-20 pl-3 mt-[19px] h-7 w-auto peer" alt="leave group"/>
                        <p className="w-max text-white py-1 pl-12 pr-4 mt-4 rounded-lg bg-red-950 border-2 border-opacity-0 hover:border-opacity-100 border-white peer-hover:border-opacity-100">Leave group</p>
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
                            <button className="text-2xl bg-gray-800 px-4 py-1 rounded-lg border-2 border-opacity-0 hover:border-opacity-100 border-white peer-hover:border-opacity-100" onClick={() => handleGroupLeaveClick()}>Yes</button>
                            <button className="ml-7 text-2xl bg-primaryColor px-4 py-1 rounded-lg border-2 border-opacity-0 hover:border-opacity-100 border-white peer-hover:border-opacity-100" onClick={close}>No</button>
                        </div>
                    </div>
                        )}

                    </Popup>
                }
                <Popup
                    trigger={
                        <div className="relative w-max cursor-pointer ml-[calc(480px+9vw)]">
                            <img src="/plus_sign_picture.svg" className="invert absolute z-20 pl-3 mt-[20px] h-7 w-auto peer" alt="plus sign"/>
                            <p className="w-max text-white py-1 pl-12 pr-4 mt-4 rounded-lg bg-primaryColor border-2 border-opacity-0 hover:border-opacity-100 border-white peer-hover:border-opacity-100">Add event</p>
                        </div>
                    }
                    modal
                    nested
                    closeOnDocumentClick={false}
                >
                    {/* @ts-ignore */}
                    {(close) => (
                        <div className="animate-anvil text-white bg-extraColor1 rounded-lg w-[40vw] min-w-[500px] m-auto overflow-y-scroll h-[80vh] min-h-[620px] bg-opacity-90 font-bold drop-shadow-[0_6.2px_6.2px_rgba(0,0,0,0.8)]">
                            <button onClick={close} className="text-3xl ml-2">X</button>
                            <h1 className="text-4xl text-center mt-10">Create an event</h1>
                            <EventCreation closeFunction={close} addEvent={addEvent} />
                        </div>
                    )}

                </Popup>
            </div>

            <h2 className="text-left ml-[9vw] pl-5 text-white mt-10 text-2xl font-bold drop-shadow-[0_6.2px_6.2px_rgba(0,0,0,0.8)]">Chat</h2>
            <ChatComponent groupID={groupID} memberInfo={userNameInfo} />
        </div>
        
    )
}

export default GroupPage