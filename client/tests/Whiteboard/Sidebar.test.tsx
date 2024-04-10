import { test, expect } from 'vitest'
import { render, screen, fireEvent, findByText, queryByText } from "@testing-library/react"
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
    expect(totalCalculators.length).toBe(5);
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

    expect(screen.queryAllByText("Remove").length).toBe(4)
    expect(screen.queryAllByText("Remove")[0]).toBeInTheDocument()
    await user.click(screen.getAllByText("Remove")[0])
    expect(screen.queryAllByText("Remove").length).toBe(3)
    expect(screen.queryAllByText("Remove")[0]).toBeInTheDocument()
    await user.click(screen.getAllByText("Remove")[0])
    expect(screen.queryAllByText("Remove").length).toBe(2)
    expect(screen.queryAllByText("Remove")[0]).toBeInTheDocument()
    await user.click(screen.getAllByText("Remove")[0])
    expect(screen.queryAllByText("Remove").length).toBe(0)
})

test("Functionality of calculators in DraggableBox", async () => {
    render(
        <BrowserRouter>
            <Sidebar />
        </BrowserRouter>
    )
    const addStandardCalculator = screen.getByText("Standard Calculator");
    const addScientificCalculator = screen.getByText("Scientific Calculator");
    const addGraphingCalculator = screen.getByText("Graphing Calculator");
    await user.click(addStandardCalculator)
    expect(screen.queryAllByText("0").length).toBe(2)
    await user.click(screen.getAllByText("0")[0])
    await user.click(screen.getByText("+"))
    await user.click(screen.getByText("1"))
    await user.click(screen.getByText("+"))
    await user.click(screen.getByText("2"))
    await user.click(screen.getByText("−"))
    await user.click(screen.getByText("3"))
    await user.click(screen.getByText("×"))
    await user.click(screen.getByText("4"))
    await user.click(screen.getByText("+"))
    await user.click(screen.getByText("5"))
    await user.click(screen.getByText("."))
    await user.click(screen.getByText("6"))
    await user.click(screen.getByText("+"))
    await user.click(screen.getByText("7"))
    await user.click(screen.getByText("+"))
    await user.click(screen.getByText("8"))
    await user.click(screen.getByText("+/-"))
    await user.click(screen.getByText("/"))
    await user.click(screen.getByText("9"))
    await user.click(screen.getByText("1/x"))
    await user.click(screen.getByText("="))
    await user.click(screen.getByText("C"))
    expect(screen.queryAllByText("0").length).toBe(2)
    await user.click(screen.getByText("←"))
    await user.click(screen.getByText("CE"))
    await user.click(screen.getByText("5"))
    expect(screen.queryAllByText("5").length).toBe(2)
    await user.click(screen.getByText("C"))
    await user.click(screen.getByText("9"))
    await user.click(screen.getByText("×"))
    await user.click(screen.getByText("8"))
    await user.click(screen.getByText("%"))
    expect(screen.queryAllByText("0.72").length).toBe(1)
    await user.click(screen.getByText("Remove"))
    expect(screen.queryAllByText("Remove").length).toBe(0)
    await user.click(addScientificCalculator)
    expect(screen.queryAllByText("0").length).toBe(2)
    await user.click(screen.getAllByText("0")[0])
    await user.click(screen.getByText("+"))
    await user.click(screen.getByText("1"))
    await user.click(screen.getByText("+"))
    await user.click(screen.getAllByText("2")[0])
    await user.click(screen.getByText("−"))
    await user.click(screen.getAllByText("3")[0])
    await user.click(screen.getByText("×"))
    await user.click(screen.getByText("4"))
    await user.click(screen.getByText("+"))
    await user.click(screen.getByText("5"))
    await user.click(screen.getByText("."))
    await user.click(screen.getByText("6"))
    await user.click(screen.getByText("+"))
    await user.click(screen.getByText("7"))
    await user.click(screen.getByText("+"))
    await user.click(screen.getByText("8"))
    await user.click(screen.getByText("+/-"))
    await user.click(screen.getByText("/"))
    await user.click(screen.getByText("9"))
    await user.click(screen.getByText("="))
    expect(screen.queryAllByText("0").length).toBe(2)
    expect(screen.queryAllByText("9").length).toBe(1)
    await user.click(screen.getByText("←"))
    expect(screen.queryAllByText("0 / 0.1111111111111111 =").length).toBe(0)
    await user.click(screen.getByText("C"))
    await user.click(screen.getByText("5"))
    expect(screen.queryAllByText("5").length).toBe(2)
    await user.click(screen.getByText("C"))
    expect(screen.queryAllByText("5").length).toBe(1)
})