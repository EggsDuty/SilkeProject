import { Dispatch, ReactElement, SetStateAction, useEffect, useState } from "react";

interface Props {
    name: string,
    type: string,
    placeholder: string,
    validateFunction: Function,
    var: string,
    setter: Dispatch<SetStateAction<string>>,
    isDescription?: boolean,
    defaultValue?: string
}

const errorMap: { [id: string]: ReactElement } = {
    "GroupNameTooShort": <>Group name should be at least 4 characters</>,
    "GroupNameTooLong": <>Group name can't have more than 20 characters</>,
    "DescriptionTooLong": <>Description is too long</>,
    "TitleTooLong": <>Title can't have more than 60 characters</>,
    "DateInvalid": <>The end date cannot be before the start date</>,
    "TitleTooShort": <>Title should be at least 4 characters</>,
    "TitleHasSemicolon": <>Title can't have semicolons</>,
    "DescriptionHasSemicolon": <>Description can't have semicolons</>
}



function GroupField(props: Props) {
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
        <div className="flex flex-col mb-5 w-full m-auto transition-transform mt-10">
            <label className="text-2xl text-white mb-3">{props.name}</label>
            {props.isDescription ? 
                <textarea onChange={(e) => props.setter(e.target.value)} rows={4} placeholder={props.placeholder} defaultValue={props.defaultValue} className="bg-blue-950 border-indigo-300 focus:border-white outline-none border h-36 rounded-lg text-xl px-2 py-4 text-white placeholder:text-lg resize-none"></textarea>
                :
                <input onChange={(e) => props.setter(e.target.value)} type={props.type} placeholder={props.placeholder} defaultValue={props.defaultValue} className="bg-blue-950 border-indigo-300 focus:border-white outline-none border h-12 rounded-lg text-xl px-2 py-4 text-white placeholder:text-lg "></input>
            }
            {errors.map((item) => (
                <div key={item} className="mt-2 ml-2">
                    <p className="text-red-400">{errorMap[item]}</p>
                </div>
            ))}
        </div>
    );
}

export default GroupField;