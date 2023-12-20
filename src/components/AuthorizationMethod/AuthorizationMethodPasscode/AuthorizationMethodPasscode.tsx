import { SwitchComponent } from 'components/Switch/Switch';
import React, { FC, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { AUTH_METHOD_NAMES } from 'screens/AuthorizationMethodsScreen/AuthorizationMethodsScreen.types';
import { SupportedAuthMethodsType } from 'store/slices/userInfo/types';
import { AuthorizationMethod } from '../AuthorizationMethod';
import { DialPad } from 'assets/SVGs';
import { useIsFocused } from '@react-navigation/native';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { useVerifyPasscode } from 'hooks/useVerifyPasscode';
import { useBiometrics } from 'hooks/useBiometrics';
import { useAppDispatch } from 'store/hooks/useAppDispatch';
import { setLoginName } from 'store/slices/userInfo';

type AuthorizationMethodPasscodeProps = {
  handleSetNewPasscode?: () => void;
};

export const AuthorizationMethodPasscode: FC<AuthorizationMethodPasscodeProps> = ({
  handleSetNewPasscode,
}) => {
  const isFocused = useIsFocused();
  const { removePasscode } = useVerifyPasscode();
  const { clearBiometrics } = useBiometrics();
  const isPasscodeSet = useAppSelector(state => state.userInfo.isPasscodeSet);
  const isBiometricSet = useAppSelector(state => state.userInfo.isBiometricSet);
  const shouldSaveUsername = useAppSelector(state => state.userInfo.shouldSaveUsername);
  const dispatch = useAppDispatch();

  const { control, setValue } = useForm<SupportedAuthMethodsType>({
    defaultValues: {
      passcode: isPasscodeSet,
    },
  });

  useEffect(() => {
    if (isFocused) {
      setValue('passcode', isPasscodeSet);
    }
  }, [isFocused, isPasscodeSet, setValue]);

  const handleSwitchToggle = (newValue: boolean) => {
    if (newValue === false) {
      // TODO - ask Giorgi and Vaniko, if they want this behavior:
      // when user does not have username "save" ticked and also cancelles all biometrics/passcode, we do not save the username anymore
      if (!shouldSaveUsername) {
        dispatch(setLoginName(undefined));
      }
      // TODO - temporarily leaving verifyPasscode for testing purposes
      removePasscode();
      if (isBiometricSet) {
        clearBiometrics();
      }
      //   TODO - verification will be needed
      //   verifyPasscode(() => {
      //     removePasscode();
      //     if (isBiometricSet) {
      //       clearBiometrics();
      //     }
      //   }, true);
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
