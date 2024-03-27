import { test, expect } from 'vitest';

import { validateInput } from "../../src/components/Calculator/InputValidation";

test('Check if input is valid', () => {
    expect(validateInput("2*x", "linear")).toBe(true);
    expect(validateInput("(2*x)", "linear")).toBe(true);
    expect(validateInput("theta", "polar")).toBe(true);
    expect(validateInput("t", "parametric")).toBe(true);
    expect(validateInput("cos(t)", "parametric")).toBe(true);
    expect(validateInput("log(2x)", "linear")).toBe(true);
    expect(validateInput("x*x+y*y-1", "implicit")).toBe(true);
    
});

test('Check if input is invalid', () => {
    expect(validateInput("2*x)", "linear")).toBe(false);
    expect(validateInput("2*x", "polar")).toBe(false);
    expect(validateInput("theta", "linear")).toBe(false);
    expect(validateInput("t", "linear")).toBe(false);
    expect(validateInput("(t)", "polar")).toBe(false);
    expect(validateInput("(2(*x)", "linear")).toBe(false);
    expect(validateInput("x+y", "linear")).toBe(false);
    expect(validateInput("asdjhgrty", "linear")).toBe(false);
    expect(validateInput("x", "parametric")).toBe(false);
    expect(validateInput("log6", "linear")).toBe(false);
    expect(validateInput("abs(15", "linear")).toBe(false);
});
