import React, { FC } from 'react';
import { View } from 'react-native';
import { Button, Text, ControlledInput } from 'components';
import { PasswordLoginBaseProps } from './PasswordLoginScreen.types';
import useStyles from './PasswordLoginScreen.styles';
import { useLogin } from 'hooks';
import { SubmitHandler, useForm } from 'react-hook-form';
import { withLoginScreen } from 'components/HOC';
import { PASSWORD_LOGIN_SCREEN } from 'navigation/ScreenNames';
import { useAppDispatch } from 'store/hooks/useAppDispatch';
import { setShouldSaveUsername } from 'store/slices/userInfo';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useKeyboard } from 'utils/useKeyboard';

type FormData = {
  username: string;
  password: string;
  save: string;
};

const PasswordLoginScreenBase: FC<PasswordLoginBaseProps> = () => {
  const styles = useStyles();
  const { handleSignIn, loginUserLoading } = useLogin();
  const dispatch = useAppDispatch();
  const { isKeyboardOpened } = useKeyboard();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = data => {
    const { username, password, save } = data;
    dispatch(setShouldSaveUsername(Boolean(save)));
    handleSignIn(username, password);
  };

  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="handled"
      contentInsetAdjustmentBehavior="automatic"
      extraScrollHeight={80}
      showsVerticalScrollIndicator={false}
      scrollEnabled={isKeyboardOpened}
    >
      <View style={styles.wrapper}>
        <Text children="common:passAuth.auth" headline />
        <Text children="common:passAuth.personalData" secondary marginTop={4} />
        <ControlledInput
          control={control}
          name="username"
          label="common:passAuth.username"
          marginTop={38}
          errors={errors}
          required
          errorMessage="common:form.is_required"
        />
        <ControlledInput
          control={control}
          name="password"
          label="common:passAuth.password"
          marginTop={10}
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
          <Button.Primary
            text="common:passAuth.signin"
            onPress={handleSubmit(onSubmit)}
            fullWidth
            isLoading={loginUserLoading}
          />
          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text children="common:passAuth.or" label special style={styles.text} />
            <View style={styles.divider} />
          </View>
          <Button.Secondary text="common:passAuth.signup" onPress={() => {}} fullWidth />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export const PasswordLoginScreen = withLoginScreen<
  PasswordLoginBaseProps,
  typeof PASSWORD_LOGIN_SCREEN
>(PasswordLoginScreenBase, PASSWORD_LOGIN_SCREEN);
