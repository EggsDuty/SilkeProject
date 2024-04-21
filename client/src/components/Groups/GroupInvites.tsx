import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { AcceptUserIntoGroupPromise, DeleteUserGroupInvitePromise, GetUserDisplayNamePromise, GetUserGroupInvitesPromise } from '../DatabaseFunctions.ts';

interface Props {
    uid: string,
    setDoneGettingGroups: Dispatch<SetStateAction<boolean>>
}

interface Invite {
    originalForm: string,
    groupID: string,
    groupName: string,
    groupLeader: string,
}

function GroupInvites(props: Props) {
    const [inviteArray, setInviteArray] = useState<Invite[]>([]);
    const [loading, setLoading] = useState(true);

    function handleAccept(groupID: string, valueToRemove: string) {
        AcceptUserIntoGroupPromise(props.uid, groupID).then(() => {
            DeleteUserGroupInvitePromise(props.uid, valueToRemove).then(() => {
                props.setDoneGettingGroups(false);
                setLoading(true);
            });
        });
    }

    function handleDecline(valueToRemove: string) {
        DeleteUserGroupInvitePromise(props.uid, valueToRemove).then(() => {
            setLoading(true);
        });
    }

    useEffect(() => {
        if (props.uid) {
            GetUserGroupInvitesPromise(props.uid).then(async (_invites) => {
                if (_invites) {
                    const parsedInvites: Invite[] = [];
                    for (const invite of _invites) {
                        const parts = invite.split(";");
                        const groupLeaderName = await GetUserDisplayNamePromise(parts[2]);
                        parsedInvites.push({ originalForm: invite, groupID: parts[0], groupName: parts[1], groupLeader: groupLeaderName });
                    }
                    setInviteArray(parsedInvites);
                    setLoading(false);
                }
            });
        }
    }, [loading]);

    if (loading) {
        return (
            <div className="flex flex-row  mt-6 ml-6 align-middle">
                <img src="loading_picture.svg" className="animate-spin invert h-10" />
                <p className="text-gray-500 text-2xl font-bold ml-2">Loading...</p>
            </div>
        );
    }

    return (
        <div className="h-[80%] mt-5 px-5">
            <div className="flex flex-col h-full overflow-y-scroll  p-3">
                {inviteArray.length > 0 ? inviteArray.map((_invite, _index) => (
                    <div key={_index} className="flex flex-row bg-blue-950 border-indigo-300 rounded-lg w-full h-max mb-5 py-3">
                        <div className="flex flex-col h-full ml-10">
                            <h2 className="text-3xl">{_invite.groupName}</h2>
                            <p className="text-neutral-300">By: {_invite.groupLeader}</p>
                        </div>
                        <div className="flex justify-center mr-5 ml-auto">
                            <button className="text-2xl mr-10 text-emerald-300 hover:text-emerald-200" onClick={() => handleAccept(_invite.groupID, _invite.originalForm)}>Accept</button>
                            <button className="text-2xl text-red-300 hover:text-red-200" onClick={() => handleDecline(_invite.originalForm)}>Decline</button>
                        </div>
                    </div>
                )) :
                    <p className="ml-3 text-3xl">No invites!</p>}
            </div>
        </div>
    );
}

export default GroupInvites;