import React from 'react';
import { useStyles } from './CodeWordScreen.styles';
import { Button, ControlledInput, RegistrationTitle, Text } from 'components/index';
import { useNavigation } from '@react-navigation/native';
import { RegistrationStackScreenProps } from 'navigation/types';
import { Alert, Pressable, View } from 'react-native';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ENTER_USERNAME_SCREEN } from 'navigation/ScreenNames';
import { ArrowDown } from 'assets/SVGs';
import { Colors } from 'theme/Variables';

type FormData = {
  codeWord: string;
};

export const CodeWordScreen = () => {
  const styles = useStyles();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const { navigate } = useNavigation<RegistrationStackScreenProps<'EnterUsernameScreen'>>();

  const onSubmit: SubmitHandler<FormData> = data => {
    const { codeWord } = data;
    console.warn({ codeWord });
    navigate(ENTER_USERNAME_SCREEN);
  };

  const handleCodeWordRestoration = () => {
    // TBD
    Alert.alert('should navigate to restore code word screen');
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <RegistrationTitle text={'registration.enter_code_word'} />

        <View style={styles.formContainer}>
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
              <ArrowDown
                rotation={270}
                fill={Colors.primary}
                height={8}
                style={styles.arrowRight}
              />
            </Pressable>
          </View>
        </View>
        <Button.Primary
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
