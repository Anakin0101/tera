import React from 'react';
import { View } from 'react-native';
import { Button, Text, ControlledInput, Account } from 'components';
import { withLoginScreen } from 'components/HOC';
import useStyles from './PasswordOnlyLoginScreen.styles';
import { useTranslation } from 'react-i18next';
import { useUserReset, useLogin, useKeyChain } from 'hooks';
import { SubmitHandler, useForm } from 'react-hook-form';

const PasswordOnlyLoginScreenBase = () => {
  const styles = useStyles();
  const { savedLoginName } = useKeyChain();

  const { handleSignIn, loginUserLoading } = useLogin();
  const { t } = useTranslation();
  const { resetUser } = useUserReset();

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
        required
        rules={{
          required: {
            value: true,
            message: 'common:form.is_required',
          },
        }}
      />
      <View style={styles.chechboxContainer}>
        <Text children="common:passAuth.forgot" label special />
      </View>
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
