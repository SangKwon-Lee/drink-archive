'use client';
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
  position?: 'absolute' | 'relative';
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
  alt,
  position = 'absolute'
}: Props) {
  return (
    <img
      src={`${src}`}
      alt={alt ? alt : src}
      onClick={onClick}
      style={{
        ...style,
        borderRadius: circle ? '50%' : '',
        position: position ? position : 'absolute',
        height: width ? width : '100%',
        width: height ? height : '100%',
        objectFit: 'cover',
        color: 'transparent',
        display: 'block'
      }}
      className={className}
    />
  );
}
