import "./Button.css";

interface ButtonProps {
    className: string;
    value: any;
    onClick: (event:  React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    disabled?: boolean; 
  }
  
  const Button: React.FC<ButtonProps> = ({ className, value, onClick, disabled }) => {
    return (
      <button
        className={`buttonP ${className} ${disabled ? 'disabledButtonP' : ''}`}
        onClick={onClick}
        disabled={disabled}
        //disabled={disabled || (value !== "0" && value !== "1" && disabled)}
      >
        {value}
      </button>
    );
  };
  
  export default Button;