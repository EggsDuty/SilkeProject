import DraggableBox from "./DraggableBox"
import StandardCalculator from "../Calculators/StandardCalculator"
import ScientificCalculator from "../Calculators/ScientificCalculator"
import GraphingCalculators from "../Calculators/GraphingCalculator"
import { ReactNode, useState } from "react"

function Sidebar(){
    const [calculators, setCalculator] = useState<ReactNode[]>([]);
    const addCalculator = (calc : ReactNode) => {
        setCalculator([
          ...calculators,
          calc
        ]);
      };
      const removeCalculator = (index : number) => {
        const newCalculators = [...calculators];
        newCalculators.splice(index, 1);
        setCalculator(newCalculators);
    };
    return(
        <div className="flex flex-col h-[calc(100vh-2.5rem)] w-32 bg-[#100524] sticky left-0 z-50 text-white text-center pt-32 space-y-4 overflow-visible">

            <p className=" text-gray-400 font-bold border-b-2 mx-3 pb-2 border-gray-400">Drag your calculators</p>
            <div className="border-2 mx-3 rounded-lg hover:cursor-move py-1 bg-secondaryColor bg-opacity-40 " onClick={() => addCalculator(<StandardCalculator />)}>Standard Calculator</div>
            <div className="border-2 mx-3 rounded-lg hover:cursor-move py-1 bg-secondaryColor bg-opacity-40" onClick={() => addCalculator(<ScientificCalculator />)}>Scientific Calculator</div>
            <div className="border-2 mx-3 rounded-lg hover:cursor-move py-1 bg-secondaryColor bg-opacity-40" onClick={() => addCalculator(<GraphingCalculators />)}>Graphing Calculator</div>
            {calculators.map((calculator, index) => (
                <DraggableBox>
                    <button className="text-xs text-gray-500 hover:text-gray-300 bg-primaryColor" onClick={() => removeCalculator(index)}>Remove</button>
                <div>{calculator}</div>
                
                </DraggableBox>
            ))}

        </div>
    )

}

export default Sidebar