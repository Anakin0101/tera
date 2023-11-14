import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { MainNavigator } from './navigators/MainNavigator';
import useTheme from 'hooks/useTheme';
import { GuestNavigator } from './navigators/GuestNavigator';
import { useBootstrapApp } from 'hooks';

export const Navigation = () => {
  const { NavigationTheme } = useTheme();
  const { isAuth, navigationRef } = useBootstrapApp();

  return (
    <NavigationContainer ref={navigationRef} theme={NavigationTheme}>
      {isAuth ? <MainNavigator /> : <GuestNavigator />}
    </NavigationContainer>
  );
};
