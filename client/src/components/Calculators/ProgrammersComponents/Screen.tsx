import { ReactNode } from 'react';
import { Textfit } from "react-textfit";
import "./Screen.css";

interface ScreenProps {
    children?: ReactNode;
    value: string;
}

const Screen = ({ children, value }: ScreenProps) => {
    return (
        <Textfit className="screenP" mode="single" max={70}>
            {value}
            {children}
        </Textfit>);
};
  
export default Screen;