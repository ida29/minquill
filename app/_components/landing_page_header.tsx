// components/landing_page_header.tsx
import Link from "next/link";
import { cva } from "@/styled-system/css";
import { Dictionary } from "@/app/_utils/dictionary";

export const LandingPageHeader = async (params: { dict: Dictionary }) => {
  return (
    <header className={headerStyle()}>
      <Link href="/" className={logoStyle()}>
        {params.dict.minquill}
      </Link>
    </header>
  );
};

const headerStyle = cva({
  base: {
    position: "fixed",
    top: "0",
    left: "0",
    zIndex: "99",

    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",

    bg: "white",

    width: "100%",
    borderBottom: "2px solid black",

    height: "4.4rem",

    padding: "0 0.5rem",
    sm: { padding: "0 1rem" },
    md: { padding: "0 1.5rem" },
    lg: { padding: "0 2rem" },
  },
});

const logoStyle = cva({
  base: {
    fontWeight: "700",
    fontSize: "1.4rem",
    lineHeight: "1",
  },
});

const navStyle = cva({
  base: {
    display: "flex",
  },
});
