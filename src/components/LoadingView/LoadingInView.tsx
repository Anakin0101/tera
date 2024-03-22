import React from 'react';
import { View } from 'react-native';
import { useStyles } from './LoadingView.styles';
import { LoadingIconComponent } from './LoadingIconComponent';
import { LoadingViewType } from './LoadingView.types';

export const LoadingInView = ({ size, containerStyle }: LoadingViewType) => {
  const styles = useStyles();
  return (
    <View style={[(styles.loadingSpinnerContainer, containerStyle)]}>
      <LoadingIconComponent size={size} />
    </View>
  );
};
