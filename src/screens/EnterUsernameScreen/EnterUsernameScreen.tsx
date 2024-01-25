import React from 'react';
import { useStyles } from './EnterUsernameScreen.styles';
import { Button, ControlledInput, OTPModal, RegistrationTitle, Text } from 'components/index';
import { useNavigation } from '@react-navigation/native';
import { RegistrationStackScreenProps } from 'navigation/types';
import { Alert, Pressable, View } from 'react-native';
import { SubmitHandler, useForm } from 'react-hook-form';
import { closeModal, openModal } from 'utils/modal';
import { REGISTRATION_FINISH_SCREEN } from 'navigation/ScreenNames';

type FormData = {
  username: string;
  agree: boolean;
};

export const EnterUsernameScreen = () => {
  const styles = useStyles();
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({ defaultValues: { agree: true } });
  const { navigate } = useNavigation<RegistrationStackScreenProps<'RegistrationFinishScreen'>>();

  const termsAndConditionsAccepted = watch('agree');

  const checkOTP = () => {
    // TBD send a request to BE and check is OTP was entered correctly, if yes => Navigate to success screen
    Alert.alert('OTP matches');
    closeModal();
    navigate(REGISTRATION_FINISH_SCREEN, {
      isSuccess: true,
    });
    return true;
  };

  const onSubmit: SubmitHandler<FormData> = data => {
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

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <RegistrationTitle text={'registration.enter_username'} />

        <View style={styles.formContainer}>
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
        </View>
        <View style={styles.chechboxContainer}>
          <ControlledInput control={control} type="checkbox" name="agree" label="common.accept" />
          <Pressable style={styles.linkContainer} onPress={handleTermsAndConditions}>
            <Text children="common.terms_and_conditions" label special />
          </Pressable>
        </View>

        <Button.Primary
          disabled={!termsAndConditionsAccepted}
          text="common.continue"
          onPress={handleSubmit(onSubmit)}
          fullWidth
          isLoading={false}
          customWrapperStyle={styles.ctaWrapper}
        />
      </View>
    </View>
  );
};
