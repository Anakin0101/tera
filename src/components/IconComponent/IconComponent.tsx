import React from 'react';
import { ImageStyle, Pressable, StyleProp, ViewStyle } from 'react-native';
import { useStyleTheme } from './IconComponent.styles';
import { SvgProps } from 'react-native-svg';
import { Image } from 'react-native';

export type IconComponentProps = {
  handler?: () => void;
  IconJSX?: (props: SvgProps) => React.JSX.Element;
  native?: boolean;
  pngLocalIcon?: any;
  pngLocalIconCustomStyle?: StyleProp<ImageStyle>;
  customIconComponentStyles?: StyleProp<ViewStyle>;
  hasBorder?: boolean;
  customIconSize?: number;
  imageId?: string; // New prop for the image source URL
};

export const IconComponent = ({
  handler,
  IconJSX,
  native,
  pngLocalIcon,
  pngLocalIconCustomStyle,
  customIconComponentStyles,
  hasBorder = true,
  customIconSize,
  imageId, // New prop for the image source URL
}: IconComponentProps) => {
  const styles = useStyleTheme();

  // TODO - still need to handle Back-end received imgUrl (https://some_image_url)
  return (
    <Pressable
      onPress={handler}
      style={[
        styles.iconCommonStyles,
        !native && styles.iconRoundedStyles,
        hasBorder && styles.iconBorderedStyles,
        customIconComponentStyles,
      ]}
    >
      {IconJSX && <IconJSX width={customIconSize || 16} height={customIconSize || 16} />}
      {pngLocalIcon && (
        <Image source={pngLocalIcon} style={[{ width: 20, height: 20 }, pngLocalIconCustomStyle]} />
      )}
      {imageId && <Image source={{ uri: imageId }} style={{ width: 20, height: 20 }} />}
    </Pressable>
  );
};
