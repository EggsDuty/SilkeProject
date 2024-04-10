import { test, expect } from 'vitest'
import { fireEvent, getByText, render, screen } from "@testing-library/react"
import GroupPage from '../../src/pages/GroupPage.tsx'
import user from '@testing-library/user-event'
import React from 'react'
import { BrowserRouter } from 'react-router-dom';

test("Group name input error appears", async () => {
    user.setup();

    render(
        <BrowserRouter>
            <GroupPage />
        </BrowserRouter>
    )
    fireEvent.click(getByText("Create group"));
    const groupNameTextBox = await screen.findByPlaceholderText("Your group name...");

    await user.type(groupNameTextBox, "  #  ")
    await new Promise(res => setTimeout(res, 1100));
    const formatError1 = screen.getByText("Group name should be at least 4 characters");
    expect(formatError1).toBeInTheDocument();

    await user.clear(groupNameTextBox);
    await user.type(groupNameTextBox, "abcd");
    expect(formatError1).not.toBeInTheDocument();

    await user.type(groupNameTextBox, "#%^$&@");
    expect(formatError1).not.toBeInTheDocument();

    await user.clear(groupNameTextBox);
    await user.type(groupNameTextBox, "abcdgfdjahdfbhiasdugfiuasd jdasflasdgufia");
    await new Promise(res => setTimeout(res, 1100));
    const formatError2 = screen.getByText("Group name can't have more than 20 characters");
    expect(formatError2).toBeInTheDocument();

    await user.clear(groupNameTextBox);
    await user.type(groupNameTextBox, "abc^&$#$%$ 534%#%$ jdasflasdgufia");
    await new Promise(res => setTimeout(res, 1100));
    expect(formatError2).toBeInTheDocument();

    await user.clear(groupNameTextBox);
    await user.type(groupNameTextBox, "              a          ");
    await new Promise(res => setTimeout(res, 1100));
    expect(formatError1).toBeInTheDocument();

    await user.type(groupNameTextBox, "#%^$&@");
    expect(formatError1).not.toBeInTheDocument();

}, 10000);