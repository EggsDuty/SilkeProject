import { Dispatch, ReactElement, SetStateAction, useEffect, useState } from "react";

interface Props {
    defaultText: string,
    validateFunction: Function,
    var: string,
    setter: Dispatch<SetStateAction<string>>,
    textarea: boolean
}

const errorMap: { [id: string]: ReactElement } = {
    "UsernameHasInvalidSymbols": <>Username should only contain letters, numbers and underscores.</>,
    "UsernameTooShort": <>Username should be at least 4 characters long.</>,
    "UsernameTooLong": <>Username should be shorter than 20 characters.</>,
    "DescriptionTooLong": <>Description is too long.</>
}



function ProfileEditField(props: Props) {
    const defaultValue: string[] = [];
    const [errors, setErrors] = useState(defaultValue);

    useEffect(() => {
        const _errors = props.validateFunction(props.var);
        if (_errors.length === 0 || props.var.length === 0) {
            setErrors([]);
            return;
        }

        const debounce = setTimeout(() => {
            setErrors(_errors);
        }, 1000)

        return () => clearTimeout(debounce);
    }, [props.var]);

    return (
        <div className="flex flex-col mb-5 w-full m-auto transition-transform">
            {props.textarea ?
                <textarea onChange={(e) => props.setter(e.target.value)} rows={4} defaultValue={props.defaultText} placeholder="Enter a new description" className="bg-blue-950 border-indigo-300 text-xl text-white mt-3 py-2 px-4 w-full border rounded-md resize-none"></textarea> :
                <input onChange={(e) => props.setter(e.target.value)} type="text" defaultValue={props.defaultText} placeholder="Enter a new username" className="bg-blue-950 border-indigo-300 focus:border-white outline-none border h-12 rounded-md text-2xl mt-3 px-2 py-4 text-white" />
            }
            {errors.map((item) => (
                <div key={item} className="my-3 rounded-sm text-leftw-[90%]">
                    <p className="text-red-300">{errorMap[item]}</p>
                </div>
            ))}
        </div>
    );
}

export default ProfileEditField;