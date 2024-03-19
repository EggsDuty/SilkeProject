import React, { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import functionPlot from "function-plot";
import Popup from "reactjs-popup";
import Select from "react-dropdown-select";

function GraphingCalculators() {
  //Equation components
  interface Equation {
    expression: string;
    type: "linear" | "implicit";
    color?: string;
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
  ];
  //Function color option list
  const optionsColor = [
    
    {
      id: 1,
      name: "green",
    },
    {
      id: 2,
      name: "red",
    },
    {
      id: 3,
      name: "indigo",
    },
    {
      id: 4,
      name: "black",
    },
    {
      id: 5,
      name: "white",
    },
    {
      id: 6,
      name: "pink",
    },
    {
      id: 7,
      name: "gray",
    },
  ];
  //Initial equations
  const [equations, setEquations] = useState<Equation[]>([
    { expression: "log(3*x) / log(6)", type: "linear" },
    { expression: "2*x", type: "linear" },
    { expression: "x^2", type: "linear" },
    { expression: "2^x", type: "linear" },
    { expression: "exp(x)", type: "linear" },
    { expression: "sqrt(x)", type: "linear" },
    { expression: "nthRoot(x,3)", type: "linear" },
    { expression: "x*x+y*y-1", type: "implicit" },
  ]);
  //Graph
  const rootEl = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    try {
      if (rootEl.current) {
        //FunctionPlot options
        functionPlot({
          target: rootEl.current,
          width: rootEl.current.clientWidth,
          height: rootEl.current.clientHeight,
          yAxis: { domain: [-1, 9] },
          grid: true,
          //Going through all inputs
          data: equations.map(({ expression, type, color }) => {
            //Checking type of function (linear needs to have GraphType: 'polyline')
            if (type === "linear") {
              return {
                fnType: type,
                fn: expression,
                graphType: "polyline",
                color: color,
              };
            } else {
              return {
                fnType: type,
                fn: expression,
                color: color,
              };
            }
          }),
          tip: {
            renderer: (x: number, y: number, index: number) => {
              const equation = equations[index]; // Get the current equation
              return `f(x)=: ${equation.expression}, x: ${x.toFixed(2)}, y: ${y.toFixed(2)}`; //Setting format of tip
            },
          },
        });
      }
    } catch (e) {}
  }, [equations]);
  //Handling equation input change
  const handleInputChange =
    (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const newEquations = [...equations];
      newEquations[index].expression = e.target.value;
      setEquations(newEquations);
    };
  //Adding new input and adding default data
  const addEquation = () => {
    setEquations([...equations, { expression: "", type: "linear" }]);
  };
  //Handling type input change
  const handleTypeInputChange = (index: number) => (selectedOptions: any) => {
    const newEquations = [...equations];
    // Check if an option is selected
    if (selectedOptions && selectedOptions.length > 0) {
      newEquations[index].type = selectedOptions[0].name as
        | "linear"
        | "implicit";
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
      newEquations[index].color = selectedOptions[0].name;
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

  return (
    //Layout
    <div className=" absolute w-full h-full ">
      <div className="w-full">
        <Header />
      </div>
      <div className="flex h-full">
        <div className="w-2/5">
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
                  2. Equation input with 2 selection boxes(function type and color) and "Remove" button<br></br>
                  3. "Add Equation" button<br></br>
                  On the right side of the screen are the results of your input.
                </p>
                <h1 className="text-3xl text-center m-3 md:font-bold">
                  GETTING STARTED
                </h1>
                <p className="m-1">
                  When you load the page, you can see 8 equation inputs
                  showcasing examples of different functions.<br></br>
                  To see your function, enter it in the textbox.<br></br>
                  Choose your function type(default: linear) and color from
                  the selection boxes<br></br>
                  If you drag your mouse on the drawn function, you will see
                  your input and [x, y] coordinates(does not work for implicit functions).<br></br>
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
                  equation correctly(only x variables are accepted for linear functions), otherwise
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
                  "abs(x)" - absolute value<br></br>
                  "PI" - pi number, approximately 3,14<br></br>
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
          {equations.map(({ expression, type, color }, index) => (
            <div className="flex my-4" key={index}>
              <label className="text-white" htmlFor={`equationInput-${index}`}/*Input label */> 
                Equation {index + 1}:{" "}
              </label>
              <input //Equation input
                type="text"
                id={`equationInput-${index}`}
                value={expression}
                onChange={handleInputChange(index)}
                className="border border-black bg-secondaryColor text-red-100 h-5/6"
              />
              
              <Select //Type select
                className="text-red-200 bg-extraColor1"
                options={optionsType}
                color="green"
                searchable={false}
                clearable={true}
                closeOnClickInput={true}
                closeOnSelect={true}
                labelField="name"
                valueField="id"
                onChange={(selectedOptions) =>
                  handleTypeInputChange(index)(selectedOptions)
                }
                values={[{id:1, name: type}]}
              />
              ;
              <Select //Color select
                className="text-red-200 bg-extraColor1"
                options={optionsColor}
                color="green"
                searchable={false}
                clearable={true}
                closeOnClickInput={true}
                closeOnSelect={true}
                labelField="name"
                valueField="id"
                onChange={(selectedOptions) =>
                  handleColorInputChange(index)(selectedOptions)
                }
                values={[]}
              />
              ;
              <button //Button to remove input
                className="border-2 border-indigo-950 my-2 bg-primaryColor text-white"
                onClick={() => removeEquation(index)}
              >
                Remove
              </button>
            </div>
          ))}

          <button //Button to add input
            className="border-2 border-black my-2 bg-primaryColor text-white w-1/3"
            onClick={addEquation}
          >
            Add Equation
          </button>
        </div>
        <div
          className="bg-gray-200 border border-black w-3/5 h-full "
          ref={rootEl}
        ></div>
      </div>
    </div>
  );
}

export default GraphingCalculators;
