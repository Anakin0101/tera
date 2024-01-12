import React from 'react';
import { Modal, View } from 'react-native';
import { useStyles } from './LoadingView.styles';
import LottieView from 'lottie-react-native';

export const LoadingView = () => {
  const styles = useStyles();
  return (
    <Modal visible={true} transparent={false}>
      <View style={styles.loadingSpinnerContainer}>
        <LottieView
          style={styles.loadingSpinner}
          source={require('./LoadingViewAnimation.json')}
          autoPlay
          loop
        />
      </View>
    </Modal>
  );
};
