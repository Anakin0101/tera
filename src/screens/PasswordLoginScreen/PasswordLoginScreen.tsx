import React, { FC } from 'react';
import { View } from 'react-native';
import { Button, Text, ControlledInput } from 'components';
import { PasswordLoginBaseProps } from './PasswordLoginScreen.types';
import useStyles from './PasswordLoginScreen.styles';
import { useLogin } from 'hooks';
import { SubmitHandler, useForm } from 'react-hook-form';
import { withLoginScreen } from 'components/HOC';
import { PASSWORD_LOGIN_SCREEN } from 'navigation/ScreenNames';
import { setUsername } from 'utils/keychain';
import { useAppDispatch } from 'store/hooks/useAppDispatch';
import { setUserameStatus } from 'store/slices/userInfo';

type FormData = {
  username: string;
  password: string;
  save: string;
};

const PasswordLoginScreenBase: FC<PasswordLoginBaseProps> = () => {
  const styles = useStyles();
  const { handleSignIn } = useLogin();
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = data => {
    const { username, password, save } = data;
    if (save) {
      setUsername(username);
      dispatch(setUserameStatus(!!username));
    }
    handleSignIn(username, password);
  };

  return (
    <View style={styles.wrapper}>
      <Text children="common:passAuth.auth" headline />
      <Text children="common:passAuth.personalData" secondary marginTop={4} />
      <ControlledInput
        control={control}
        name="username"
        label="common:passAuth.username"
        marginTop={48}
        errors={errors}
        required
        errorMessage="common:form.is_required"
      />
      <ControlledInput
        control={control}
        name="password"
        label="common:passAuth.password"
        marginTop={20}
        secureTextEntry
        errors={errors}
        required
        errorMessage="common:form.is_required"
      />
      <View style={styles.chechboxContainer}>
        <ControlledInput
          control={control}
          type="checkbox"
          name="save"
          label="common:passAuth.save"
        />
        <Text children="common:passAuth.forgot" label special />
      </View>
      <View style={styles.buttonCont}>
        <Button.Primary text="common:passAuth.signin" onPress={handleSubmit(onSubmit)} fullWidth />
        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text children="common:passAuth.or" label special style={styles.text} />
          <View style={styles.divider} />
        </View>
        <Button.Secondary text="common:passAuth.signup" onPress={() => {}} fullWidth />
      </View>
    </View>
  );
};

export const PasswordLoginScreen = withLoginScreen<
  PasswordLoginBaseProps,
  typeof PASSWORD_LOGIN_SCREEN
>(PasswordLoginScreenBase, PASSWORD_LOGIN_SCREEN);
