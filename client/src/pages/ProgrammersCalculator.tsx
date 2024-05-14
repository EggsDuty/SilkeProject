import Header from "../components/Header";
import ProgrammersCalculator from "../components/Calculators/ProgrammersCalculator";

function ProgrammersCalculatorPage() {
  return (
    <>
      <Header />
      <div className="flex justify-center items-center h-screen">
        <div className=" h-[560px] w-[500px]">
          <ProgrammersCalculator />
        </div>
      </div>
    </>
  );
}

export default ProgrammersCalculatorPage;