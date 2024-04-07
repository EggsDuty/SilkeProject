import { test, expect } from 'vitest'
import { render, screen, fireEvent } from "@testing-library/react"
import GraphingPage from '../../src/pages/GraphingCalculator.tsx'
import user from '@testing-library/user-event'
import React from 'react'
import { BrowserRouter } from "react-router-dom";

test("Add Equation button test", async() => {
    
    
    render(
        <BrowserRouter>
            <GraphingPage />
        </BrowserRouter>
    )
    const addEquationButton = screen.getByText("Add Equation");

    const inputBoxes = screen.getAllByText('Remove');
    expect(inputBoxes.length).toBe(9);

    await user.click(addEquationButton);

    const inputBoxes1 = screen.getAllByText('Remove');
    expect(inputBoxes1.length).toBe(10);

    await user.click(addEquationButton);
    await user.click(addEquationButton);
    await user.click(addEquationButton);
    
   const inputBoxes2 = screen.getAllByText('Remove');
    expect(inputBoxes2.length).toBe(13);
    
    
    
});


test("Remove button test", async() => {
    
    
    render(
        <BrowserRouter>
            <GraphingPage />
        </BrowserRouter>
    )
    const addEquationButton = screen.getByText("Add Equation");
    const removeButtons = screen.getAllByText('Remove');
    await user.click(removeButtons[8]);
    await user.click(removeButtons[7]);
    await user.click(removeButtons[6]);
    await user.click(removeButtons[5]);
    await user.click(removeButtons[4]);
    await user.click(removeButtons[3]);
    await user.click(removeButtons[2]);
    await user.click(removeButtons[1]);
    await user.click(removeButtons[0]);
    //const inputBoxes = screen.getAllByText('Remove');
    expect(screen.queryByText('Remove')).not.toBeInTheDocument();
    await user.click(addEquationButton);
    expect(screen.queryByText('Remove')).toBeInTheDocument();
    expect(screen.queryAllByText('Remove').length).toBe(1);
    await user.click(addEquationButton);
    await user.click(addEquationButton);
    await user.click(addEquationButton);
    expect(screen.queryAllByText('Remove').length).toBe(4);
    const removeButtons2 = screen.getAllByText('Remove');
    await user.click(removeButtons2[0]);
    expect(screen.queryAllByText('Remove').length).toBe(3);
    await user.click(removeButtons2[0]);
    await user.click(removeButtons2[0]);
    await user.click(removeButtons2[0]);
    expect(screen.queryByText('Remove')).not.toBeInTheDocument();
    
    
    
    
    
});

test("Error message test", async() => {
    render(
        <BrowserRouter>
            <GraphingPage />
        </BrowserRouter>
    )
    expect(screen.getAllByRole('textbox').length).toBe(28);
    await user.click(screen.getAllByText("Remove")[0]);
    await user.click(screen.getAllByText("Remove")[0]);
    await user.click(screen.getAllByText("Remove")[0]);
    await user.click(screen.getAllByText("Remove")[0]);
    await user.click(screen.getAllByText("Remove")[0]);
    await user.click(screen.getAllByText("Remove")[0]);
    await user.click(screen.getAllByText("Remove")[0]);
    await user.click(screen.getAllByText("Remove")[0]);
    await user.click(screen.getAllByText("Remove")[0]);
    expect(screen.queryByText("Remove")).not.toBeInTheDocument();
    await user.click(screen.getByText("Add Equation"));
    expect(screen.queryByText("linear")).toBeInTheDocument();
    await user.type(screen.getByPlaceholderText("Input"),"x");
    expect(screen.queryByText("Incorrect input")).not.toBeInTheDocument();
    await user.clear(screen.getByPlaceholderText("Input"));
    await user.type(screen.getByPlaceholderText("Input"),"theta");
    expect(screen.queryByText("Incorrect input")).toBeInTheDocument();
    await user.clear(screen.getByPlaceholderText("Input"));
    await user.type(screen.getByPlaceholderText("Input"),"log(x)")
    expect(screen.queryByText("Incorrect input")).not.toBeInTheDocument();
    await user.clear(screen.getByPlaceholderText("Input"));
    await user.type(screen.getByPlaceholderText("Input"),"log(x");
    expect(screen.queryByText("Incorrect input")).toBeInTheDocument();
    await user.clear(screen.getByPlaceholderText("Input"));
    await user.type(screen.getByPlaceholderText("Input"),"y");
    expect(screen.queryByText("Incorrect input")).toBeInTheDocument();
    
    
});
