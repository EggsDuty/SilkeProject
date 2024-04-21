import Wrapper from "./ProgrammersComponents/Wrapper";
import Screen from "./ProgrammersComponents/Screen";
import ButtonBox from "./ProgrammersComponents/ButtonBox";
import Button from "./ProgrammersComponents/Button";
import { useState } from 'react';

const btnValues = [
  
    ["C", "+-", "%", "/"],
    [7, 8, 9, "X"],
    [4, 5, 6, "-"],
    [1, 2, 3, "+"],
    [0, ".", "="],
];

const toLocaleString = (num: number) =>
    String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");
  
const removeSpaces = (num: number) => num.toString().replace(/\s/g, "");

function ProgrammersCalculator() {
    let [calc, setCalc] = useState({
        sign: "",
        num: 0,
        res: 0,
    });

    const equalsClickHandler = () => {
      console.log("Equals button clicked"); // Console log added here

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
              : Number(toLocaleString(
                  math(
                    Number(removeSpaces(calc.res)),
                    Number(removeSpaces(calc.num)),
                    calc.sign
                  )
                )),
          sign: "",
          num: 0,
        });
      }
    };

    const signClickHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      const value = e.currentTarget.innerHTML;
      console.log("Sign button clicked"); // Console log added here

  
      setCalc({
        ...calc,
        sign: value,
        res: !calc.res && calc.num ? calc.num : calc.res,
        num: 0,
      });
    };

    const numClickHandler = (e:  React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        const value = e.currentTarget.innerHTML;
        console.log("Number button clicked"); // Console log added here

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

      const commaClickHandler = (e:  React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        const value = e.currentTarget.innerHTML;
        console.log("Comma button clicked"); // Console log added here

        setCalc({
          ...calc,
          num: !calc.num.toString().includes(".") 
            ? calc.num + Number(value) 
            : calc.num,
        });
      };

      const invertClickHandler = () => {
        console.log("Invert button clicked"); // Console log added here

        setCalc({
          ...calc,
          num: calc.num ? Number(toLocaleString(Number(removeSpaces(calc.num)) * -1)) : 0,
          res: calc.res ? Number(toLocaleString(Number(removeSpaces(calc.res)) * -1)) : 0,
          sign: "",
        });
      };
    
      const percentClickHandler = () => {
        console.log("Percent button clicked"); // Console log added here

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
        console.log("Reset button clicked"); // Console log added here

        setCalc({
          ...calc,
          sign: "",
          num: 0,
          res: 0,
        });
      };
      console.log("Screen value:", calc.num ? calc.num.toString() : calc.res.toString());

    return (
        <div className="ml-32 mt-10" style={{ position: 'fixed', inset: 0 }}>
            <Wrapper>
            <Screen value={calc.num ? calc.num.toString() : calc.res.toString()} />
            <ButtonBox>
            {
                btnValues.flat().map((btn, i) => {
                    return (
                    <Button
                            key={i}
                            className={btn === "=" ? "equals" : ""}
                            value={String(btn)}
                            onClick={
                              btn === "C"
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
                })
            }
            </ButtonBox>              
            </Wrapper>
        </div>
    );
}


export default ProgrammersCalculator;