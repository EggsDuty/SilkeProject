import React, { useState, useEffect, useRef } from "react";
import functionPlot from "function-plot";
import Popup from "reactjs-popup";
import Select from "react-dropdown-select";
import { validateInput } from "../Calculator/InputValidation";
import { Background } from "@tsparticles/engine";
interface Point {
  InputX: string;
  InputY: string;
}

interface Equation {
  Input1: string;
  type:
    | "linear"
    | "implicit"
    | "polar"
    | "parametric"
    | "vector"
    | "text"
    | "points";
  color?: string;
  closed?: boolean;
  Input2?: string;
  Input3?: string;
  Input4?: string;
  Points: Point[];
  Line: "polyline" | "scatter";
  Error?: string;
}




//Function type option list
const optionsType = [
  {
    id: 1,
    name: "linear",
  },
  {
    id: 2,
    name: "implicit",
  },
  {
    id: 3,
    name: "polar",
  },
  {
    id: 4,
    name: "parametric",
  },
  {
    id: 5,
    name: "vector",
  },
  {
    id: 6,
    name: "text",
  },
  {
    id: 7,
    name: "points",
  },
];
//Function color option list
const optionsColor = [
  {
    id: 1,
    name: "Lime",
    value: "#00ff00",
  },
  {
    id: 2,
    name: "Red",
    value: "#ff0000",
  },
  {
    id: 3,
    name: "Green",
    value: "#008000",
  },
  {
    id: 4,
    name: "Teal",
    value: "#008080",
  },
  {
    id: 5,
    name: "Olive",
    value: "#808000",
  },
  {
    id: 6,
    name: "Aqua",
    value: "#00FFFF",
  },
  {
    id: 7,
    name: "Aquamarine",
    value: "#7FFFD4",
  },
  {
    id: 8,
    name: "Steel Blue",
    value: "#4682B4",
  },
  {
    id: 9,
    name: "Blue",
    value: "#0000FF",
  },
  {
    id: 10,
    name: "Medium Slate Blue",
    value: "#7B68EE",
  },
  {
    id: 11,
    name: "Chocolate",
    value: "#D2691E",
  },
  {
    id: 12,
    name: "Brown",
    value: "#A52A2A",
  },
  {
    id: 13,
    name: "Lavender Blush",
    value: "#FFF0F5",
  },
  {
    id: 14,
    name: "Gray",
    value: "#808080",
  },
  {
    id: 15,
    name: "Black",
    value: "#000000",
  },
  {
    id: 16,
    name: "Dark Slate Gray",
    value: "#2F4F4F",
  },
  {
    id: 17,
    name: "Pink",
    value: "#FFC0CB",
  },
  {
    id: 18,
    name: "Deep Pink",
    value: "#FF1493",
  },
  {
    id: 19,
    name: "Hot Pink",
    value: "#FF69B4",
  },
  {
    id: 20,
    name: "Medium Violet Red",
    value: "#C71585",
  },
  {
    id: 21,
    name: "Orange",
    value: "#FFA500",
  },
  {
    id: 22,
    name: "Orange Red",
    value: "#FF4500",
  },
  {
    id: 23,
    name: "Dark Orange",
    value: "#FF8C00",
  },
  {
    id: 25,
    name: "Gold",
    value: "#FFD700",
  },
  {
    id: 26,
    name: "Yellow",
    value: "#FFFF00",
  },
  {
    id: 27,
    name: "Khaki",
    value: "#F0E68C",
  },
  {
    id: 28,
    name: "Magenta",
    value: "#FF00FF",
  },
  {
    id: 29,
    name: "Rebecca Purple",
    value: "#663399",
  },
  {
    id: 30,
    name: "Indigo",
    value: "#4B0082",
  },
  {
    id: 31,
    name: "Purple",
    value: "#800080",
  },
  {
    id: 32,
    name: "Dark Violet",
    value: "#9400D3",
  },
  {
    id: 33,
    name: "Plum",
    value: "#DDA0DD",
  },
];

