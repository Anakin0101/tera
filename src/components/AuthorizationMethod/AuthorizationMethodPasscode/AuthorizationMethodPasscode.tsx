import { SwitchComponent } from 'components/Switch/Switch';
import { usePasscode } from 'hooks/usePasscode';
import React, { FC, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Text, View } from 'react-native';
import { AUTH_METHOD_NAMES } from 'screens/AuthorizationMethodsScreen/AuthorizationMethodsScreen.types';
import { SupportedAuthMethodsType } from 'store/slices/userInfo/types';
import { useStyles } from '../AuthorizationMethod.styles';
import { IconComponent } from 'components/IconComponent/IconComponent';
import { DialPad } from 'assets/SVGs';
import { useTranslation } from 'react-i18next';

type AuthorizationMethodPasscodeProps = {
  handleSetNewPasscode?: any;
};

export const AuthorizationMethodPasscode: FC<AuthorizationMethodPasscodeProps> = ({
  handleSetNewPasscode,
}) => {
  const { verifyPasscode, isPasscodeSet, clearPasscode } = usePasscode();
  const styles = useStyles();
  const { t } = useTranslation();
  const { control, setValue } = useForm<SupportedAuthMethodsType>({
    defaultValues: {
      passcode: isPasscodeSet,
    },
  });

  useEffect(() => {
    setValue('passcode', isPasscodeSet);
  }, [isPasscodeSet, setValue]);

  const handleSwitchToggle = (newValue: boolean) => {
    if (newValue === false) {
      verifyPasscode(() => {
        clearPasscode();
        setValue('passcode', newValue);
      });
    } else if (newValue === true) {
      handleSetNewPasscode();
      setValue('passcode', newValue);
    }
  };
  return (
    <View style={styles.AuthorizationMethodContainer}>
      <View style={styles.AuthorizationMethodLeftContainer}>
        <View style={styles.iconContainer}>
          <IconComponent IconJSX={DialPad} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.AuthorizationMethodTitleStyle}>{t('settings.passcode_title')}</Text>
          <Text style={styles.AuthorizationMethodDescStyle}>{t('settings.passcode_desc')}</Text>
        </View>
      </View>
      <View style={styles.AuthorizationMethodEnablerContainer}>
        <Controller
          key={AUTH_METHOD_NAMES.passcode}
          name={AUTH_METHOD_NAMES.passcode as keyof SupportedAuthMethodsType}
          control={control}
          render={({ field: { value } }) => (
            <SwitchComponent value={value} onValueChange={val => handleSwitchToggle(val)} />
          )}
        />
      </View>
    </View>
  );
};
