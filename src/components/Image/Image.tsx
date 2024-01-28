import React from 'react';
import FastImage, { FastImageProps } from 'react-native-fast-image';

export const Image = ({ source, resizeMode, fallback, style, ...props }: FastImageProps) => {
  return (
    <FastImage
      source={source}
      resizeMode={resizeMode}
      fallback={fallback}
      style={style}
      {...props}
    />
  );
};
