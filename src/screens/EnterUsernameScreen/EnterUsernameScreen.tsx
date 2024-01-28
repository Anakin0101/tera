import React from 'react';
import { useStyles } from './EnterUsernameScreen.styles';
import { Button, ControlledInput, OTPModal, RegistrationTitle, Text } from 'components/index';
import { useNavigation } from '@react-navigation/native';
import { RegistrationStackScreenProps } from 'navigation/types';
import { Alert, Pressable, SafeAreaView, View } from 'react-native';
import { SubmitHandler, useForm } from 'react-hook-form';
import { closeModal, openModal } from 'utils/modal';
import { REGISTRATION_FINISH_SCREEN } from 'navigation/ScreenNames';
import { KeyboardAvoidingScrollView } from 'react-native-keyboard-avoiding-scroll-view';
import { useKeyboard } from 'utils/useKeyboard';
import { EnterUsernameFormData } from './EnterUsernameScreen.types';

export const EnterUsernameScreen = () => {
  const styles = useStyles();
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<EnterUsernameFormData>({ defaultValues: { agree: true } });
  const { replace } = useNavigation<RegistrationStackScreenProps<'RegistrationFinishScreen'>>();

  const termsAndConditionsAccepted = watch('agree');

  const checkOTP = () => {
    // TBD send a request to BE and check is OTP was entered correctly, if yes => Navigate to success screen
    Alert.alert('OTP matches');
    closeModal();
    replace(REGISTRATION_FINISH_SCREEN, {
      isSuccess: true,
    });
    return true;
  };

  const onSubmit: SubmitHandler<EnterUsernameFormData> = data => {
    const { username } = data;
    console.warn({ username });
    // Open OTPModal
    // if successful - navigate(REGISTRATION_FINISH_SCREEN);
    openModal({
      element: <OTPModal onFinished={checkOTP} />,
      disableDynamicSizing: true,
      disablePanning: true,
      withKeyboard: true,
    });
  };

  const handleTermsAndConditions = () => {
    Alert.alert('Navigate to Terms and conditions page');
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
              isLoading={false}
              customWrapperStyle={styles.ctaWrapper}
            />
          </View>
        }
      >
        <RegistrationTitle text={'registration.enter_username'} />

        <ControlledInput
          control={control}
          name="username"
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
