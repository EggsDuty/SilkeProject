import React, { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import functionPlot from "function-plot";
import Popup from "reactjs-popup";

function GraphingCalculators() {
  const [equations, setEquations] = useState<string[]>([
    "log(3*x) / log(6)",
    "2*x",
    "x^2",
    "2^x",
    "exp(x)",
    "sqrt(x)",
    "nthRoot(x,3)",
  ]); // Initial equations
  const rootEl = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    try {
      if (rootEl.current) {
        functionPlot({
          target: rootEl.current,
          width: rootEl.current.clientWidth,
          height: rootEl.current.clientHeight,
          yAxis: { domain: [-1, 9] },
          grid: true,

          data: equations.map((eq) => ({
            fn: eq,
            graphType: "polyline",
          })),
          tip: {
            renderer: (x: number, y: number, index: number) => {
              const equation = equations[index]; // Get the current equation
              return `f(x)=: ${equation}, x: ${x.toFixed(2)}, y: ${y.toFixed(
                2
              )}`;
            },
          },
        });
      }
    } catch (e) {}
  }, [equations]);

  const handleInputChange =
    (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const newEquations = [...equations];
      newEquations[index] = e.target.value;
      setEquations(newEquations);
    };

  const addEquation = () => {
    setEquations([...equations, ""]);
  };

  const removeEquation = (index: number) => {
    const newEquations = [...equations];
    newEquations.splice(index, 1);
    setEquations(newEquations);
  };

  return (
    <div className=" absolute w-full h-full ">
      <div className="w-full">
        <Header />
      </div>
      <div className="flex h-full">
        <div className="w-1/3">
          <Popup
            trigger={
              <button className="text-white md:font-bold italic underline">
                {" "}
                User guide{" "}
              </button>
            }
            modal
            nested
            children={
              <div className="bg-slate-500 rounded border-8 border-black w-4/6 m-auto overflow-y-scroll h-96">
                <h4 className="text-6xl text-center m-4 md:font-bold">GUIDE</h4>
                <h1 className="text-3xl text-center m-3 md:font-bold">
                  LAYOUT
                </h1>
                <p className="m-1">
                  On the left side of the screen is the input area where you can
                  input your functions, it consists of:<br></br>
                  1. User's guide, where you can learn how to use graphic
                  calculator<br></br>
                  2. Equation input with "Remove" button<br></br>
                  3. "Add Equation" button<br></br>
                  On the right side of the screen are the results of your input.
                </p>
                <h1 className="text-3xl text-center m-3 md:font-bold">
                  GETTING STARTED
                </h1>
                <p className="m-1">
                  When you load the page, you can see 7 equation inputs
                  showcasing examples of different functions.<br></br>
                  To see your function, enter it in the textbox.<br></br>
                  If you drag your mouse on the drawn function, you will see
                  your input and [x, y] coordinates.<br></br>
                  To navigate through the graph, hold your left mouse button and
                  drag your mouse.<br></br>
                  To zoom in you can either double tap your left mouse button or
                  use your scroll wheel. To zoom out, use your scroll wheel.
                  <br></br>
                  If you need more functions, then press the "Add Equation"
                  button and enter your function.<br></br>
                  If you have too many function inputs, press "Remove" button
                  next to the input you want to remove.<br></br>
                  <br></br>
                </p>
                <h1 className="text-lg m-1 md:font-semibold italic">
                  NOTE: Do not leave empty input boxes and be sure to enter your
                  equation correctly(only x variables are accepted), otherwise
                  the graph will be unresponsive until you correct it
                </h1>
                <h1 className="text-3xl text-center m-3 md:font-bold">
                  OPERATORS
                </h1>
                <p className="m-1">
                  "+" - addition<br></br>
                  "-" - substraction<br></br>
                  "/" - division<br></br>
                  "*" - multiplication<br></br>
                  "^" or "pow(a, b)" - exponentiation, where a is the base and b
                  is the power<br></br>
                  "log(x)" - natural logarithm of x with base e=2.718281828....
                  <br></br>
                  "sqrt(x)" - square root of x<br></br>
                  "nthRoot(x, n)" - n-th root of x (i.e. nthRoot(8,3) would be
                  cube root of 8 and it would equal to 2)<br></br>
                  "x!" - factorial<br></br>
                  "exp(x)" - exponential function (e^x)<br></br>
                  <br></br>
                  Additional tips: <br></br>
                  <br></br>
                  Since there is only natural logarithm, if you want to input a
                  logarithm with a different base, you can use division of
                  natural logarithms. In example, if you want logarithm of x
                  with a base of 3, you can input "log(x)/log(3)" to achieve
                  that. (Change of base rule)<br></br>
                  <br></br>
                  If you need to input Euler's number (e) you can write exp(1)
                  since e^1 = e.
                </p>
              </div>
            }
          >
            {}
          </Popup>
          {equations.map((equation, index) => (
            <div className="" key={index}>
              <label className="text-white" htmlFor={`equationInput-${index}`}>
                Equation {index + 1}:{" "}
              </label>
              <input
                type="text"
                id={`equationInput-${index}`}
                value={equation}
                onChange={handleInputChange(index)}
                className="border border-black bg-secondaryColor text-red-100"
              />
              <button
                className="border-2 border-indigo-950 my-2 bg-primaryColor text-white"
                onClick={() => removeEquation(index)}
              >
                Remove
              </button>
            </div>
          ))}

          <button
            className="border-2 border-black my-2 bg-primaryColor text-white w-1/3"
            onClick={addEquation}
          >
            Add Equation
          </button>
        </div>
        <div
          className="bg-gray-200 border border-black w-2/3 h-full "
          ref={rootEl}
        ></div>
      </div>
    </div>
  );
}

export default GraphingCalculators;
