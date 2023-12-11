import React, { FC } from 'react';
import { Platform, StatusBar, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from 'theme/Variables';

export type CustomStatusBarProps = {
  backgroundColor?: string;
};

export const CustomStatusBar: FC<CustomStatusBarProps> = ({ backgroundColor = Colors.white }) => {
  const insets = useSafeAreaInsets();
  const statusBarHeight = insets.top;
  return (
    <View
      style={{
        backgroundColor: backgroundColor,
        height: Platform.OS === 'ios' ? statusBarHeight : StatusBar.currentHeight,
      }}
    >
      <StatusBar translucent backgroundColor={backgroundColor} barStyle="dark-content" />
    </View>
  );
};
