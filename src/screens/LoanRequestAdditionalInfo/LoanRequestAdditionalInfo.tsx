import React from 'react';
import { Controller } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button, TextInput } from 'components';
import { Pressable, View } from 'react-native';
import { ChevronDown } from 'assets/SVGs';
import { Colors } from 'theme/Variables';
import { useLoanRequestAdditionalInfo } from './container';
import { useStyles } from './LoanRequestAdditionalInfo.styles.';

export const LoanRequestAdditionalInfo = () => {
  const styles = useStyles();
  const { control, onPaymentDatePress, paymentDateRef, typeOfIncomeRef } =
    useLoanRequestAdditionalInfo();

  return (
    <KeyboardAwareScrollView
      bounces={false}
      keyboardShouldPersistTaps="handled"
      contentInsetAdjustmentBehavior="automatic"
      showsVerticalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.contentContainer}>
        <Controller
          name="paymentDate"
          control={control}
          render={({ field: { onChange, value } }) => {
            return (
              <>
                <TextInput
                  value={value}
                  marginTop={8}
                  editable={false}
                  onChangeText={onChange}
                  label="loanRequest.paymentDate"
                  ref={paymentDateRef}
                />
                <Pressable
                  style={[styles.arrowContainer, styles.paymendDateInput]}
                  onPress={onPaymentDatePress}
                >
                  <ChevronDown color={Colors.black700} />
                </Pressable>
              </>
            );
          }}
        />
        <Controller
          name="typeOfIncome"
          control={control}
          render={({ field: { onChange, value } }) => {
            return (
              <>
                <TextInput
                  value={value}
                  marginTop={8}
                  editable={false}
                  onChangeText={onChange}
                  label="loanRequest.typeOfIncome"
                  ref={typeOfIncomeRef}
                />
                <Pressable
                  style={[styles.arrowContainer, styles.incomeTypeInput]}
                  onPress={() => {}}
                >
                  <ChevronDown color={Colors.black700} />
                </Pressable>
              </>
            );
          }}
        />
        <Controller
          name="income"
          control={control}
          render={({ field: { onChange, value } }) => {
            return (
              <TextInput
                value={value}
                marginTop={8}
                onChangeText={onChange}
                label="loanRequest.income"
              />
            );
          }}
        />
        <Controller
          name="workplace"
          control={control}
          render={({ field: { onChange, value } }) => {
            return (
              <TextInput
                value={value}
                marginTop={8}
                onChangeText={onChange}
                label="loanRequest.workplace"
              />
            );
          }}
        />
        <Controller
          name="position"
          control={control}
          render={({ field: { onChange, value } }) => {
            return (
              <TextInput
                value={value}
                marginTop={8}
                onChangeText={onChange}
                label="loanRequest.position"
              />
            );
          }}
        />
      </View>
      <Button.Primary text="common.next" fullWidth customWrapperStyle={styles.button} />
    </KeyboardAwareScrollView>
  );
};
