import { RouteProp } from '@react-navigation/native';
import { REGISTRATION_METHOD_SCREEN } from 'navigation/ScreenNames';
import { RegistrationStackParamsList } from 'navigation/types';

export type RegistrationMethodScreenProps = {
  route: RouteProp<RegistrationStackParamsList, typeof REGISTRATION_METHOD_SCREEN>;
};
