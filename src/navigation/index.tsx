import React from 'react';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { MainNavigator } from './navigators/MainNavigator';
import useTheme from 'hooks/useTheme';
import { GuestNavigator } from './navigators/GuestNavigator';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { useBootstrapApp } from 'hooks/useBootstrapApp';

export const Navigation = () => {
  const navigationRef = useNavigationContainerRef();
  const { NavigationTheme } = useTheme();
  const accessToken = useAppSelector(state => state.userInfo.accessToken);
  useBootstrapApp();

  return (
    <NavigationContainer ref={navigationRef} theme={NavigationTheme}>
      {accessToken ? <MainNavigator /> : <GuestNavigator />}
    </NavigationContainer>
  );
};
