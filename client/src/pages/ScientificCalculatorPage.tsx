import Header from "../components/Header";
import ScientificCalculator from "../components/Calculators/ScientificCalculator";

function ScientificCalculatorPage() {
  return (
    <>
      <Header />
      <div className="flex justify-center items-center h-screen">
        <ScientificCalculator />
      </div>
    </>
  );
}

export default ScientificCalculatorPage;
