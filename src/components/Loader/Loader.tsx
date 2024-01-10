import React, { FC } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useStyles } from './Loader.styles';
import { LoaderProps } from './Loader.types';

export const Loader: FC<LoaderProps> = ({ backgroundColor, styles }) => {
  const style = useStyles();

  return (
    <View style={[style.container, backgroundColor ? { backgroundColor } : null, styles]}>
      <ActivityIndicator />
    </View>
  );
};
