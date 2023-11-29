import React, { FC } from 'react';
import { View } from 'react-native';
import { ProgressBarProps } from './ProgressBar.types';
import { useStyles } from './ProgressBar.styles';

export const ProgressBar: FC<ProgressBarProps> = ({
  max,
  used,
  width,
  backgroundColor,
  marginTop,
  height,
}) => {
  const styles = useStyles();
  return (
    <View
      style={[
        styles.progress,
        marginTop ? { marginTop } : null,
        height ? { height } : null,
        { width },
      ]}
    >
      <View
        style={[
          styles.indicator,
          backgroundColor ? { backgroundColor } : null,
          height ? { height } : null,
          { width: (width / max) * used },
        ]}
      />
    </View>
  );
};
