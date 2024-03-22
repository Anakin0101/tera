import React from 'react';
import { Modal, View } from 'react-native';
import { useStyles } from './LoadingView.styles';
import { LoadingIconComponent } from './LoadingIconComponent';
import { LoadingViewType } from './LoadingView.types';

export const LoadingView = ({ size }: LoadingViewType) => {
  const styles = useStyles();
  return (
    <Modal visible={true} transparent={false}>
      <View style={styles.loadingSpinnerContainer}>
        <LoadingIconComponent size={size} />
      </View>
    </Modal>
  );
};
