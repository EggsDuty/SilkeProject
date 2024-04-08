import { getAuth } from 'firebase/auth';
import firebase from '../firebase.tsx';
import DatabaseFunctions, { AcceptFriendRequestPromise, DeleteUserFriendInvitePromise, GetFriendInvitesListOfUser, GetFriendsListOfUser, GetUserInfoForMemberList } from '../components/DatabaseFunctions.ts';
import { UserInfo } from '../components/DatabaseTypes.ts';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useParams } from 'react-router-dom';
import Header from '../components/Header.tsx';
import ProfileInformation from '../components/Profile/ProfileInformation.tsx';
import ProfileEditInformation from '../components/Profile/ProfileEditInformation.tsx';
import MemberBox from '../components/Groups/MemberBox.tsx';

const auth = getAuth(firebase.app);

interface Person {
    userID: string,
    displayName: string,
    image: string
}

function ProfilePage() {
    const { uid } = useParams();
    const [user, loading] = useAuthState(auth);
    const [data, setData] = useState({});

    const [toggledFriendAndInvites, setToggledFriendAndInvites] = useState(false);
    const [editMode, setEditMode] = useState(false);

    const [friendList, setFriendList] = useState<Person[]>([]);
    const [inviteList, setInviteList] = useState<Person[]>([]);

    const [gottenFriends, setGottenFriends] = useState(false);
    const [gottenInvites, setGottenInvites] = useState(false);

    if (!uid) {
        return <Navigate to="/" replace={true} />
    }

    async function getAllFriendInfo(uids: string[]) {
        const friends: Person[] = [];

        for (let i = 0; i < uids.length; i++) {
            friends.push(await GetUserInfoForMemberList(uids.at(i)!));
        }

        return friends;
    }

    function handleDecline(valueToRemove: string) {
        DeleteUserFriendInvitePromise(uid!, valueToRemove).then(() => {
            setGottenInvites(false);
        });
    }

    function handleAccept(friendID: string) {
        AcceptFriendRequestPromise(uid!, friendID).then(() => {
            setGottenFriends(false);
            handleDecline(friendID);
        });
    }

    useEffect(() => {
        if (uid !== null) {
            DatabaseFunctions.GetUserDataFromDocumentPromise("users", uid).then((_data) => {
                setData(_data);
            });
            if (!gottenFriends) {
                GetFriendsListOfUser(uid).then((_friendIDs) => {
                    getAllFriendInfo(_friendIDs).then((_friendsInfo) => {
                        setGottenFriends(true);
                        setFriendList(_friendsInfo);
                    });
                });
            }
        }
    }, [loading, uid, gottenFriends]);

    useEffect(() => {
        if (!gottenInvites) {
            GetFriendInvitesListOfUser(uid).then((_inviteIDs) => {
                getAllFriendInfo(_inviteIDs).then((_personInfo) => {
                    setGottenInvites(true);
                    setInviteList(_personInfo);
                });
            });
        }
    }, [gottenInvites]);

    const convertedData = data as UserInfo;

    return (
        <div className="h-screen w-screen absolute overflow-x-hidden">
            <Header />
            {gottenFriends ?
                <div className="flex flex-row justify-evenly mt-28">
                    <div className="bg-extraColor1 rounded-lg bg-opacity-80 w-1/2 p-10 drop-shadow-[0_6.2px_6.2px_rgba(0,0,0,0.8)]">
                        {!editMode ?
                            <ProfileInformation own={user?.uid === uid} info={convertedData} setEditMode={setEditMode} /> :
                            <ProfileEditInformation uid={user!.uid} displayName={convertedData.displayName} description={convertedData.description} setEditMode={setEditMode} />
                        }
                    </div>
                    <div className="bg-extraColor1 flex flex-col rounded-lg bg-opacity-80 w-1/4 h-[600px] pt-10 px-10 pb-5 drop-shadow-[0_6.2px_6.2px_rgba(0,0,0,0.8)] group">
                        <div className="flex flex-row justify-evenly border-2 border-white relative">
                            <div className={`w-1/2 text-center border-r-2 border-white py-1 ${toggledFriendAndInvites ? "bg-extraColor1 hover:bg-[#151445]  cursor-pointer" : ""}`} onClick={() => toggledFriendAndInvites ? setToggledFriendAndInvites(!toggledFriendAndInvites) : ""}>
                                <h1 className="text-2xl text-white font-bold mb-2 select-none">Friends</h1>
                            </div>
                            <div className={` w-1/2 text-center py-1 ${toggledFriendAndInvites ? "" : "bg-extraColor1 hover:bg-[#151445]  cursor-pointer"}`} onClick={() => toggledFriendAndInvites ? "" : setToggledFriendAndInvites(!toggledFriendAndInvites)}>
                                <h1 className="text-2xl text-white font-bold mb-2 select-none">Invites</h1>
                            </div>
                            <div className={`bg-blue-950 absolute w-1/2 left-0 -z-[1] h-[3.4rem] transition-transform ease-in-out duration-150 ${toggledFriendAndInvites ? "translate-x-[100%]" : "translate-x-0"}`} />
                        </div>

                        <div className="h-full border-2 border-white overflow-y-scroll">
                            {toggledFriendAndInvites ?
                                (inviteList.length > 0 ?
                                    inviteList.map((_person, _index) => (
                                        <div key={_index} className="flex flex-row relative">
                                            <div className="cursor-pointer" onClick={() => handleAccept(_person.userID)}>
                                                <img src={"/invite_accept_picture.svg"} className="absolute h-10 w-10 right-[5rem] translate-y-[15%]" />
                                            </div>
                                            <div className="cursor-pointer" onClick={() => handleDecline(_person.userID)}>
                                                <img src="/invite_decline_picture.svg" className="absolute h-10 w-10 right-[1rem] translate-y-[15%]" />
                                            </div>
                                            <MemberBox memberID={_person.userID} image={_person.image} memberName={_person.displayName} isLeader={false} />
                                        </div>
                                    )) :
                                    <h1 className="text-2xl text-gray-500 font-bold mt-6 ml-6">{gottenInvites ? "No invites..." : "Loading..."}</h1>) :
                                (friendList.length > 0 ?
                                    friendList.map((_friend, _index) => (
                                        <MemberBox key={_index} memberID={_friend.userID} image={_friend.image} memberName={_friend.displayName} isLeader={false} />
                                    )) :
                                    <h1 className="text-2xl text-gray-500 font-bold mt-6 ml-6">{gottenFriends ? "No friends..." : "Loading..."}</h1>)}
                        </div>
                    </div>
                </div> :
                <div className="w-screen h-screen absolute flex items-center">
                    <h1 className="text-4xl text-white mx-auto">Loading</h1>
                </div>}
        </div>
    );
}

export default ProfilePage;