import DraggableBox from "./DraggableBox"
import StandardCalculator from "../Calculators/StandardCalculator"
import ScientificCalculator from "../Calculators/ScientificCalculator"
import GraphingCalculators from "../Calculators/GraphingCalculator"
import { ReactNode, useState } from "react"

function Sidebar(){
    interface CalculatorItem {
        calculator: ReactNode;
        initialSize?: { width: number; height: number; };
      }
      
      const [calculators, setCalculators] = useState<CalculatorItem[]>([]);

      const addCalculator = (calc: ReactNode, initialSize?: { width: number, height: number }) => {
        setCalculators([
          ...calculators,
          { calculator: calc, initialSize: initialSize }
        ]);
      };
      
      const removeCalculator = (index: number) => {
        const newCalculators = [...calculators];
        newCalculators.splice(index, 1);
        setCalculators(newCalculators);
      };
    return(
        <div className="flex flex-col h-[calc(100vh-2.5rem)] w-32 bg-[#100524] sticky left-0 z-50 text-white text-center pt-32 space-y-4 overflow-visible">

            <p className=" text-gray-400 font-bold border-b-2 mx-3 pb-2 border-gray-400">Drag your calculators</p>
            <div className="border-2 mx-3 rounded-lg hover:cursor-pointer py-1 bg-secondaryColor bg-opacity-40 " onClick={() => addCalculator(<div><p className="text-black">Standard calculator</p><StandardCalculator /></div>, {width:341, height:521})}>Standard Calculator</div>
            <div className="border-2 mx-3 rounded-lg hover:cursor-pointer py-1 bg-secondaryColor bg-opacity-40" onClick={() => addCalculator(<div><p className="text-black">Scientific calculator</p><ScientificCalculator /></div>, {width:341, height:466})}>Scientific Calculator</div>
            <div className="border-2 mx-3 rounded-lg hover:cursor-pointer py-1 bg-secondaryColor bg-opacity-40" onClick={() => addCalculator(<div><p className="text-black">Graphing calculator</p><GraphingCalculators /></div>, {width:1035, height:415})}>Graphing Calculator</div>
            {calculators.map((calculator, index) => (
            <DraggableBox key={index} initialSize={calculator.initialSize}>
            <button className="text-xs text-gray-500 hover:text-gray-300 bg-primaryColor" onClick={() => removeCalculator(index)}>Remove</button>
            <div>{calculator.calculator}</div>
        </DraggableBox>
))}

                
                
       

        </div>
    )

}

export default Sidebar