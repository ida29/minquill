// components/modal.tsx

"use client";

import React from "react";
import { css } from "@/styled-system/css";

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
}

export const Modal = ({ children, isOpen }: ModalProps) => {
  return isOpen ? (
    <div
      className={css({
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        bg: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      })}
    >
      <div
        className={css({
          bg: "bg1",
          borderRadius: "10px",
        })}
      >
        {children}
      </div>
    </div>
  ) : null;
};
