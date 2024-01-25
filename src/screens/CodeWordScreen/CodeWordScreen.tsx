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
import { KeyboardAvoidingScrollView } from 'react-native-keyboard-avoiding-scroll-view';
import { useKeyboard } from 'utils/useKeyboard';
import { CodeWordFormData } from './CodeWordScreen.types';

export const CodeWordScreen = () => {
  const styles = useStyles();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CodeWordFormData>();
  const { navigate } = useNavigation<RegistrationStackScreenProps<'EnterUsernameScreen'>>();
  const { isKeyboardOpened } = useKeyboard();

  const onSubmit: SubmitHandler<CodeWordFormData> = data => {
    const { codeWord } = data;
    console.warn({ codeWord });
    navigate(ENTER_USERNAME_SCREEN);
  };

  const handleCodeWordRestoration = () => {
    // TBD
    Alert.alert('should navigate to restore code word screen');
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
              isLoading={false}
            />
          </View>
        }
      >
        <RegistrationTitle text={'registration.enter_code_word'} />

        <ControlledInput
          control={control}
          name="codeWord"
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
        <View style={[styles.codeWordTextContainer, errors.codeWord && styles.withError]}>
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
