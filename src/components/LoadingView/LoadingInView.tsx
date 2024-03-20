import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { useStyles } from './LoadingView.styles';
import LottieView from 'lottie-react-native';

export const LoadingInView = ({ containerStyle }: { containerStyle?: StyleProp<ViewStyle> }) => {
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
