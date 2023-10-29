"use client";
import { Header } from "@/app/components/header";
import { cva } from "@/styled-system/css";

export default function Home() {
  return (
    <main className={mainStyle()}>
      <Header />
    </main>
  );
}

const mainStyle = cva({
  base: {
    display: "flex",
    justifyContent: "center",
    padding: "2rem",
    minHeight: "100vh",
    maxWidth: "1200px",
    marginRight: "auto",
    marginLeft: "auto",
  },
});
