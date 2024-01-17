import React from 'react';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import useTheme from 'hooks/useTheme';
import Routes from './Router';
import { useBootstrapApp } from 'hooks';

export const NavigationRef = createNavigationContainerRef();

export const Navigation = () => {
  const { NavigationTheme } = useTheme();

  useBootstrapApp();

  return (
    <NavigationContainer ref={NavigationRef} theme={NavigationTheme}>
      <Routes />
    </NavigationContainer>
  );
};
