import { test, expect, vi } from 'vitest'
import { render, screen } from "@testing-library/react"
import ProfileInformation from '../../src/components/Profile/ProfileInformation.tsx'
import ProfileEditInformation from '../../src/components/Profile/ProfileEditInformation.tsx'
import ProfilePage from '../../src/pages/ProfilePage.tsx'
import user from '@testing-library/user-event'
import React from 'react'
import { BrowserRouter } from 'react-router-dom';
import { UserInfo } from '../../src/components/DatabaseTypes.ts'
import * as dbf from '../../src/components/DatabaseFunctions.ts'

interface UserInfoWithUID extends UserInfo {
    uid: string
}

const info: UserInfoWithUID = {
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

vi.mock('react-router-dom', async (importOriginal) => {
    const mod = await importOriginal<typeof import('react-router-dom')>()
    return {
      ...mod,
      default: { useParams: vi.fn() },
      useParams: vi.fn(() => {return {uid: "1"}}),
    }
});

vi.mock('../../src/components/DatabaseFunctions.ts', async (importOriginal) => {
    const mod = await importOriginal<typeof import('../../src/components/DatabaseFunctions.ts')>()
    return {
        ...mod,
        GetUserDataFromDocumentPromise: async () => {return (info as UserInfo)},
        GetFriendInvitesListOfUser: async () => {return ["1"]},
        GetFriendsListOfUser: async () => {return ["1"]},
        GetUserInfoForMemberList: async () => {return { displayName: info.displayName, image: info.image, userID: info.uid }},
        UpdateUserDataPromise: vi.fn(async () => {}),
        AcceptFriendRequestPromise: vi.fn(async () => {}),
        DeleteUserFriendInvitePromise: vi.fn(async () => {})
    }
});

const declineMock = vi.spyOn(dbf, "DeleteUserFriendInvitePromise");
const acceptMock = vi.spyOn(dbf, "AcceptFriendRequestPromise");
const updateMock = vi.spyOn(dbf, "UpdateUserDataPromise");

test("Information to ProfileInformation.tsx is passed properly via props", async () => {
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

test("Information to ProfileEditInformation.tsx is passed correctly via props", async () => {
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

test("Friend decline works in main profile page", async () => {
    user.setup();

    render(
            <BrowserRouter>
                <ProfilePage />
            </BrowserRouter>
    )

    await new Promise(res => setTimeout(res, 10));

    const inviteButton = screen.getByText("Invites").closest("div");
    await user.click(inviteButton!);

    const declineButton = screen.getByAltText("decline").closest("div");
    await user.click(declineButton!);

    expect(declineMock).toHaveBeenCalledOnce();

    declineMock.mockClear();
});

test("Friend accept works in main profile page", async () => {
    user.setup();

    render(
            <BrowserRouter>
                <ProfilePage />
            </BrowserRouter>
    )

    await new Promise(res => setTimeout(res, 10));

    const inviteButton = screen.getByText("Invites").closest("div");
    await user.click(inviteButton!);

    const acceptButton = screen.getByAltText("accept").closest("div");
    await user.click(acceptButton!);

    expect(acceptMock).toHaveBeenCalledOnce();
    expect(declineMock).toHaveBeenCalledOnce();
    declineMock.mockReset();
    acceptMock.mockReset();
});

test("User information is correctly updated to database in ProfileEditInformation.tsx", async () => {
    user.setup();

    render(
            <BrowserRouter>
                <ProfileEditInformation uid={info.uid} displayName={info.displayName} description={info.description} setEditMode={vi.fn()} />
            </BrowserRouter>
    )

    const saveButton = screen.getByText("Save");
    const usernameTextBox = await screen.findByPlaceholderText("Enter a new username");
    const descriptionTextBox = await screen.findByPlaceholderText("Enter a new description");
    const imageUploadInput = screen.getByTitle("Upload an image!");
    const file = new File([new Blob(["0101mdak12e91dqisdas=="])], "filename", { type: 'jpg' });

    await user.upload(imageUploadInput, file);
    await user.type(usernameTextBox, "1");
    await user.type(descriptionTextBox, "1");

    await user.click(saveButton);

    expect(updateMock).toHaveBeenCalledWith(info.uid, {displayName: info.displayName + "1", description: info.description + "1"});
    updateMock.mockClear();
});