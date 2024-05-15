import { test, expect } from "vitest";
import {
  render,
  screen,
} from "@testing-library/react";
import GraphingPage from "../../src/pages/GraphingCalculatorPage.tsx";
import user from "@testing-library/user-event";
import React from "react";
import { BrowserRouter } from "react-router-dom";

test("Add Equation button and user guide test", async () => {
  render(
    <BrowserRouter>
      <GraphingPage />
    </BrowserRouter>
  );
  const addEquationButton = screen.getByText("Add Equation");

  const inputBoxes = screen.getAllByText("Remove");
  expect(inputBoxes.length).toBe(10);

  await user.click(addEquationButton);

  const inputBoxes1 = screen.getAllByText("Remove");
  expect(inputBoxes1.length).toBe(11);

  await user.click(addEquationButton);
  await user.click(addEquationButton);
  await user.click(addEquationButton);

  const inputBoxes2 = screen.getAllByText("Remove");
  expect(inputBoxes2.length).toBe(14);
  await user.click(screen.getByText("User guide"));
  expect(screen.getByText("GETTING STARTED")).toBeInTheDocument();
});

test("Remove button test", async () => {
  render(
    <BrowserRouter>
      <GraphingPage />
    </BrowserRouter>
  );
  const addEquationButton = screen.getByText("Add Equation");


  await user.click(screen.getAllByText("Remove")[0]);
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
  await user.click(addEquationButton);
  expect(screen.queryByText("Remove")).toBeInTheDocument();
  expect(screen.queryAllByText("Remove").length).toBe(1);
  await user.click(addEquationButton);
  await user.click(addEquationButton);
  await user.click(addEquationButton);
  expect(screen.queryAllByText("Remove").length).toBe(4);
  const removeButtons2 = screen.getAllByText("Remove");
  await user.click(removeButtons2[0]);
  expect(screen.queryAllByText("Remove").length).toBe(3);
  await user.click(removeButtons2[0]);
  await user.click(removeButtons2[0]);
  await user.click(removeButtons2[0]);
  expect(screen.queryByText("Remove")).not.toBeInTheDocument();
});

test("Error message test", async () => {
  render(
    <BrowserRouter>
      <GraphingPage />
    </BrowserRouter>
  );
  expect(screen.getAllByRole("textbox").length).toBe(33);
  await user.click(screen.getAllByText("Remove")[0]);
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
  await user.type(screen.getByPlaceholderText("Input"), "x");
  expect(screen.queryByText("Incorrect input")).not.toBeInTheDocument();
  await user.clear(screen.getByPlaceholderText("Input"));
  await user.type(screen.getByPlaceholderText("Input"), "theta");
  expect(screen.queryByText("Incorrect input")).toBeInTheDocument();
  await user.clear(screen.getByPlaceholderText("Input"));
  await user.type(screen.getByPlaceholderText("Input"), "log(x)");
  expect(screen.queryByText("Incorrect input")).not.toBeInTheDocument();
  await user.clear(screen.getByPlaceholderText("Input"));
  await user.type(screen.getByPlaceholderText("Input"), "log(x");
  expect(screen.queryByText("Incorrect input")).toBeInTheDocument();
  await user.clear(screen.getByPlaceholderText("Input"));
  await user.type(screen.getByPlaceholderText("Input"), "y");
  expect(screen.queryByText("Incorrect input")).toBeInTheDocument();
});
