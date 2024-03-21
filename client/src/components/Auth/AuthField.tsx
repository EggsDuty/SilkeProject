import { Dispatch, ReactElement, SetStateAction, useEffect, useState } from "react";

interface Props {
    name: string,
    type: string,
    placeholder: string,
    validateFunction: Function,
    var: string,
    setter: Dispatch<SetStateAction<string>>
}

const errorMap: { [id: string]: ReactElement } = {
    "EmailInvalidFormat": <>E-mail format is invalid.</>,
    "EmailDomainInvalid": <>Ending of e-mail is wrong: example@<u>mail.com</u></>,
    "EmailBeginningInvalid": <>Beginning of e-mail is wrong: <u>example</u>@mail.com</>,
    "PasswordTooShort": <>Your password should contain at least 6 characters.</>,
    "PasswordHasSpaces": <>Your password should <i>not</i> contain spaces.</>,
    "PasswordHasNoCapitals": <>Your password should contain a capital letter.</>,
    "PasswordHasNoRegularLetters": <>Your password should contain a regular letter.</>,
    "PasswordHasNoNumbers": <>Your password should contain a number.</>,
    "PasswordHasSpecialSymbols": <>Your password has an illegal character.</>,
    "UsernameHasInvalidSymbols": <>Username should only contain letters, numbers and underscores.</>,
    "UsernameTooShort": <>Username should be at least 4 characters long.</>,
    "UsernameTooLong": <>Username should be shorter than 20 characters.</>,
    "PasswordsNotSame": <>Your passwords should match.</>
}



function AuthField(props: Props) {
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
            <label className="text-3xl text-white mb-3">{props.name}</label>
            <input onChange={(e) => props.setter(e.target.value)} type={props.type} placeholder={props.placeholder} className="bg-indigo-500 border-indigo-300 focus:border-white outline-none border h-12 rounded-md text-2xl px-2 py-4 text-white placeholder:text-lg"></input>
            {errors.map((item) => (
                <div key={item} className="bg-indigo-900 my-3 p-3 pl-1 rounded-sm text-left border-2 border-red-400 w-[90%]">
                    <p className="text-white">{errorMap[item]}</p>
                </div>
            ))}
        </div>
    );
}

export default AuthField;