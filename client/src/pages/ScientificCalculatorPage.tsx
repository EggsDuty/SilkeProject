import Header from "../components/Header";
import ScientificCalculator from "../components/Calculators/ScientificCalculator";

function ScientificCalculatorPage() {
  return (
    <>
      <Header />
      <div className="flex justify-center items-center h-screen">
        <div className=" w-[325px] h-[420px] z-10 ">
          <ScientificCalculator />
        </div>
      </div>
    </>
  );
}

export default ScientificCalculatorPage;
