import { useState } from "react";
import { Textfit } from "react-textfit";
import { sqrt, square, divide, round, pi, evaluate, e, abs, log, log10, cube, nthRoot } from "mathjs";
import { MathJax, MathJaxContext } from "better-react-mathjax";

function ScientificCalculator() {
  const [currentOperand, setCurrOperand] = useState("0");
  const [previousOperand, setPrevOperand] = useState("");
  const [currentOperation, setCurrentOperation] = useState("0");
  const [previousOperation, setPreviousOperation] = useState("");
  const [result, setResult] = useState("");
  const [operation, setOperation] = useState("");
  const [changedOperand, setChangedOperand] = useState(false);
  const [didCalculation, setDidCalculation] = useState(false);
  const [did2nd, setDid2nd] = useState(false);
  const [didUpdateOperand, setDidUpdateOperand] = useState(false);
  const [didAdvanced, setDidAdvanced] = useState(false);
  const [didXPowerY, setDidXPowerY] = useState(false);
  const [didNthRoot, setDidNthRoot] = useState(false);

  const updateOperand = (value: string) => {
    setDidUpdateOperand(true);
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
      setDidUpdateOperand(false);
    } else {
      setCurrentOperation("0");
      setCurrOperand("0");
      setDidUpdateOperand(false);
    }
  };

  const clearCalculator = () => {
    setCurrentOperation("0");
    setCurrOperand("0");
    setPreviousOperation("");
    setPrevOperand("");
    setOperation("");
    setChangedOperand(false);
    setDidXPowerY(false);
    setDidNthRoot(false);
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
        setPrevOperand(previousOperand.slice(0, previousOperand.length - 1) + value);
        setPreviousOperation(previousOperation.slice(0, previousOperation.length - 1) + value);
        setOperation(value);
        setChangedOperand(true);
        setDidCalculation(false);
      }
    } else {
      if (!ops.some((op) => previousOperand.endsWith(op))) {
        setPreviousOperation(previousOperand + value);
        setCurrOperand(currentOperation);
        setOperation(value);
        setChangedOperand(true);
        setDidCalculation(false);
      } else {
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
        } else {
          const currValue = parseFloat(currentOperand).toFixed(1);
          let calculation = sqrt(parseFloat(currValue));
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

  const handleCubeRoot = () => {
    if (currentOperand != "0") {
      if (!currentOperand.startsWith("-")) {
        if (!previousOperand) {
          let calculation = round(nthRoot(parseFloat(currentOperand), 3), 3);
          setPreviousOperation("cuberoot(" + currentOperand + ")");
          setCurrentOperation(calculation.toString());
          setPrevOperand(calculation.toString());
          setCurrOperand(calculation.toString());
        } else {
          const currValue = parseFloat(currentOperand).toFixed(1);
          let calculation = nthRoot(parseFloat(currValue), 3);
          if (didCalculation) {
            setPreviousOperation("cuberoot(" + currentOperand + ")");
          } else {
            setPreviousOperation(previousOperation + "cuberoot(" + currentOperand + ")");
          }
          setCurrentOperation(calculation.toString());
          setPrevOperand(previousOperand);
          setCurrOperand(calculation.toString());
        }
      } else {
        setPreviousOperation("cuberoot(" + currentOperand + ")");
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
          let calculation = round(square(parseFloat(currentOperand)), 3);
          setPreviousOperation(previousOperation + "sqr(" + currentOperand + ")");
          setCurrentOperation(calculation.toString());
          setPrevOperand(previousOperand);
          setCurrOperand(calculation.toString());
        }
      }
    } else {
      let calculation = round(square(parseFloat(result)), 1);
      setPreviousOperation("sqr(" + result + ")");
      setCurrentOperation(calculation.toString());
      setPrevOperand(previousOperand);
      setCurrOperand(calculation.toString());
    }
  };

  const handleCube = () => {
    if (!didCalculation) {
      if (currentOperand) {
        if (!previousOperand) {
          let calculation = round(cube(parseFloat(currentOperand)), 3);
          setPreviousOperation("cube(" + currentOperand + ")");
          setCurrentOperation(calculation.toString());
          setPrevOperand(calculation.toString());
          setCurrOperand(calculation.toString());
          setDid2nd(false);
        } else {
          let calculation = round(cube(parseFloat(currentOperand)), 3);
          setPreviousOperation(previousOperation + "cube(" + currentOperand + ")");
          setCurrentOperation(calculation.toString());
          setPrevOperand(previousOperand);
          setCurrOperand(calculation.toString());
          setDid2nd(false);
        }
      }
    } else {
      let calculation = round(square(parseFloat(result)), 1);
      setPreviousOperation("sqr(" + result + ")");
      setCurrentOperation(calculation.toString());
      setPrevOperand(previousOperand);
      setCurrOperand(calculation.toString());
      setDid2nd(false);
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
        }
      }
    }
  };

  const handleModulo = () => {
    if (didCalculation) {
      setDidCalculation(false);
      setCurrentOperation("0");
      setCurrOperand("0");
      setDidAdvanced(true);
      setPreviousOperation(result + " mod");
    } else {
      if (previousOperation === "") {
        setPreviousOperation(currentOperand + " mod");
        setCurrentOperation("0");
        setCurrOperand("0");
        setDidAdvanced(true);
      } else {
        setPreviousOperation(previousOperation + " " + currentOperand + " mod");
        setCurrentOperation("0");
        setCurrOperand("0");
        setDidAdvanced(true);
      }
    }
  };

  const handle2nd = () => {
    if (did2nd) {
      setDid2nd(false);
    } else {
      setDid2nd(true);
    }
  };

  const handleLn = () => {
    if (currentOperation != "0") {
      let result;
      result = log(parseInt(currentOperation));
      setCurrentOperation(result.toString());
    } else {
      setCurrentOperation("Invalid input");
    }
  };

  const handleExp = () => {};

  const handleLog = () => {
    if (!didNthRoot) {
      if (previousOperation === "") {
        setPreviousOperation("nthRoot(" + currentOperation);
        setCurrentOperation("0");
        setCurrOperand("0");
        setDidNthRoot(true);
        setDidAdvanced(true);
        setDid2nd(false);
      } else {
        setPreviousOperation(previousOperation + "nthRoot(" + currentOperation);
        setCurrentOperation("0");
        setCurrOperand("0");
        setDidNthRoot(true);
        setDidAdvanced(true);
        setDid2nd(false);
      }
    } else {
      return;
    }
  };

  const handleLogYX = () => {
    if (currentOperation != "0") {
      if (!didNthRoot) {
        if (previousOperation === "") {
          setPreviousOperation("log(" + currentOperation);
          setCurrentOperation("0");
          setCurrOperand("0");
          setDidNthRoot(true);
          setDidAdvanced(true);
          setDid2nd(false);
        } else {
          setPreviousOperation(previousOperation + "log(" + currentOperation);
          setCurrentOperation("0");
          setCurrOperand("0");
          setDidNthRoot(true);
          setDidAdvanced(true);
          setDid2nd(false);
        }
      } else {
        return;
      }
    } else {
      setCurrentOperation("Invalid input");
    }
  };

  const handleAbs = () => {
    if (previousOperation === "") {
      let result;
      result = abs(parseInt(currentOperation));
      setPreviousOperation("abs(" + currentOperation + ")");
      setCurrentOperation(result.toString());
      setCurrOperand(result.toString());
    } else {
      let result;
      result = abs(parseInt(currentOperation));
      setPreviousOperation(previousOperation + " abs(" + currentOperation + ") =");
      setCurrentOperation(result.toString());
      setCurrOperand(result.toString());
    }
  };

  const handleFactorial = () => {
    let result;
    result = evaluate(currentOperation + "!");
    if (previousOperation === "") {
      setPreviousOperation(currentOperation + "!");
      setCurrentOperation(result);
      setPrevOperand(result.toString());
      setCurrOperand(result.toString());
      setResult(result);
    } else {
      setPreviousOperation(previousOperation + " " + currentOperation + "!");
      setCurrentOperation(result.toString());
      setCurrOperand(result.toString());
    }
  };

  const handle10Power = () => {
    let result;
    result = evaluate(10 + "^" + currentOperation);
    if (previousOperation === "") {
      setPreviousOperation("10^" + "(" + currentOperation + ")");
      setCurrentOperation(result);
      setPrevOperand(result.toString());
      setCurrOperand(result.toString());
      setResult(result);
    } else {
      setPreviousOperation(previousOperation + " " + " 10^" + "(" + currentOperation + ")");
      setCurrentOperation(result.toString());
      setCurrOperand(result.toString());
    }
  };

  const handle2Power = () => {
    let result;
    result = evaluate(2 + "^" + currentOperation);
    if (previousOperation === "") {
      setPreviousOperation("2^" + "(" + currentOperation + ")");
      setCurrentOperation(result);
      setPrevOperand(result.toString());
      setCurrOperand(result.toString());
      setResult(result);
      setDid2nd(false);
    } else {
      setPreviousOperation(previousOperation + " " + " 2^" + "(" + currentOperation + ")");
      setCurrentOperation(result.toString());
      setCurrOperand(result.toString());
      setDid2nd(false);
    }
  };

  const handleEPowerX = () => {
    let result;
    result = evaluate(e + "^" + currentOperation);
    if (previousOperation === "") {
      setPreviousOperation("e^" + "(" + currentOperation + ")");
      setCurrentOperation(result);
      setPrevOperand(result.toString());
      setCurrOperand(result.toString());
      setResult(result);
      setDid2nd(false);
    } else {
      setPreviousOperation(previousOperation + " " + " e^" + "(" + currentOperation + ")");
      setCurrentOperation(result.toString());
      setCurrOperand(result.toString());
      setDid2nd(false);
    }
  };

  const handleXPowerY = () => {
    let result;
    if (!didXPowerY) {
      if (previousOperation === "") {
        setPreviousOperation(currentOperation + " ^");
        setCurrentOperation("0");
        setCurrOperand("0");
        setDidXPowerY(true);
        setDidAdvanced(true);
      } else {
        setPreviousOperation(previousOperation + currentOperation + " ^");
        setCurrentOperation("0");
        setCurrOperand("0");
        setDidXPowerY(true);
        setDidAdvanced(true);
      }
    } else {
      return;
    }
  };

  const handleNthRoot = () => {
    if (!didNthRoot) {
      if (previousOperation === "") {
        setPreviousOperation("nthRoot(" + currentOperation);
        setCurrentOperation("0");
        setCurrOperand("0");
        setDidNthRoot(true);
        setDidAdvanced(true);
        setDid2nd(false);
      } else {
        setPreviousOperation(previousOperation + "nthRoot(" + currentOperation);
        setCurrentOperation("0");
        setCurrOperand("0");
        setDidNthRoot(true);
        setDidAdvanced(true);
        setDid2nd(false);
      }
    } else {
      return;
    }
  };

  const handleEquals = () => {
    if (!didAdvanced) {
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
    } else {
      if (didNthRoot) {
        let result;
        result = evaluate(previousOperation + "," + currentOperation + ")");
        setPrevOperand(result.toString());
        setPreviousOperation(previousOperation + "," + currentOperation + ") =");
        setCurrentOperation(result.toString());
        setDidCalculation(true);
        setDidAdvanced(false);
      } else {
        let result;
        result = evaluate(previousOperation + " " + currentOperation);
        setPrevOperand(result.toString());
        setPreviousOperation(previousOperation + " " + currentOperation + " =");
        setCurrentOperation(result.toString());
        setDidCalculation(true);
        setDidAdvanced(false);
      }
    }
  };

  const config = {
    chtml: {
      scale: 1,
    },
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
        <MathJaxContext config={config} version={3}>
          <div className="calculator_buttons grid grid-cols-5 gap-1 p-1">
            {did2nd ? (
              <button onClick={() => handle2nd()} className="btnScientificCalc-equals">
                <MathJax>{"\\(2^{nd}\\)"}</MathJax>
              </button>
            ) : (
              <button onClick={() => handle2nd()} className="btnScientificCalc-operation">
                <MathJax>{"\\(2^{nd}\\)"}</MathJax>
              </button>
            )}
            <button onClick={() => updateOperand(pi.toString())} className="btnScientificCalc-operation">
              <MathJax>{"\\(\\pi\\)"}</MathJax>
            </button>
            <button onClick={() => updateOperand(e.toString())} className="btnScientificCalc-operation">
              e
            </button>
            {didUpdateOperand ? (
              <button onClick={() => clearCurrentOperation()} className="btnScientificCalc-operation">
                CE
              </button>
            ) : (
              <button onClick={() => clearCalculator()} className="btnScientificCalc-operation">
                C
              </button>
            )}
            <button onClick={() => removeLastDigit()} className="btnScientificCalc-operation">
              &#8592;
            </button>
            {did2nd ? (
              <button onClick={() => handleCube()} className="btnScientificCalc-operation">
                <MathJax>{"\\(x^3\\)"}</MathJax>
              </button>
            ) : (
              <button onClick={() => handleSquare()} className="btnScientificCalc-operation">
                <MathJax>{"\\(x^2\\)"}</MathJax>
              </button>
            )}
            <button onClick={() => handleOneDividedBy()} className="btnScientificCalc-operation">
              <MathJax>{"\\(\\frac{1}{x}\\)"}</MathJax>
            </button>
            <button onClick={() => handleAbs()} className="btnScientificCalc-operation">
              <MathJax>{"\\(\\lvert x \\rvert\\)"}</MathJax>
            </button>
            <button onClick={() => handleExp()} className="btnScientificCalc-operation">
              exp
            </button>
            <button onClick={() => handleModulo()} className="btnScientificCalc-operation">
              mod
            </button>
            {did2nd ? (
              <button onClick={() => handleCubeRoot()} className="btnScientificCalc-operation">
                <MathJax>{"\\(\\sqrt[3]x\\)"}</MathJax>
              </button>
            ) : (
              <button onClick={() => handleSquareRoot()} className="btnScientificCalc-operation">
                <MathJax>{"\\(\\sqrt[2]x\\)"}</MathJax>
              </button>
            )}
            <button onClick={() => swapOperand("/")} className="btnScientificCalc-operation">
              (
            </button>
            <button onClick={() => swapOperand("/")} className="btnScientificCalc-operation">
              )
            </button>
            <button onClick={() => handleFactorial()} className="btnScientificCalc-operation">
              n!
            </button>
            <button onClick={() => swapOperand("/")} className="btnScientificCalc-operation">
              /
            </button>
            {did2nd ? (
              <button onClick={() => handleNthRoot()} className="btnScientificCalc-operation">
                <MathJax>{"\\(\\sqrt[y]x\\)"}</MathJax>
              </button>
            ) : (
              <button onClick={() => handleXPowerY()} className="btnScientificCalc-operation">
                <MathJax>{"\\(x^y\\)"}</MathJax>
              </button>
            )}
            <button onClick={() => updateOperand("7")} className="btnScientificCalc-number">
              7
            </button>
            <button onClick={() => updateOperand("8")} className="btnScientificCalc-number">
              8
            </button>
            <button onClick={() => updateOperand("9")} className="btnScientificCalc-number">
              9
            </button>
            <button onClick={() => swapOperand("*")} className="btnScientificCalc-operation">
              &#215;
            </button>
            {did2nd ? (
              <button onClick={() => handle2Power()} className="btnScientificCalc-operation">
                <MathJax>{"\\(2^x\\)"}</MathJax>
              </button>
            ) : (
              <button onClick={() => handle10Power()} className="btnScientificCalc-operation">
                <MathJax>{"\\(10^x\\)"}</MathJax>
              </button>
            )}
            <button onClick={() => updateOperand("4")} className="btnScientificCalc-number">
              4
            </button>
            <button onClick={() => updateOperand("5")} className="btnScientificCalc-number">
              5
            </button>
            <button onClick={() => updateOperand("6")} className="btnScientificCalc-number">
              6
            </button>
            <button onClick={() => swapOperand("-")} className="btnScientificCalc-operation">
              &#8722;
            </button>
            {did2nd ? (
              <button onClick={() => handleLogYX()} className="btnScientificCalc-operation">
                <MathJax>{"\\(log_y x\\)"}</MathJax>
              </button>
            ) : (
              <button onClick={() => handleLog()} className="btnScientificCalc-operation">
                <MathJax>{"\\(log\\)"}</MathJax>
              </button>
            )}
            <button onClick={() => updateOperand("1")} className="btnScientificCalc-number">
              1
            </button>
            <button onClick={() => updateOperand("2")} className="btnScientificCalc-number">
              2
            </button>
            <button onClick={() => updateOperand("3")} className="btnScientificCalc-number">
              3
            </button>
            <button onClick={() => swapOperand("+")} className="btnScientificCalc-operation">
              &#43;
            </button>
            {did2nd ? (
              <button onClick={() => handleEPowerX()} className="btnScientificCalc-operation">
                <MathJax>{"\\(e^x\\)"}</MathJax>
              </button>
            ) : (
              <button onClick={() => handleLn()} className="btnScientificCalc-operation">
                <MathJax>{"\\(ln\\)"}</MathJax>
              </button>
            )}
            <button onClick={() => changeSign()} className="btnScientificCalc-number">
              +/-
            </button>
            <button onClick={() => updateOperand("0")} className="btnScientificCalc-number">
              0
            </button>
            <button onClick={() => updateOperand(".")} className="btnScientificCalc-number">
              .
            </button>
            <button onClick={() => handleEquals()} className="btnScientificCalc-equals">
              =
            </button>
          </div>
        </MathJaxContext>
      </div>
    </>
  );
}
export default ScientificCalculator;
