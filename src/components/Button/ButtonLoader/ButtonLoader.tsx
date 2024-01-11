import React from 'react';
import { Image } from 'react-native';
import { useStyleTheme } from './ButtonLoader.styles';

export const ButtonLoader = () => {
  const styles = useStyleTheme();
  return <Image source={require('./test.gif')} style={styles.buttonLoaderStyles} />;
};
