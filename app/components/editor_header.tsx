// app/components/editor_header.tsx
"use client";
import Link from "next/link";
import { css, cva } from "@/styled-system/css";
import { ActionButton } from "@/app/components/buttons";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

type EditorHeaderProps = {
  content: string;
};

export const EditorHeader: React.FC<EditorHeaderProps> = ({ content }) => {
  const { /*data: session,*/ status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  let buttons;
  if (status === "authenticated") {
    buttons = (
      <div
        className={css({ display: "flex", gap: "16px", marginLeft: "auto" })}
      >
        <ActionButton
          text="Publish"
          colorVariant="primary"
          onClick={() => handlePublish(content)}
        />
      </div>
    );
  }

  return (
    <header className={headerStyle()}>
      <Link href="/" className={logoStyle()}>
        <ActionButton text="Back" onClick={() => router.push("/")} />
      </Link>
      <nav className={navStyle()}>
        <ul className={css({ display: "flex", marginLeft: "auto" })}>
          <li>{buttons}</li>
        </ul>
      </nav>
    </header>
  );
};

async function handlePublish(content: string) {
  try {
    await savePost(content);
  } catch (error) {
    console.error(error);
  }
}

async function savePost(content: string) {
  const response = await fetch("/api/posts", {
    method: "POST",
    cache: "no-cache",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: "title",
      content: content.slice(0, 2000),
    }),
  });

  if (response.ok) {
    await response.json();
  } else {
    console.error("Failed to publish:", response);
  }
}

const headerStyle = cva({
  base: {
    //bg: "grey",
    display: "flex",
    padding: "1rem",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "1.6rem",
    //border: "1px solid black",
    //borderRadius: "10px",
    //boxShadow: "4px 4px 0 #000",
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
