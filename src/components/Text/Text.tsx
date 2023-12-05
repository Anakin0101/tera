import React, { forwardRef } from 'react';
import { Text as RNText } from 'react-native';
import { useTranslation } from 'react-i18next';
import { TextProps } from './Text.types';
import { useStyleTheme } from './Text.styles';

export const Text = forwardRef<RNText, TextProps>(
  (
    {
      children,
      color,
      size,
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
      black,
      demiBold,
      light,
      lightItalic,
      regular,
      medium,
      style,
      ...props
    },
    ref,
  ) => {
    const { t } = useTranslation();
    const styles = useStyleTheme();
    return (
      <RNText
        ref={ref}
        style={[
          styles.default,
          label && styles.label,
          title && styles.title,
          headline && styles.headline,
          uppercase && styles.uppercase,
          secondary && styles.secondary,
          special && styles.special,
          center && styles.center,
          color ? { color } : null,
          lineHeight ? { lineHeight } : null,
          size ? { fontSize: size } : null,
          marginTop ? { marginTop } : null,
          bold && styles.bold,
          black && styles.black,
          demiBold && styles.demiBold,
          light && styles.light,
          lightItalic && styles.lightItalic,
          regular && styles.regular,
          medium && styles.medium,
          style,
        ]}
        children={translate && typeof children === 'string' ? t(children, translateProp) : children}
        {...props}
      />
    );
  },
);
