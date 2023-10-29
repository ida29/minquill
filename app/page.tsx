"use client";
import { Header } from "@/app/components/header";
import { css, cva } from "@/styled-system/css";

export default function Home() {
  return (
    <main className={mainStyle()}>
      <Header />
      <div
        className={css({
          margin: "0 calc(50% - 50vw)",
          width: "100vw",
          height: "90vh",
          bg: "white",
        })}
      ></div>
      <div
        className={css({
          margin: "0 calc(50% - 50vw)",
          width: "100vw",
          height: "80vh",
          bg: "grey",
        })}
      ></div>
      <div
        className={css({
          margin: "0 calc(50% - 50vw)",
          width: "100vw",
          height: "80vh",
          bg: "white",
        })}
      ></div>
    </main>
  );
}

const mainStyle = cva({
  base: {
    //bg: "yellow",
    padding: "1rem 2rem 2rem 2rem",
    maxWidth: "1200px",
    marginRight: "auto",
    marginLeft: "auto",
    height: "100vh",
  },
});
