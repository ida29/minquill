// components/post_page_wrapper.tsx
"use client";

import { Dictionary } from "@/app/[lang]/_utils/dictionary";
import { PostPageHeader } from "./post_page_header";
import { PostPageBody } from "./post_page_body";
import { useState } from "react";
import { css, cva } from "@/styled-system/css";
//import { useSession } from "next-auth/react";

export const PostPageWrapper = (params: {
  dict: Dictionary;
  username: string;
  unique: string;
}) => {
  //const { data: session, status } = useSession();
  const { dict, username, unique } = params;

  return (
    <div
      data-theme="normal"
      data-color-mode="light"
      className={css({
        overflow: "auto",
        bg: "bg1",
      })}
    >
      <div
        className={css({
          marginRight: "auto",
          marginLeft: "auto",
          height: "100vh",
          width: "100vw",
        })}
      >
        <PostPageHeader dict={dict} />
        <PostPageBody dict={dict} username={username} unique={unique} />
      </div>
    </div>
  );
};
