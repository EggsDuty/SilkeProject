import { test, expect } from 'vitest'
import { render, screen } from "@testing-library/react"
import Sidebar from '../../src/components/Whiteboard/Sidebar'
import user from '@testing-library/user-event'
import React from 'react'
import { BrowserRouter } from "react-router-dom";

test("Add DraggableBox on click", async () => {
    render(
        <BrowserRouter>
            <Sidebar />
        </BrowserRouter>
    )
    const addStandardCalculator = screen.getByText("Standard Calculator");
    const addScientificCalculator = screen.getByText("Scientific Calculator");
    const addGraphingCalculator = screen.getByText("Graphing Calculator");

    await user.click(addStandardCalculator);
    let totalCalculators = screen.getAllByText("Remove");
    expect(totalCalculators.length).toBe(1);

    await user.click(addScientificCalculator);
    await user.click(addGraphingCalculator);
    await user.click(addStandardCalculator);

    totalCalculators = screen.getAllByText("Remove");
    expect(totalCalculators.length).toBe(14);
});

test("Add correct type of calculator on click", async () => {
    render(
        <BrowserRouter>
            <Sidebar />
        </BrowserRouter>
    )
    const addStandardCalculator = screen.getByText("Standard Calculator");
    const addScientificCalculator = screen.getByText("Scientific Calculator");
    const addGraphingCalculator = screen.getByText("Graphing Calculator");

    expect(screen.queryByText("Standard calculator")).not.toBeInTheDocument();
    await user.click(addStandardCalculator);
    expect(screen.queryByText("Standard calculator")).toBeInTheDocument();
    expect(screen.queryByText("Scientific calculator")).not.toBeInTheDocument();
    await user.click(addScientificCalculator);
    expect(screen.queryByText("Scientific calculator")).toBeInTheDocument();
    expect(screen.queryByText("Graphing calculator")).not.toBeInTheDocument();
    await user.click(addGraphingCalculator);
    expect(screen.queryByText("Graphing calculator")).toBeInTheDocument();
})

test("Remove DraggableBox", async () => {
    render(
        <BrowserRouter>
            <Sidebar />
        </BrowserRouter>
    )
    const addStandardCalculator = screen.getByText("Standard Calculator");
    const addScientificCalculator = screen.getByText("Scientific Calculator");
    const addGraphingCalculator = screen.getByText("Graphing Calculator");

    await user.click(addStandardCalculator);
    expect(screen.queryByText("Remove")).toBeInTheDocument()
    await user.click(screen.getByText("Remove"))
    expect(screen.queryByText("Remove")).not.toBeInTheDocument()

    await user.click(addScientificCalculator);
    await user.click(addStandardCalculator);
    await user.click(addGraphingCalculator);

    expect(screen.queryAllByText("Remove").length).toBe(13)
    expect(screen.queryAllByText("Remove")[0]).toBeInTheDocument()
    await user.click(screen.getAllByText("Remove")[0])
    expect(screen.queryAllByText("Remove").length).toBe(12)
    expect(screen.queryAllByText("Remove")[0]).toBeInTheDocument()
    await user.click(screen.getAllByText("Remove")[0])
    expect(screen.queryAllByText("Remove").length).toBe(11)
    expect(screen.queryAllByText("Remove")[0]).toBeInTheDocument()
    await user.click(screen.getAllByText("Remove")[0])
    expect(screen.queryAllByText("Remove").length).toBe(0)
})

