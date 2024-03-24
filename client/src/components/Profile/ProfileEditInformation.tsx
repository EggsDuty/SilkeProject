import { Dispatch, SetStateAction, useState } from "react";
import ProfileEditField from "./ProfileEditField";
import Validator from "../Auth/Validator";
import { UpdateUserDataPromise } from "../DatabaseFunctions";
import { Navigate } from "react-router-dom";

interface Props {
    uid: string,
    displayName: string,
    description: string,
    setEditMode: Dispatch<SetStateAction<boolean>>
}

function toBase64(file: File, onLoadCallback: ((this: FileReader, ev: ProgressEvent<FileReader>) => any) | null) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = onLoadCallback;
}

function ProfileEditInformation(props: Props) {
    const [image, setImage] = useState<File | null>(null);
    const [newDisplayName, setNewDisplayName] = useState(props.displayName);
    const [newDescription, setNewDescription] = useState(props.description);
    const [saved, setSaved] = useState(false);

    let hasErrors = false;
    if (Validator.ValidateUsername(newDisplayName).length > 0 || Validator.ValidateDescription(newDescription).length > 0) {
        hasErrors = true;
    }

    if (saved) {
        return <Navigate to="/home" />
    }

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const files = e.target.files;
        if (files !== null) {
            if (files.length > 1) {
                console.log("Too many files.");
                return;
            }
            const file = files.item(0);
            if (file!.size > 8_000_000) {
                console.log("File too large.")
                return;
            }

            setImage(file);
        }
    }

    function handleSave() {
        if (hasErrors) {
            return;
        }

        const updateMap: { displayName?: string, description?: string, image?: string } = {};

        if (props.displayName !== newDisplayName) {

            updateMap.displayName = newDisplayName;
        }

        if (props.description !== newDescription) {
            updateMap.description = newDescription;
        }

        if (image !== null) {
            toBase64(image, (_result: ProgressEvent<FileReader>) => {
                if (_result.target !== null) {
                    updateMap.image = _result.target.result as string;
                }
                UpdateUserDataPromise(props.uid, updateMap).then(() => {
                    setSaved(true);
                });
            });
        } else {
            UpdateUserDataPromise(props.uid, updateMap).then(() => {
                setSaved(true);
            });
        }
    }

    return (
        <>
            <h1 className="text-5xl text-white text-left">Edit profile</h1>
            <hr className="border border-white my-10 w-auto -mx-10" />

            <h2 className="text-4xl text-white text-left">Profile picture</h2>
            <input onChange={handleFileChange} type="file" title="hi" accept="image/png, image/jpeg, image/jpg" className="mt-3 text-white" />
            {image !== null ?
                <>
                    <p className="text-2xl text-white my-3">Preview:</p>
                    <img src={URL.createObjectURL(image)} className="h-32 w-32 rounded-full" />
                </> :
                ""}

            <h2 className="text-4xl text-white text-left mt-10">Username</h2>
            <ProfileEditField defaultText={props.displayName} validateFunction={Validator.ValidateUsername} var={newDisplayName} setter={setNewDisplayName} textarea={false} />

            <h2 className="text-4xl text-white text-left mt-10">Description</h2>
            <ProfileEditField defaultText={props.description} validateFunction={Validator.ValidateDescription} var={newDescription} setter={setNewDescription} textarea={true} />

            <div className="flex flex-row mt-10">
                <button onClick={() => props.setEditMode(false)} className="py-2 px-6 rounded-lg text-purple-200 bg-blue-950 border border-indigo-300 hover:border-white hover:bg-indigo-200 hover:text-secondaryColor">Cancel</button>
                <button onClick={handleSave} className={`py-2 px-6 ml-5 rounded-lg text-purple-200  border border-indigo-300 ${!hasErrors ? "bg-indigo-800 hover:bg-indigo-200 hover:text-secondaryColor hover:border-white" : "bg-red-500 cursor-not-allowed"}`}>{saved ? "Saved!" : "Save"}</button>
            </div>
        </>
    );
}

export default ProfileEditInformation;