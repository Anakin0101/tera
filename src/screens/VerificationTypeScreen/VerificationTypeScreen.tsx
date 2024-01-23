import React, { useState } from 'react';
import { useStyles } from './VerificationTypeScreen.styles';
import { Button, ControlledInput, RegistrationTitle, Text } from 'components/index';
import { useNavigation } from '@react-navigation/native';
import { RegistrationStackScreenProps } from 'navigation/types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Platform, View } from 'react-native';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CODE_WORD_SCREEN } from 'navigation/ScreenNames';
import { MOBILE_CODE, REGEX } from 'constants/index';
import { ArrowDown } from 'assets/SVGs';
import { ErrorMessage } from 'components/TextInput/TextInput';

type FormData = {
  personalId: string;
  withPhone: string;
  withEmail: string;
  phoneNumber: string;
  email: string;
};

export const RADIO_VALUES = {
  withEmail: 'withEmail',
  withPhone: 'withPhone',
};

export const VerificationTypeScreen = () => {
  const styles = useStyles();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const { navigate } = useNavigation<RegistrationStackScreenProps<'CodeWordScreen'>>();
  const [selectedRadio, setSelectedRadio] = useState<string | null>(RADIO_VALUES.withPhone);

  const onSubmit: SubmitHandler<FormData> = data => {
    const { email, personalId, phoneNumber } = data;
    console.warn({ email, personalId, phoneNumber });
    navigate(CODE_WORD_SCREEN);
  };

  //   console.log('selectedRadio', selectedRadio);

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      keyboardShouldPersistTaps="handled"
      contentInsetAdjustmentBehavior="automatic"
      extraScrollHeight={80}
      showsVerticalScrollIndicator={false}
      scrollEnabled={false}
    >
      <View style={styles.wrapper}>
        <RegistrationTitle text={'registration.choose_verification_type'} />

        <View style={styles.formContainer}>
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
          <View style={styles.radioContainer}>
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
                  name="phoneNumber"
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
            <View
              style={{
                height: 30,
              }}
            >
              {errors.phoneNumber && (
                <ErrorMessage
                  errors={errors}
                  name={'phoneNumber'}
                  label="registration.phone_number"
                  showErrorUI={true}
                />
              )}
            </View>
          </View>
          <ControlledInput
            // marginTop={20}
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
        </View>
        <Button.Primary
          text="common:passAuth.signin"
          onPress={handleSubmit(onSubmit)}
          fullWidth
          isLoading={false}
          customWrapperStyle={styles.ctaWrapper}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};
