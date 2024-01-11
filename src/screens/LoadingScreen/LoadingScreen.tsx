import React from 'react';
import { Text, View } from 'react-native';
import { useStyles } from './LoadingScreen.styles';

export const LoadingScreen = () => {
  const styles = useStyles();
  //   TODO - temporary solution - will be replaced with actual spinner
  return (
    <View style={styles.loadingSpinner}>
      <Text>Loading...</Text>
    </View>
  );
};
