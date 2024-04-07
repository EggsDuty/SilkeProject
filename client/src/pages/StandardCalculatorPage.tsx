import Header from "../components/Header";
import StandardCalculator from "../components/Calculators/StandardCalculator";

function StandardCalculatorPage() {
  return (
    <>
      <Header />
      <div className="flex justify-center items-center h-screen">
        <StandardCalculator />
      </div>
    </>
  );
}

export default StandardCalculatorPage;
