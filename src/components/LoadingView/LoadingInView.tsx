import React from 'react';
import { View } from 'react-native';
import { useStyles } from './LoadingView.styles';
import LottieView from 'lottie-react-native';
import { LoadingInViewType } from './LoadingInView.types';

export const LoadingInView = ({ containerStyle }: LoadingInViewType) => {
  const styles = useStyles();
  return (
    <View style={[styles.loadingSpinnerContainer, containerStyle]}>
      <LottieView
        style={styles.loadingSpinner}
        source={require('./LoadingViewAnimation.json')}
        autoPlay
        loop
      />
    </View>
  );
};
