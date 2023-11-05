// components/landing_page_header.tsx
import Link from "next/link";
import { css, cva } from "@/styled-system/css";
import { LoginBtn } from "@/components/login_btn";
import { SigninWithGoogleBtn } from "@/components/sign_in_with_google_btn";
import { Dictionary } from "@/app/[lang]/dictionary";

export const LandingPageHeader = async (params: { dict: Dictionary }) => {
  const buttons = (
    <div className={css({ display: "flex", gap: "16px", marginLeft: "auto" })}>
      <LoginBtn text={params.dict.signin} />
      <SigninWithGoogleBtn text={params.dict.login} />
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
    padding: "1rem",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "1.6rem",
    marginBottom: "1.6rem",
  },
});

const logoStyle = cva({
  base: {
    font: "600 2rem/1 futura",
  },
});

const navStyle = cva({
  base: {
    display: "flex",
  },
});
