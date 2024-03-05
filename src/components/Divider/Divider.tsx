import React, { FC } from 'react';
import { View } from 'react-native';
import { useStyles } from './Divider.styles';
import { IDividerProps } from './Divider.types';

export const Divider: FC<IDividerProps> = ({
  height,
  width,
  color,
  style,
  marginTop,
  marginBottom,
  marginLeft,
}) => {
  const styles = useStyles();
  return (
    <View
      style={[
        styles.container,
        height ? { height } : undefined,
        width ? { width } : undefined,
        color ? { backgroundColor: color } : undefined,
        marginTop ? { marginTop } : undefined,
        marginBottom ? { marginBottom } : undefined,
        marginLeft ? { marginLeft } : undefined,
        style,
      ]}
    />
  );
};
