"use client";

import useLocalStorageState from "use-local-storage-state";

export const UploadImgBtn: React.FC = () => {
  const [contentValue, setContentValue] = useLocalStorageState("contentValue");
  const content = contentValue as string;

  const handleUploadImg = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (!event.target.files || event.target.files.length === 0) {
      return;
    }

    const images = [];
    for (let i = 0; i < event.target.files.length; i++) {
      images.push(event.target.files[i]);
    }

    images.forEach(async (image) => {
      const res = await fetch("/api/images/onetime_upload_url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        console.error("Failed to get the upload URL");
        return;
      }
      const res_json = await res.json();

      const formData = new FormData();
      formData.append("file", image);

      const res2 = await fetch(res_json.uploadURL, {
        method: "POST",
        body: formData,
      });

      if (!res2.ok) {
        console.error("Failed to get the upload URL");
        return;
      }

      const res2_json = await res2.json();
      console.log(res2_json);
      setContentValue(
        content +
          `\n\n![${res2_json.result.filename}](${res2_json.result.variants[0]})`,
      );
    });
  };

  return <input type="file" multiple onChange={handleUploadImg} />;
};
