// components/home_header.tsx
import Link from "next/link";
import { GoogleImage } from "@/components/google_image";
import { css, cva } from "@/styled-system/css";
import { SigninWithGoogleBtn } from "@/components/sign_in_with_google_btn";
import { LogoutBtn } from "@/components/logout_btn";
import { Dictionary } from "@/app/[lang]/dictionary";
import { getServerSession } from "next-auth";
import { auth } from "@/app/auth";

export const UserPageHeader = async (params: { dict: Dictionary }) => {
  const session = await getServerSession(auth);

  let buttons;
  if (session) {
    buttons = (
      <>
        <Link href={`/${session.user?.username}`}>
          <GoogleImage
            src={`${session.user?.image}`}
            alt={"User Account Image"}
            width={100}
            height={100}
            className={css({
              marginTop: "3px",
              width: "2rem",
              borderRadius: "50%",
              sm: { width: "2.3rem" },
              md: { width: "2.6rem" },
              lg: { width: "3rem" },
            })}
          />
        </Link>
        <LogoutBtn text={params.dict.logout} />
      </>
    );
  } else {
    buttons = <SigninWithGoogleBtn text={params.dict.login} />;
  }

  return (
    <header className={headerStyle()}>
      <Link href="/" className={logoStyle()}>
        {params.dict.minquill}
      </Link>
      <nav className={navStyle()}>
        <ul
          className={css({
            display: "flex",
            marginLeft: "auto",
            gap: "0.8rem",
          })}
        >
          <li
            className={css({
              display: "flex",
              alignItems: "center",
              marginLeft: "auto",
              gap: "0.8rem",
            })}
          >
            {buttons}
          </li>
        </ul>
      </nav>
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
    fontSize: "1rem",
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
