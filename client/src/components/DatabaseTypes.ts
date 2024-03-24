import { FieldValue, Timestamp } from "firebase/firestore"

export interface UserInfo {
    displayName: string,
    email: string,
    imagePath: string,
    description: string,
    groups: string[]
}

export interface GroupInfo {
    name: string,
    description: string,
    creationDate: Timestamp,
    members: string[],
    leaderID: string,
    leaderName: string
}