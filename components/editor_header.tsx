// components/editor_header.tsx
import { css, cva } from "@/styled-system/css";
import { Dictionary } from "@/app/[lang]/dictionary";
import { PublishBtn } from "@/components/publish_btn";
import { BackBtn } from "@/components/back_btn";
import { UploadImgBtn } from "@/components/upload_img_btn";

export const EditorHeader = async (params: { dict: Dictionary }) => {
  return (
    <header className={headerStyle()}>
      <BackBtn text={params.dict.back} />
      <nav className={navStyle()}>
        <ul className={css({ display: "flex", marginLeft: "auto" })}>
          <li>
            <div
              className={css({
                display: "flex",
                gap: "16px",
                marginLeft: "auto",
              })}
            >
              <UploadImgBtn />
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
