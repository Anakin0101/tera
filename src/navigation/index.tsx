import React, { useRef } from 'react';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import useTheme from 'hooks/useTheme';
import Routes from './Router';
import { useBootstrapApp } from 'hooks';
import { useActivityTimeout } from 'hooks';
import {
  GUEST_NAVIGATOR,
  PASSCODE_LOGIN_SCREEN,
  PASSWORD_LOGIN_SCREEN,
  PASSWORD_ONLY_LOGIN_SCREEN,
} from './ScreenNames';

/**
 * Creates a navigation container reference for navigating outside of the React component tree.
 */
export const NavigationRef = createNavigationContainerRef();

// Screens considered as part of the guest stack.
const isGuestStackItems = [
  PASSWORD_LOGIN_SCREEN,
  PASSWORD_ONLY_LOGIN_SCREEN,
  PASSCODE_LOGIN_SCREEN,
];

export const Navigation = () => {
  useBootstrapApp();

  const { NavigationTheme } = useTheme();
  // Ref to keep track of the current route name.
  const routeNameRef = useRef<string | null>(null);

  // Custom hook to handle user inactivity timeouts.
  const { handleActivityMonitor } = useActivityTimeout();

  return (
    <NavigationContainer
      ref={NavigationRef}
      theme={NavigationTheme}
      onReady={() => {
        // Initialize the routeNameRef with the current route name when the navigation container is ready.
        const initialRouteName = NavigationRef.getCurrentRoute()?.name;
        if (typeof initialRouteName === 'string') {
          routeNameRef.current = initialRouteName;
        }
      }}
      onStateChange={async () => {
        // Track route changes to handle activity timeouts based on specific screens.
        const previousRouteName = routeNameRef.current;
        const currentRouteName = NavigationRef?.getCurrentRoute()?.name;

        /**
         * Resets the activity monitor timer upon navigation, except when navigating to screens
         * designated for guest users.
         */
        const handleResetTimer = () => {
          // Your implementation of analytics goes here!
          if (NavigationRef.current) {
            handleActivityMonitor();
          }
        };

        // If the route has changed and it's not a guest stack item, reset the activity timer.
        if (typeof currentRouteName === 'string') {
          // navigation changes state twice, first it gets value of 'guestNavigator' then the child of 'guestNavigator'
          //   therefore, we need to override any action when stack loads, we only take action when screen loads
          if (currentRouteName === GUEST_NAVIGATOR) {
            return;
          }
          if (previousRouteName !== currentRouteName) {
            // Save the current route name for later comparison
            routeNameRef.current = currentRouteName;
            if (!isGuestStackItems.includes(currentRouteName)) {
              handleResetTimer();
            }
          }
        }
      }}
    >
      <Routes />
    </NavigationContainer>
  );
};
