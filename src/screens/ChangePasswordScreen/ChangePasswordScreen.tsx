import React, { useMemo } from 'react';
import { useStyles } from './ChangePasswordScreen.styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useKeyboard } from 'utils/useKeyboard';
import { View } from 'react-native';
import { Button, ControlledInput } from 'components/index';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useChangePassword } from './container';
import { ChangePasswordFormData } from './ChangePasswordScreen.types';
import { PasswordCriteriaList } from 'components/PasswordCriteriaList/PasswordCriteriaList';
import { useTranslation } from 'react-i18next';

export const ChangePasswordScreen = () => {
  const { changePasswordLoading, handleChangePassword } = useChangePassword();
  const styles = useStyles();
  const { isKeyboardOpened } = useKeyboard();
  const { t } = useTranslation();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ChangePasswordFormData>();

  const validateRepeatPassword = (value?: string): boolean | string => {
    const newPassword = watch('newPassword');
    if (value === newPassword) {
      return true;
    } else {
      return t('form.does_not_match_with') + ' ' + `"${t('changePassword.newPassword')}"`;
    }
  };

  const onSubmit: SubmitHandler<ChangePasswordFormData> = data => {
    const { existingPassword, newPassword } = data;
    // handle password change API call
    handleChangePassword({ existingPassword, newPassword });
    console.warn({ existingPassword, newPassword });
  };

  const validatePasswordComplexity = (value: string | undefined) => {
    if (!value) return;
    const criteria = [
      /[!@#$%^&*(),.?":{}|<>]/, // Symbols - adjust according to your requirements
      /[a-z]/, // Lowercase letters
      /[A-Z]/, // Uppercase letters
      /\d/, // Numbers
    ];

    // Correctly sum the number of criteria met
    const criteriaMet = criteria.reduce((count, regex) => count + (regex.test(value) ? 1 : 0), 0);

    // Check if the value meets at least 3 criteria
    if (criteriaMet >= 3) {
      return true; // Valid
    }

    return false;
  };

  const isButtonDisabled = useMemo(() => {
    return !!(
      errors?.existingPassword?.message ||
      errors?.newPassword?.message ||
      errors?.repeatPassword?.message
    );
  }, [errors]);

  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="handled"
      contentInsetAdjustmentBehavior="automatic"
      extraScrollHeight={120}
      showsVerticalScrollIndicator={false}
      scrollEnabled={isKeyboardOpened}
      style={styles.mainContainer}
    >
      <View style={styles.wrapper}>
        <ControlledInput
          control={control}
          name="existingPassword"
          label="changePassword.existingPassword"
          marginTop={30}
          errors={errors}
          rules={{
            required: {
              value: true,
              message: 'form.is_required',
            },
          }}
        />
        <ControlledInput
          showErrorMessage={false}
          control={control}
          name="newPassword"
          label="changePassword.newPassword"
          marginTop={5}
          secureTextEntry
          errors={errors}
          rules={{
            required: {
              value: true,
              message: 'form.is_required',
            },
            minLength: {
              value: 8,
              message: '',
            },
            validate: {
              value: validatePasswordComplexity,
            },
          }}
        />
        <PasswordCriteriaList password={watch('newPassword')} errors={errors} />

        <ControlledInput
          control={control}
          name="repeatPassword"
          label="changePassword.repeatPassword"
          marginTop={5}
          secureTextEntry
          errors={errors}
          rules={{
            required: {
              value: true,
              message: 'form.is_required',
            },
            validate: validateRepeatPassword,
          }}
        />

        <View style={styles.buttonCont}>
          <Button.Primary
            text="common.continue"
            onPress={handleSubmit(onSubmit)}
            fullWidth
            isLoading={changePasswordLoading}
            disabled={isButtonDisabled}
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};
