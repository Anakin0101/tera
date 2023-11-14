import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ModalScreenOne } from 'screens';
import { ModalStackParamsList } from 'navigation/types';
import { presentationModal } from 'navigation/config';

const ModalStack = createStackNavigator<ModalStackParamsList>();

export const ModalNavigator = () => {
  const { Navigator, Screen } = ModalStack;

  return (
    <Navigator initialRouteName="ModalScreenOne" screenOptions={presentationModal}>
      <Screen
        name="ModalScreenOne"
        component={ModalScreenOne}
        options={{
          headerShown: false,
          cardStyle: {
            height: '30%',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },
          cardOverlayEnabled: true,
        }}
      />
    </Navigator>
  );
};
