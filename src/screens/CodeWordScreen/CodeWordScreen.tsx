import React from 'react';
import { useStyles } from './CodeWordScreen.styles';
import { Button, ControlledInput, RegistrationTitle, Text } from 'components/index';
import { useNavigation } from '@react-navigation/native';
import { RegistrationStackScreenProps } from 'navigation/types';
import { Alert, Pressable, SafeAreaView, View } from 'react-native';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ENTER_USERNAME_SCREEN } from 'navigation/ScreenNames';
import { ArrowDown } from 'assets/SVGs';
import { Colors } from 'theme/Variables';
import { KeyboardAvoidingScrollView } from '@cassianosch/react-native-keyboard-sticky-footer-avoiding-scroll-view';
import { useKeyboard } from 'utils/useKeyboard';
import { CodeWordFormData } from './CodeWordScreen.types';
import { closeModal, openModal } from 'utils/modal';
import { CodeWordModal } from 'components/modals';
import { useUserRegister } from 'hooks/useUserRegister';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { useRecoverPassword } from 'hooks/useRecoverPasswory';

export const CodeWordScreen = () => {
  const styles = useStyles();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CodeWordFormData>();
  const { navigate } = useNavigation<RegistrationStackScreenProps<'EnterUsernameScreen'>>();
  const { isKeyboardOpened } = useKeyboard();
  const { handleUserRegister, isLoading: registerUserLoading } = useUserRegister();
  const { flow } = useAppSelector(state => state.registerUser);
  const { handleRecoverPassword, isLoading: recoverPasswordLoading } = useRecoverPassword();

  const handleNavigation = () => {
    navigate(ENTER_USERNAME_SCREEN);
  };

  const onSubmit: SubmitHandler<CodeWordFormData> = data => {
    const { secretWord } = data;

    flow === 'registration'
      ? handleUserRegister({ secretWord }, handleNavigation)
      : handleRecoverPassword({ secretWord }, handleNavigation);
  };

  // TBD
  const handleIdentomatRegistration = () => {
    closeModal();
    Alert.alert('should navigate to restore code word screen');
  };

  const handleCodeWordRestoration = () => {
    openModal({
      element: <CodeWordModal onPress={handleIdentomatRegistration} />,
    });
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
        <RegistrationTitle text={'registration.enter_code_word'} />

        <ControlledInput
          control={control}
          name="secretWord"
          label="registration.code_word"
          errors={errors}
          keyboardType={'default'}
          rules={{
            required: {
              value: true,
              message: 'common:form.is_required',
            },
          }}
        />
        <View style={[styles.codeWordTextContainer, errors.secretWord && styles.withError]}>
          <Text children="common.do_not_have" label />
          <Pressable style={styles.linkContainer} onPress={handleCodeWordRestoration}>
            <Text children="registration.code_word" label special />
            <ArrowDown rotation={270} fill={Colors.primary} height={8} style={styles.arrowRight} />
          </Pressable>
        </View>
      </KeyboardAvoidingScrollView>
    </SafeAreaView>
  );
};
