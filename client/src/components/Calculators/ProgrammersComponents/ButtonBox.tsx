import { ReactNode } from 'react';
import "./ButtonBox.css";

interface ButtonBoxProps {
    children?: ReactNode;
}

const ButtonBox = ({ children }: ButtonBoxProps) => {
  return <div className="buttonBox">{children}</div>;
};

export default ButtonBox;