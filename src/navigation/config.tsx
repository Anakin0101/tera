import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { RouteProp, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { StackNavigationOptions } from '@react-navigation/stack';
import { Platform } from 'react-native';
import { Colors, Spacing } from 'theme/Variables';
import { TabParamList } from './types';
import { tabHiddenRoutes } from './tabHiddenRoutes';

type Route = RouteProp<TabParamList, keyof TabParamList>;

type Display = 'none' | 'flex';

type tabOptionsProps = {
  route: Route;
};

export const hideHeader: StackNavigationOptions = {
  headerShown: false,
};

export const presentationModal: StackNavigationOptions = { presentation: 'card' };

export const TAB_BAR_HEIGHT = 60;

const displayTabBar = (route: Route): Display => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? '';
  if (tabHiddenRoutes.includes(routeName)) {
    return 'none';
  } else {
    return 'flex';
  }
};

export const tabOptions = ({ route }: tabOptionsProps): BottomTabNavigationOptions => ({
  headerShown: false,
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
    display: displayTabBar(route),
  },
});

export const guestNavOptions: StackNavigationOptions = {
  headerShown: false,
  gestureEnabled: false,
};
