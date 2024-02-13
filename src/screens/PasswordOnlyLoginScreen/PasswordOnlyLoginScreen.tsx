import React from 'react';
import { Pressable, View } from 'react-native';
import { Button, Text, ControlledInput, Account } from 'components';
import { withLoginScreen } from 'components/HOC';
import useStyles from './PasswordOnlyLoginScreen.styles';
import { useTranslation } from 'react-i18next';
import { useUserReset, useLogin, useKeyChain } from 'hooks';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch } from 'store/hooks/useAppDispatch';
import { useNavigation } from '@react-navigation/core';
import { GuestStackScreenProps } from 'navigation/types';
import { setCurrentFlow } from 'store/slices/registerUser';
import { REGISTRATION_METHOD_SCREEN, REGISTRATION_STACK } from 'navigation/ScreenNames';

const PasswordOnlyLoginScreenBase = () => {
  const styles = useStyles();
  const { savedLoginName } = useKeyChain();

  const { handleSignIn, loginUserLoading } = useLogin();
  const { t } = useTranslation();
  const { resetUser } = useUserReset();
  const dispatch = useAppDispatch();
  const { navigate } = useNavigation<GuestStackScreenProps<'RegistrationStack'>>();

  type FormData = {
    password: string;
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = data => {
    const { password } = data;
    if (savedLoginName) {
      handleSignIn(savedLoginName, password);
    }
  };

  const handlePasswordRecovery = () => {
    dispatch(setCurrentFlow('passwordRecovery'));
    navigate(REGISTRATION_STACK, {
      screen: REGISTRATION_METHOD_SCREEN,
    });
  };

  return (
    <View style={styles.wrapper}>
      <Account />
      <Button.Secondary text={t('passAuth.change_user')} size="medium" onPress={resetUser} />
      <ControlledInput
        control={control}
        name="password"
        label="common:passAuth.password"
        marginTop={5}
        secureTextEntry
        errors={errors}
        rules={{
          required: {
            value: true,
            message: 'common:form.is_required',
          },
        }}
      />
      <Pressable onPress={handlePasswordRecovery} style={styles.chechboxContainer}>
        <Text children="common:passAuth.forgot" label special />
      </Pressable>
      <View style={styles.buttonCont}>
        <Button.Primary
          text="common:passAuth.signin"
          onPress={handleSubmit(onSubmit)}
          fullWidth
          isLoading={loginUserLoading}
        />
      </View>
    </View>
  );
};

export const PasswordOnlyLoginScreen = withLoginScreen(PasswordOnlyLoginScreenBase);
