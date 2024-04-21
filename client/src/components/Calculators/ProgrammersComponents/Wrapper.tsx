import { ReactNode } from 'react';
import "./Wrapper.css";

interface WrapperProps {
  children: ReactNode;
}

const Wrapper = ({ children }: WrapperProps) => {
  return <div className="wrapper">{children}</div>;
};

export default Wrapper;
