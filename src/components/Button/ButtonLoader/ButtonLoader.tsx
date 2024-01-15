import React from 'react';
import LottieView from 'lottie-react-native';
import { useStyleTheme } from './ButtonLoader.styles';

export const ButtonLoader = () => {
  const styles = useStyleTheme();
  return (
    <LottieView
      style={styles.buttonLoaderStyles}
      source={require('./ButtonLoaderAnimation.json')}
      autoPlay
      loop
    />
  );
};
