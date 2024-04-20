import { test, expect, vi } from 'vitest'
import { fireEvent, getByAltText, getByText, render, screen } from "@testing-library/react"
import GroupPage from '../../src/pages/GroupPage.tsx'
import user from '@testing-library/user-event'
import React from 'react'
import { BrowserRouter } from 'react-router-dom';
import { GroupInfo, UserInfo } from '../../src/components/DatabaseTypes.ts'
import { Timestamp } from 'firebase/firestore'
import * as dbf from '../../src/components/DatabaseFunctions.ts'

interface UserInfoWithUID extends UserInfo {
    uid: string
}
interface GroupInfoWithUID extends GroupInfo {
    uid: string,
    leaderName: string
}

const userInfo: UserInfoWithUID = {
    uid: "userID123",
    displayName: "IkeaPen",
    email: "agne8rimk@gmail.com",
    description: "desc",
    image: "abc",
    groups: ["groupID123", "groupID1"],
    friends: ["friend1", "friend2", "friend3"],
    groupInvites: [],
    friendInvites: []
};

const groupInfo: GroupInfoWithUID = {
    uid: "groupID123",
    name: "Group name1",
    description: "Group description1",
    creationDate: Timestamp.now(),
    members: ["userID123", "userID1", "userID2"],
    leaderID: "userID1231",
    leaderName: "IkeaPen"
};

let count = 0;

vi.mock('../../src/components/DatabaseFunctions.ts', async (importOriginal) => {
    const mod = await importOriginal<typeof import('../../src/components/DatabaseFunctions.ts')>()
    return {
        ...mod,
        GetGroupInfoPromise: async () => { return (groupInfo as GroupInfo) }, 
        GetUserInfoForMemberList: async () => { return { displayName: userInfo.displayName, image: userInfo.image, userID: userInfo.uid } },
        CreateGroupInvitePromise: vi.fn(async () => { }),
        GetFriendsListOfUser: async () => { return userInfo.friends }, 
    }
});

const createGroupInviteMock = vi.spyOn(dbf, "CreateGroupInvitePromise");

test("Group info and members list in group page is rendered", async () => {
    user.setup();

    render(
        <BrowserRouter>
            <GroupPage />
        </BrowserRouter>
    )

    await new Promise(res => setTimeout(res, 100));

    const groupName = screen.getByText(groupInfo.name);
    expect(groupName).toBeInTheDocument();
    const groupDescription = screen.getByText(groupInfo.name);
    expect(groupDescription).toBeInTheDocument();

    const memberNames = screen.getAllByText(userInfo.displayName);
    expect(memberNames[0]).toBeInTheDocument();
    expect(memberNames.length).toBe(3);

 //   const leaderText = screen.getAllByText("Leader");
//    expect(leaderText[0]).toBeInTheDocument();

})


test("'Add a member' popup renders friends list and search bar", async () => {
    user.setup();

    render(
        <BrowserRouter>
            <GroupPage />
        </BrowserRouter>
    )

    await new Promise(res => setTimeout(res, 100));

    const image = screen.getByAltText("Add member");
    expect(image).toHaveAttribute('src', '/member_add_picture.svg')

    await user.click(image);

    //Turi buti 6, nes fone mato members list + friends list sitame pop up lange
    const memberNames = screen.getAllByText(userInfo.displayName);
    expect(memberNames[0]).toBeInTheDocument();
    expect(memberNames.length).toBe(6);


    const friendsSearchBar = await screen.findByPlaceholderText("Your friend name...");
    await user.type(friendsSearchBar, "1");

    //Turi buti 3, o ne 0, nes fone mato members list
    let friendNames = screen.getAllByText("IkeaPen");
    expect(friendNames.length).toBe(3);

    await user.clear(friendsSearchBar);
    await user.type(friendsSearchBar, "Pen");

    //Turi buti 6, nes fone mato members list + friends list sitame pop up lange (kadangi irasiau "Pen", tai list lieka toks pat)
    let friendNames2 = screen.getAllByText("IkeaPen");
    expect(friendNames2.length).toBe(6);
})

test("Member add to a group", async () => {
    user.setup();

    render(
        <BrowserRouter>
            <GroupPage />
        </BrowserRouter>
    )

    await new Promise(res => setTimeout(res, 100));

    const image = screen.getByAltText("Add member");
    expect(image).toHaveAttribute('src', '/member_add_picture.svg')

    await user.click(image);

    const plusImage = screen.getAllByAltText("Plus sign");
    expect(plusImage[0]).toHaveAttribute('src', '/plus_sign_picture.svg')
    expect(plusImage.length).toBe(3);

    const checkImage = screen.queryAllByAltText("Check sign");
    expect(checkImage.length).toBe(0);

    await user.click(plusImage[0]);

    expect(createGroupInviteMock).toHaveBeenCalledOnce();

    const checkImage2 = screen.getByAltText("Check sign");
    expect(checkImage2).toHaveAttribute('src', '/check_sign_picture.svg')

})