import { test, expect, vi } from 'vitest'
import { render, screen } from "@testing-library/react"
import ProfileInformation from '../../src/components/Profile/ProfileInformation.tsx'
import ProfileEditInformation from '../../src/components/Profile/ProfileEditInformation.tsx'
import user from '@testing-library/user-event'
import React from 'react'
import { BrowserRouter } from 'react-router-dom';
import { UserInfo } from '../../src/components/DatabaseTypes.ts'

const info = {
    uid: "id123",
    displayName: "Eggs",
    email: "eggsduty@gmail.com",
    description: "desc",
    image: "abc",
    groups: [],
    friends: [],
    groupInvites: [],
    friendInvites: []
};

test("Profile information is gotten from database correctly", async () => {
    user.setup();

    const own = true;
    const setEditMode = vi.fn();

    render(
        <BrowserRouter>
            <ProfileInformation info={info} own={own} setEditMode={setEditMode} />
        </BrowserRouter>
    )

    const username = screen.getByText(info.displayName);
    expect(username).toBeInTheDocument();

    const email = screen.getByText(info.email);
    expect(email).toBeInTheDocument();

    const description = screen.getByText(info.description);
    expect(description).toBeInTheDocument(description);

    const editButton = screen.getByText("Edit").closest("div");
    await user.click(editButton!);
    expect(setEditMode).toHaveBeenCalledOnce();
});

test("Profile information in edit page is gotten correctly", async () => {
    user.setup();
    const setEditMode = vi.fn();

    render(
        <BrowserRouter>
            <ProfileEditInformation uid={info.uid} displayName={info.displayName} description={info.description} setEditMode={setEditMode} />
        </BrowserRouter>
    )

    const username = screen.getByDisplayValue(info.displayName);
    expect(username).toBeInTheDocument();

    const description = screen.getByDisplayValue(info.description);
    expect(description).toBeInTheDocument(description);

    const cancelButton = screen.getByText("Cancel");
    await user.click(cancelButton);
    expect(setEditMode).toHaveBeenCalledOnce();
});