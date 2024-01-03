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
}: IconComponentProps) => {
  const styles = useStyleTheme();
  const imageURL = `${PUBLIC_IMAGE_URL}${imageId}`;

  // TODO - still need to handle Back-end received imgUrl (https://some_image_url)
  return !imageId ? (
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
        uri: imageURL,
        priority: FastImage.priority.normal,
      }}
      fallback={Platform.OS === 'android'}
      resizeMode={FastImage.resizeMode.contain}
    />
  );
};
