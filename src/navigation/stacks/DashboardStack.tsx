import React from 'react';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { DashboardScreen } from 'screens';
import { ALL_TEMPLATES_SCREEN, DASHBOARD_SCREEN } from 'navigation/ScreenNames';
import { AllTemplatesScreen } from 'screens/AllTemplatesScreen/AllTemplatesScreen';
import { DashboardStackParamsList } from 'navigation/types';
import { HeaderBackArrow } from 'components/index';
import { Colors } from 'theme/Variables';
import { useStyleTheme } from 'navigation/Navigation.styles';
import { useTranslation } from 'react-i18next';
const Stack = createStackNavigator<DashboardStackParamsList>();

export const DashboardStack = () => {
  const { Navigator, Screen } = Stack;
  const st = useStyleTheme();
  const { t } = useTranslation();

  return (
    <Navigator
      initialRouteName={DASHBOARD_SCREEN}
      screenOptions={{
        headerTitleAlign: 'center',
        headerLeft: HeaderBackArrow,
        headerTitleStyle: st.headerTitleStyle,
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: Colors.white,
        },
        headerBackTitleVisible: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <Screen
        name={DASHBOARD_SCREEN}
        component={DashboardScreen}
        options={{ headerShown: false }}
      />
      <Screen
        name={ALL_TEMPLATES_SCREEN}
        component={AllTemplatesScreen}
        options={{
          title: t('onboarding.templates'),
          headerShadowVisible: true,
        }}
      />
    </Navigator>
  );
};
