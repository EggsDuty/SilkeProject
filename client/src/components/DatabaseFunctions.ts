import firebase from '../firebase.tsx';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { UserInfo } from './DatabaseTypes.ts';

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

export async function GetUserInfoForHeader(uid: string) {
    const _data = await GetUserDataFromDocumentPromise("users", uid);
    const userData = _data as UserInfo;
    return { displayName: userData.displayName, email: _data.email, image: userData.image };
}

export async function UpdateUserDataPromise(uid: string, updateMap: {}) {
    const userRef = doc(firebase.db, "users", uid);
    await updateDoc(userRef, updateMap);
}

export default { GetUserDataFromDocumentPromise, GetUserDisplayNamePromise, GetUserEmailPromise, GetUserInfoForHeader, UpdateUserDataPromise };