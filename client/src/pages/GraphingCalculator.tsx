import React, { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import functionPlot from "function-plot";

function GraphingCalculators() {
  const [equations, setEquations] = useState<string[]>([
    "log(3*x) / log(6)",
    "2*x",
    "x^2",
    "2^x",
    "exp(x)",
    "sqrt(x)",
    "nthRoot(x,3)"
  ]); // Initial equations
  const rootEl = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    try {
      if (rootEl.current) {
        functionPlot({
          target: rootEl.current,
          width: window.innerWidth,
          height: 500,
          yAxis: { domain: [-1, 9] },
          grid: true,
          data: equations.map((eq) => ({
            fn: eq,
            
          })),
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
    <div className="bg-indigo-600">
      <Header />
      {equations.map((equation, index) => (
        <div key={index}>
          <label className="" htmlFor={`equationInput-${index}`}>
            Equation {index + 1}:{" "}
          </label>
          <input
            type="text"
            id={`equationInput-${index}`}
            value={equation}
            onChange={handleInputChange(index)}
            className="border border-black text-pink-800 bg-indigo-200"
          />
          <button className="border-2 border-indigo-950 my-2 bg-indigo-400" onClick={() => removeEquation(index)}>Remove</button>
        </div>
      ))}
      <button className="border-2 border-black my-2 bg-indigo-400" onClick={addEquation}>Add Equation</button>
      <div className="bg-white border border-black " ref={rootEl}></div>
    </div>
  );
}

export default GraphingCalculators;
