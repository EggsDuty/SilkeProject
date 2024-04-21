import { UserInfo } from '../components/DatabaseTypes.ts';
import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import Header from '../components/Header.tsx';
import ProfileInformation from '../components/Profile/ProfileInformation.tsx';
import ProfileEditInformation from '../components/Profile/ProfileEditInformation.tsx';
import MemberBox from '../components/Groups/MemberBox.tsx';
import { AcceptFriendRequestPromise, DeleteUserFriendInvitePromise, GetFriendInvitesListOfUser, GetFriendsListOfUser, GetDataFromDocumentPromise, GetUserInfoForMemberList } from '../components/DatabaseFunctions.ts';
import Popup from 'reactjs-popup';
import FriendInvite from '../components/Profile/FriendInvite.tsx';

interface Person {
    userID: string,
    displayName: string,
    image: string
}

function ProfilePage() {

    const { uid } = useParams();
    const [data, setData] = useState<UserInfo>();

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
            GetDataFromDocumentPromise("users", uid).then((_data) => {
                const _convertedData = _data as UserInfo;
                setData(_convertedData);
            });
            GetFriendsListOfUser(uid).then((_friendIDs: string[]) => {
                getAllFriendInfo(_friendIDs).then((_friendsInfo) => {
                    setGottenFriends(true);
                    setFriendList(_friendsInfo);
                });
            });
        }
    }, [uid, gottenFriends]);

    useEffect(() => {
        if (!gottenInvites) {
            GetFriendInvitesListOfUser(uid).then((_inviteIDs: string[]) => {
                getAllFriendInfo(_inviteIDs).then((_personInfo) => {
                    setGottenInvites(true);
                    setInviteList(_personInfo);
                });
            });
        }
    }, [gottenInvites]);

    return (
        <div className="h-screen w-screen absolute overflow-x-hidden">
            <Header />
            {gottenFriends ?
                <div className="flex flex-row justify-evenly mt-28 mb-20">
                    <div className="bg-extraColor1 rounded-lg bg-opacity-80 min-w-[900px] w-[900px] p-10 drop-shadow-[0_6.2px_6.2px_rgba(0,0,0,0.8)]">
                        {!editMode ?
                            <ProfileInformation own={localStorage.getItem("uid") === uid} info={data!} setEditMode={setEditMode} /> :
                            <ProfileEditInformation uid={localStorage.getItem("uid")!} displayName={data!.displayName} description={data!.description} setEditMode={setEditMode} />
                        }
                    </div>
                    <div className="bg-extraColor1 flex flex-col rounded-lg bg-opacity-80 min-w-[500px] w-[500px] h-[600px] pt-10 px-10 pb-5 drop-shadow-[0_6.2px_6.2px_rgba(0,0,0,0.8)] group">
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
                                                <img src={"/invite_accept_picture.svg"} alt="accept" className="absolute h-10 w-10 right-[5rem] translate-y-[15%]" />
                                            </div>
                                            <div className="cursor-pointer" onClick={() => handleDecline(_person.userID)}>
                                                <img src="/invite_decline_picture.svg" alt="decline" className="absolute h-10 w-10 right-[1rem] translate-y-[15%]" />
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
                        <Popup
                            trigger={
                                <div className="flex flex-row cursor-pointer items-center w-max bg-blue-950 px-2 py-1 mt-3 border-2 border-white border-opacity-0 hover:border-opacity-100 rounded-lg">
                                    <img src="/plus_sign_picture.svg" className="invert h-9 w-auto" />
                                    <p className="w-max ml-2 text-white rounded-lg">Add Friend</p>
                                </div>
                            }
                            modal
                            nested
                            closeOnDocumentClick={false}>
                            {/* @ts-ignore */}
                            {(close) => (
                                <div className="animate-anvil text-white bg-extraColor1 rounded-lg m-auto h-[600px] bg-opacity-90 font-bold drop-shadow-[0_6.2px_6.2px_rgba(0,0,0,0.8)]">
                                    <button onClick={close} className="text-3xl ml-2">X</button>
                                    <h1 className="text-4xl text-center mt-10">Add a friend</h1>
                                    <FriendInvite />
                                </div>
                            )}
                        </Popup>
                    </div>
                </div> :
                <div className="w-screen h-screen absolute flex items-center">
                    <h1 className="text-4xl text-white mx-auto">Loading</h1>
                </div>}
        </div>
    );
}

export default ProfilePage;