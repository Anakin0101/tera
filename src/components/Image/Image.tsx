import React from 'react';
import { Platform } from 'react-native';
import FastImage, { FastImageProps } from 'react-native-fast-image';

export const Image = ({ source, resizeMode, style, ...props }: FastImageProps) => {
  return (
    <FastImage
      source={source}
      resizeMode={resizeMode}
      fallback={Platform.OS === 'android'}
      style={style}
      {...props}
    />
  );
};
