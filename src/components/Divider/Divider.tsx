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
}) => {
  const styles = useStyles();
  return (
    <View
      style={[
        styles.container,
        height ? { height } : null,
        width ? { width } : null,
        color ? { backgroundColor: color } : null,
        marginTop ? { marginTop } : null,
        marginBottom ? { marginBottom } : null,
        style,
      ]}
    />
  );
};
