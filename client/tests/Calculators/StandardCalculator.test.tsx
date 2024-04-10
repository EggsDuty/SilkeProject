import React from "react";
import { test, expect, describe } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import StandardCalculator from "../../src/components/Calculators/StandardCalculator";

describe("StandardCalculator", () => {
  test("Testing for standard calculator rendering", () => {
    const { getByText } = render(<StandardCalculator />);
    expect(getByText("1")).toBeInTheDocument();
    expect(getByText("2")).toBeInTheDocument();
    expect(getByText("3")).toBeInTheDocument();
    expect(getByText("4")).toBeInTheDocument();
    expect(getByText("5")).toBeInTheDocument();
    expect(getByText("6")).toBeInTheDocument();
    expect(getByText("7")).toBeInTheDocument();
    expect(getByText("8")).toBeInTheDocument();
    expect(getByText("9")).toBeInTheDocument();
    expect(getByText(".")).toBeInTheDocument();
    expect(getByText("+/-")).toBeInTheDocument();
    expect(getByText("=")).toBeInTheDocument();
    expect(getByText("\u002B")).toBeInTheDocument(); // +
    expect(getByText("\u2212")).toBeInTheDocument(); // -
    expect(getByText("/")).toBeInTheDocument();
    expect(getByText("\u00D7")).toBeInTheDocument(); // *
    expect(getByText("\u221A")).toBeInTheDocument(); // root
    expect(getByText("x\u00B2")).toBeInTheDocument(); // sqr
    expect(getByText("1/x")).toBeInTheDocument();
    expect(getByText("C")).toBeInTheDocument();
    expect(getByText("CE")).toBeInTheDocument();
    expect(getByText("%")).toBeInTheDocument();
    expect(getByText("\u2190")).toBeInTheDocument(); // rmvlastdigit
  });

  test("Testing if standard calculator addition works correctly", () => {
    const { getByText, getByTestId } = render(<StandardCalculator />);
    fireEvent.click(getByText("1"));
    fireEvent.click(getByText("2"));
    fireEvent.click(getByText("3"));
    fireEvent.click(getByText("4"));
    fireEvent.click(getByText("5"));
    fireEvent.click(getByText("+"));
    fireEvent.click(getByText("6"));
    fireEvent.click(getByText("7"));
    fireEvent.click(getByText("8"));
    fireEvent.click(getByText("9"));
    fireEvent.click(getByText("="));
    expect(getByTestId("screen")).toHaveTextContent("19134");
  });

  test("Testing if standard calculator subtraction works correctly", () => {
    const { getByText, getByTestId } = render(<StandardCalculator />);
    fireEvent.click(getByText("5"));
    fireEvent.click(getByText("."));
    fireEvent.click(getByText("2"));
    fireEvent.click(getByText("4"));
    fireEvent.click(getByText("\u2212"));
    fireEvent.click(getByText("7"));
    fireEvent.click(getByText("x\u00B2"));
    fireEvent.click(getByText("="));
    expect(getByTestId("screen")).toHaveTextContent("-43.76");
  });

  test("Testing if standard calculator multiplication works correctly", () => {
    const { getByText, getByTestId } = render(<StandardCalculator />);
    fireEvent.click(getByText("7"));
    fireEvent.click(getByText("4"));
    fireEvent.click(getByText("1"));
    fireEvent.click(getByText("."));
    fireEvent.click(getByText("3"));
    fireEvent.click(getByText("6"));
    fireEvent.click(getByText("9"));
    fireEvent.click(getByText("7"));
    fireEvent.click(getByText("\u221A"));
    fireEvent.click(getByText("\u00D7"));
    fireEvent.click(getByText("0"));
    fireEvent.click(getByText("."));
    fireEvent.click(getByText("5"));
    fireEvent.click(getByText("8"));
    fireEvent.click(getByText("8"));
    fireEvent.click(getByText("x\u00B2"));
    fireEvent.click(getByText("="));
    expect(getByTestId("screen")).toHaveTextContent("9.420888");
  });

  test("Testing if standard calculator division works correctly", () => {
    const { getByText, getByTestId } = render(<StandardCalculator />);
    fireEvent.click(getByText("3"));
    fireEvent.click(getByText("0"));
    fireEvent.click(getByText("/"));
    fireEvent.click(getByText("5"));
    fireEvent.click(getByText("="));
    expect(getByTestId("screen")).toHaveTextContent("6");
  });

  test("Testing if standard calculator sign changing works correctly condition 1", () => {
    const { getByText, getByTestId } = render(<StandardCalculator />);
    fireEvent.click(getByText("3"));
    fireEvent.click(getByText("5"));
    fireEvent.click(getByText("8"));
    fireEvent.click(getByText("7"));
    fireEvent.click(getByText("4"));
    fireEvent.click(getByText("1"));
    fireEvent.click(getByText("+/-"));
    fireEvent.click(getByText("/"));
    fireEvent.click(getByText("3"));
    fireEvent.click(getByText("5"));
    fireEvent.click(getByText("8"));
    fireEvent.click(getByText("7"));
    fireEvent.click(getByText("4"));
    fireEvent.click(getByText("1"));
    fireEvent.click(getByText("="));
    expect(getByTestId("screen")).toHaveTextContent("-1");
  });

  test("Testing if standard calculator sign changing works correctly condition 2", () => {
    const { getByText, getByTestId } = render(<StandardCalculator />);
    fireEvent.click(getByText("+/-"));
    expect(getByTestId("screen")).toHaveTextContent("0");
  });

  test("Testing if standard calculator sign changing works correctly condition 3", () => {
    const { getByText, getByTestId } = render(<StandardCalculator />);
    fireEvent.click(getByText("3"));
    fireEvent.click(getByText("4"));
    fireEvent.click(getByText("\u002B"));
    fireEvent.click(getByText("2"));
    fireEvent.click(getByText("1"));
    fireEvent.click(getByText("="));
    fireEvent.click(getByText("+/-"));
    expect(getByTestId("screen")).toHaveTextContent("-55");
  });

  test("Testing if standard calculator clears calculator correctly", () => {
    const { getByText, getByTestId } = render(<StandardCalculator />);
    fireEvent.click(getByText("5"));
    fireEvent.click(getByText("C"));
    expect(getByTestId("screen")).toHaveTextContent("0");
  });

  test("Testing if standard calculator clears current operation correctly", () => {
    const { getByText, getByTestId } = render(<StandardCalculator />);
    fireEvent.click(getByText("9"));
    fireEvent.click(getByText("6"));
    fireEvent.click(getByText("4"));
    fireEvent.click(getByText("1"));
    fireEvent.click(getByText("\u221A"));
    fireEvent.click(getByText("\u00D7"));
    fireEvent.click(getByText("6"));
    fireEvent.click(getByText("9"));
    fireEvent.click(getByText("CE"));
    fireEvent.click(getByText("1"));
    fireEvent.click(getByText("2"));
    fireEvent.click(getByText("3"));
    fireEvent.click(getByText("4"));
    fireEvent.click(getByText("="));
    expect(getByTestId("screen")).toHaveTextContent("121165.226");
  });

  test("Testing if standard calculator clears current operation correctly when clearing after did calculation", () => {
    const { getByText, getByTestId } = render(<StandardCalculator />);
    fireEvent.click(getByText("9"));
    fireEvent.click(getByText("6"));
    fireEvent.click(getByText("4"));
    fireEvent.click(getByText("1"));
    fireEvent.click(getByText("\u221A"));
    fireEvent.click(getByText("\u00D7"));
    fireEvent.click(getByText("6"));
    fireEvent.click(getByText("9"));
    fireEvent.click(getByText("CE"));
    fireEvent.click(getByText("1"));
    fireEvent.click(getByText("2"));
    fireEvent.click(getByText("3"));
    fireEvent.click(getByText("4"));
    fireEvent.click(getByText("="));
    fireEvent.click(getByText("CE"));
    expect(getByTestId("screen")).toHaveTextContent("0");
  });

  test("Testing if standard calculator updates operands correctly condition 1", () => {
    const { getByText, getByTestId } = render(<StandardCalculator />);
    fireEvent.click(getByText("9"));
    fireEvent.click(getByText("6"));
    fireEvent.click(getByText("4"));
    fireEvent.click(getByText("1"));
    fireEvent.click(getByText("\u221A"));
    fireEvent.click(getByText("\u00D7"));
    fireEvent.click(getByText("6"));
    fireEvent.click(getByText("9"));
    fireEvent.click(getByText("CE"));
    fireEvent.click(getByText("1"));
    fireEvent.click(getByText("2"));
    fireEvent.click(getByText("3"));
    fireEvent.click(getByText("4"));
    fireEvent.click(getByText("="));
    fireEvent.click(getByText("\u00D7"));
    fireEvent.click(getByText("1"));
    fireEvent.click(getByText("="));
    expect(getByTestId("screen")).toHaveTextContent("121165.226");
  });

  test("Testing if standard calculator updates operands correctly condition 2", () => {
    const { getByText, getByTestId } = render(<StandardCalculator />);
    fireEvent.click(getByText("9"));
    fireEvent.click(getByText("."));
    fireEvent.click(getByText("."));
    fireEvent.click(getByText("."));
    expect(getByTestId("screen")).toHaveTextContent("9.");
  });

  test("Testing if standard calculator updates operands correctly condition 3", () => {
    const { getByText, getByTestId } = render(<StandardCalculator />);
    fireEvent.click(getByText("9"));
    fireEvent.click(getByText("\u002B"));
    fireEvent.click(getByText("8"));
    fireEvent.click(getByText("="));
    fireEvent.click(getByText("5"));
    expect(getByTestId("screen")).toHaveTextContent("5");
  });

  test("Testing if standard calculator removes last digit correctly condition 1", () => {
    const { getByText, getByTestId } = render(<StandardCalculator />);
    fireEvent.click(getByText("9"));
    fireEvent.click(getByText("6"));
    fireEvent.click(getByText("4"));
    fireEvent.click(getByText("1"));
    fireEvent.click(getByText("\u2190"));
    fireEvent.click(getByText("\u002B"));
    fireEvent.click(getByText("3"));
    fireEvent.click(getByText("6"));
    fireEvent.click(getByText("9"));
    fireEvent.click(getByText("="));
    expect(getByTestId("screen")).toHaveTextContent("133");
  });

  test("Testing if standard calculator removes last digit correctly condition 2", () => {
    const { getByText, getByTestId } = render(<StandardCalculator />);
    fireEvent.click(getByText("5"));
    fireEvent.click(getByText("1"));
    fireEvent.click(getByText("\u002B"));
    fireEvent.click(getByText("4"));
    fireEvent.click(getByText("3"));
    fireEvent.click(getByText("="));
    fireEvent.click(getByText("\u2190"));
    expect(getByTestId("screen")).toHaveTextContent("94");
  });

  test("Testing if standard calculator removes last digit correctly condition 3", () => {
    const { getByText, getByTestId } = render(<StandardCalculator />);
    fireEvent.click(getByText("5"));
    fireEvent.click(getByText("7"));
    fireEvent.click(getByText("+/-"));
    fireEvent.click(getByText("\u2190"));
    fireEvent.click(getByText("\u2190"));
    fireEvent.click(getByText("\u2190"));
    fireEvent.click(getByText("\u2190"));
    expect(getByTestId("screen")).toHaveTextContent("0");
  });

  test("Testing if standard calculator handles square root correctly condition 1", () => {
    const { getByText, getByTestId } = render(<StandardCalculator />);
    fireEvent.click(getByText("5"));
    fireEvent.click(getByText("8"));
    fireEvent.click(getByText("+/-"));
    fireEvent.click(getByText("\u221A"));
    expect(getByTestId("screen")).toHaveTextContent("Invalid input");
  });

  test("Testing if standard calculator handles square root correctly condition 2", () => {
    const { getByText, getByTestId } = render(<StandardCalculator />);
    fireEvent.click(getByText("5"));
    fireEvent.click(getByText("8"));
    fireEvent.click(getByText("\u002B"));
    fireEvent.click(getByText("2"));
    fireEvent.click(getByText("4"));
    fireEvent.click(getByText("\u221A"));
    fireEvent.click(getByText("="));
    expect(getByTestId("screen")).toHaveTextContent("62.899");
  });

  test("Testing if standard calculator handles square root correctly condition 3", () => {
    const { getByText, getByTestId } = render(<StandardCalculator />);
    fireEvent.click(getByText("1"));
    fireEvent.click(getByText("\u002B"));
    fireEvent.click(getByText("8"));
    fireEvent.click(getByText("="));
    fireEvent.click(getByText("\u221A"));
    expect(getByTestId("screen")).toHaveTextContent("3");
  });

  test("Testing if standard calculator handles percentage correctly condition 1", () => {
    const { getByText, getByTestId } = render(<StandardCalculator />);
    fireEvent.click(getByText("1"));
    fireEvent.click(getByText("0"));
    fireEvent.click(getByText("\u002B"));
    fireEvent.click(getByText("1"));
    fireEvent.click(getByText("2"));
    fireEvent.click(getByText("%"));
    expect(getByTestId("screen")).toHaveTextContent("1.2");
  });

  test("Testing if standard calculator handles percentage correctly condition 2", () => {
    const { getByText, getByTestId } = render(<StandardCalculator />);
    fireEvent.click(getByText("%"));
    expect(getByTestId("screen")).toHaveTextContent("0");
  });

  test("Testing if standard calculator handles one divided by correctly condition 1", () => {
    const { getByText, getByTestId } = render(<StandardCalculator />);
    fireEvent.click(getByText("1"));
    fireEvent.click(getByText("0"));
    fireEvent.click(getByText("1/x"));
    expect(getByTestId("screen")).toHaveTextContent("0.1");
  });

  test("Testing if standard calculator handles one divided by correctly condition 2", () => {
    const { getByText, getByTestId } = render(<StandardCalculator />);
    fireEvent.click(getByText("1"));
    fireEvent.click(getByText("0"));
    fireEvent.click(getByText("\u002B"));
    fireEvent.click(getByText("2"));
    fireEvent.click(getByText("="));
    fireEvent.click(getByText("1/x"));
    expect(getByTestId("screen")).toHaveTextContent("0.08333333333333333");
  });

  test("Testing if standard calculator handles one divided by correctly condition 3", () => {
    const { getByText, getByTestId } = render(<StandardCalculator />);
    fireEvent.click(getByText("1"));
    fireEvent.click(getByText("\u002B"));
    fireEvent.click(getByText("5"));
    fireEvent.click(getByText("="));
    fireEvent.click(getByText("\u002B"));
    fireEvent.click(getByText("5"));

    fireEvent.click(getByText("1/x"));
    expect(getByTestId("screen")).toHaveTextContent("0.2");
  });

  test("Testing if standard calculator swaps operators correctly condition 1", () => {
    const { getByText, getByTestId } = render(<StandardCalculator />);
    fireEvent.click(getByText("1"));
    fireEvent.click(getByText("0"));
    fireEvent.click(getByText("\u2212"));
    fireEvent.click(getByText("\u00D7"));
    fireEvent.click(getByText("2"));
    fireEvent.click(getByText("="));
    fireEvent.click(getByText("\u00D7"));
    fireEvent.click(getByText("\u2212"));
    fireEvent.click(getByText("4"));
    expect(getByTestId("screen")).toHaveTextContent("4");
  });

  test("Testing if standard calculator handles square correctly condition 1", () => {
    const { getByText, getByTestId } = render(<StandardCalculator />);
    fireEvent.click(getByText("2"));
    fireEvent.click(getByText("5"));
    fireEvent.click(getByText("x\u00B2"));
    expect(getByTestId("screen")).toHaveTextContent("625");
  });

  test("Testing if standard calculator handles square correctly condition 1", () => {
    const { getByText, getByTestId } = render(<StandardCalculator />);
    fireEvent.click(getByText("2"));
    fireEvent.click(getByText("4"));
    fireEvent.click(getByText("\u002B"));
    fireEvent.click(getByText("5"));
    fireEvent.click(getByText("="));
    fireEvent.click(getByText("x\u00B2"));
    expect(getByTestId("screen")).toHaveTextContent("841");
  });
});
