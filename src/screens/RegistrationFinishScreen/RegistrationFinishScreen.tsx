import React, { FC } from 'react';
import { useNavigation } from '@react-navigation/native';
import { GuestStackScreenProps } from 'navigation/types';
import { PASSWORD_LOGIN_SCREEN } from 'navigation/ScreenNames';
import { RegistrationFinishScreenProps } from './RegistrationFinishScreen.types';
import { FinishScreenContent } from 'components/index';

export const RegistrationFinishScreen: FC<RegistrationFinishScreenProps> = ({ route }) => {
  const { isSuccess } = route?.params ?? {};
  const { replace } = useNavigation<GuestStackScreenProps<'PasswordLoginScreen'>>();

  const handleGoToLoginScreen = () => {
    replace(PASSWORD_LOGIN_SCREEN);
  };

  return (
    <FinishScreenContent
      isSuccess={isSuccess}
      ctaHandler={handleGoToLoginScreen}
      title="registration.successful_registration_title"
      description="registration.successful_registration_description"
      ctaTEXT="common.login"
    />
  );
};
