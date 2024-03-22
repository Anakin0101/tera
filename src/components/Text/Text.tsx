import React, { forwardRef } from 'react';
import { Text as RNText } from 'react-native';
import { useTranslation } from 'react-i18next';
import { TextProps } from './Text.types';
import { useStyleTheme } from './Text.styles';
import { moderateScale } from 'utils/config';

export const Text = forwardRef<RNText, TextProps>(
  (
    {
      children,
      color,
      size,
      withoutLineHeight,
      lineHeight,
      uppercase,
      center,
      label,
      title,
      headline,
      secondary,
      special,
      translateProp,
      translate = true,
      marginTop,
      bold,
      demiBold,
      regular,
      medium,
      letterSpacing,
      style,
      disabled,
      ...props
    },
    ref,
  ) => {
    const { t } = useTranslation();
    const styles = useStyleTheme();
    return (
      <RNText
        ref={ref}
        maxFontSizeMultiplier={1}
        style={[
          withoutLineHeight ? styles.withoutLineHeight : styles.default,
          label && styles.label,
          title && styles.title,
          headline && styles.headline,
          uppercase && styles.uppercase,
          secondary && styles.secondary,
          special && styles.special,
          center && styles.center,
          color ? { color } : null,
          lineHeight ? { lineHeight } : null,
          size ? { fontSize: moderateScale(size) } : null,
          marginTop ? { marginTop } : null,
          bold && styles.bold,
          demiBold && styles.demiBold,
          regular && styles.regular,
          medium && styles.medium,
          letterSpacing ? { letterSpacing } : null,
          disabled && styles.disabled,
          style,
        ]}
        children={translate && typeof children === 'string' ? t(children, translateProp) : children}
        {...props}
      />
    );
  },
);
