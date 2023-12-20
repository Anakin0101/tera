import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ProfileScreen } from 'screens';
import { PROFILE_SCREEN } from 'navigation/ScreenNames';

import { ProfileStackParamsList } from 'navigation/types';
import { CustomHeader } from 'components/index';
import { CustomHeaderOptions } from 'components/CustomHeader/CustomHeader.types';
import { Colors } from 'theme/Variables';

const ProfileStack = createStackNavigator<ProfileStackParamsList>();

const ProfileStackHeaderMap = {
  [PROFILE_SCREEN]: ({ options: { title } }: CustomHeaderOptions) => {
    return (
      <CustomHeader
        title={title}
        isInitialScreen
        titlePosition={'left'}
        searchElement={{ position: 'right' }}
        notificationsElement={{ position: 'right' }}
        statusBarColor={Colors.dashboardBackground}
      />
    );
  },
};

export const ProfileNavigator = () => {
  const { Navigator, Screen } = ProfileStack;
  return (
    <Navigator initialRouteName={PROFILE_SCREEN}>
      <Screen
        name={PROFILE_SCREEN}
        component={ProfileScreen}
        options={{ header: ProfileStackHeaderMap[PROFILE_SCREEN] }}
      />
    </Navigator>
  );
};
