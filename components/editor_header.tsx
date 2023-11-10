// components/editor_header.tsx
import Link from "next/link";
import { css, cva } from "@/styled-system/css";
import { Dictionary } from "@/app/[lang]/dictionary";
import { PublishBtn } from "@/components/publish_btn";
import { UploadImgBtn } from "@/components/upload_img_btn";
import { FiArrowLeftCircle } from "react-icons/fi";

export const EditorHeader = async (params: { dict: Dictionary }) => {
  return (
    <header className={headerStyle()}>
      <Link
        href={"/"}
        className={css({
          fontSize: "2rem",
          _hover: { bg: "lightgray" },
          borderRadius: "50%",
        })}
      >
        <FiArrowLeftCircle />
      </Link>
      <nav className={navStyle()}>
        <ul className={css({ display: "flex", marginLeft: "auto" })}>
          <li>
            <div
              className={css({
                display: "flex",
                gap: "0.8rem",
                marginLeft: "auto",
              })}
            >
              <UploadImgBtn text={params.dict.upload_image} />
              <PublishBtn text={params.dict.publish} />
            </div>
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

const navStyle = cva({
  base: {
    display: "flex",
  },
});
