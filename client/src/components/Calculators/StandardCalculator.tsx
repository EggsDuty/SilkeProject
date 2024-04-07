import { useState } from "react";
import { Textfit } from "react-textfit";
import { sqrt, square, divide, multiply, round } from "mathjs";

function StandardCalculator() {
  const [currentOperand, setCurrOperand] = useState("0");
  const [previousOperand, setPrevOperand] = useState("");
  const [currentOperation, setCurrentOperation] = useState("0");
  const [previousOperation, setPreviousOperation] = useState("");
  const [result, setResult] = useState("");
  const [operation, setOperation] = useState("");
  const [changedOperand, setChangedOperand] = useState(false);
  const [didCalculation, setDidCalculation] = useState(false);

  const updateOperand = (value: string) => {
    if (!didCalculation) {
      if (currentOperand.includes(".") && value === ".") {
        return;
      }
      if (changedOperand == false) {
        if (currentOperand === "0") {
          if (value === ".") {
            setCurrentOperation(currentOperation + value);
            setCurrOperand(currentOperand + value.toString());
          } else {
            setCurrentOperation(value);
            setCurrOperand(value);
          }
        } else if (currentOperand.length < 16) {
          setCurrentOperation(currentOperand + value);
          setCurrOperand(currentOperand + value);
        }
      } else {
        setCurrentOperation(value);
        setCurrOperand(value);
        setChangedOperand(false);
      }
    } else {
      setDidCalculation(false);
      clearCalculator();
      setCurrOperand(value);
      setCurrentOperation(value);
    }
  };

  const clearCurrentOperation = () => {
    if (didCalculation == true) {
      setCurrentOperation("0");
      setCurrOperand("0");
      setPreviousOperation("");
      setPrevOperand("");
      setOperation("");
      setChangedOperand(false);
    } else setCurrentOperation("0");
    setCurrOperand("0");
  };

  const clearCalculator = () => {
    setCurrentOperation("0");
    setCurrOperand("0");
    setPreviousOperation("");
    setPrevOperand("");
    setOperation("");
    setChangedOperand(false);
  };

  const removeLastDigit = () => {
    if (!didCalculation) {
      if (!currentOperand.startsWith("-") && currentOperand.length != 1) {
        setCurrentOperation(currentOperand.slice(0, currentOperand.length - 1));
        setCurrOperand(currentOperand.slice(0, currentOperand.length - 1));
      } else if (currentOperand.startsWith("-") && currentOperand.length != 2) {
        setCurrentOperation(currentOperand.slice(0, currentOperand.length - 1));
        setCurrOperand(currentOperand.slice(0, currentOperand.length - 1));
      } else {
        setCurrOperand("0");
        setCurrentOperation("0");
      }
    } else {
      setPreviousOperation("");
      setDidCalculation(false);
    }
  };

  const changeSign = () => {
    if (!didCalculation) {
      if (currentOperand === "0") {
        setCurrOperand(currentOperand);
        setCurrentOperation(currentOperand);
      } else {
        setCurrOperand(String(parseFloat(currentOperand) * -1));
        setCurrentOperation(String(parseFloat(currentOperand) * -1));
      }
    } else {
      setCurrOperand(String(parseFloat(result) * -1));
      setCurrentOperation(String(parseFloat(result) * -1));
      setDidCalculation(false);
    }
  };

  const swapOperand = (value: string) => {
    const ops = ["+", "-", "*", "/"];
    if (!didCalculation) {
      if (!ops.some((op) => previousOperand.endsWith(op))) {
        setPrevOperand(currentOperand + value);
        setPreviousOperation(currentOperand + value);
        setOperation(value);
        setChangedOperand(true);
        setDidCalculation(false);
      } else {
        console.log(previousOperand);
        setPrevOperand(previousOperand.slice(0, previousOperand.length - 1) + value);
        setPreviousOperation(previousOperation.slice(0, previousOperation.length - 1) + value);
        setOperation(value);
        setChangedOperand(true);
        setDidCalculation(false);
      }
    } else {
      if (!ops.some((op) => previousOperand.endsWith(op))) {
        setPreviousOperation(previousOperand + value);
        setOperation(value);
        setChangedOperand(true);
        setDidCalculation(false);
      } else {
        console.log(previousOperand);
        setPrevOperand(previousOperand.slice(0, previousOperand.length - 1) + value);
        setPreviousOperation(previousOperation.slice(0, previousOperation.length - 1) + value);
        setOperation(value);
        setChangedOperand(true);
        setDidCalculation(false);
      }
    }
  };

  const handleSquareRoot = () => {
    if (currentOperand != "0") {
      if (!currentOperand.startsWith("-")) {
        if (!previousOperand) {
          let calculation = round(sqrt(parseFloat(currentOperand)), 3);
          setPreviousOperation("sqrt(" + currentOperand + ")");
          setCurrentOperation(calculation.toString());
          setPrevOperand(calculation.toString());
          setCurrOperand(calculation.toString());
          console.log(calculation);
        } else {
          const currValue = parseFloat(currentOperand).toFixed(1);
          let calculation = sqrt(parseFloat(currValue));
          console.log(calculation);
          if (didCalculation) {
            setPreviousOperation("sqrt(" + currentOperand + ")");
          } else {
            setPreviousOperation(previousOperation + "sqrt(" + currentOperand + ")");
          }
          setCurrentOperation(calculation.toString());
          setPrevOperand(previousOperand);
          setCurrOperand(calculation.toString());
        }
      } else {
        setPreviousOperation("sqrt(" + currentOperand + ")");
        setCurrentOperation("Invalid input");
        setDidCalculation(true);
      }
    }
  };

  const handleSquare = () => {
    if (!didCalculation) {
      if (currentOperand) {
        if (!previousOperand) {
          let calculation = round(square(parseFloat(currentOperand)), 3);
          setPreviousOperation("sqr(" + currentOperand + ")");
          setCurrentOperation(calculation.toString());
          setPrevOperand(calculation.toString());
          setCurrOperand(calculation.toString());
        } else {
          console.log(previousOperand);
          let calculation = round(square(parseFloat(currentOperand)), 3);
          setPreviousOperation(previousOperation + "sqr(" + currentOperand + ")");
          setCurrentOperation(calculation.toString());
          setPrevOperand(previousOperand);
          setCurrOperand(calculation.toString());
        }
      }
    } else {
      console.log(previousOperand);
      let calculation = round(square(parseFloat(result)), 1);
      setPreviousOperation("sqr(" + result + ")");
      setCurrentOperation(calculation.toString());
      setPrevOperand(previousOperand);
      setCurrOperand(calculation.toString());
    }
  };

  const handleOneDividedBy = () => {
    if (!didCalculation) {
      if (currentOperand) {
        if (!previousOperand) {
          const currValue = parseFloat(currentOperand);
          let calculation = divide(1, currValue);
          setPreviousOperation("1/(" + currentOperand + ")");
          setCurrentOperation(calculation.toString());
          setPrevOperand(calculation.toString());
          setCurrOperand(calculation.toString());
        } else {
          const currValue = parseFloat(currentOperand);
          let calculation = divide(1, currValue);
          setPreviousOperation(previousOperation + "1/(" + currentOperand + ")");
          setCurrentOperation(calculation.toString());
          setPrevOperand(previousOperand);
          setCurrOperand(calculation.toString());
        }
      }
    } else {
      if (currentOperand) {
        if (!previousOperand) {
          let calculation = divide(1, parseFloat(result));
          setPreviousOperation("1/(" + currentOperand + ")");
          setCurrentOperation(calculation.toString());
          setPrevOperand(calculation.toString());
          setCurrOperand(calculation.toString());
        } else {
          let calculation = divide(1, parseFloat(result));
          setPreviousOperation("1/(" + result + ")");
          setCurrentOperation(calculation.toString());
          setPrevOperand(calculation.toString());
          setCurrOperand(result);
          console.log(calculation);
          console.log(previousOperand);
        }
      }
    }
  };

  const handlePercentage = () => {
    if (previousOperand) {
      const prevValue = parseFloat(previousOperand);
      const currValue = parseFloat(currentOperand);
      console.log(prevValue);
      console.log(currentOperand);
      const percentage = multiply(divide(currValue, 100), prevValue);
      setCurrOperand(percentage.toString());
      setPreviousOperation(previousOperand + percentage);
      setCurrentOperation(percentage.toString());
      setDidCalculation(true);
    } else {
      clearCalculator();
    }
  };

  const handleEquals = () => {
    if (previousOperand && currentOperand) {
      const prevValue = parseFloat(previousOperand);
      const currValue = parseFloat(currentOperand);
      setDidCalculation(true);
      let result = 0;
      switch (operation) {
        case "+":
          result = prevValue + currValue;
          setPrevOperand(result.toString());
          setPreviousOperation(prevValue + " " + operation + " " + currValue + " =");
          setCurrentOperation(result.toString());
          setResult(result.toString());
          break;
        case "-":
          result = prevValue - currValue;
          setPrevOperand(result.toString());
          setPreviousOperation(prevValue + " " + operation + " " + currValue + " =");
          setCurrentOperation(result.toString());
          setResult(result.toString());
          break;
        case "*":
          result = prevValue * currValue;
          setPrevOperand(result.toString());
          setPreviousOperation(prevValue + " " + operation + " " + currValue + " =");
          setCurrentOperation(result.toString());
          setResult(result.toString());
          break;
        case "/":
          result = prevValue / currValue;
          setPrevOperand(result.toString());
          setPreviousOperation(prevValue + " " + operation + " " + currValue + " =");
          setCurrentOperation(result.toString());
          setResult(result.toString());
          break;
      }
    }
  };

  return (
    <>
      <div className="calculator_base bg-[#202020] w-[325px]  z-10">
        <div className="screen text-white text-right pr-5 pl-3 min-h-[70px]"></div>
        <div className="screen text-white text-right  min-h-[90px] max-h-[90px]">
          <Textfit min={10} max={15} mode="single" className="calculator_screen_h min-h-[20px] max-h-[20px] text-gray-400 text-right pr-3 pl-3">
            {previousOperation}
          </Textfit>
          <Textfit min={20} max={50} mode="single" className="calculator_screen min-h-[80px] max-h-[80px] text-white text-right pr-3 pl-3">
            {currentOperation}
          </Textfit>
        </div>
        <div className="calculator_buttons grid grid-cols-4 gap-1 p-1">
          <button onClick={() => handlePercentage()} className="btnCalc-operation">
            %
          </button>
          <button onClick={() => clearCurrentOperation()} className="btnCalc-operation">
            CE
          </button>
          <button onClick={() => clearCalculator()} className="btnCalc-operation">
            C
          </button>
          <button onClick={() => removeLastDigit()} className="btnCalc-operation">
            &#8592;
          </button>
          <button onClick={() => handleOneDividedBy()} className="btnCalc-operation">
            1/x
          </button>
          <button onClick={() => handleSquare()} className="btnCalc-operation">
            x&#178;
          </button>
          <button onClick={() => handleSquareRoot()} className="btnCalc-operation">
            &#x221A;
          </button>
          <button onClick={() => swapOperand("/")} className="btnCalc-operation">
            /
          </button>
          <button onClick={() => updateOperand("7")} className="btnCalc-number">
            7
          </button>
          <button onClick={() => updateOperand("8")} className="btnCalc-number">
            8
          </button>
          <button onClick={() => updateOperand("9")} className="btnCalc-number">
            9
          </button>
          <button onClick={() => swapOperand("*")} className="btnCalc-operation">
            &#215;
          </button>
          <button onClick={() => updateOperand("4")} className="btnCalc-number">
            4
          </button>
          <button onClick={() => updateOperand("5")} className="btnCalc-number">
            5
          </button>
          <button onClick={() => updateOperand("6")} className="btnCalc-number">
            6
          </button>
          <button onClick={() => swapOperand("-")} className="btnCalc-operation">
            &#8722;
          </button>
          <button onClick={() => updateOperand("1")} className="btnCalc-number">
            1
          </button>
          <button onClick={() => updateOperand("2")} className="btnCalc-number">
            2
          </button>
          <button onClick={() => updateOperand("3")} className="btnCalc-number">
            3
          </button>
          <button onClick={() => swapOperand("+")} className="btnCalc-operation">
            &#43;
          </button>
          <button onClick={() => changeSign()} className="btnCalc-number">
            +/-
          </button>
          <button onClick={() => updateOperand("0")} className="btnCalc-number">
            0
          </button>
          <button onClick={() => updateOperand(".")} className="btnCalc-number">
            .
          </button>
          <button onClick={() => handleEquals()} className="btnCalc-equals">
            =
          </button>
        </div>
      </div>
    </>
  );
}

export default StandardCalculator;
