import Wrapper from "./ProgrammersComponents/Wrapper";
import Screen from "./ProgrammersComponents/Screen";
import ButtonBox from "./ProgrammersComponents/ButtonBox";
import Button from "./ProgrammersComponents/Button";
import { useState } from "react";

const toLocaleString = (num: number) =>
  String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");

const removeSpaces = (num: number) => num.toString().replace(/\s/g, "");

function ProgrammersCalculator() {
  const [btnValues, setBtnValues] = useState([
    ["", "C", { value: "+-", disabled: true }, { value: "%", disabled: true }, "/"],
    [
      "CTB",
      { value: 7, disabled: false },
      { value: 8, disabled: false },
      { value: 9, disabled: false },
      "X",
    ],
    [
      { value :"CTH", disabled: true}, // delete when implementing
      { value: 4, disabled: false },
      { value: 5, disabled: false },
      { value: 6, disabled: false },
      "-",
    ],
    [
      { value: "CTO", disabled: true}, 
      { value: 1, disabled: false },
      { value: 2, disabled: false },
      { value: 3, disabled: false },
      "+",
    ],
    ["CTD", { value: 0, disabled: false }, { value: ".", disabled: true }, "="],
  ]);

  let zr = 0;
  // calc - current, setCalc - updates
  let [calc, setCalc] = useState({
    sign: "",
    num: 0,
    res: 0,
    binaryRes: zr.toString(2),
  });

  const [CTBClicked, setCTBClicked] = useState(false); // State to track CTB button click
  const [CTDClicked, setCTDClicked] = useState(true); // State to track CTD button click
  const [CTOClicked, setCTOClicked] = useState(false); // State to track CTO button click
  const [CTHClicked, setCTHClicked] = useState(false); // State to track CTH button click


  // Function to perform binary addition
  const binaryAddition = (binaryNum1: string, binaryNum2: string) => {
    const val1 = parseInt(binaryNum1, 2);
    const val2 = parseInt(binaryNum2, 2);

    const decimalResult = parseInt(binaryNum1, 2) + parseInt(binaryNum2, 2);
    //console.log("binaryNum1: "+val1);
    //console.log("binaryNum2: "+val2);

    return decimalResult.toString(2);
  };

  // Function to perform binary subtraction
  const binarySubtraction = (binaryNum1: string, binaryNum2: string) => {
    const decimalResult = parseInt(binaryNum1,2) - parseInt(binaryNum2, 2);
    return decimalResult.toString(2);
  };

  // Function to perform binary multiplication
  const binaryMultiplication = (binaryNum1: string, binaryNum2: string) => {
    const decimalResult = parseInt(binaryNum1,2) * parseInt(binaryNum2, 2);
    return decimalResult.toString(2);
  };

    // Function to perform binary division
  const binaryDivision = (binaryNum1: string, binaryNum2: string) => {
      const decimalResult = parseInt(binaryNum1, 2) / parseInt(binaryNum2, 2);
      return decimalResult.toString(2);
  };
  
  const equalsClickHandler = () => {
    console.log("Equals button clicked");

    if (CTBClicked) {
      if (calc.sign && calc.num) {
        let result: string;
        if (calc.num === 0 && calc.sign === "/") {
          result = "-1"; //"Can't divide with 0"
        } else {
          switch (calc.sign) {
            case "+":
              //console.log("Ieina binaryRes "+calc.binaryRes);
              //console.log("calc.num "+calc.num.toString());

              result = binaryAddition(calc.binaryRes, calc.num.toString());
              
              //console.log(result);
              break;
            case "-":
              result = binarySubtraction(calc.binaryRes, calc.num.toString());
              break;
            case "X":
              result = binaryMultiplication(calc.binaryRes, calc.num.toString());
              console.log("Daugybos rezultatas: "+result);
              break;
            case "/":
              console.log("equals binaryRes: "+calc.binaryRes);
              console.log("equals calc.num: "+calc.num);
              result = binaryDivision(calc.binaryRes, calc.num.toString());
              console.log("Dalybos rezultatas: "+result);
              break;
            default:
              result = calc.binaryRes;
          }
        }

        setCalc((prevCalc) => ({
          ...prevCalc,
          res: Number(result), //
          binaryRes: result,
          sign: "",
          num:0, 
        }));
      }
    } else {
      if (calc.sign && calc.num) {
        const math = (a: number, b: number, sign: string) =>
          sign === "+"
            ? a + b
            : sign === "-"
            ? a - b
            : sign === "X"
            ? a * b
            : a / b;

        setCalc({
          ...calc,
          res:
            calc.num === 0 && calc.sign === "/"
              ? -1 //"Can't divide with 0"
              : Number(
                  toLocaleString(
                    math(
                      Number(removeSpaces(calc.res)),
                      Number(removeSpaces(calc.num)),
                      calc.sign
                    )
                  )
                ),
          sign: "",
          num: 0,
          binaryRes: zr.toString(2),
        });
      }
    }
  };

  const signClickHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const value = e.currentTarget.innerHTML;
    console.log("Sign button clicked");
    
      const subResBin = 
      value === "+" || calc.binaryRes === "0" 
        ? Number(binaryAddition(calc.binaryRes, calc.num.toString()))
        : value === "-" 
        ? Number(binarySubtraction(calc.binaryRes, calc.num.toString()))
        : value === "X"
        ? Number(binaryMultiplication(calc.binaryRes, calc.num.toString()))
        : Number(binaryDivision(calc.binaryRes, calc.num.toString()));

      console.log("calc.res: " + calc.res);
      console.log("calc.num: " + calc.num);

      // here is a bug
      const subResDec = 
      value === "+" 
        ? calc.res + calc.num
        : value === "-"
        ? calc.res - calc.num
        : value === "X"
        ? calc.res * calc.num
        : calc.res / calc.num;
  
    setCalc({
      ...calc,
      sign: value,
      res:  
          CTBClicked
          ? subResBin
          :!calc.res && calc.num 
            ? calc.num 
            : subResDec,
      num: 0,
      binaryRes: subResBin.toString(),
    });
  };

  const numClickHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const value = e.currentTarget.innerHTML;
    console.log("Number button clicked");
    //let binaryResult = "";
    let binaryResult = calc.binaryRes;
    if (String(calc.num).length < 16) {
      if (CTBClicked) {
      const updatedNum =
      calc.num === 0 && value === "0"
        ? "0" // If current number is 0 and input is 0, set number to 0
        : calc.num === 0 // If current number is 0
        ? value // Set number to input value
        : calc.num + value; // Concatenate input value to current number
        binaryResult = Number(updatedNum).toString(); // Convert updated number to binary
      }
      console.log("binaryResult is numberfunc: "+binaryResult);

      setCalc({
        ...calc,
        num:
          calc.num === 0 && value === "0"
            ? 0
            : calc.num % 1 === 0
            ? Number(calc.num + value)
            : calc.num + Number(value),
        binaryRes: calc.binaryRes,
        res: !calc.sign ? 0 : calc.res,
      });
    }
  };

  const commaClickHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const value = e.currentTarget.innerHTML;
    console.log("Comma button clicked");

    setCalc({
      ...calc,
      num: !calc.num.toString().includes(".")
        ? calc.num + Number(value)
        : calc.num,
    });
  };

  const invertClickHandler = () => {
    console.log("Invert button clicked");

    setCalc({
      ...calc,
      num: calc.num
        ? Number(toLocaleString(Number(removeSpaces(calc.num)) * -1))
        : 0,
      res: calc.res
        ? Number(toLocaleString(Number(removeSpaces(calc.res)) * -1))
        : 0,
      sign: "",
    });
  };

  const percentClickHandler = () => {
    console.log("Percent button clicked");

    let num = calc.num ? parseFloat(removeSpaces(calc.num)) : 0;
    let res = calc.res ? parseFloat(removeSpaces(calc.res)) : 0;

    setCalc({
      ...calc,
      num: (num /= Math.pow(100, 1)),
      res: (res /= Math.pow(100, 1)),
      sign: "",
    });
  };

  const resetClickHandler = () => {
    console.log("Reset button clicked");

    setCalc({
      ...calc,
      sign: "",
      num: 0,
      binaryRes: zr.toString(2),
      res: 0,
    });
  };
  console.log(
    "Screen value:",
    calc.num ? calc.num.toString() : calc.res.toString()
  );

  const convertToBinaryHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    console.log("CTB clicked");
    const value = parseFloat(calc.num.toString());

    if (CTBClicked === false) {
      setCTBClicked(true);
      setCTDClicked(false);

      if (!isNaN(value)) {
        const binNum = (value >>> 0).toString(2);
        const updatedBtnValues = btnValues.map((row) =>
          row.map((btn) =>
            typeof btn === "object" &&
            btn.value !== undefined &&
            btn.value !== 0 &&
            btn.value !== 1 // check if value is not 0 or 1
              ? { ...btn, disabled: true } // disable button
              : btn
          )
        );
        setBtnValues(updatedBtnValues); // update button values

        setCalc({
          ...calc,
          sign: "",
          res: Number(binNum),
          num: calc.num === 0 ? 0 : Number(binNum),
        });
      }
    }
  };

  const convertToDecimalHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    console.log("CTD clicked");
    const value = calc.num.toString();
    const decNum = parseInt(value, 2);

    if (CTDClicked === false) {
      setCTDClicked(true);
      setCTBClicked(false);

      if (!isNaN(decNum)) {
        const updatedBtnValues = btnValues.map((row) =>
          row.map((btn) =>
            typeof btn === "object" &&
            btn.value !== undefined &&
            typeof btn.value === "number" && btn.value >= 0 && btn.value <= 9
              ? { ...btn, disabled: false } // set specific buttons to be disabled
              : btn
          )
        );
        setBtnValues(updatedBtnValues); // update button val

        setCalc({
          ...calc,
          sign: "",
          res: Number(decNum),
          num: calc.num === 0 ? 0 : decNum,
        });
      }
    }
  };

  return (
    <div className="ml-32 mt-10" style={{ position: "fixed", inset: 0 }}>
      <Wrapper>
      <Screen value={calc.num ? calc.num.toString() : calc.res.toString()} />
        <ButtonBox>
          {btnValues.flat().map((btn, i) => {
            return (
              <Button
                key={i}
                className={
                  btn === "="
                    ? "equals"
                    : btn === "CTB" && CTBClicked
                    ? "buttonPClicked"
                    : btn === "CTD" && CTDClicked
                    ? "buttonPClicked"
                    : ""
                }
                disabled={ CTBClicked
                  ? typeof btn === "object" && btn.disabled 
                  : CTDClicked
                  ? typeof btn === "object" && btn.disabled 
                  : false }
                value={
                  typeof btn === "object" ? String(btn.value) : String(btn)
                }
                onClick={
                  btn === "CTB"
                    ? convertToBinaryHandler
                    : btn === "CTD"
                    ? convertToDecimalHandler
                    : btn === "C"
                    ? resetClickHandler
                    : btn === "+-"
                    ? invertClickHandler
                    : btn === "%"
                    ? percentClickHandler
                    : btn === "="
                    ? equalsClickHandler
                    : btn === "/" || btn === "X" || btn === "-" || btn === "+"
                    ? signClickHandler
                    : btn === "."
                    ? commaClickHandler
                    : numClickHandler
                }
              />
            );
          })}
        </ButtonBox>
      </Wrapper>
    </div>
  );
}

export default ProgrammersCalculator;
