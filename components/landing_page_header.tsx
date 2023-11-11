// components/landing_page_header.tsx
import Link from "next/link";
import { css, cva } from "@/styled-system/css";
import { LoginBtn } from "@/components/login_btn";
import { Dictionary } from "@/app/[lang]/dictionary";

export const LandingPageHeader = async (params: { dict: Dictionary }) => {
  const buttons = (
    <div className={css({ display: "flex", gap: "16px", marginLeft: "auto" })}>
      <LoginBtn text={params.dict.signin} />
    </div>
  );

  return (
    <header className={headerStyle()}>
      <Link href="/" className={logoStyle()}>
        {params.dict.minquill}
      </Link>
      <nav className={navStyle()}>
        <ul className={css({ display: "flex", marginLeft: "auto" })}>
          <li>{buttons}</li>
        </ul>
      </nav>
    </header>
  );
};

const headerStyle = cva({
  base: {
    display: "flex",
    padding: "0rem",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "1.6rem",
    marginBottom: "1.0rem",
    sm: { padding: "0.33rem" },
    md: { padding: "0.66rem" },
    lg: { padding: "1rem" },
  },
});

const logoStyle = cva({
  base: {
    fontWeight: "700",
    fontSize: "1.8rem",
    lineHeight: "1",
    sm: { fontSize: "1.8rem" },
    md: { fontSize: "1.9rem" },
    lg: { fontSize: "2rem" },
  },
});

const navStyle = cva({
  base: {
    display: "flex",
  },
});
