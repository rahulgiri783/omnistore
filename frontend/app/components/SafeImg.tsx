"use client";

import React from 'react';

type Props = React.ImgHTMLAttributes<HTMLImageElement> & { src: string };

export default function SafeImg({ src, alt, className, ...rest }: Props) {
  return <img src={src} alt={alt} className={className} onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/placeholder.svg'; }} {...rest} />;
}
