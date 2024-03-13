/* function ValidateEmail(email: string): string {
    if (email.match(/\w+@\w+\.\w+/) == null) {
        return "InvalidEmail";
    }

    return "ValidEmail";
} */

function ValidateEmail(email: string): string[] {
    let errors: string[] = [];

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
                            errors.push("EmailDomainInvalid");
                        }
                    }

                    const fromAtSign = email.match(/(?<=@).+/);
                    if (fromAtSign != null) {
                        const tld = fromAtSign[0].match(/(?<=\.).+/);
                        if (tld != null) {
                            if (tld[0].match("[^a-zA-Z]") != null) {
                                errors.push("EmailDomainInvalid");
                            }
                        }
                    }
                }
            }
        }

        /* if (match[0] == email) {
            validFormat = true;

            let beginning = email.match(/.+(?=@)/);
            if (beginning != null) {
                if (beginning[0].match(/[^a-zA-Z\d\.]/) != null) {
                    errors.push("EmailBeginningInvalid");
                }
            }

            let domain = email.match(/(?<=@).+(?=\.)/);
            if (domain != null) {
                if (domain[0].match(/[^a-zA-Z\d\.\-]/) != null) {
                    errors.push("EmailDomainInvalid");
                }
            }

        } */
    }

    if (!validFormat) {
        errors.push("EmailInvalidFormat");
    }

    return errors.sort()
}

function ValidatePassword(password: string): string[] {
    let errors: string[] = [];

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

export default { ValidateEmail, ValidatePassword };