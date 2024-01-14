// components/next_image.tsx

import Image from "next/image";
import { FC } from "react";
import { css } from "@/styled-system/css";

type NextImageProps = {
  src: string;
  alt: string;
};

export const NextImage: FC<NextImageProps> = ({ src, alt }) => {
  return (
    <div
      className={css({
        position: "relative",
        width: "100%",
        height: "100%",
      })}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="100vw"
        className={css({
          objectFit: "cover",
        })}
      />
    </div>
  );
};
