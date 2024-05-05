import { useEffect, useRef, useState } from "react";
import MemberBox from "../Groups/MemberBox";
import { DeleteFriendPromise, GetFriendIDListOfUser, GetUserInfoForMemberList } from "../DatabaseFunctions";

interface Friend {
    userID: string,
    displayName: string,
    image: string
}

function FriendRemove() {
    const searchRef = useRef<HTMLInputElement | null>(null);

    const [userFriends, setUserFriends] = useState<Friend[]>([]);
    const [searchedFriends, setSearchedFriends] = useState<Friend[]>([]);
    const [firstTime, setFirstTime] = useState(true);

    const [isGettingUsers, setIsGettingUsers] = useState(true);
    const [hasGottenUsers, setHasGottenUsers] = useState(false);

    useEffect(() => {
        const uid = localStorage.getItem("uid");
        if (!uid) {
            return;
        }
        if (hasGottenUsers) {
            return;
        }
        GetFriendIDListOfUser(uid).then(async (_friendIDs) => {
            const _friendInfo: Friend[] = []
            for (let i = 0; i < _friendIDs.length; i++) {
                const _info = await GetUserInfoForMemberList(_friendIDs[i]);
                _friendInfo.push(_info);
            }

            setUserFriends(_friendInfo);
            setIsGettingUsers(false);
            setHasGottenUsers(true);
        });
    }, [hasGottenUsers]);

    useEffect(() => {
        if (firstTime && hasGottenUsers) {
            handleSearch();
            setFirstTime(false);
        }
    }, [hasGottenUsers]);

    function handleSearch() {
        const searchBox = searchRef.current as HTMLInputElement;
        if (!searchBox) {
            return;
        }

        const newFriendList = [...userFriends]

        for (let i = 0; i < userFriends.length; i++) {
            const _friend = userFriends[i];
            if (_friend.displayName.match(new RegExp(searchBox.value, "i")) === null) {
                newFriendList.splice(i, 1);
                //i--;
            }
        }

        setSearchedFriends(newFriendList);
    }

    function handleDeleteFriend(friendID: string) {
        const uid = localStorage.getItem("uid");
        if (!uid) {
            return;
        }
        DeleteFriendPromise(uid, friendID).then(() => {
            setUserFriends([]);
            setSearchedFriends([]);
            setIsGettingUsers(true);
            setHasGottenUsers(false);
        });
    }

    return (
        <div className="flex flex-col h-[450px] px-10">
            <div className="flex justify-center relative mt-5">
                <input ref={searchRef} type="text" className="text-black text-xl w-96 py-2 pl-5 rounded-lg focus:shadow focus:outline-none opacity-80" placeholder="Search for name" onChange={handleSearch} />
                <img alt="Search" className="absolute h-10 mt-[2px] right-2 top-0 contrast-[20%] hover:contrast-0" src="/search_picture.svg" onClick={handleSearch} />
            </div>
            <div className="mt-10 h-full overflow-y-auto overflow-x-hidden border-2 border-white">
                {searchedFriends.length > 0 ?
                    searchedFriends.map((_friend, _index) => (
                        <div key={_index} className="relative">
                            <MemberBox memberID={_friend.userID} image={_friend.image} memberName={_friend.displayName} isLeader={false} />
                            <img alt="Remove friend" src="/group_delete_picture.svg" className="absolute top-0 right-5 translate-y-[25%] invert hover:contrast-[20%] h-9 w-auto" onClick={() => handleDeleteFriend(_friend.userID)} />
                        </div>
                    )) :
                    (isGettingUsers ? <img alt="Loading..." src="/loading_picture.svg" className="animate-spin invert h-24 mx-auto mt-10" /> : (hasGottenUsers ? <p className="text-2xl ml-2 mt-5 text-white">No users found!</p> : ""))}
            </div>
        </div>
    );
}

export default FriendRemove;