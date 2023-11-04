// components/cloudflare_image.tsx
"use client";

import Image, { ImageLoader } from "next/image";

const cloudflareImagesLoader: ImageLoader = ({ src }) => {
  return `https://imagedelivery.net/90UnnMaLhWJKCNGTLdt2Bg/${src}/public`;
};

type CloudflareImageProps = {
  alt: string;
  src: string;
  className: string;
};

export const CloudflareImage: React.FC<CloudflareImageProps> = ({
  alt,
  src,
  className,
}) => {
  return (
    <Image
      alt={alt}
      src={src}
      loader={cloudflareImagesLoader}
      width={0}
      height={0}
      className={className}
    />
  );
};
