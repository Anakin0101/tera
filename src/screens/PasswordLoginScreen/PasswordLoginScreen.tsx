import React from 'react';
import { Pressable, View } from 'react-native';
import { Button, Text, ControlledInput } from 'components';
import useStyles from './PasswordLoginScreen.styles';
import { useLogin } from 'hooks';
import { SubmitHandler, useForm } from 'react-hook-form';
import { withLoginScreen } from 'components/HOC';
import { REGISTRATION_METHOD_SCREEN, REGISTRATION_STACK } from 'navigation/ScreenNames';
import { useAppDispatch } from 'store/hooks/useAppDispatch';
import { setShouldSaveUsername } from 'store/slices/userInfo';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useKeyboard } from 'utils/useKeyboard';
import { useNavigation } from '@react-navigation/native';
import { GuestStackScreenProps } from 'navigation/types';
import { setCurrentFlow } from 'store/slices/registerUser';

type FormData = {
  username: string;
  password: string;
  save: string;
};

const PasswordLoginScreenBase = () => {
  const styles = useStyles();
  const { handleSignIn, loginUserLoading } = useLogin();
  const dispatch = useAppDispatch();
  const { isKeyboardOpened } = useKeyboard();
  const { navigate } = useNavigation<GuestStackScreenProps<'RegistrationStack'>>();

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

  const registerUser = () => {
    dispatch(setCurrentFlow('registration'));
    navigate(REGISTRATION_STACK, {
      screen: REGISTRATION_METHOD_SCREEN,
      params: { flow: 'registration' },
    });
  };

  const handlePasswordRecovery = () => {
    dispatch(setCurrentFlow('passwordRecovery'));
    navigate(REGISTRATION_STACK, {
      screen: REGISTRATION_METHOD_SCREEN,
      params: { flow: 'passwordRecovery' },
    });
  };

  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="handled"
      contentInsetAdjustmentBehavior="automatic"
      extraScrollHeight={100}
      showsVerticalScrollIndicator={false}
      scrollEnabled={isKeyboardOpened}
      style={styles.mainContainer}
    >
      <View style={styles.wrapper}>
        <Text children="common:passAuth.auth" headline />
        <Text children="common:passAuth.personalData" secondary marginTop={4} />
        <ControlledInput
          control={control}
          name="username"
          label="common:passAuth.username"
          marginTop={30}
          errors={errors}
          required
          rules={{
            required: {
              value: true,
              message: 'common:form.is_required',
            },
          }}
        />
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
          <ControlledInput
            control={control}
            type="checkbox"
            name="save"
            label="common:passAuth.save"
          />
          <Pressable onPress={handlePasswordRecovery}>
            <Text children="common:passAuth.forgot" label special />
          </Pressable>
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
          <Button.Secondary text="common:passAuth.signup" onPress={registerUser} fullWidth />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export const PasswordLoginScreen = withLoginScreen(PasswordLoginScreenBase);
