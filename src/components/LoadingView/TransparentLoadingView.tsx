import React from 'react';
import { SafeAreaView } from 'react-native';
import LottieView from 'lottie-react-native';
import { useStyles } from './LoadingView.styles';

export const TransparentLoadingView = () => {
  const styles = useStyles();

  return (
    <SafeAreaView style={styles.transparentLoadingView}>
      <LottieView
        style={styles.loadingSpinner}
        source={require('./LoadingViewAnimation.json')}
        autoPlay
        loop
      />
    </SafeAreaView>
  );
};
