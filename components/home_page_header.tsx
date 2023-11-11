// components/home_header.tsx
import Link from "next/link";
import { GoogleImage } from "@/components/google_image";
import { css, cva } from "@/styled-system/css";
import { SigninWithGoogleBtn } from "@/components/sign_in_with_google_btn";
import { CreatePostBtn } from "@/components/create_post_btn";
import { Dictionary } from "@/app/[lang]/dictionary";
import { getServerSession } from "next-auth";
import { auth } from "@/app/auth";

export const HomePageHeader = async (params: { dict: Dictionary }) => {
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
        <CreatePostBtn text={params.dict.create_post} />
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
            gap: "0.5rem",
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
    marginBottom: "1rem",
  },
});

const logoStyle = cva({
  base: {
    fontWeight: "700",
    fontSize: "1.5rem",
    lineHeight: "1",
    sm: { fontSize: "1.66rem" },
    md: { fontSize: "1.83rem" },
    lg: { fontSize: "2rem" },
  },
});

const navStyle = cva({
  base: {
    display: "flex",
  },
});
