function ValidateEmail(email: string): string {
    if (email.match(/\w+@\w+\.\w+/) == null) {
        return "InvalidEmail";
    }

    return "ValidEmail";
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