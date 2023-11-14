import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { StackNavigationOptions } from '@react-navigation/stack';
import { Colors } from 'theme/Variables';

export const hideHeader: StackNavigationOptions = {
  headerShown: false,
};

export const presentationModal: StackNavigationOptions = { presentation: 'modal' };

export const tabOptions: BottomTabNavigationOptions = {
  headerShown: false,
  tabBarHideOnKeyboard: true,
  tabBarActiveTintColor: Colors.primary,
  tabBarInactiveTintColor: Colors.inactiveTint,
};

export const guestNavOptions: StackNavigationOptions = {
  headerShown: false,
  gestureEnabled: false,
};
