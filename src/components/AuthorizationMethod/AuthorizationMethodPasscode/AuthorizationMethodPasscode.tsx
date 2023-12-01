import { SwitchComponent } from 'components/Switch/Switch';
import { usePasscode } from 'hooks';
import React, { FC, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { AUTH_METHOD_NAMES } from 'screens/AuthorizationMethodsScreen/AuthorizationMethodsScreen.types';
import { SupportedAuthMethodsType } from 'store/slices/userInfo/types';
import { AuthorizationMethod } from '../AuthorizationMethod';
import { DialPad } from 'assets/SVGs';
import { useIsFocused } from '@react-navigation/native';
import { useAppSelector } from 'store/hooks/useAppSelector';

type AuthorizationMethodPasscodeProps = {
  handleSetNewPasscode?: () => void;
};

export const AuthorizationMethodPasscode: FC<AuthorizationMethodPasscodeProps> = ({
  handleSetNewPasscode,
}) => {
  const isFocused = useIsFocused();
  const { verifyPasscode, clearPasscode } = usePasscode();
  const isPasscodeSet = useAppSelector(state => state.userInfo.isPasscodeSet);

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
      verifyPasscode(() => {
        clearPasscode();
        setValue('passcode', newValue);
      }, true);
    } else if (newValue === true) {
      handleSetNewPasscode?.();
      setValue('passcode', newValue);
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
