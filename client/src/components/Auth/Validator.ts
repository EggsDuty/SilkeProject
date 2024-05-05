function ValidateEmail(email: string): string[] {
    const errors: string[] = [];

    let validFormat = false;
    const atSign = email.match(/@/)

    if (atSign != null) {
        if (atSign.length == 1) {
            const match = email.match(/.+@.+\..+/)
            if (match != null) {
                if (match[0] == email) {
                    validFormat = true;

                    const beginning = email.match(/.+(?=@)/);
                    if (beginning != null) {
                        if (beginning[0].match(/[^a-zA-Z\d\.]/) != null) {
                            errors.push("EmailBeginningInvalid");
                        }
                    }

                    const domain = email.match(/(?<=@).+(?=\.)/);
                    if (domain != null) {
                        if (domain[0].match(/[^a-zA-Z\d\.\-]/) != null) {
                            if (!errors.includes("EmailDomainInvalid")) {
                                errors.push("EmailDomainInvalid");
                            }
                        }
                    }

                    const fromAtSign = email.match(/(?<=@).+/);
                    if (fromAtSign != null) {
                        const tld = fromAtSign[0].match(/(?<=\.).+/);
                        if (tld != null) {
                            if (tld[0].match("[^a-zA-Z]") != null) {
                                if (!errors.includes("EmailDomainInvalid")) {
                                    errors.push("EmailDomainInvalid");
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    if (!validFormat) {
        errors.push("EmailInvalidFormat");
    }

    return errors.sort()
}

function ValidatePassword(password: string): string[] {
    const errors: string[] = [];

    if (password.length < 6) {
        errors.push("PasswordTooShort");
    }
    if (password.match(/\s+/) != null) {
        errors.push("PasswordHasSpaces");
    }
    if (password.match(/[A-Z]/) == null) {
        errors.push("PasswordHasNoCapitals");
    }
    if (password.match(/[a-z]/) == null) {
        errors.push("PasswordHasNoRegularLetters");
    }
    if (password.match(/\d/) == null) {
        errors.push("PasswordHasNoNumbers");
    }

    // This finds if a string has special symbols like č, 大 or ` but not those found in passwords like _ or ?
    if (password.match(/[^a-z\d\!\@\#\$\%\^&\*\(\)\_\-\+=\{\[\}\]\|\\\:\;\"\'\<\,\>\.\?\/\s]/i) != null) {
        errors.push("PasswordHasSpecialSymbols")
    }

    return errors.sort()
}

function ValidateUsername(username: string): string[] {
    const errors: string[] = [];

    if (username.length < 4) {
        errors.push("UsernameTooShort");
    }
    if (username.length > 20) {
        errors.push("UsernameTooLong");
    }
    if (username.match(/[^\w]/) != null) {
        errors.push("UsernameHasInvalidSymbols");
    }

    return errors.sort()
}

function ValidateRepeatPassword(password: string, repeatPassword: string) {
    const errors: string[] = [];

    if (password !== repeatPassword) {
        errors.push("PasswordsNotSame");
    }

    return errors.sort();
}

function ValidateDescription(description: string) {
    const errors: string[] = [];

    if (description.length > 255) {
        errors.push("DescriptionTooLong");
    }

    return errors.sort();
}

function ValidateGroupName(name: string): string[] {
    const errors: string[] = [];
    name=name.trim();

    if (name.length < 4) {
        errors.push("GroupNameTooShort");
    }
    if (name.length > 20) {
        errors.push("GroupNameTooLong");
    }

    return errors.sort()
}

function ValidateGroupDescription(description: string): string[] {
    const errors: string[] = [];
    description=description.trim();

    if(description.length > 255){
        errors.push("DescriptionTooLong");
    }
    
    return errors.sort()   
}

function ValidateEventTitle(title: string): string[] {
    const errors: string[] = [];
    title=title.trim();

    if (title.length < 4) {
        errors.push("TitleTooShort");
    }
    if(title.length > 80){
        errors.push("TitleTooLong");
    }
    
    return errors.sort()   
}

function ValidateEventDate(startDate: string, endDate: string): string[] {
    const errors: string[] = [];

    if(startDate > endDate){
        errors.push("DateInvalid");
    }
    
    return errors.sort()   
}


export default { ValidateEmail, ValidatePassword, ValidateUsername, ValidateRepeatPassword, ValidateDescription, ValidateGroupName, ValidateGroupDescription, ValidateEventTitle, ValidateEventDate };