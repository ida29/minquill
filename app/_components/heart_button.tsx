import { css } from "@/styled-system/css";
import React, { useState } from "react";

type HeartButtonProps = {
  size?: number;
  isLiked: boolean;
  setIsLiked: (isLiked: boolean) => void;
  onClick: () => void;
};

const HeartButton: React.FC<HeartButtonProps> = ({
  size = 42,
  isLiked,
  setIsLiked,
  onClick,
}) => {
  //const [isLiked, setIsLiked] = useState(liked);

  const handleClick = () => {
    onClick();
  };

  const svgStyle = {
    border: "2px solid pink",
    borderRadius: "50%",
    padding: "8px",
    background: "pink",
    boxShadow: "0 0 3px 1px red",
  };

  const svgStyle2 = {
    border: "2px solid #ccc",
    borderRadius: "50%",
    padding: "8px",
  };

  return (
    <button
      onClick={handleClick}
      className={css({
        cursor: "pointer",
      })}
    >
      <svg
        viewBox="0 0 24 24"
        width={size}
        height={size}
        fill={isLiked ? "red" : "#ccc"}
        style={isLiked ? svgStyle : svgStyle2}
      >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    </button>
  );
};

export default HeartButton;
