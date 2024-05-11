import React, { useState } from "react";
import DraggableBox from "./DraggableBox";
import StandardCalculator from "../Calculators/StandardCalculator";
import ScientificCalculator from "../Calculators/ScientificCalculator";
import GraphingCalculators from "../Calculators/GraphingCalculator";
import ProgrammersCalculator from "../Calculators/ProgrammersCalculator";

function Sidebar() {
  const [calculators, setCalculators] = useState<string[]>([]);
  const [calculatorPositions, setCalculatorPositions] = useState<{ [key: string]: { calculator: React.ReactNode; initialSize?: { width: number; height: number } } }>({});

  const addCalculator = (calc: React.ReactNode, initialSize?: { width: number, height: number }) => {
    const id = Math.random().toString(36).substring(7);
    setCalculators((prevCalculators) => [...prevCalculators, id]);
    setCalculatorPositions({
      ...calculatorPositions,
      [id]: { calculator: calc, initialSize: initialSize }
    });
  };

  const removeCalculator = (id: string) => {
    const updatedCalculators = calculators.filter((calculatorId) => calculatorId !== id);
    const { [id]: removed, ...updatedPositions } = calculatorPositions;
    setCalculators(updatedCalculators);
    setCalculatorPositions(updatedPositions);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-2.5rem)] w-32 bg-[#100524] sticky left-0 z-50 text-white text-center pt-32 space-y-4 overflow-visible">

      <p className="text-gray-400 font-bold border-b-2 mx-3 pb-2 border-gray-400">Drag your calculators</p>
      <div className="border-2 mx-3 rounded-lg hover:cursor-pointer py-1 bg-secondaryColor bg-opacity-40" role= "none" onClick={() => addCalculator(<div><p className="text-black h-[24px]">Standard calculator</p><div className="w-[100%] h-[100%]"style={{height: 'calc(100% - 24px'}}><StandardCalculator /></div></div>, { width: 341, height: 522 })}>Standard Calculator</div>
      <div className="border-2 mx-3 rounded-lg hover:cursor-pointer py-1 bg-secondaryColor bg-opacity-40" role= "none" onClick={() => addCalculator(<div><p className="text-black h-[24px]">Scientific calculator</p><div className="w-[100%] h-[100%]"style={{height: 'calc(100% - 24px'}}><ScientificCalculator /></div></div>, { width: 341, height: 466 })}>Scientific Calculator</div>
      <div className="border-2 mx-3 rounded-lg hover:cursor-pointer py-1 bg-secondaryColor bg-opacity-40" role= "none" onClick={() => addCalculator(<div style={{ width: '100%', height: '100%', overflow: 'auto' }}><p className="text-black h-[24px]">Graphing calculator</p><div className="w-[100%] h-[100%]"style={{height: 'calc(100% - 24px'}}><GraphingCalculators /></div></div>, { width: 918, height: 356.5 })}>Graphing Calculator</div>
      <div className="border-2 mx-3 rounded-lg hover:cursor-pointer py-1 bg-secondaryColor bg-opacity-40" role= "none" onClick={() => addCalculator(<div style={{ width: '100%', height: '100%', overflow: 'auto' }} className="justify-center items-center"><p className="text-black h-[24px] justify-center items-center">Programmers calculator</p><div className="w-[100%] h-[100%]" style={{height: 'calc(100% - 24px'}}><ProgrammersCalculator /></div></div>, { width: 315.6, height: 424 })}>Programmers Calculator</div>

      {calculators.map((id) => (
        
        <DraggableBox key={id} initialSize={calculatorPositions[id].initialSize}>
          <button className="text-xs text-gray-500 hover:text-gray-300 bg-primaryColor h-[22px]"  onClick={() => removeCalculator(id)}>Remove</button>
          <div className="relative w-[100%] " style={{height: 'calc(100% - 22px)'}}>{calculatorPositions[id].calculator}</div>
        </DraggableBox>
      ))}

    </div>
  );
}

export default Sidebar;
