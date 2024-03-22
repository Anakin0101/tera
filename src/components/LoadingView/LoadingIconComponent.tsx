import LottieView from 'lottie-react-native';
import { useStyles } from './LoadingView.styles';
import React from 'react';
import { LoadingViewType } from './LoadingView.types';

export const LoadingIconComponent = ({ size }: LoadingViewType) => {
  const styles = useStyles();
  return (
    <LottieView
      style={[styles.loadingSpinner, size ? { width: size, height: size } : undefined]}
      source={require('./LoadingViewAnimation.json')}
      autoPlay
      loop
    />
  );
};
