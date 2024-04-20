import { test, expect } from 'vitest'
import { render, screen } from "@testing-library/react"
import LoginPage from '../../src/pages/LoginPage.tsx'
import user from '@testing-library/user-event'
import React from 'react'
import { BrowserRouter } from 'react-router-dom';

test("E-mail input error appears", async () => {
    user.setup();

    render(
        <BrowserRouter>
            <LoginPage />
        </BrowserRouter>
    )
    const emailTextBox = await screen.findByPlaceholderText("example@mail.com");

    await user.type(emailTextBox, "#")
    await new Promise(res => setTimeout(res, 1100));
    const formatError = screen.getByText("E-mail format is invalid.");
    expect(formatError).toBeInTheDocument();

    await user.clear(emailTextBox);
    await user.type(emailTextBox, "eggsduty@gmail.com");
    const beginningError = screen.queryByText(/beginning/i);
    expect(formatError).not.toBeInTheDocument();
    expect(beginningError).toBeNull();

    await user.type(emailTextBox, "#");
    await new Promise(res => setTimeout(res, 1100));
    const endingError = screen.getByText(/ending/i);
    expect(endingError).toBeInTheDocument();

    await user.clear(emailTextBox);
    await user.type(emailTextBox, "eggs-duty@gmail.com");
    await new Promise(res => setTimeout(res, 1100));
    expect(screen.getByText(/beginning/i)).toBeInTheDocument();

}, 10000);

test("Password input error appears", async () => {
    user.setup();

    render(
        <BrowserRouter>
            <LoginPage />
        </BrowserRouter>
    )

    const passwordTextBox = await screen.findByPlaceholderText("Must contain a letter, capital letter and digit");

    await user.type(passwordTextBox, "password1")
    await new Promise(res => setTimeout(res, 1100));
    const capitalError = screen.getByText("Your password should contain a capital letter.");
    expect(capitalError).toBeInTheDocument();

    await user.clear(passwordTextBox);
    await user.type(passwordTextBox, "Password")
    await new Promise(res => setTimeout(res, 1100));
    const numberError = screen.getByText("Your password should contain a number.");
    expect(numberError).toBeInTheDocument();

    await user.clear(passwordTextBox);
    await user.type(passwordTextBox, "Password1")
    const capitalErrorNull = screen.queryByText("Your password should contain a capital letter.");
    const numberErrorNull = screen.queryByText("Your password should contain a number.");
    expect(capitalErrorNull).toBeNull();
    expect(numberErrorNull).toBeNull();
});