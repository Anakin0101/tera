import React, { FC } from 'react';
import { View } from 'react-native';
import { Colors } from 'theme/Variables';
import { Text } from 'components';
import { BadgeProps } from './Badge.types';
import { useStyles } from './Badge.styles';

export const Badge: FC<BadgeProps> = ({
  icon,
  label,
  backgroundColor,
  textColor = Colors.error,
  style,
  textStyle,
}) => {
  const styles = useStyles();
  return (
    <View style={[styles.badge, backgroundColor ? { backgroundColor } : null, style]}>
      <View>{icon}</View>
      <Text label children={label} color={textColor} style={textStyle} />
    </View>
  );
};
