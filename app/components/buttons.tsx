// app/components/buttons.tsx
"use client";

import { cva } from "@/styled-system/css";

type ButtonProps = {
  text: string;
  colorVariant?: "primary" | "light" | "secondary";
  onClick: () => void;
};

export const ActionButton: React.FC<ButtonProps> = ({
  text,
  colorVariant = "light",
  onClick,
}) => {
  return (
    <button className={btnStyle({ color: colorVariant })} onClick={onClick}>
      {text}
    </button>
  );
};

const btnStyle = cva({
  base: {
    //bg: "white",
    textDecoration: "none",
    font: "600 1rem/1 futura",
    padding: "0.8em 1em",
    border: "3px solid black",
    borderRadius: "8px",
    boxShadow: "4px 4px 0 #000",
    cursor: "pointer",
    transition: "all 0.1s",
    _hover: { bg: "lightgray" },
    _active: {
      transform: "translate(4px, 4px)",
      boxShadow: "none",
    },
  },
  variants: {
    color: {
      light: { bg: "white", _hover: { bg: "lightgrey" } },
      primary: { bg: "blue.300", _hover: { bg: "blue.200" } },
      secondary: { bg: "grey.300", _hover: { bg: "grey.200" } },
    },
  },
  defaultVariants: {
    color: "light",
  },
});
