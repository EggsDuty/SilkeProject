function ValidateEmail(email: string): boolean {
    return email.match(/\w+@\w+\.\w+/) != null;
}

export default ValidateEmail;