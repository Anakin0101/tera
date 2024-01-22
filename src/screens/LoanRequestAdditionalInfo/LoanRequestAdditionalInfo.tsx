import React from 'react';
import { Pressable, View } from 'react-native';
import { Controller } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button, TextInput } from 'components';
import { ChevronDown } from 'assets/SVGs';
import { Colors } from 'theme/Variables';
import { useLoanRequestAdditionalInfo } from './container';
import { useStyles } from './LoanRequestAdditionalInfo.styles.';

export const LoanRequestAdditionalInfo = () => {
  const styles = useStyles();
  const {
    control,
    onPaymentDatePress,
    paymentDateRef,
    typeOfIncomeRef,
    onIncomeTypePress,
    allFieldsFull,
    handleNextPress,
  } = useLoanRequestAdditionalInfo();

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
            const formatedValue = value?.map(item => item.name)?.join(',');
            return (
              <>
                <TextInput
                  value={formatedValue}
                  marginTop={8}
                  editable={false}
                  onChangeText={onChange}
                  label="loanRequest.typeOfIncome"
                  ref={typeOfIncomeRef}
                />
                <Pressable
                  style={[styles.arrowContainer, styles.incomeTypeInput]}
                  onPress={onIncomeTypePress}
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
                keyboardType="numeric"
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
      <Button.Primary
        fullWidth
        text="common.next"
        onPress={handleNextPress}
        customWrapperStyle={[styles.button, !allFieldsFull && styles.disabled]}
      />
    </KeyboardAwareScrollView>
  );
};
