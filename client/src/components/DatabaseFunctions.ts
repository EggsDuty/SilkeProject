import firebase from '../firebase.tsx';
import { arrayRemove, arrayUnion, deleteDoc, collection, doc, getDoc, getDocs, query, updateDoc, where, addDoc } from 'firebase/firestore';
import { GroupInfo, UserInfo } from './DatabaseTypes.ts';

export async function GetDataFromDocumentPromise(collection: string, id: string) {
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
    const _data = await GetDataFromDocumentPromise("users", uid)
    return (_data as UserInfo).displayName;
}

export async function GetUserEmailPromise(uid: string) {
    const _data = await GetDataFromDocumentPromise("users", uid);
    return (_data as UserInfo).email;
}

export async function CreateGroupInvitePromise(uid: string, groupID: string, groupName: string, groupLeader: string) {
    const userRef = doc(firebase.db, "users", uid);
    await updateDoc(userRef, {
        groupInvites: arrayUnion(`${groupID};${groupName};${groupLeader}`)
    });
}

export async function GetUserGroupInvitesPromise(uid: string) {
    const _data = await GetDataFromDocumentPromise("users", uid);
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
    const _data = await GetDataFromDocumentPromise("users", uid);
    const userData = _data as UserInfo;
    return { displayName: userData.displayName, email: _data.email, image: userData.image };
}

export async function GetUserInfoForMemberList(uid: string) {
    const _data = await GetDataFromDocumentPromise("users", uid);
    const userData = _data as UserInfo;
    return { displayName: userData.displayName, image: userData.image, userID: uid };
}


export async function GetFriendInvitesListOfUser(uid: string) {
    const _data = await GetDataFromDocumentPromise("users", uid);
    const userData = _data as UserInfo;
    return userData.friendInvites;
}

export async function GetFriendsListOfUser(uid: string) {
    const _data = await GetDataFromDocumentPromise("users", uid);
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

export async function DeleteUserGroupIDPromise(uid: string, groupID: string) {
    const userRef = doc(firebase.db, "users", uid);
    await updateDoc(userRef, {
        groups: arrayRemove(groupID)
    });

}

export async function DeleteGroupIDPromise(groupID: string) {
    const groupRef = doc(firebase.db, "groups", groupID);
    await deleteDoc(groupRef);
}

export async function UpdateLeaderIDInGroupListPromise(groupID: string, newLeaderID: string) {
    const groupRef = doc(firebase.db, "groups", groupID);
    await updateDoc(groupRef, {
        leaderID: newLeaderID
    })
}

export async function UpdateUserDataPromise(uid: string, updateMap: {}) {
    const userRef = doc(firebase.db, "users", uid);
    await updateDoc(userRef, updateMap);
}

export async function CreateNewGroupPromise(groupInfo: GroupInfo, userID: string) {
    const userRef = doc(firebase.db, "users", userID);
    const groupRef = await addDoc(collection(firebase.db, "groups"), groupInfo);
    await updateDoc(userRef, {
        groups: arrayUnion(groupRef.id)
    })
    return groupRef.id;
}

export async function UpdateGroupInfoPromise(groupID: string, newGroupName: string, newDescription: string) {
    const groupRef = doc(firebase.db, "groups", groupID);
 
    await updateDoc(groupRef, {
        name: newGroupName,
        description: newDescription
    })
}

export async function GetUsersWithDisplayNamePromise(name: string) {
    const usersRef = collection(firebase.db, "users");
    const _query = query(usersRef, where("lowerCaseName", "==", name.toLowerCase()));
    const snapshot = await getDocs(_query);

    interface Person {
        userID: string,
        displayName: string,
        image: string
    }

    const users: Person[] = [];

    snapshot.forEach((_doc) => {
        const _data = _doc.data();
        users.push({ userID: _doc.id, displayName: _data.displayName, image: _data.image })
    });

    return users;
}

export async function GetGroupInfoPromise(uid: string) {
    const _data = await GetDataFromDocumentPromise("groups", uid);
    const groupData = _data as GroupInfo;
    return groupData;
}