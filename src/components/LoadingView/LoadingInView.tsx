import React from 'react';
import { View } from 'react-native';
import { useStyles } from './LoadingView.styles';
import LottieView from 'lottie-react-native';

export const LoadingInView = () => {
  const styles = useStyles();
  return (
    <View style={styles.loadingSpinnerContainer}>
      <LottieView
        style={styles.loadingSpinner}
        source={require('./LoadingViewAnimation.json')}
        autoPlay
        loop
      />
    </View>
  );
};
