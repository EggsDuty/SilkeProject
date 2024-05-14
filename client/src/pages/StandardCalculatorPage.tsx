import Header from "../components/Header";
import StandardCalculator from "../components/Calculators/StandardCalculator";

function StandardCalculatorPage() {
  return (
    <>
      <Header />
      <div className="flex justify-center items-center h-screen">
        <div className=" w-[341px] h-[470px] z-10 ">
          <StandardCalculator />
        </div>
      </div>
    </>
  );
}

export default StandardCalculatorPage;
