// components/google_image.tsx
"use client";

import Image, { ImageLoader } from "next/image";

const googleImagesLoader: ImageLoader = ({ src }) => {
  return `${src}`;
};

type GoogleImageProps = {
  alt: string;
  src: string;
  className?: string;
  width: number;
  height: number;
};

export const GoogleImage: React.FC<GoogleImageProps> = ({
  alt,
  src,
  className,
  width = 50,
  height = 50,
}) => {
  return (
    <Image
      alt={alt}
      src={`${src}`}
      loader={googleImagesLoader}
      width={width}
      height={height}
      className={className}
    />
  );
};
