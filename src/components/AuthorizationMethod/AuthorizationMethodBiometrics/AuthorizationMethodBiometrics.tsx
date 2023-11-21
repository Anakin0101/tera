import { SwitchComponent } from 'components/Switch/Switch';
import React, { FC, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { AUTH_METHOD_NAMES } from 'screens/AuthorizationMethodsScreen/AuthorizationMethodsScreen.types';
import { SupportedAuthMethodsType } from 'store/slices/userInfo/types';
import { AuthorizationMethod } from '../AuthorizationMethod';
import { FaceIdSvg } from 'assets/SVGs';
import { usePasscode } from 'hooks';
import { useIsFocused } from '@react-navigation/native';
import { useAppSelector } from 'store/hooks/useAppSelector';

type AuthorizationMethodBiometricsProps = {
  handleSetBiometrics?: () => void;
};

export const AuthorizationMethodBiometrics: FC<AuthorizationMethodBiometricsProps> = ({
  handleSetBiometrics,
}) => {
  const isFocused = useIsFocused();

  const { verifyPasscode, clearPasscode } = usePasscode();
  const biometricAuthSet = useAppSelector(state => state.userInfo.isBiometricSet);

  const { control, setValue } = useForm<SupportedAuthMethodsType>({
    defaultValues: {
      biometrics: biometricAuthSet,
    },
  });

  useEffect(() => {
    if (isFocused) {
      setValue('biometrics', biometricAuthSet);
    }
  }, [isFocused, biometricAuthSet, setValue]);

  const handleSwitchToggle = (newValue: boolean) => {
    if (newValue === false) {
      verifyPasscode(() => {
        clearPasscode();
        setValue('biometrics', newValue);
      }, true);
    } else if (newValue === true) {
      handleSetBiometrics?.();
      setValue('biometrics', newValue);
    }
  };
  return (
    <AuthorizationMethod
      icon={FaceIdSvg}
      title={'settings.biometrics_title'}
      desc={'settings.biometrics_desc'}
      children={
        <Controller
          key={AUTH_METHOD_NAMES.biometrics}
          name={AUTH_METHOD_NAMES.biometrics as keyof SupportedAuthMethodsType}
          control={control}
          render={({ field: { value } }) => (
            <SwitchComponent value={value} onValueChange={val => handleSwitchToggle(val)} />
          )}
        />
      }
    />
  );
};
