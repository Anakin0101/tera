import React from 'react';
import { View } from 'react-native';
import { Button, ControlledInput, Text } from 'components/index';
import { useStyles } from './MoneyTransferSendInfoScreen.style';
import { useMoneyTransferSendInfo } from './container';
import { useForm } from 'react-hook-form';
import { KeyboardAvoidingScrollView } from '@cassianosch/react-native-keyboard-sticky-footer-avoiding-scroll-view';

export const MoneyTransferSendInfoScreen = () => {
  const styles = useStyles();

  const { onSubmit, isKeyboardOpened, setFirstName, setLastName } = useMoneyTransferSendInfo();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <KeyboardAvoidingScrollView
      containerStyle={styles.container}
      contentContainerStyle={styles.wrapper}
      stickyFooter={
        <View style={[styles.ctaWrapper, isKeyboardOpened && styles.ctaOpenWrapper]}>
          <View style={styles.wrapper}>
            <Button.Primary text={'common.next'} onPress={handleSubmit(onSubmit)} fullWidth />
          </View>
        </View>
      }
    >
      <View style={styles.container}>
        <View style={styles.headerWrapper}>
          <Text style={styles.headerTitle} children={'moneyTransferSendInfoScreen.title'} />
        </View>

        <ControlledInput
          control={control}
          name={'firstName'}
          label={'moneyTransferSendInfoScreen.receiverName'}
          marginTop={24}
          errors={errors}
          required={true}
          rules={{
            required: {
              value: true,
              message: 'common:form.is_required',
            },
          }}
          handleChange={text => {
            text && setFirstName(text);
          }}
        />
        <ControlledInput
          control={control}
          name={'lastName'}
          label={'moneyTransferSendInfoScreen.receiverSurname'}
          marginTop={24}
          errors={errors}
          required={true}
          rules={{
            required: {
              value: true,
              message: 'common:form.is_required',
            },
          }}
          handleChange={text => {
            text && setLastName(text);
          }}
        />
      </View>
    </KeyboardAvoidingScrollView>
  );
};
