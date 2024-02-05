import React, { useEffect, useState } from 'react';
import { useStyles } from './VerificationTypeScreen.styles';
import { Button, ControlledInput, RegistrationTitle, Text } from 'components/index';
import { useNavigation } from '@react-navigation/native';
import { RegistrationStackScreenProps } from 'navigation/types';
import { KeyboardAvoidingScrollView } from '@cassianosch/react-native-keyboard-sticky-footer-avoiding-scroll-view';
import { Platform, SafeAreaView, View } from 'react-native';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CODE_WORD_SCREEN } from 'navigation/ScreenNames';
import { MOBILE_CODE, REGEX } from 'constants/index';
import { ArrowDown } from 'assets/SVGs';
import { ErrorMessage } from 'components/TextInput/TextInput';
import { useKeyboard } from 'utils/useKeyboard';
import { VerificationTypeScreenFormData } from './VerificationTypeScreen.types';
import { RADIO_VALUES } from './VerificationTypeScreen.constants';
import { useUserRegister } from 'hooks/useUserRegister';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { useRecoverPassword } from 'hooks/useRecoverPasswory';

export const VerificationTypeScreen = () => {
  const styles = useStyles();
  const {
    control,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<VerificationTypeScreenFormData>();
  const { navigate } = useNavigation<RegistrationStackScreenProps<'CodeWordScreen'>>();
  const [selectedRadio, setSelectedRadio] = useState<string | null>(RADIO_VALUES.withPhone);
  const { isKeyboardOpened } = useKeyboard();
  const { handleUserRegister, isLoading: registerUserLoading } = useUserRegister();
  const { flow } = useAppSelector(state => state.registerUser);
  const { handleRecoverPassword, isLoading: recoverPasswordLoading } = useRecoverPassword();

  useEffect(() => {
    clearErrors();
  }, [clearErrors]);

  const handleNavigation = () => {
    navigate(CODE_WORD_SCREEN);
  };

  const onSubmit: SubmitHandler<VerificationTypeScreenFormData> = data => {
    const { email, personalId, mobile } = data;
    flow === 'registration'
      ? handleUserRegister({ email, personalId, mobile }, handleNavigation)
      : handleRecoverPassword({ email, pin: personalId, mobile }, handleNavigation);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingScrollView
        scrollEnabled={isKeyboardOpened}
        containerStyle={styles.container}
        contentContainerStyle={styles.wrapper}
        stickyFooter={
          <View style={[styles.ctaWrapper, isKeyboardOpened && styles.ctaOpenWrapper]}>
            <Button.Primary
              text="common.continue"
              onPress={handleSubmit(onSubmit)}
              fullWidth
              isLoading={registerUserLoading || recoverPasswordLoading}
            />
          </View>
        }
      >
        <RegistrationTitle text={'registration.choose_verification_type'} />

        <ControlledInput
          control={control}
          name="personalId"
          label="registration.personalId"
          errors={errors}
          keyboardType={Platform.OS === 'android' ? 'numeric' : 'number-pad'}
          rules={{
            required: {
              value: true,
              message: 'common:form.is_required',
            },
            pattern: {
              value: REGEX.MAX_LENGTH_11,
              message: 'common:form.11_digits_required',
            },
          }}
        />
        <View style={styles.radiosContainer}>
          <View style={[styles.radioContainer, styles.withPhone]}>
            <ControlledInput
              control={control}
              type="radio"
              name="withPhone"
              label="registration.with_mobile_number"
              value={RADIO_VALUES.withPhone}
              selectedRadio={selectedRadio}
              setSelectedRadio={setSelectedRadio}
            />
          </View>
          <View style={styles.radioContainer}>
            <ControlledInput
              control={control}
              type="radio"
              name={'withEmail'}
              label="registration.with_email"
              value={RADIO_VALUES.withEmail}
              selectedRadio={selectedRadio}
              setSelectedRadio={setSelectedRadio}
            />
          </View>
        </View>
        {selectedRadio === RADIO_VALUES.withPhone && (
          <View style={styles.phoneInputContainer}>
            <View style={styles.rowWrapper}>
              <View style={styles.phonePrefixContainer}>
                <Text children={MOBILE_CODE} style={styles.phonePrefix} />
                <ArrowDown />
              </View>
              <View style={styles.phoneInputWrapper}>
                <ControlledInput
                  // we hide our custom error message and build a new one to fit design requirements
                  showErrorMessage={false}
                  keyboardType="phone-pad"
                  control={control}
                  name="mobile"
                  label="registration.phone_number"
                  errors={errors}
                  rules={{
                    required: {
                      value: true,
                      message: 'common:form.is_required',
                    },
                    pattern: {
                      value: REGEX.MAX_LENGTH_9,
                      message: 'common:form.9_digits_required',
                    },
                  }}
                />
              </View>
            </View>

            {errors.mobile && (
              <ErrorMessage
                errors={errors}
                name={'mobile'}
                label="registration.phone_number"
                showErrorUI={true}
              />
            )}
          </View>
        )}
        {selectedRadio === RADIO_VALUES.withEmail && (
          <ControlledInput
            control={control}
            name="email"
            label="registration.email"
            errors={errors}
            keyboardType={'email-address'}
            rules={{
              required: {
                value: true,
                message: 'common:form.is_required',
              },
              pattern: {
                value: REGEX.EMAIL,
                message: 'common:form.invalid_email',
              },
            }}
          />
        )}
      </KeyboardAvoidingScrollView>
    </SafeAreaView>
  );
};
