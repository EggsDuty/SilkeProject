import { useNavigate, Link, useParams } from "react-router-dom"
import Header from "../components/Header"
import { GroupInfo } from "../components/DatabaseTypes";
import { useEffect, useState } from "react";
import { GetGroupInfoPromise, GetUserInfoForMemberList } from "../components/DatabaseFunctions";
import MemberBox from "../components/Groups/MemberBox";
import Popup from "reactjs-popup";
import MemberAdd from "../components/Groups/MemberAdd";

interface MemberInfo {
    userID: string,
    displayName: string,
    image: string
}

function GroupPage() {
    const { groupID } = useParams();

    const [groupInfo, setGroupInfo] = useState<GroupInfo>();
    const defaultValue: MemberInfo[] = [];
    const [userNameInfo, setUserNameInfo] = useState(defaultValue)
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingMembers, setIsLoadingMembers] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        GetGroupInfoPromise(groupID!).then((_groupInfo) => {
            setGroupInfo(_groupInfo);
            setIsLoading(false);
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
            if(groupInfo?.members.at(i) === groupInfo?.leaderID){
                membersInfo.unshift(await GetUserInfoForMemberList(groupInfo?.members.at(i)!));
            }
            else{
                membersInfo.push(await GetUserInfoForMemberList(groupInfo?.members.at(i)!));
            }
        }
        return membersInfo;
    }

    if (isLoading) {
        return (
            <>
                <div className="w-screen absolute text-center bg-repeat-y">
                    <Header />
                    <div className="flex flex-row  mt-6 ml-6 align-middle">
                        <img src="/loading_picture.svg" className="animate-spin invert h-10" />
                        <p className="text-gray-500 text-2xl font-bold ml-2">Loading...</p>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
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
                            <MemberAdd groupInfo={groupInfo!} groupID={groupID!}/>
                        </div>
                            )}

                    </Popup>
                    <h2 className="text-left ml-[9vw] pl-5 text-white mt-10 text-2xl font-bold drop-shadow-[0_6.2px_6.2px_rgba(0,0,0,0.8)]">Calendar (not yet functional)</h2>
                </div>

                <div className="flex flex-row w-max overflow-x-hidden">
                    <div className="bg-blue-400 min-w-[400px] rounded-lg bg-opacity-20 mt-3 ml-[9vw] mr-[9vw] overflow-y-scroll min-h-[400px] h-[50vh] overflow-x-hidden">
                        {isLoadingMembers ?
                            <div className="flex flex-row  mt-6 ml-6 align-middle">
                                <img src="/loading_picture.svg" className="animate-spin invert h-10" />
                                <p className="text-gray-500 text-2xl font-bold ml-2">Loading...</p>
                            </div>
                            :
                            userNameInfo.map((_memberInfo, index) => (
                                <MemberBox key={index} memberID={_memberInfo.userID} image={_memberInfo.image} memberName={_memberInfo.displayName} isLeader={_memberInfo.userID === groupInfo?.leaderID ? true : false} />
                            ))
                        }
                    </div>

                    <div className="bg-blue-400 min-w-[500px] rounded-lg bg-opacity-20 mt-3 ml-[1vw] min-h-[400px] overflow-x-hidden w-max">
                        
                    </div>
                </div>

                <div className="relative cursor-pointer mb-20 ml-[270px]" onClick={() => navigate("/group/"+groupID+"/settings")}>
                    <img src="/group_settings_picture.svg" className="invert absolute z-20 ml-[9vw] pl-3 mt-[2px] h-[30px] w-auto peer" />
                    <p className="w-max text-white py-1 pl-12 pr-4 mt-4 ml-[9vw] rounded-lg bg-primaryColor border-2 border-opacity-0 hover:border-opacity-100 border-white peer-hover:border-opacity-100">Settings</p>
                </div>

                <h2 className="text-left ml-[9vw] pl-5 text-white mt-10 text-2xl font-bold drop-shadow-[0_6.2px_6.2px_rgba(0,0,0,0.8)]">Chat (not yet functional)</h2>
                <div className="bg-blue-400 min-w-[800px] rounded-lg bg-opacity-20 mt-3 ml-[9vw] min-h-[500px] overflow-x-hidden w-max mb-20">

                </div>
                <Link className="text-white" to={"/whiteboard/" + groupID}>Go to whiteboard</Link>
            </div>
        </>
    )
}

export default GroupPage