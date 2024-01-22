import React from 'react';
import { useStyles } from './VerificationTypeScreen.styles';
import { Button, ControlledInput, RegistrationTitle } from 'components/index';
import { useNavigation } from '@react-navigation/native';
import { RegistrationStackScreenProps } from 'navigation/types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Platform, View } from 'react-native';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CODE_WORD_SCREEN } from 'navigation/ScreenNames';
import { REGEX } from 'constants/index';

type FormData = {
  personalId: string;
  verificationType: string;
  phoneNumber: string;
  email: string;
};

export const VerificationTypeScreen = () => {
  const styles = useStyles();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const { navigate } = useNavigation<RegistrationStackScreenProps<'CodeWordScreen'>>();

  const onSubmit: SubmitHandler<FormData> = data => {
    const { email, personalId, phoneNumber, verificationType } = data;
    console.warn({ email, personalId, phoneNumber, verificationType });
    navigate(CODE_WORD_SCREEN);
  };

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
