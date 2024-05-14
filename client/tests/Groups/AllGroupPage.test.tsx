import { test, expect, vi } from 'vitest'
import { render, screen } from "@testing-library/react"
import AllGroupsPage from '../../src/pages/AllGroupsPage.tsx'
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
    lowerCaseName: "ikeapen",
    email: "agne8rimk@gmail.com",
    description: "desc",
    image: "abc",
    groups: ["groupID123", "groupID1"],
    friends: [],
    groupInvites: [],
    friendInvites: []
};

const groupInfo: GroupInfoWithUID = {
    uid: "groupID123",
    name: "Group name1",
    description: "Group description1",
    creationDate: Timestamp.now(),
    members: ["userID123"],
    leaderID: "userID123",
    leaderName: "IkeaPen",
    events: []
};

vi.mock('../../src/components/DatabaseFunctions.ts', async (importOriginal) => {
    const mod = await importOriginal<typeof import('../../src/components/DatabaseFunctions.ts')>()
    return {
        ...mod,
        GetDataFromDocumentPromise: async () => { return (userInfo as UserInfo) },
        GetGroupInfoPromise: async () => { return (groupInfo as GroupInfo) }, 
        GetUserDisplayNamePromise: async () => { return "Leader vardas" },
        CreateNewGroupPromise: vi.fn(async () => { }),
        GetUserGroupInvitesPromise: async () => { return userInfo.groupInvites },
        AcceptUserIntoGroupPromise: vi.fn(async () => { }),
        DeleteUserGroupInvitePromise: vi.fn(async () => { }),
    }
});

const createGroupMock = vi.spyOn(dbf, "CreateNewGroupPromise");
const acceptGroupInviteMock = vi.spyOn(dbf, "AcceptUserIntoGroupPromise");
const declineGroupInviteMock = vi.spyOn(dbf, "DeleteUserGroupInvitePromise");

test("All groups list is rendered", async () => {
    user.setup();

    render(
        <BrowserRouter>
            <AllGroupsPage />
        </BrowserRouter>
    )

    await new Promise(res => setTimeout(res, 100));

    const groupNames = screen.getAllByText(groupInfo.name);
    expect(groupNames[0]).toBeInTheDocument();
    expect(groupNames.length).toBe(2);

    const descriptions = screen.getAllByText(groupInfo.description);
    expect(descriptions[0]).toBeInTheDocument();
    expect(descriptions.length).toBe(2);

    const leaders = screen.getAllByText("By Leader vardas");
    expect(leaders[0]).toBeInTheDocument();
    expect(leaders.length).toBe(2);

})

