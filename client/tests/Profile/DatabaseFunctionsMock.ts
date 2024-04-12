import { Timestamp } from 'firebase/firestore';
import { GroupInfo, UserInfo } from '../../src/components/DatabaseTypes.ts';

export async function GetUserDataFromDocumentPromise(collection: string, id: string) {
    console.log("call");
    const fakeUser: UserInfo = {
        displayName: "NameOfUser",
        email: "email@mail.com",
        description: "desc",
        image: "/placeholder.jpg",
        groups: [],
        groupInvites: [],
        friends: ["1"],
        friendInvites: ["2"]
    }

    return fakeUser;
}

export async function GetUserDisplayNamePromise(uid: string) {
    return "NameOfUser";
}

export async function GetUserEmailPromise(uid: string) {
    return "email@mail.com";
}

export async function CreateGroupInvitePromise(uid: string, groupID: string, groupName: string, groupLeader: string) {
    return;
}

export async function GetUserGroupInvitesPromise(uid: string) {
    return ["1"];
}

export async function AcceptUserIntoGroupPromise(uid: string, groupID: string) {
    return;
}

export async function DeleteUserGroupInvitePromise(uid: string, value: string) {
    return;
}

export async function AcceptFriendRequestPromise(uid: string, friendID: string) {
    return;
}

export async function DeleteUserFriendInvitePromise(uid: string, value: string) {
    return;
}


export async function GetUserInfoForHeaderPromise(uid: string) {
    return { displayName: "NameOfUser", email: "email@mail.com", image: "/placeholder.jpg"};
}

export async function GetUserInfoForMemberList(uid: string) {
    return { displayName: "NameOfUser", image: "/placeholder.jpg", uid: "1" };
}


export async function GetFriendInvitesListOfUser(uid: string) {
    return ["2"];
}

export async function GetFriendsListOfUser(uid: string) {
    return ["2"];
}

export async function CreateFriendInvitePromise(uid: string, friendID: string) {
    return;
}

export async function DeleteUserFromGroupPromise(uid: string, groupID: string) {
    return;
}

export async function DeleteGroupIDPromise(groupID: string) {
    return;
}

export async function UpdateLeaderNameInGroupListPromise(groupID: string, newName: string) {
    return;
}

export async function UpdateUserDataPromise(uid: string, updateMap: {}) {
    return;
}

export async function GetUsersWithDisplayNamePromise(name: string) {
    return ["NameOfUser", "NameOfUser"];
}

export async function GetGroupInfoPromise(uid: string) {
    const group: GroupInfo = {
        name: "Group",
        description: "desc",
        creationDate: Timestamp.now(),
        members: ["1"],
        leaderID: "1",
        leaderName: "NameOfLeader"
    }

    return group;
}