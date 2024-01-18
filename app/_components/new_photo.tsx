// app/components/new_photo.tsx

"use client";

import { Dictionary } from "@/app/_utils/dictionary";
import { css } from "@/styled-system/css";
import { NewPhotoHeader } from "@/app/_components/new_photo_header";
import { NewPhotoBody } from "@/app/_components/new_photo_body";
import { NewPhotoDialog } from "@/app/_components/new_photo_dialog";
import { Modal } from "@/app/_components/modal";
import useLocalStorageState from "use-local-storage-state";

export const NewPhoto = ({ dict }: { dict: Dictionary }) => {
  const [photosValue, setPhotos] = useLocalStorageState("photo_url", {
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
        <NewPhotoHeader dict={dict} />
        <NewPhotoBody
          dict={dict}
          photosValue={photosValue}
          setPhotos={setPhotos}
        />
        <Modal isOpen={photosValue.length === 0}>
          <NewPhotoDialog
            dict={dict}
            photosValue={photosValue}
            setPhotos={setPhotos}
          />
        </Modal>
      </div>
    </div>
  );
};
