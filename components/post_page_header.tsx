// components/editor_header.tsx
import { css, cva } from "@/styled-system/css";
import { Dictionary } from "@/app/[lang]/dictionary";

export const PostPageHeader = async (params: { dict: Dictionary }) => {
  return (
    <header className={headerStyle()}>
      <nav className={navStyle()}>
        <ul className={css({ display: "flex", marginLeft: "auto" })}>
          <li>
            <div
              className={css({
                display: "flex",
                gap: "16px",
                marginLeft: "auto",
              })}
            ></div>
          </li>
        </ul>
      </nav>
      {params.dict.end}
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

const navStyle = cva({
  base: {
    display: "flex",
  },
});
