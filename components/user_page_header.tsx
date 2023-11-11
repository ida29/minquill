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
    display: "flex",
    padding: "1rem",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "1.6rem",
    marginBottom: "1.0rem",
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
