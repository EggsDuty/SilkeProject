import { test, expect } from '@jest/globals';
import Validator from '../../src/components/Auth/Validator.ts';

test('Check if string is e-mail', () => {
    expect(Validator.ValidateEmail("a")).toBe("InvalidEmail");
    expect(Validator.ValidateEmail("email@gmail.com")).toBe("ValidEmail");
})

// If an array has multiple members, use .sort() so that you don't have to manually ensure the order of elements.
test('Check if password is valid', () => {
    expect(Validator.ValidatePassword("Slaptazodis")).toEqual(["PasswordHasNoNumbers"]);
    expect(Validator.ValidatePassword("slaptazodis123")).toEqual(["PasswordHasNoCapitals"]);
    expect(Validator.ValidatePassword("Slaptažodis123")).toEqual(["PasswordHasSpecialSymbols"]);
    expect(Validator.ValidatePassword("Sla_1")).toEqual(["PasswordTooShort"]);
    expect(Validator.ValidatePassword("Sl aptazodis_123")).toEqual(["PasswordHasSpaces"]);
    expect(Validator.ValidatePassword("SLAPTAZODIS_123")).toEqual(["PasswordHasNoRegularLetters"]);
    expect(Validator.ValidatePassword("1 ")).toEqual(["PasswordHasSpaces", "PasswordTooShort", "PasswordHasNoCapitals", "PasswordHasNoRegularLetters"].sort());
    expect(Validator.ValidatePassword("slaptazodis123")).toEqual(["PasswordHasNoCapitals"]);
    expect(Validator.ValidatePassword("Slaptazodis_123")).toEqual([]);
    expect(Validator.ValidatePassword("Slaptazodis`123")).toEqual(["PasswordHasSpecialSymbols"]);
})