import firebase from '../firebase.tsx';
import { doc, getDoc } from 'firebase/firestore';
import { UserInfo } from './DatabaseTypes.ts';

export async function GetDataFromDocument(collection: string, id: string): Promise<{}> {
    console.log("call");
    const ref = doc(firebase.db, collection, id);
    const retrievedDoc = await getDoc(ref);

    if (retrievedDoc.exists()) {
        return retrievedDoc.data();
    } else {
        return {};
    }
}

export async function GetUserDisplayName(uid: string) {
    GetDataFromDocument("users", uid).then((data) => {
        return (data as UserInfo).displayName;
    })
}

export async function GetUserEmail(uid: string) {
    GetDataFromDocument("users", uid).then((data) => {
        return (data as UserInfo).email;
    })
}

export default { GetDataFromDocument, GetUserDisplayName, GetUserEmail };