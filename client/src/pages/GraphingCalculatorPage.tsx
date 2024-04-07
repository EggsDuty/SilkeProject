import GraphingCalculators from "../components/Calculators/GraphingCalculator";
import Header from "../components/Header";

export default function GraphingCalculatorPage(){
    return(
        <>
        <div>
            <Header />
            <div className="w-full h-full">
            <GraphingCalculators />
            </div>
        </div>
        </>
    )
}