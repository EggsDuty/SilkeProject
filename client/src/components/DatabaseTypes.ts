import { Timestamp } from "firebase/firestore"

export interface UserInfo {
    displayName: string,
    lowerCaseName: string,
    email: string,
    image: string,
    description: string,
    groups: string[],
    groupInvites: string[],
    friendInvites: string[],
    friends: string[]
}

export interface GroupInfo {
    name: string,
    description: string,
    creationDate: Timestamp,
    members: string[],
    leaderID: string,
    events: string[]
}

export interface Message {
    userID: string,
    name: string,
    time: Timestamp,
    message: string
}