import Wrapper from "./ProgrammersComponents/Wrapper";
import Screen from "./ProgrammersComponents/Screen";
import ButtonBox from "./ProgrammersComponents/ButtonBox";
import Button from "./ProgrammersComponents/Button";
import { useState } from "react";

/*const btnValues = [
  ["", "C", "+-", "%", "/"],
  ["CTB", { value: 7, disabled: false }, { value: 8, disabled: false }, { value: 9, disabled: false }, "X"],
  ["CTH", { value: 4, disabled: false }, { value: 5, disabled: false }, { value: 6, disabled: false }, "-"],
  ["CTO", { value: 1, disabled: false }, { value: 2, disabled: false }, { value: 3, disabled: false }, "+"],
  ["CTD", { value: 0, disabled: false }, ".", "="],
];*/

const toLocaleString = (num: number) =>
  String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");

const removeSpaces = (num: number) => num.toString().replace(/\s/g, "");

function ProgrammersCalculator() {

  const [btnValues, setBtnValues] = useState([
    ["", "C", "+-", "%", "/"],
    ["CTB", { value: 7, disabled: false }, { value: 8, disabled: false }, { value: 9, disabled: false }, "X"],
    ["CTH", { value: 4, disabled: false }, { value: 5, disabled: false }, { value: 6, disabled: false }, "-"],
    ["CTO", { value: 1, disabled: false }, { value: 2, disabled: false }, { value: 3, disabled: false }, "+"],
    ["CTD", { value: 0, disabled: false }, ".", "="],
  ]);
  // calc - current // setCalc - updates
  let [calc, setCalc] = useState({
    sign: "",
    num: 0,
    res: 0,
  });

  const [CTBClicked, setCTBClicked] = useState(false); // State to track CTB button click
  const [CTDClicked, setCTDClicked] = useState(false); // State to track CTD button click


  const equalsClickHandler = () => {
    console.log("Equals button clicked");

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
      });
    }
  };

  const signClickHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const value = e.currentTarget.innerHTML;
    console.log("Sign button clicked");

    setCalc({
      ...calc,
      sign: value,
      res: !calc.res && calc.num ? calc.num : calc.res,
      num: 0,
    });
  };

  const numClickHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const value = e.currentTarget.innerHTML;
    console.log("Number button clicked");

    if (String(calc.num).length < 16) {
      setCalc({
        ...calc,
        num:
          calc.num === 0 && value === "0"
            ? 0
            : calc.num % 1 === 0
            ? Number(calc.num + value)
            : calc.num + Number(value),
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
    /*console.log("CTB clicked");
    const value = parseFloat(calc.num.toString());

    if (CTBClicked === false) {
      setCTBClicked(true);
      if (!isNaN(value)) {
        const binNum = (value >>> 0).toString(2);
        setCalc({
          ...calc,
          sign: "",
          res: Number(binNum),
          num: calc.num === 0 ? 0 : Number(binNum),
        });
      }
    } */
  console.log("CTB clicked");
  const value = parseFloat(calc.num.toString());

  if (CTBClicked === false) {
    setCTBClicked(true);
    setCTDClicked(false);

    if (!isNaN(value)) {
      const binNum = (value >>> 0).toString(2);
      const updatedBtnValues = btnValues.map(row =>
        row.map(btn =>
          typeof btn === 'object' && btn.value !== undefined &&
          (btn.value !== 0 && btn.value !== 1) // check if value is not 0 or 1
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
   
    
    // prevClicked = CTBClicked, current state
    // set to opposite
    //setCTBClicked((prevClicked) => !prevClicked);
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

                disabled={typeof btn === "object" && btn.disabled && CTBClicked}
                value={typeof btn === "object" ? String(btn.value) : String(btn)}

               //value={String(btn)}
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
