import firebase from '../firebase.tsx';
import { arrayRemove, arrayUnion, deleteDoc, collection, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { GroupInfo, UserInfo } from './DatabaseTypes.ts';

export async function GetUserDataFromDocumentPromise(collection: string, id: string) {
    console.log("call");
    const ref = doc(firebase.db, collection, id);
    const retrievedDoc = await getDoc(ref);

    if (retrievedDoc.exists()) {
        return retrievedDoc.data();
    } else {
        return {};
    }
}

export async function GetUserDisplayNamePromise(uid: string) {
    const _data = await GetUserDataFromDocumentPromise("users", uid)
    return (_data as UserInfo).displayName;
}

export async function GetUserEmailPromise(uid: string) {
    const _data = await GetUserDataFromDocumentPromise("users", uid);
    return (_data as UserInfo).email;
}

export async function CreateGroupInvitePromise(uid: string, groupID: string, groupName: string, groupLeader: string) {
    const userRef = doc(firebase.db, "users", uid);
    await updateDoc(userRef, {
        groupInvites: arrayUnion(`${groupID};${groupName};${groupLeader}`)
    });
}

export async function GetUserGroupInvitesPromise(uid: string) {
    const _data = await GetUserDataFromDocumentPromise("users", uid);
    return (_data as UserInfo).groupInvites;
}

export async function AcceptUserIntoGroupPromise(uid: string, groupID: string) {
    const userRef = doc(firebase.db, "users", uid);
    const groupRef = doc(firebase.db, "groups", groupID);
    await updateDoc(userRef, {
        groups: arrayUnion(groupID)
    });
    await updateDoc(groupRef, {
        members: arrayUnion(uid)
    });
}

export async function DeleteUserGroupInvitePromise(uid: string, value: string) {
    const ref = doc(firebase.db, "users", uid);
    await updateDoc(ref, {
        groupInvites: arrayRemove(value)
    });
}

export async function AcceptFriendRequestPromise(uid: string, friendID: string) {
    const userRef = doc(firebase.db, "users", uid);
    const friendRef = doc(firebase.db, "users", friendID);
    await updateDoc(userRef, {
        friends: arrayUnion(friendID)
    });
    await updateDoc(friendRef, {
        friends: arrayUnion(uid)
    });
}

export async function DeleteUserFriendInvitePromise(uid: string, value: string) {
    const ref = doc(firebase.db, "users", uid);
    await updateDoc(ref, {
        friendInvites: arrayRemove(value)
    });
}


export async function GetUserInfoForHeaderPromise(uid: string) {
    const _data = await GetUserDataFromDocumentPromise("users", uid);
    const userData = _data as UserInfo;
    return { displayName: userData.displayName, email: _data.email, image: userData.image };
}

export async function GetUserInfoForMemberList(uid: string) {
    const _data = await GetUserDataFromDocumentPromise("users", uid);
    const userData = _data as UserInfo;
    return { displayName: userData.displayName, image: userData.image, userID: uid };
}


export async function GetFriendInvitesListOfUser(uid: string) {
    const _data = await GetUserDataFromDocumentPromise("users", uid);
    const userData = _data as UserInfo;
    return userData.friendInvites;
}

export async function GetFriendsListOfUser(uid: string) {
    const _data = await GetUserDataFromDocumentPromise("users", uid);
    const userData = _data as UserInfo;
    return userData.friends;
}

export async function CreateFriendInvitePromise(uid: string, friendID: string) {
    const userRef = doc(firebase.db, "users", friendID);
    await updateDoc(userRef, {
        friendInvites: arrayUnion(uid)
    });
}

export async function DeleteUserFromGroupPromise(uid: string, groupID: string) {
    const userRef = doc(firebase.db, "users", uid);
    const groupRef = doc(firebase.db, "groups", groupID);
    await updateDoc(userRef, {
        groups: arrayRemove(groupID)
    });
    await updateDoc(groupRef, {
        members: arrayRemove(uid)
    });
}

export async function DeleteGroupIDPromise(groupID: string) {
    const groupRef = doc(firebase.db, "groups", groupID);
    await deleteDoc(groupRef);
}

export async function UpdateLeaderNameInGroupListPromise(groupID: string, newName: string) {
    const groupRef = doc(firebase.db, "groups", groupID);
    await updateDoc(groupRef, {
        leaderName: newName
    })
}

export async function UpdateUserDataPromise(uid: string, updateMap: {}) {
    const userRef = doc(firebase.db, "users", uid);
    await updateDoc(userRef, updateMap);
}

export async function GetUsersWithDisplayNamePromise(name: string) {
    const usersRef = collection(firebase.db, "users");
    const _query = query(usersRef, where("displayName", "==", name));
    const snapshot = await getDocs(_query);

    const displayNames: string[] = [];

    snapshot.forEach((_doc) => {
        displayNames.push(_doc.data().displayName);
    });

    return displayNames;
}

export async function GetGroupInfoPromise(uid: string) {
    const _data = await GetUserDataFromDocumentPromise("groups", uid);
    const groupData = _data as GroupInfo;
    return groupData;
}