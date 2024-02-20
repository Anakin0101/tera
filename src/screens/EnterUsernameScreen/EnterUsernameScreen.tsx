import React from 'react';
import { useStyles } from './EnterUsernameScreen.styles';
import { Button, ControlledInput, OTPModal, RegistrationTitle, Text } from 'components/index';
import { useNavigation } from '@react-navigation/native';
import { RegistrationStackScreenProps } from 'navigation/types';
import { Pressable, SafeAreaView, View } from 'react-native';
import { SubmitHandler, useForm } from 'react-hook-form';
import { closeModal, openModal } from 'utils/modal';
import { REGISTRATION_FINISH_SCREEN } from 'navigation/ScreenNames';
import { KeyboardAvoidingScrollView } from '@cassianosch/react-native-keyboard-sticky-footer-avoiding-scroll-view';
import { useKeyboard } from 'utils/useKeyboard';
import { EnterUsernameFormData } from './EnterUsernameScreen.types';
import { useUserRegister } from 'hooks/useUserRegister';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { useRecoverPassword } from 'hooks/useRecoverPasswory';
import { openURL } from 'utils/openURL';
import { PROD_URLS } from 'services/constants/urls';

export const EnterUsernameScreen = () => {
  const styles = useStyles();
  const {
    control,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm<EnterUsernameFormData>({ defaultValues: { agree: true } });
  const { replace } = useNavigation<RegistrationStackScreenProps<'RegistrationFinishScreen'>>();

  const termsAndConditionsAccepted = watch('agree');
  const { handleUserRegister, isLoading: registerUserLoading } = useUserRegister();
  const { flow } = useAppSelector(state => state.registerUser);
  const { handleRecoverPassword, isLoading: recoverPasswordLoading } = useRecoverPassword();

  const handleSuccessfulOTP = () => {
    closeModal();
    replace(REGISTRATION_FINISH_SCREEN, {
      isSuccess: true,
    });
  };

  const checkOTP = (enteredOTP: string) => {
    const { userName: formUserName } = getValues();

    flow === 'registration'
      ? handleUserRegister(
          { otp: enteredOTP, sendOtp: false, userName: formUserName },
          handleSuccessfulOTP,
        )
      : handleRecoverPassword(
          { otp: enteredOTP, sendOtp: false, userName: formUserName },
          handleSuccessfulOTP,
        );
  };

  const handleOpenModal = () => {
    openModal({
      element: <OTPModal onFinished={checkOTP} />,
      disableDynamicSizing: true,
      disablePanning: true,
      withKeyboard: true,
    });
  };

  const handleSendOTP = () => {
    const { userName: formUserName } = getValues();
    flow === 'registration'
      ? handleUserRegister({ sendOtp: true, userName: formUserName }, handleOpenModal)
      : handleRecoverPassword({ sendOtp: true, userName: formUserName }, handleOpenModal);
  };

  const onSubmit: SubmitHandler<EnterUsernameFormData> = data => {
    const { userName } = data;

    flow === 'registration'
      ? handleUserRegister({ userName, sendOtp: false }, handleSendOTP)
      : handleRecoverPassword({ userName, sendOtp: false }, handleSendOTP);
  };

  const handleTermsAndConditions = () => {
    openURL(PROD_URLS.TERMS_URL);
  };
  const { isKeyboardOpened } = useKeyboard();

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingScrollView
        scrollEnabled={isKeyboardOpened}
        containerStyle={styles.container}
        contentContainerStyle={styles.wrapper}
        stickyFooter={
          <View style={[styles.ctaWrapper, isKeyboardOpened && styles.ctaOpenWrapper]}>
            <Button.Primary
              disabled={!termsAndConditionsAccepted}
              text="common.continue"
              onPress={handleSubmit(onSubmit)}
              fullWidth
              isLoading={registerUserLoading || recoverPasswordLoading}
            />
          </View>
        }
      >
        <RegistrationTitle text={'registration.enter_username'} />

        <ControlledInput
          control={control}
          name="userName"
          label="passAuth.username"
          errors={errors}
          keyboardType={'default'}
          rules={{
            required: {
              value: true,
              message: 'common:form.is_required',
            },
          }}
        />

        <View style={styles.chechboxContainer}>
          <ControlledInput control={control} type="checkbox" name="agree" label="common.accept" />
          <Pressable style={styles.linkContainer} onPress={handleTermsAndConditions}>
            <Text children="common.terms_and_conditions" label special />
          </Pressable>
        </View>
      </KeyboardAvoidingScrollView>
    </SafeAreaView>
  );
};
