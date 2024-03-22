import React from 'react';
import { SafeAreaView } from 'react-native';
import { useStyles } from './LoadingView.styles';
import { LoadingIconComponent } from './LoadingIconComponent';
import { LoadingViewType } from './LoadingView.types';

export const TransparentLoadingView = ({ size }: LoadingViewType) => {
  const styles = useStyles();

  return (
    <SafeAreaView style={styles.transparentLoadingView}>
      <LoadingIconComponent size={size} />
    </SafeAreaView>
  );
};
