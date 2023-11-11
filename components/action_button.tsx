// components/action_button.tsx
import { cva } from "@/styled-system/css";

type ButtonProps = {
  text: string;
  colorVariant?: "default" | "primary" | "secondary";
  className?: string;
  onClick: () => void;
};

export const ActionButton: React.FC<ButtonProps> = ({
  text,
  colorVariant = "default",
  className,
  onClick,
}) => {
  return (
    <button
      className={className ? className : btnStyle({ color: colorVariant })}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

const btnStyle = cva({
  base: {
    //bg: "white",
    textDecoration: "none",
    fontWeight: "700",
    fontSize: "0.8rem",
    lineHeight: "1",
    padding: "0.8em 1em",
    border: "2px solid black",
    borderRadius: "6px",
    boxShadow: "2px 2px 0 #000",
    cursor: "pointer",
    transition: "all 0.1s",
    _hover: { bg: "lightgray" },
    _active: {
      transform: "translate(4px, 4px)",
      boxShadow: "none",
    },
    sm: {
      fontSize: "0.8rem",
      border: "2px solid black",
      borderRadius: "6px",
      boxShadow: "2px 2px 0 #000",
    },
    md: {
      fontSize: "0.9rem",
      border: "2.5px solid black",
      borderRadius: "7px",
      boxShadow: "3px 3px 0 #000",
    },
    lg: {
      fontSize: "1rem",
      border: "3px solid black",
      borderRadius: "8px",
      boxShadow: "4px 4px 0 #000",
    },
  },
  variants: {
    color: {
      default: { bg: "white", _hover: { bg: "lightgrey" } },
      primary: { bg: "blue.300", _hover: { bg: "blue.200" } },
      secondary: { bg: "grey.300", _hover: { bg: "grey.200" } },
    },
  },
  defaultVariants: {
    color: "default",
  },
});
