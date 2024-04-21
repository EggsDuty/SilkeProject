import "./Button.css";

interface ButtonProps {
    className: string;
    value: any;
    onClick: (event:  React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  }
  
  const Button: React.FC<ButtonProps> = ({ className, value, onClick }) => {
    return (
      <button className={`button ${className}`} onClick={onClick}>
        {value}
      </button>
    );
  };
  
  export default Button;