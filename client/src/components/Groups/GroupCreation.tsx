import { FormEvent, useState } from "react";
import Validator from "../Auth/Validator";
import GroupField from "./GroupField";
import { Timestamp } from "firebase/firestore";
import { GroupInfo } from "../DatabaseTypes.ts";
import { CreateNewGroupPromise } from "../DatabaseFunctions.ts";

interface Props {
    closeFunction: any,
    addGroup: any
}

interface ExtendedGroupInfo extends GroupInfo {
    groupID?: string
}


function GroupCreation(props: Props) {
    const userID = localStorage.getItem("uid");
    const [groupName, setGroupName] = useState("");
    const [description, setDescription] = useState("");

    const trimmedGroupName = groupName.trim();
    const trimmedDescription = description.trim();
    let hasErrors = false;
    if (Validator.ValidateGroupName(trimmedGroupName).length !== 0 || Validator.ValidateGroupDescription(trimmedDescription).length !== 0) {
        hasErrors = true;
    }

    async function handleGroupCreation(e: FormEvent) {
        e.preventDefault();

        if (hasErrors) {
            return;
        }

        const groupInfo: ExtendedGroupInfo = {
            name: trimmedGroupName,
            description: trimmedDescription,
            creationDate: Timestamp.now(),
            members: [userID!],
            leaderID: userID!
        }
                
        groupInfo.groupID = await CreateNewGroupPromise(groupInfo, userID!);
        props.addGroup(groupInfo)

        props.closeFunction();
    }

    return (
        <form onSubmit={(e) => handleGroupCreation(e)} className="mx-16">
            <GroupField name="Group name:" placeholder="Your group name..." type="text" validateFunction={Validator.ValidateGroupName} var={trimmedGroupName} setter={setGroupName} />
            <GroupField isDescription={true} name="Description (optional):" placeholder="Your group description..." type="text" validateFunction={Validator.ValidateGroupDescription} var={trimmedDescription} setter={setDescription} />
            <button type="submit" className={`mt-6 py-2 px-6 text-white rounded-lg bg-primaryColor border-2 border-opacity-0 hover:border-opacity-100 border-white ${hasErrors ? "cursor-not-allowed" : ""}`}>Create</button>
        </form>

    )
}

export default GroupCreation;