function HasOneAtSign(email: string): boolean {
    const regex = /@/;
    const match = regex.exec(email);
    if (match) {
        if (match.length === 1) {
            return true;
        }
    }

    return false;
}

function HasValidFormat(email: string): boolean {
    const regex = /.+@.+\..+/;
    const match = regex.exec(email);
    if (match != null) {
        if (match[0] === email) {
            return true;
        }
    }

    return false;
}

function GetTLD(email: string): string | null {
    const fromAtSign = /(?<=@).+/.exec(email);
    if (fromAtSign === null) {
        return null;
    }

    const tld = /(?<=\.).+/.exec(fromAtSign[0]);
    if (tld === null) {
        return null;
    }

    return tld[0];
}

function ValidateEmail(email: string): string[] {
    const errors: string[] = [];

    if (!HasOneAtSign(email) || !HasValidFormat(email)) {
        errors.push("EmailInvalidFormat");
        return errors.sort((a, b) => a.localeCompare(b));
    }

    const beginning = /.+(?=@)/.exec(email);
    if (beginning != null) {
        if (/[^a-zA-Z\d.]/.exec(beginning[0]) != null) {
            errors.push("EmailBeginningInvalid");
        }
    }

    const domain = /(?<=@).+(?=\.)/.exec(email);
    if (domain != null) {
        if (/[^a-zA-Z\d.-]/.exec(domain[0]) != null) {
            errors.push("EmailDomainInvalid");
        }
    }

    const tld = GetTLD(email);
    if (tld != null) {
        if (/[^a-zA-Z]/.exec(tld) != null) {
            if (!errors.includes("EmailDomainInvalid")) {
                errors.push("EmailDomainInvalid");
            }
        }
    }

    return errors.sort((a, b) => a.localeCompare(b));
}

function ValidatePassword(password: string): string[] {
    const errors: string[] = [];

    if (password.length < 6) {
        errors.push("PasswordTooShort");
    }
    if (/\s+/.exec(password) != null) {
        errors.push("PasswordHasSpaces");
    }
    if (/[A-Z]/.exec(password) == null) {
        errors.push("PasswordHasNoCapitals");
    }
    if (/[a-z]/.exec(password) == null) {
        errors.push("PasswordHasNoRegularLetters");
    }
    if (/\d/.exec(password) == null) {
        errors.push("PasswordHasNoNumbers");
    }

    // This finds if a string has special symbols like č, 大 or ` but not those found in passwords like _ or ?
    if (/[^a-z\d!@#$%^&*()_\-+={[}\]|\\:;"'<,>.?/\s]/i.exec(password) != null) {
        errors.push("PasswordHasSpecialSymbols");
    }

    return errors.sort((a, b) => a.localeCompare(b));
}

function ValidateUsername(username: string): string[] {
    const errors: string[] = [];

    if (username.length < 4) {
        errors.push("UsernameTooShort");
    }
    if (username.length > 20) {
        errors.push("UsernameTooLong");
    }
    if (/[^\w]/.exec(username) != null) {
        errors.push("UsernameHasInvalidSymbols");
    }

    return errors.sort((a, b) => a.localeCompare(b));
}

function ValidateRepeatPassword(password: string, repeatPassword: string) {
    const errors: string[] = [];

    if (password !== repeatPassword) {
        errors.push("PasswordsNotSame");
    }

    return errors.sort((a, b) => a.localeCompare(b));
}

function ValidateDescription(description: string) {
    const errors: string[] = [];

    if (description.length > 255) {
        errors.push("DescriptionTooLong");
    }

    return errors.sort((a, b) => a.localeCompare(b));
}

function ValidateGroupName(name: string): string[] {
    const errors: string[] = [];
    name = name.trim();

    if (name.length < 4) {
        errors.push("GroupNameTooShort");
    }
    if (name.length > 20) {
        errors.push("GroupNameTooLong");
    }

    return errors.sort((a, b) => a.localeCompare(b));
}

function ValidateGroupDescription(description: string): string[] {
    const errors: string[] = [];
    description = description.trim();

    if (description.length > 255) {
        errors.push("DescriptionTooLong");
    }

    return errors.sort((a, b) => a.localeCompare(b));
}

function ValidateEventTitle(title: string): string[] {
    const errors: string[] = [];
    title = title.trim();

    if (title.length < 4) {
        errors.push("TitleTooShort");
    }
    if (title.length > 60) {
        errors.push("TitleTooLong");
    }
    if (/;/.exec(title) != null) {
        errors.push("TitleHasSemicolon");
    }

    return errors.sort((a, b) => a.localeCompare(b));
}

function ValidateEventDate(startDate: string, endDate: string): string[] {
    const errors: string[] = [];

    if (startDate > endDate) {
        errors.push("DateInvalid");
    }

    return errors.sort((a, b) => a.localeCompare(b));
}

function ValidateEventDescription(description: string): string[] {
    const errors: string[] = [];
    description = description.trim();

    if (description.length > 255) {
        errors.push("DescriptionTooLong");
    }
    if (/;/.exec(description) != null) {
        errors.push("DescriptionHasSemicolon");
    }

    return errors.sort((a, b) => a.localeCompare(b));
}


export default { ValidateEmail, ValidatePassword, ValidateUsername, ValidateRepeatPassword, ValidateDescription, ValidateGroupName, ValidateGroupDescription, ValidateEventTitle, ValidateEventDate, ValidateEventDescription };