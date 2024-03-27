import { vi } from 'vitest'
import { render, screen } from "@testing-library/react"
import AuthField from '../../src/components/Auth/AuthField.tsx'
import Validator from '../../src/components/Auth/Validator.ts'
import user from '@testing-library/user-event'
import { useState } from 'react';
import React from 'react'

test("Label appears", async () => {
    user.setup();
    const [email, setEmail] = useState("");
    //const mockFunction = vi.fn();

    render(<AuthField name={"E-mail"} type={"text"} placeholder={"example@mail.com"} validateFunction={Validator.ValidateEmail} var={email} setter={setEmail} />);
    const textBox = screen.getByPlaceholderText("example@mail.com");

    await user.type(textBox, "3")

    const error = screen.getByText("E-mail format is invalid.")
    expect(error).toBeInTheDocument();
})