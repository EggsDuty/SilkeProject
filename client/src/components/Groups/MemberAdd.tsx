import { useEffect, useState } from "react";
import { GetFriendIDListOfUser, GetUserInfoForMemberList } from "../DatabaseFunctions";
import MemberBox from "./MemberBox";
import { GroupInfo } from "../DatabaseTypes";

interface FriendInfo {
    userID: string,
    displayName: string,
    image: string
}

interface Props {
    groupInfo: GroupInfo,
    groupID: string
}


function MemberAdd(props: Readonly<Props>) {
    const userID = localStorage.getItem("uid");

    const [friendsInfo, setFriendsInfo] = useState<FriendInfo[]>([])
    const [filteredFriendsInfo, setFilteredFriendsInfo] = useState<FriendInfo[]>([])
    const [isLoadingFriends, setIsLoadingFriends] = useState(true)
    const [friendSearchBarValue, setFriendSearchBarValue] = useState(" ")

    useEffect(() => {
        GetFriendIDListOfUser(userID!).then((_friends) => {
            GetFriendInfo(_friends).then((_friendsList) => {
                setFriendsInfo(_friendsList);
                setIsLoadingFriends(false);
                handleFriendSearch();
            })
        })
    }, [])

    useEffect(() => {
        if (friendsInfo.length > 0) {
            const tempFilteredFriends: FriendInfo[] = [];
            for (let i = 0; i < friendsInfo.length; i++) {
                if (friendsInfo.at(i)?.displayName.match(new RegExp(friendSearchBarValue, "i")) !== null) {
                    tempFilteredFriends.push(friendsInfo.at(i)!);
                }
            }
            setFilteredFriendsInfo(tempFilteredFriends);
        }
        else {
            return;
        }
    }, [friendSearchBarValue,])

    async function GetFriendInfo(friendsIDs: string[]) {
        const tempFriendsInfo: FriendInfo[] = [];

        for (let i = 0; i < friendsIDs.length; i++) {
            const friendID = friendsIDs.at(i);
            let flag = false;

            for (let j = 0; j < props.groupInfo.members.length; j++) {
                if (friendID === props.groupInfo.members.at(j)) {
                    flag = true;
                    break;
                }
            }
            if (!flag) {
                tempFriendsInfo.push(await GetUserInfoForMemberList(friendID!));
            }
        }

        return tempFriendsInfo;
    }

    function handleFriendSearch() {
        const searchBar = document.getElementById("find-member-search-bar") as HTMLTextAreaElement
        setFriendSearchBarValue(searchBar.value)
    }

    return (
        <>
            <div className="flex flex-row mb-5 w-full m-auto transition-transform mt-10">

                <p className="text-2xl text-white mb-3 ml-[50px] min-w-[200px]">Select a friend</p>
                <div className="absolute z-10 mt-[3px] ml-[396px] pointer-events-auto">
                    <img className="h-7 invert contrast-[20%]" src="/search_picture.svg" alt="search bar"/>
                </div>
                <input id="find-member-search-bar" onChange={handleFriendSearch} type="text" placeholder="Your friend name..." className="ml-[140px] w-[250px] bg-blue-950 border-indigo-300 focus:border-white outline-none border h-9 rounded-lg pl-10 pr-2 py-4 text-white placeholder:text-lg "></input>
            </div>

            <div className="bg-blue-400 w-[590px] min-w-[400px] rounded-lg bg-opacity-20 mt-3 ml-[50px] min-h-[280px] h-[48vh] mb-[30px] overflow-auto">
                {isLoadingFriends ?
                    <div className="flex flex-row  mt-6 ml-6 align-middle">
                        <img src="/loading_picture.svg" className="animate-spin invert h-10" alt="loading"/>
                        <p className="text-gray-500 text-2xl font-bold ml-2">Loading...</p>
                    </div>
                    :
                    friendsInfo.length < 1 ?
                        <h2 className="text-gray-500 text-2xl font-bold mt-6 ml-6">No friends...</h2>
                        :
                        filteredFriendsInfo.length < 1 ?
                            <h2 className="text-gray-500 text-2xl font-bold mt-6 ml-6">No results...</h2>
                            :
                            filteredFriendsInfo.map((_friendInfo) => (
                                <MemberBox key={_friendInfo.userID} memberID={_friendInfo.userID} image={_friendInfo.image} memberName={_friendInfo.displayName} isLeader={false} addFunction={true} groupID={props.groupID} groupInfo={props.groupInfo} />
                            ))
                }
            </div>

        </>

    )
}

export default MemberAdd;