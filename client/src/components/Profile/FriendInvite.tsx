import { FormEvent, useEffect, useRef, useState } from "react";
import MemberBox from "../Groups/MemberBox";
import { CreateFriendInvitePromise, GetFriendIDListOfUser, GetUsersWithDisplayNamePromise } from "../DatabaseFunctions";

interface Person {
    userID: string,
    displayName: string,
    image: string
}

function FriendInvite() {
    const searchRef = useRef<HTMLInputElement | null>(null);

    const [userFriends, setUserFriends] = useState<string[]>([]);

    const [foundUsers, setFoundUsers] = useState<Person[]>([]);
    const [isGettingUsers, setIsGettingUsers] = useState(false);
    const [hasGottenUsers, setHasGottenUsers] = useState(false);

    useEffect(() => {
        const uid = localStorage.getItem("uid");
        if (!uid) {
            return;
        }
        GetFriendIDListOfUser(uid).then((_friendIDs) => {
            setUserFriends(_friendIDs);
        });
    }, []);

    function handleSearch(event?: FormEvent) {
        if (event) {
            event.preventDefault();
        }

        setIsGettingUsers(true);
        const searchBox = searchRef.current as HTMLInputElement;
        const userNameToFind = searchBox.value;
        GetUsersWithDisplayNamePromise(userNameToFind).then((_users) => {
            const _foundUsers: Person[] = [];
            for (let _user of _users) {
                let alreadyFriends = false;
                for (let _friendID of userFriends) {
                    if (_user.userID === _friendID || _user.userID === localStorage.getItem("uid")!) {
                        alreadyFriends = true;
                        break;
                    }
                }

                if (alreadyFriends) {
                    continue;
                }
                _foundUsers.push(_user);
            }
            if (!hasGottenUsers) {
                setHasGottenUsers(true);
            }
            setIsGettingUsers(false);
            setFoundUsers(_foundUsers);
        });
    }

    function handleInviteSend(index: number, userID: string) {
        const uid = localStorage.getItem("uid");
        if (!uid) {
            return;
        }
        CreateFriendInvitePromise(uid, userID).then(() => {
            const foundUsersCopy = [...foundUsers];
            foundUsersCopy.splice(index, 1);
            setFoundUsers(foundUsersCopy);
        });
    }

    return (
        <div className="flex flex-col h-[450px] px-10">
            <form onSubmit={(e) => handleSearch(e)} className="flex justify-center relative mt-5">
                <input ref={searchRef} type="text" className="text-black text-xl w-96 py-2 pl-5 rounded-lg focus:shadow focus:outline-none opacity-80" placeholder="Search for name" />
                <img alt="Search" className="absolute h-10 mt-[2px] right-2 top-0 contrast-[20%] hover:contrast-0" src="/search_picture.svg" onClick={handleSearch} />
            </form>
            <div className="mt-10 h-full overflow-y-auto overflow-x-hidden border-2 border-white">
                {foundUsers.length > 0 ?
                    foundUsers.map((_person, _index) => (
                        <div key={_person.userID} className="relative">
                            <MemberBox memberID={_person.userID} image={_person.image} memberName={_person.displayName} isLeader={false} />
                            <img alt="Invite" src="/plus_sign_picture.svg" className="absolute top-0 right-5 translate-y-[25%] invert hover:contrast-[20%] h-9 w-auto" onClick={() => handleInviteSend(_index, _person.userID)} />
                        </div>
                    )) :
                    (isGettingUsers ? <img alt="Loading..." src="/loading_picture.svg" className="animate-spin invert h-24 mx-auto mt-10" /> : (hasGottenUsers ? <p className="text-2xl ml-2 mt-5 text-white">No users found!</p> : ""))}
            </div>
        </div>
    );
}

export default FriendInvite;