test("Search bar in all groups page", async () => {
    user.setup();

    render(
        <BrowserRouter>
            <AllGroupsPage />
        </BrowserRouter>
    )

    await new Promise(res => setTimeout(res, 100));

    let groupsSearchBar = await screen.findByPlaceholderText("Search name...");
    await user.type(groupsSearchBar, "1");


    let groupNames = screen.getAllByText("Group name");
    expect(groupNames[0]).toBeInTheDocument();
    expect(groupNames.length).toBe(2);

    let descriptions = screen.getAllByText(groupInfo.description);
    expect(descriptions[0]).toBeInTheDocument();
    expect(descriptions.length).toBe(2);

    let leaders = screen.getAllByText("By Leader vardas");
    expect(leaders[0]).toBeInTheDocument();
    expect(leaders.length).toBe(2);


    groupsSearchBar = await screen.findByPlaceholderText("Search name...");
    await user.clear(groupsSearchBar);
    await user.type(groupsSearchBar, "Group");

    groupNames = screen.getAllByText("name1");
    expect(groupNames[0]).toBeInTheDocument();
    expect(groupNames.length).toBe(2);

    descriptions = screen.getAllByText(groupInfo.description);
    expect(descriptions[0]).toBeInTheDocument();
    expect(descriptions.length).toBe(2);

    leaders = screen.getAllByText("By Leader vardas");
    expect(leaders[0]).toBeInTheDocument();
    expect(leaders.length).toBe(2);


    groupsSearchBar = await screen.findByPlaceholderText("Search name...");
    await user.clear(groupsSearchBar);
    await user.type(groupsSearchBar, "2");

    groupNames = screen.queryAllByText("Group name");
    expect(groupNames[0]).toBeUndefined();
    expect(groupNames.length).toBe(0);

    descriptions = screen.queryAllByText(groupInfo.description);
    expect(descriptions[0]).toBeUndefined();
    expect(descriptions.length).toBe(0);

    leaders = screen.queryAllByText("By Leader vardas");
    expect(leaders[0]).toBeUndefined();
    expect(leaders.length).toBe(0);

})

 test("Group name input error appears in group creation", async () => {
    user.setup();

    render(
        <BrowserRouter>
            <AllGroupsPage />
        </BrowserRouter>
    )

    await new Promise(res => setTimeout(res, 100));

    const createGroupButton = screen.getByText("Create group");
    await user.click(createGroupButton);

    const groupNameTextBox = await screen.findByPlaceholderText("Your group name...");

    await user.type(groupNameTextBox, "  #  ")
    await new Promise(res => setTimeout(res, 1100));
    let formatError1 = screen.getByText("Group name should be at least 4 characters");
    expect(formatError1).toBeInTheDocument();

    await user.clear(groupNameTextBox);
    await user.type(groupNameTextBox, "abcd");
    await new Promise(res => setTimeout(res, 1100));
    let formatError11 = screen.queryByText("Group name should be at least 4 characters");
    expect(formatError11).toBeNull();

    await user.clear(groupNameTextBox);
    await user.type(groupNameTextBox, "#%^$&@");
    await new Promise(res => setTimeout(res, 1100));
    formatError11 = screen.queryByText("Group name should be at least 4 characters");
    expect(formatError11).toBeNull();

    await user.clear(groupNameTextBox);
    await user.type(groupNameTextBox, "abcdgfdjahdfbhiasdugfiuasd jdasflasdgufia");
    await new Promise(res => setTimeout(res, 1100));
    let formatError2 = screen.getByText("Group name can't have more than 20 characters");
    expect(formatError2).toBeInTheDocument();

    await user.clear(groupNameTextBox);
    await user.type(groupNameTextBox, "abc^&$#$%$ 534%#%$ jdasflasdgufia");
    await new Promise(res => setTimeout(res, 1100));
    formatError2 = screen.getByText("Group name can't have more than 20 characters");
    expect(formatError2).toBeInTheDocument();

    await user.clear(groupNameTextBox);
    await user.type(groupNameTextBox, "              a          ");
    await new Promise(res => setTimeout(res, 1100));
    formatError1 = screen.getByText("Group name should be at least 4 characters");
    expect(formatError1).toBeInTheDocument();

    await user.clear(groupNameTextBox);
    await user.type(groupNameTextBox, "#%^$&@");
    await new Promise(res => setTimeout(res, 1100));
    formatError11 = screen.queryByText("Group name should be at least 4 characters");
    expect(formatError11).toBeNull();

}, 20000);

test("Group creation", async () => {
    user.setup();

    render(
        <BrowserRouter>
            <AllGroupsPage />
        </BrowserRouter>
    )

    await new Promise(res => setTimeout(res, 10));

    const createGroupButton = screen.getByText("Create group");
    await user.click(createGroupButton);

    const groupNameTextBox = await screen.findByPlaceholderText("Your group name...");
    await user.type(groupNameTextBox, "Group Name1")

    const groupDescriptionTextBox = await screen.findByPlaceholderText("Your group description...");
    await user.type(groupDescriptionTextBox, "Group description1")

    const completeGroupCreationButton = screen.getByText("Create");
    await user.click(completeGroupCreationButton);

    expect(createGroupMock).toHaveBeenCalledOnce();
})