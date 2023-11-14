import { Pressable, View } from 'react-native';
import { isValidElement } from 'react';
import { ButtonProps, ButtonType } from 'components/Button/Button.types';
import React from 'react';
import { useStyleTheme } from 'components/Button/Button.styles';
import { useButtonTypeStyle } from 'components/Button/hooks/useButtonTypeStyle';
import { Text } from 'components/index';
import useTheme from 'hooks/useTheme';

export const withButton = (buttonType: ButtonType) => {
  return function ButtonComponent({
    text,
    leftIcon,
    rightIcon,
    customContainerStyle = {},
    customWrapperStyle = {},
    customTextStyle = {},
    customLeftIconStyle = {},
    customRightIconStyle = {},
    disabled = false,
    fullWidth = false,
    fixedWidth = false,
    size = 'medium',
    hasBorder = false,
    children,
    ...props
  }: ButtonProps) {
    const styles = useButtonTypeStyle(buttonType);
    const sharedStyles = useStyleTheme();
    const { Colors } = useTheme();
    // Do not remove -  Only for rippleEffect!!!
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const containerStyle = [styles.containerStyle, customContainerStyle];

    const wrapperStyle = [
      sharedStyles.wrapperStyle,
      size === 'medium' ? sharedStyles.wrapperPaddingMedium : sharedStyles.wrapperPaddingLarge,
      hasBorder && styles.wrapperBorderStyle,
      fullWidth && sharedStyles.wrapperFullWidthStyle,
      fixedWidth && sharedStyles.wrapperFixWidthStyle,
      styles.wrapperStyle,
      disabled && styles.wrapperDisabledStyle,
      customWrapperStyle,
    ];

    const textStyle = [
      sharedStyles.textStyle,
      size === 'medium' ? sharedStyles.textStyleMedium : sharedStyles.textStyleLarge,
      disabled && sharedStyles.textDisabled,
      styles.textStyle,
      customTextStyle,
    ];

    const leftIconStyle = [styles.leftIcon, customLeftIconStyle];

    const rightIconStyle = [styles.rightIcon, customRightIconStyle];

    const renderIcon = (IconComponent?: SvgComponent, color?: string) =>
      IconComponent && <IconComponent fill={disabled ? { color: Colors.gray200 } : color} />;

    const leftIconComponent = renderIcon(leftIcon);
    const rightIconComponent = renderIcon(rightIcon);

    return (
      <Pressable {...props} style={wrapperStyle}>
        {leftIcon && <View style={leftIconStyle}>{leftIconComponent}</View>}
        {children && isValidElement(children) ? children : null}
        {text ? <Text children={text} numberOfLines={1} style={textStyle} /> : null}
        {rightIcon && <View style={rightIconStyle}>{rightIconComponent}</View>}
      </Pressable>
    );
  };
};
