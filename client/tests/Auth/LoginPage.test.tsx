import { vi, test, expect } from 'vitest'
import { render, screen } from "@testing-library/react"
import App from '../../src/App.tsx';
import LoginPage from '../../src/pages/LoginPage.tsx'
import Validator from '../../src/components/Auth/Validator.ts'
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
    const textBox = await screen.findByPlaceholderText("example@mail.com");
    await user.type(textBox, "3")

    await new Promise(res => setTimeout(res, 1100));

    const error = screen.getByText("E-mail format is invalid.")
    expect(error).toBeInTheDocument();
});