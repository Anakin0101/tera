import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { StackNavigationOptions } from '@react-navigation/stack';
import { Platform } from 'react-native';
import { Colors, Spacing } from 'theme/Variables';

export const hideHeader: StackNavigationOptions = {
  headerShown: false,
};

export const presentationModal: StackNavigationOptions = { presentation: 'card' };

export const TAB_BAR_HEIGHT = 60;

export const tabOptions: BottomTabNavigationOptions = {
  headerShown: false,
  tabBarHideOnKeyboard: true,
  tabBarActiveTintColor: Colors.primary,
  tabBarInactiveTintColor: Colors.inactiveTint,
  tabBarStyle: {
    ...Platform.select({
      android: {
        paddingBottom: Spacing.s,
        height: TAB_BAR_HEIGHT,
      },
    }),
    paddingTop: Spacing.s,
    backgroundColor: Colors.white,
  },
};

export const guestNavOptions: StackNavigationOptions = {
  headerShown: false,
  gestureEnabled: false,
};
