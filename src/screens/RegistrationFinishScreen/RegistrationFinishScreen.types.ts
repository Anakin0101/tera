import { RouteProp } from '@react-navigation/native';
import { REGISTRATION_FINISH_SCREEN } from 'navigation/ScreenNames';
import { RegistrationStackParamsList } from 'navigation/types';

export type RegistrationFinishScreenProps = {
  route?: RouteProp<RegistrationStackParamsList, typeof REGISTRATION_FINISH_SCREEN>;
};
