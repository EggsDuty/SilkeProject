import { getAuth } from 'firebase/auth';
import firebase from '../firebase.tsx';
import DatabaseFunctions from '../components/DatabaseFunctions.ts';
import { UserInfo } from '../components/DatabaseTypes.ts';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

const auth = getAuth(firebase.app);

function ProfilePage() {
    const [user, loading] = useAuthState(auth);
    const [data, setData] = useState({});

    const params = new URLSearchParams(window.location.search);
    let uid = params.get('uid');

    if (uid === null) {
        if (user) {
            uid = user.uid;
        }
    }

    useEffect(() => {
        if (uid !== null) {
            DatabaseFunctions.GetDataFromDocument("users", uid).then((_data) => {
                setData(_data);
            });
        }
    }, [loading]);

    const convertedData = data as UserInfo;

    return (
        <div className="bg-indigo-900 rounded-lg opacity-70">
            <img src={convertedData.imagePath !== "" ? convertedData.imagePath : "placeholder.jpg"} />
            <p>{convertedData.displayName}</p>
            <p>{convertedData.email}</p>
            <p>{convertedData.description}</p>
        </div>
    );
}

export default ProfilePage;