function GraphingCalculators() {

  

  //Initial equations
  const [equations, setEquations] = useState<Equation[]>([
    {
      Input1: "(x^2+y^2-1)^3-(x^2)*(y^3)",
      type: "implicit",
      Points: [{ InputX: "0", InputY: "0" }],
      Line: "polyline",
      color:"red"
    },
    // Linear
  /*{
    Input1: "2 * x + 1",
    type: "linear",
    Points: [{ InputX: "0", InputY: "0" }],
    Line: "polyline",
    color: "blue",
  },
  // Implicit
  {
    Input1: "x^2 + y^2 -1",
    type: "implicit",
    Points: [{ InputX: "0", InputY: "0" }],
    Line: "polyline",
    color: "green",
  },
  // Polar
  {
    Input1: "r = 1 + sin(theta)",
    type: "polar",
    Points: [{ InputX: "0", InputY: "0" }],
    Line: "polyline",
    color: "purple",
  },
  // Parametric
  {
    Input1: "cos(t)",
    Input2: "sin(t)",
    type: "parametric",
    Points: [{ InputX: "0", InputY: "0" }],
    Line: "polyline",
    color: "orange",
  },
  // Vector
  {
    Input1: "1",
    Input2: "2",
    Input3: "3",
    Input4: "4",
    type: "vector",
    Points: [{ InputX: "0", InputY: "0" }],
    Line: "polyline",
    color: "yellow",
  },
  // Text
  {
    Input1: "Hello, world!",
    Input2: "0",
    Input3: "0",
    type: "text",
    Points: [{ InputX: "0", InputY: "0" }],
    Line: "polyline",
    color: "brown",
  },
  // Points
  {
    Input1: "",
    type: "points",
    Points: [{ InputX: "0", InputY: "0" }, { InputX: "1", InputY: "1" }],
    Line: "polyline",
    color: "teal",
  },*/
  ]);

  //Graph
  const rootEl = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    try {
      if (rootEl.current) {
        rootEl.current.innerHTML = "";
        //FunctionPlot options
        functionPlot({
          target: rootEl.current,
          width: rootEl.current.clientWidth,
          height: rootEl.current.clientHeight,
          
          grid: true,
          //Going through all inputs
          data: equations.map(
            ({
              Input1: Input1,
              type,
              color,
              closed,
              Input2: Input2,
              Input3,
              Input4,
              Points,
              Line,
            }) => {
              //Checking type of function (linear needs to have GraphType: 'polyline')
              if (type === "linear") {
                return {
                  fnType: type,
                  fn: validateInput(Input1, type)?Input1:"0",
                  graphType: Line,
                  color: color,
                  closed: closed,
                };
              } else if (type === "implicit") {
                return {
                  fnType: type,
                  fn: validateInput(Input1, type)?Input1:"0",
                  color: color,
                  closed: closed,
                };
              } else if (type === "polar") {
                return {
                  fnType: type,
                  r: validateInput(Input1, type)?Input1:"0",
                  graphType: Line,
                  color: color,
                  closed: closed,
                };
              } else if (type === "text") {
                return {
                  graphType: "text",
                  text: Input1,
                  location: [
                    Input2 ? parseFloat(Input2) : 0, // Provide a default value of 0 if Input2 is undefined
                    Input3 ? parseFloat(Input3) : 0, // Provide a default value of 0 if Input3 is undefined
                  ],
                  color: color,
                  closed: closed,
                };
              } else if (type === "vector") {
                return {
                  fnType: "vector",
                  graphType: Line,

                  vector: [
                    Input1 ? parseFloat(Input1) : 0, // Provide a default value of 0 if Input2 is undefined
                    Input2 ? parseFloat(Input2) : 0, // Provide a default value of 0 if Input3 is undefined
                  ],
                  offset: [
                    Input3 ? parseFloat(Input3) : 0, // Provide a default value of 0 if Input2 is undefined
                    Input4 ? parseFloat(Input4) : 0, // Provide a default value of 0 if Input3 is undefined
                  ],
                  color: color,
                };
              } else if (type === "parametric") {
                return {
                  fnType: type,
                  x: validateInput(Input1, type)?Input1:"0",
                  y: validateInput(Input2?Input2:"", type)?Input1:"0",
                  graphType: Line,
                  color: color,
                  closed: closed,
                };
              } else {
                return {
                  fnType: "points",
                  points: Points.map(({ InputX, InputY }) => [
                    parseFloat(InputX),
                    parseFloat(InputY),
                  ]),
                  graphType: Line,
                  color: color,
                  closed: closed,
                };
              }
            }
          ),
          tip: {
            renderer: (x: number, y: number, index: number) => {
              const equation = equations[index]; // Get the current equation
              return `f(x)=: ${equation.Input1}, x: ${x.toFixed(
                2
              )}, y: ${y.toFixed(2)}`; //Setting format of tip
            },
          },
        });
      }
    } catch (e) {}
  }, [equations]); // Add other input dependencies here
  //Handling equation input change
  const handleInputChange1 =
  
    (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      
      const newEquations = [...equations];
     
      newEquations[index].Input1 = e.target.value;
      validateInput(newEquations[index].Input1, newEquations[index].type)===false? newEquations[index].Error="Incorrect input":(newEquations[index].Error="")
   
      setEquations(newEquations);
      
    };
  const handleInputChange2 =
    (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const newEquations = [...equations];
      newEquations[index].Input2 = e.target.value;
      validateInput(e.target.value, newEquations[index].type)===false? newEquations[index].Error="Incorrect input":(newEquations[index].Error="")

      setEquations(newEquations);
    };
  const handleInputChange3 =
    (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const newEquations = [...equations];
      newEquations[index].Input3 = e.target.value;
      validateInput(e.target.value, newEquations[index].type)===false? newEquations[index].Error="Incorrect input":(newEquations[index].Error="")
      setEquations(newEquations);
    };
  const handleInputChange4 =
    (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const newEquations = [...equations];
      newEquations[index].Input4 = e.target.value;
     validateInput(e.target.value, newEquations[index].type)===false? newEquations[index].Error="Incorrect input":(newEquations[index].Error="")
      setEquations(newEquations);
    };
  const handlePInputChangeX =
    (indexP: number, index: number) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newEquations = [...equations];
      //const newPoints = [...points];
      //newPoints[indexP].InputY=e.target.value;
      newEquations[index].Points[indexP].InputX = e.target.value;

      setEquations(newEquations);
    };
  const handlePInputChangeY =
    (indexP: number, index: number) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newEquations = [...equations];
      //const newPoints = [...points];
      //newPoints[indexP].InputY=e.target.value;
      newEquations[index].Points[indexP].InputY = e.target.value;

      setEquations(newEquations);
    };
  const handleClosedInputChange =
    (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const newEquations = [...equations];
      newEquations[index].closed = e.target.checked;
      setEquations(newEquations);
    };
  const handleLineCheckboxChange =
    (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const newEquations = [...equations];
      e.target.checked
        ? (newEquations[index].Line = "scatter")
        : (newEquations[index].Line = "polyline");
      setEquations(newEquations);
    };
  //Adding new input and adding default data
  const addEquation = () => {
    const defaultPoints = [{ InputX: "0", InputY: "0" }]; // Default points for each equation

    setEquations([
      ...equations,
      { Input1: "", type: "linear", Points: defaultPoints, Line: "polyline" },
    ]);
  };
  const addPoint = (equationIndex: number) => {
    const newEquations = [...equations];
    newEquations[equationIndex].Points.push({ InputX: "0", InputY: "0" });
    setEquations(newEquations);
  };
  //Handling type input change
  const handleTypeInputChange = (index: number) => (selectedOptions: any) => {
    const newEquations = [...equations];
    // Check if an option is selected
    if (selectedOptions && selectedOptions.length > 0) {
      newEquations[index].type = selectedOptions[0].name as
        | "linear"
        | "implicit"
        | "polar"
        | "parametric"
        | "text"
        | "vector";
    } else {
      // If no option is selected, clear the color
      newEquations[index].color = undefined;
    }
    setEquations(newEquations);
  };
  //Handling color input change
  const handleColorInputChange = (index: number) => (selectedOptions: any) => {
    const newEquations = [...equations];
    // Check if an option is selected
    if (selectedOptions && selectedOptions.length > 0) {
      newEquations[index].color = selectedOptions[0].value;
    } else {
      // If no option is selected, clear the color
      newEquations[index].color = undefined;
    }
    setEquations(newEquations);
  };
  //Removing input
  const removeEquation = (index: number) => {
    const newEquations = [...equations];
    newEquations.splice(index, 1);
    setEquations(newEquations);
  };
  const removePoint = (equationIndex: number, pointIndex: number) => {
    const newEquations = [...equations];
    newEquations[equationIndex].Points.splice(pointIndex, 1);
    setEquations(newEquations);
  };

  return (
    
    //Layout
    <div className=" bg-primaryColor pl-8 pt-4 pb-4" >
      
      <div className="flex">
        <div className="z-40 w-2/5">
          <Popup
            trigger={
              <button className="text-white md:font-bold italic underline">
                {" "}
                User guide{" "}
              </button>
            }
            modal
            nested
            closeOnEscape
            
            children={
              <div className="bg-slate-500 rounded border-8 border-black w-4/6 m-auto overflow-y-scroll h-96 bg-opacity-95">
                <h4 className="text-6xl text-center m-4 md:font-bold">GUIDE</h4>
                <h1 className="text-3xl text-center m-3 md:font-bold">
                  LAYOUT
                </h1>
                <p className="m-1">
                  On the left side of the screen is the input area where you can
                  input your functions, it consists of:<br></br>
                  1. User's guide, where you can learn how to use graphic
                  calculator<br></br>
                  2. Equation input with 2 selection boxes(function type and
                  color), 2 checkboxes(Scatter and closed) and "Remove" button
                  <br></br>
                  3. "Add Equation" button<br></br>
                  On the right side of the screen are the results of your input.
                </p>
                <h1 className="text-3xl text-center m-3 md:font-bold">
                  GETTING STARTED
                </h1>
                <p className="m-1">
                  When you load the page, you can see 9 equation inputs
                  showcasing examples of different functions.<br></br>
                  To see your function, enter it in the textbox.<br></br>
                  Choose your function type(default: linear) and color from the
                  selection boxes<br></br>
                  If you drag your mouse on the drawn function, you will see
                  your input and [x, y] coordinates(only works for linear
                  functions).<br></br>
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
                  equation correctly(only x variables are accepted for linear
                  functions, x and y for implicit, theta for polar, t for
                  parametric), otherwise the graph will be unresponsive until
                  you correct it
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
                  "abs(x)" - absolute value<br></br>
                  "PI" - pi number, approximately 3,14<br></br>
                  "a%b" - Remainder<br></br>
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
            <div className=" my-4 border-b-4 border-b-black overflow-x-auto" key={index}>
              <label
                className="text-white"
                htmlFor={`equationInput-${index}`} /*Input label */
              >
                Input {index + 1}:{" "}
              </label>
              {equation.type === "parametric" ? (
                <>
                  <input
                    type="text"
                    id={`parametricX-${index}`}
                    value={equation.Input1}
                    onChange={handleInputChange1(index)}
                    className="border border-black bg-secondaryColor text-red-100 h-5/6"
                    placeholder="X input"
                  />
                  <input
                    type="text"
                    id={`parametricY-${index}`}
                    value={equation.Input2}
                    onChange={handleInputChange2(index)}
                    className="border border-black bg-secondaryColor text-red-100 h-5/6"
                    placeholder="Y input"
                  />
                </>
              ) : equation.type === "text" ? (
                <>
                  <input
                    type="text"
                    id={`Text-${index}`}
                    value={equation.Input1}
                    onChange={handleInputChange1(index)}
                    className="border border-black bg-secondaryColor text-red-100 h-5/6"
                    placeholder="text"
                  />
                  <input
                    type="text"
                    id={`CoordX-${index}`}
                    value={equation.Input2}
                    onChange={handleInputChange2(index)}
                    className="border border-black bg-secondaryColor text-red-100 h-5/6 w-1/12"
                    placeholder="X"
                  />
                  <input
                    type="text"
                    id={`CoordY-${index}`}
                    value={equation.Input3}
                    onChange={handleInputChange3(index)}
                    className="border border-black bg-secondaryColor text-red-100 h-5/6 w-1/12"
                    placeholder="Y "
                  />
                </>
              ) : equation.type === "vector" ? (
                <>
                  <input
                    type="text"
                    id={`LengthX-${index}`}
                    value={equation.Input1}
                    onChange={handleInputChange1(index)}
                    className="border border-black bg-secondaryColor text-red-100 h-5/6 w-2/12"
                    placeholder="size-X"
                  />
                  <input
                    type="text"
                    id={`LengthY-${index}`}
                    value={equation.Input2}
                    onChange={handleInputChange2(index)}
                    className="border border-black bg-secondaryColor text-red-100 h-5/6 w-2/12"
                    placeholder="sizeY"
                  />
                  <input
                    type="text"
                    id={`OffsetX-${index}`}
                    value={equation.Input3}
                    onChange={handleInputChange3(index)}
                    className="border border-black bg-secondaryColor text-red-100 h-5/6 w-2/12"
                    placeholder="offset-X "
                  />
                  <input
                    type="text"
                    id={`OffsetY-${index}`}
                    value={equation.Input4}
                    onChange={handleInputChange4(index)}
                    className="border border-black bg-secondaryColor text-red-100 h-5/6 w-2/12"
                    placeholder="offset-Y"
                  />
                </>
              ) : equation.type === "points" ? (
                <>
                  {equation.Points.map((point, indexP) => (
                    <div key={indexP}>
                      <label
                        className="text-white"
                        htmlFor={`pointInput-${indexP}`} /*Input label */
                      >
                        X {indexP + 1}:{" "}
                      </label>
                      <input
                        type="text"
                        id={`PointX-${indexP}`}
                        value={point.InputX}
                        onChange={handlePInputChangeX(indexP, index)}
                        className="border border-black bg-secondaryColor text-red-100 h-5/6"
                        placeholder="X input"
                      />
                      <label
                        className="text-white"
                        htmlFor={`pointInput-${indexP}`} /*Input label */
                      >
                        Y {indexP + 1}:{" "}
                      </label>
                      <input
                        type="text"
                        id={`PointY-${indexP}`}
                        value={point.InputY}
                        onChange={handlePInputChangeY(indexP, index)}
                        className="border border-black bg-secondaryColor text-red-100 h-5/6"
                        placeholder="Y input"
                      />
                      <button //Button to remove input
                        className="border-2 border-indigo-950 my-2 bg-primaryColor text-white"
                        onClick={() => removePoint(index, indexP)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button //Button to add point
                    className="border-2 border-black my-2 bg-primaryColor text-white w-1/3"
                    onClick={() => addPoint(index)}
                  >
                    Add Point
                  </button>
                </>
              ) : (
                <input
                  type="text"
                  id={`equationInput-${index}`}
                  value={equation.Input1}
                  onChange={handleInputChange1(index)}
                  placeholder="Input"
                  className="border border-black bg-secondaryColor text-red-100 h-5/6"
                />
              )}
              <button //Button to remove input
                className="border-2 border-indigo-950 my-2 bg-primaryColor text-white"
                onClick={() => removeEquation(index)}
              >
                Remove
              </button>

              <div className="flex">
                <div>
                  <p className="text-white my-auto mx-2">Function type:</p>
                  <Select //Type select
                    className="text-red-200 bg-extraColor1"
                    options={optionsType}
                    color="green"
                    searchable={false}
                    clearable={true}
                    closeOnClickInput={true}
                    placeholder="Select type..."
                    closeOnSelect={true}
                    labelField="name"
                    valueField="id"
                    onChange={(selectedOptions) =>
                      handleTypeInputChange(index)(selectedOptions)
                    }
                    values={[{ id: 1, name: equation.type }]}
                  />
                  
                </div>
                <div>
                  <p className="text-white my-auto mx-2"> Color: </p>
                  <Select //Color select
                    className="text-red-200 bg-extraColor1"
                    options={optionsColor}
                    color="green"
                    searchable={true}
                    clearable={true}
                    closeOnClickInput={true}
                    closeOnSelect={true}
                    placeholder="Select color..."
                    labelField="name"
                    valueField="name"
                    onChange={(selectedOptions) =>
                      handleColorInputChange(index)(selectedOptions)
                    }
                    values={[]}
                  />
                  
                </div>
                <div className="flex">
                  <label
                    className="text-white my-auto mx-1"
                    htmlFor={`LineInput-${index}`} /*Input label */
                  >
                    Scatter:
                  </label>
                  <input //Line input
                    type="checkbox"
                    id={`LineInput-${index}`}
                    checked={equations[index].Line === "scatter" || false}
                    disabled={
                      equations[index].type === "text" ||
                      equations[index].type === "implicit"
                    }
                    onChange={handleLineCheckboxChange(index)}
                    className="border border-black bg-secondaryColor text-red-100 h-5/6 my-auto mx-1"
                  />
                  <p className="my-auto text-white mx-2">Closed: </p>
                  <input //Closed input
                    type="checkbox"
                    id={`closedCheckbox-${index}`}
                    disabled={
                      equations[index].Line === "scatter" ||
                      equations[index].type === "text" ||
                      equations[index].type === "vector"
                    }
                    checked={equations[index].closed || false}
                    onChange={handleClosedInputChange(index)}
                    className="border border-black bg-secondaryColor text-red-100 h-5/6 my-auto"
                  />
                  <p className="text-red-600">{equations[index].Error}</p>
                </div>
              </div>
            </div>
          ))}

          <button //Button to add input
            className="border-2 border-black my-2 bg-primaryColor text-white w-fit"
            onClick={addEquation}
          >
            Add Equation
          </button>
        </div>
        <div
          className="bg-gray-200 border border-black z-30 w-full text-black"
          ref={rootEl}
        ></div>
      </div>
    </div>
  );
}

export default GraphingCalculators;
