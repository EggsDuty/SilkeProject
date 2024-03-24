import { getAuth } from 'firebase/auth';
import firebase from '../firebase.tsx';
import DatabaseFunctions from '../components/DatabaseFunctions.ts';
import { UserInfo } from '../components/DatabaseTypes.ts';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useParams } from 'react-router-dom';
import Header from '../components/Header.tsx';
import ProfileInformation from '../components/Profile/ProfileInformation.tsx';
import ProfileEditInformation from '../components/Profile/ProfileEditInformation.tsx';

const auth = getAuth(firebase.app);

function ProfilePage() {
    const { uid } = useParams();
    const [user, loading] = useAuthState(auth);
    const [data, setData] = useState({});

    const [editMode, setEditMode] = useState(false);

    if (!uid) {
        return <Navigate to="/" replace={true} />
    }

    useEffect(() => {
        if (uid !== null) {
            DatabaseFunctions.GetUserDataFromDocumentPromise("users", uid).then((_data) => {
                setData(_data);
            });
        }
    }, [loading, uid]);

    const convertedData = data as UserInfo;

    if (Object.keys(data).length === 0) {
        return <>Loading...</>
    }

    return (
        <div className="h-screen w-screen absolute overflow-x-hidden">
            <Header />
            <div className="bg-extraColor1 rounded-lg bg-opacity-80 w-1/2 mx-auto p-10 mt-10 drop-shadow-[0_6.2px_6.2px_rgba(0,0,0,0.8)]">
                {!editMode ?
                    <ProfileInformation own={user?.uid === uid} info={convertedData} setEditMode={setEditMode} /> :
                    <ProfileEditInformation uid={user!.uid} displayName={convertedData.displayName} description={convertedData.description} setEditMode={setEditMode} />
                }
            </div>
        </div>
    );
}

export default ProfilePage;