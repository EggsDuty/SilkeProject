function ValidatePassword(password: string): boolean {
    return password.length > 5;
}

export default ValidatePassword;