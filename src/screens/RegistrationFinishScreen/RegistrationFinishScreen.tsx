import React, { FC } from 'react';
import { useNavigation } from '@react-navigation/native';
import { GuestStackScreenProps } from 'navigation/types';
import { PASSWORD_LOGIN_SCREEN } from 'navigation/ScreenNames';
import { RegistrationFinishScreenProps } from './RegistrationFinishScreen.types';
import { FinishScreenContent } from 'components/index';
import { useAppDispatch } from 'store/hooks/useAppDispatch';
import { resetRegisterUser } from 'store/slices/registerUser';
import { useAppSelector } from 'store/hooks/useAppSelector';

export const RegistrationFinishScreen: FC<RegistrationFinishScreenProps> = ({ route }) => {
  const { isSuccess } = route?.params ?? {};
  const { replace } = useNavigation<GuestStackScreenProps<'PasswordLoginScreen'>>();
  const dispatch = useAppDispatch();
  const { flow } = useAppSelector(state => state.registerUser);

  const handleGoToLoginScreen = () => {
    resetUserInfo();
    replace(PASSWORD_LOGIN_SCREEN);
  };

  const resetUserInfo = () => {
    dispatch(resetRegisterUser());
  };
  return (
    <FinishScreenContent
      isSuccess={isSuccess}
      ctaHandler={handleGoToLoginScreen}
      title={
        flow === 'registration'
          ? 'registration.successful_registration_title'
          : 'passwordRecovery.successful_password_recovery_title'
      }
      description="registration.successful_registration_description"
      ctaTEXT="common.login"
    />
  );
};
