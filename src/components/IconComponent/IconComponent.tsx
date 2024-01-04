import React from 'react';
import { Platform, Pressable } from 'react-native';
import { useStyleTheme } from './IconComponent.styles';
import { Image } from 'react-native';
import { PUBLIC_IMAGE_URL } from 'services/api';
import { IconComponentProps } from './IconComponent.types';
import FastImage from 'react-native-fast-image';

export const IconComponent = ({
  handler,
  IconJSX,
  native,
  pngLocalIcon,
  pngLocalIconCustomStyle,
  customIconComponentStyles,
  hasBorder = true,
  customIconSize,
  imageId,
  customImageIDStyle,
  fillColor,
  isSecure,
  base64Image,
}: IconComponentProps) => {
  const styles = useStyleTheme();

  const publicImageURI = `${PUBLIC_IMAGE_URL}${imageId}`;
  const imageURI = isSecure ? `data:image/png;base64, ${base64Image}` : publicImageURI;

  return !base64Image || !imageId ? (
    <Pressable
      hitSlop={{
        top: 30,
        bottom: 30,
        left: 30,
        right: 30,
      }}
      onPress={handler}
      style={[
        styles.iconCommonStyles,
        !native && styles.iconRoundedStyles,
        hasBorder && styles.iconBorderedStyles,
        customIconComponentStyles,
      ]}
    >
      {IconJSX && (
        <IconJSX width={customIconSize || 16} height={customIconSize || 16} fill={fillColor} />
      )}
      {pngLocalIcon && (
        <Image source={pngLocalIcon} style={[styles.pngLocalIconStyles, pngLocalIconCustomStyle]} />
      )}
    </Pressable>
  ) : (
    <FastImage
      style={[styles.imageIdStyles, styles.iconRoundedStyles, customImageIDStyle]}
      source={{
        uri: imageURI,
        priority: FastImage.priority.normal,
      }}
      fallback={Platform.OS === 'android'}
      resizeMode={FastImage.resizeMode.cover}
    />
  );
};
