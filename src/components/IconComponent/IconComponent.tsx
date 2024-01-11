import React from 'react';
import { Platform, Pressable } from 'react-native';
import { useStyleTheme } from './IconComponent.styles';
import { Image } from 'react-native';
import { PUBLIC_IMAGE_URL } from 'services/api';
import { IconComponentProps } from './IconComponent.types';
import FastImage from 'react-native-fast-image';
import { ICON_JSX_SIZE, PRESSABLE_ELEMENT_HITSLOP } from './IconComponent.constants';

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
  isSecure = false,
  base64Image,
  pressable = true,
}: IconComponentProps) => {
  const styles = useStyleTheme();

  if (base64Image || imageId) {
    const publicImageURI = `${PUBLIC_IMAGE_URL}${imageId}`;
    const imageURI = isSecure ? `data:image/png;base64, ${base64Image}` : publicImageURI;

    return (
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
  }

  return (
    <Pressable
      hitSlop={{
        top: PRESSABLE_ELEMENT_HITSLOP,
        bottom: PRESSABLE_ELEMENT_HITSLOP,
        left: PRESSABLE_ELEMENT_HITSLOP,
        right: PRESSABLE_ELEMENT_HITSLOP,
      }}
      onPress={handler}
      style={[
        styles.iconCommonStyles,
        !native && styles.iconRoundedStyles,
        hasBorder && styles.iconBorderedStyles,
        customIconComponentStyles,
      ]}
      disabled={!pressable}
    >
      {IconJSX && (
        <IconJSX
          width={customIconSize || ICON_JSX_SIZE}
          height={customIconSize || ICON_JSX_SIZE}
          fill={fillColor}
        />
      )}
      {pngLocalIcon && (
        <Image source={pngLocalIcon} style={[styles.pngLocalIconStyles, pngLocalIconCustomStyle]} />
      )}
    </Pressable>
  );
};
