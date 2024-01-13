// components/action_button.tsx
import { cva } from "@/styled-system/css";

type ButtonProps = {
  text: string;
  colorVariant?: "default" | "primary" | "secondary";
  className?: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
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
    color: "text1",
    textDecoration: "none",
    fontWeight: "700",
    fontSize: "0.8rem",
    lineHeight: "1",
    padding: "0.8em 1em",
    border: "2px solid",
    borderColor: "text2",
    borderRadius: "6px",
    boxShadow: "2px 2px 0",
    cursor: "pointer",
    transition: "all 0.1s",
    _hover: { bg: "lightgray" },
    _active: {
      transform: "translate(4px, 4px)",
      boxShadow: "none",
    },
    sm: {
      fontSize: "0.8rem",
      borderRadius: "6px",
      borderWidth: "2px",
      boxShadow: "2px 2px 0",
    },
    md: {
      fontSize: "0.9rem",
      borderRadius: "7px",
      borderWidth: "3px",
      boxShadow: "3px 3px 0",
    },
    lg: {
      fontSize: "1rem",
      borderRadius: "8px",
      borderWidth: "3px",
      boxShadow: "3px 4px 0",
    },
  },
  variants: {
    color: {
      default: {
        color: "text1",
        borderColor: "text1",
        bg: "text2",
        _hover: { bg: "lightgrey" },
      },
      primary: {
        color: "text2",
        borderColor: "text2",
        bg: "text1",
        _hover: { bg: "stone.600" },
      },
      secondary: {
        color: "text2",
        borderColor: "text2",
        bg: "text1",
        _hover: { bg: "stone.600" },
      },
    },
  },
  defaultVariants: {
    color: "default",
  },
});
