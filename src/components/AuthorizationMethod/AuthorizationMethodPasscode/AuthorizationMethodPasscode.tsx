import { SwitchComponent } from 'components/Switch/Switch';
import React, { FC, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { AUTH_METHOD_NAMES } from 'screens/AuthorizationMethodsScreen/AuthorizationMethodsScreen.types';
import { SupportedAuthMethodsType } from 'store/slices/userInfo/types';
import { AuthorizationMethod } from '../AuthorizationMethod';
import { DialPad } from 'assets/SVGs';
import { useIsFocused } from '@react-navigation/native';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { usePasscode } from 'hooks';
import { useBiometrics } from 'hooks/useBiometrics';
import { clearLoginName } from 'utils/keychain';

type AuthorizationMethodPasscodeProps = {
  handleSetNewPasscode?: () => void;
};

export const AuthorizationMethodPasscode: FC<AuthorizationMethodPasscodeProps> = ({
  handleSetNewPasscode,
}) => {
  const isFocused = useIsFocused();
  const { removePasscode } = usePasscode();
  const { clearBiometrics } = useBiometrics();
  const isPasscodeSet = useAppSelector(state => state.userInfo.isPasscodeSet);
  const isBiometricSet = useAppSelector(state => state.userInfo.isBiometricSet);
  const shouldSaveUsername = useAppSelector(state => state.userInfo.shouldSaveUsername);

  const { control, setValue } = useForm<SupportedAuthMethodsType>({
    defaultValues: {
      passcode: isPasscodeSet,
    },
  });

  const handleRemovePasscodeLoginOption = async () => {
    if (!shouldSaveUsername) {
      await clearLoginName();
    }
    if (isBiometricSet) {
      clearBiometrics();
    }
    removePasscode();
  };

  useEffect(() => {
    if (isFocused) {
      setValue('passcode', isPasscodeSet);
    }
  }, [isFocused, isPasscodeSet, setValue]);

  const handleSwitchToggle = async (newValue: boolean) => {
    if (newValue === false) {
      //   verifyPasscode(() => {
      //     handleRemovePasscodeLoginOption();
      //   }, true);
      handleRemovePasscodeLoginOption();
      //   TODO - needs to be deleted. Only for logical representation, of how verification will work with Passcode or Biometric.
      //   Uncomment to see
      //   verifyPasscode(handleRemovePasscodeLoginOption);
    } else if (newValue === true) {
      handleSetNewPasscode?.();
    }
  };
  return (
    <AuthorizationMethod
      icon={DialPad}
      title={'settings.passcode_title'}
      desc={'settings.passcode_desc'}
      children={
        <Controller
          key={AUTH_METHOD_NAMES.passcode}
          name={AUTH_METHOD_NAMES.passcode as keyof SupportedAuthMethodsType}
          control={control}
          render={({ field: { value } }) => (
            <SwitchComponent value={value} onValueChange={val => handleSwitchToggle(val)} />
          )}
        />
      }
    />
  );
};
