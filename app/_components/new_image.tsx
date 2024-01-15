// app/components/new_image.tsx

"use client";

import { Dictionary } from "@/app/_utils/dictionary";
import { css } from "@/styled-system/css";
import { NewImageHeader } from "@/app/_components/new_image_header";
import { NewImageBody } from "@/app/_components/new_image_body";
import { NewImageDialog } from "@/app/_components/new_image_dialog";
import { Modal } from "@/app/_components/modal";
import useLocalStorageState from "use-local-storage-state";

export const NewImage = ({ dict }: { dict: Dictionary }) => {
  const [imagesValue, setImages] = useLocalStorageState("image_url", {
    defaultValue: [] as string[],
  });

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
        <NewImageHeader dict={dict} />
        <NewImageBody
          dict={dict}
          imagesValue={imagesValue}
          setImages={setImages}
        />
        <Modal isOpen={imagesValue.length === 0}>
          <NewImageDialog
            dict={dict}
            imagesValue={imagesValue}
            setImages={setImages}
          />
        </Modal>
      </div>
    </div>
  );
};
