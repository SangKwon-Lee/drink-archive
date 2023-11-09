'use client';
import Image from 'next/image';
import { CSSProperties } from 'react';

interface Props {
  style?: CSSProperties;
  className?: string;
  src: string;
  width?: number;
  height?: number;
  onClick?: any;
  loader?: any;
  circle?: boolean;
  alt?: string;
}

export default function Images({
  height,
  src,
  width,
  className,
  onClick,
  style,
  loader,
  circle,
  alt
}: Props) {
  return (
    <Image
      src={`${src}`}
      loader={loader}
      alt={alt ? alt : src}
      quality={20}
      width={width}
      fill={!width && !height ? true : false}
      height={height}
      onClick={onClick}
      style={{ ...style, borderRadius: circle ? '50%' : '' }}
      className={className}
      blurDataURL="/"
    />
  );
}
