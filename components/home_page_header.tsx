// components/home_header.tsx
import Link from "next/link";
import { css, cva } from "@/styled-system/css";
import { SigninWithGoogleBtn } from "@/components/sign_in_with_google_btn";
import { LogoutBtn } from "@/components/logout_btn";
import { CreatePostBtn } from "@/components/create_post_btn";
import { getDictionary } from "@/app/[lang]/dictionary";
import { getServerSession } from "next-auth";
import { auth } from "@/app/auth";

export const HomePageHeader = async (params: { lang: string }) => {
  const dict = await getDictionary(params.lang);
  const session = await getServerSession(auth);

  let buttons;
  if (session) {
    buttons = (
      <>
        <CreatePostBtn text={dict.create_post} />
        <LogoutBtn text={dict.logout} />
      </>
    );
  } else {
    buttons = <SigninWithGoogleBtn text={dict.login} />;
  }

  return (
    <header className={headerStyle()}>
      <Link href="/" className={logoStyle()}>
        {dict.minquill}
      </Link>
      <nav className={navStyle()}>
        <ul
          className={css({ display: "flex", marginLeft: "auto", gap: "1rem" })}
        >
          <li
            className={css({
              display: "flex",
              marginLeft: "auto",
              gap: "1rem",
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
