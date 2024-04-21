import Header from "../components/Header";
import ProgrammersCalculator from "../components/Calculators/ProgrammersCalculator";

function ProgrammersCalculatorPage() {
  return (
    <>
      <Header />
      <div className="flex justify-center items-center h-screen">
        <ProgrammersCalculator />
      </div>
    </>
  );
}

export default ProgrammersCalculatorPage;