import { test, expect, vi } from 'vitest'
import { render, screen } from "@testing-library/react"
import ProfileInformation from '../../src/components/Profile/ProfileInformation.tsx'
import ProfileEditInformation from '../../src/components/Profile/ProfileEditInformation.tsx'
import ProfilePage from '../../src/pages/ProfilePage.tsx'
import user from '@testing-library/user-event'
import React from 'react'
import { BrowserRouter } from 'react-router-dom';
import { UserInfo } from '../../src/components/DatabaseTypes.ts'
import * as dbf from './DatabaseFunctionsMock.ts';

const dbfMock = {
    GetUserDataFromDocumentPromise: dbf.GetUserDataFromDocumentPromise,
    GetFriendInvitesListOfUser: dbf.GetFriendInvitesListOfUser, 
    GetFriendsListOfUser: dbf.GetFriendsListOfUser,
    GetUserInfoForMemberList: dbf.GetUserInfoForMemberList,
    AcceptFriendRequestPromise: dbf.AcceptFriendRequestPromise,
    DeleteUserFriendInvitePromise: dbf.DeleteUserGroupInvitePromise
}

vi.mock('react-router-dom', async (importOriginal) => {
    const mod = await importOriginal<typeof import('react-router-dom')>()
    return {
      ...mod,
      default: { useParams: vi.fn() },
      useParams: vi.fn(() => {return {uid: "1"}}),
    }
});  

const acceptMock = vi.spyOn(dbfMock, "AcceptFriendRequestPromise");
const declineMock = vi.spyOn(dbfMock, "DeleteUserFriendInvitePromise");

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
                <ProfilePage databaseFunctions={dbfMock} />
            </BrowserRouter>
    )

    await new Promise(res => setTimeout(res, 100));

    const inviteButton = screen.getByText("Invites").closest("div");
    user.click(inviteButton!);

    await new Promise(res => setTimeout(res, 50));

    const declineButton = screen.getByAltText("decline").closest("div");
    console.log("button: " + declineButton);
    user.click(declineButton!);

    await new Promise(res => setTimeout(res, 50));

    expect(declineMock).toHaveBeenCalledOnce();

    declineMock.mockReset();
});