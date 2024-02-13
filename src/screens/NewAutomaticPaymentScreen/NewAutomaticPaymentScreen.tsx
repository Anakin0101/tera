import React from 'react';
import { Pressable, View } from 'react-native';
import { Controller } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  Text,
  Button,
  Checkbox,
  MyBalance,
  TextInput,
  SubscriberInfo,
  SwitchComponent,
} from 'components';
import { Alert } from './Alert';
import { Colors } from 'theme/Variables';
import { useNewAutomaticPayment } from './container';
import { Event, ChevronDownLarge } from 'assets/SVGs';
import { useStyles } from './NewAutomaticPaymentScreen.styles';
import { AutoPaymentTypeEnum } from 'services/apis/productsAPI/productsAPI.types';

export const NewAutomaticPaymentScreen = () => {
  const styles = useStyles();
  const {
    control,
    toggleActiveAllTime,
    paymentMethodRef,
    onPaymentMethodPress,
    startDateRef,
    onSelectStartDatePress,
    endDateRef,
    onSelectEndDatePress,
    activeAllTime,
    abonentNumberRef,
    debtVerifyResults,
    onSelectPayDayPress,
    toggleCheckbox,
    paymentDateRef,
    isDisabled,
    account,
    selectAccount,
    providerItem,
    handleNextPress,
    paymentMethod,
  } = useNewAutomaticPayment();

  return (
    <KeyboardAwareScrollView
      bounces={false}
      keyboardShouldPersistTaps="never"
      contentInsetAdjustmentBehavior="automatic"
      showsVerticalScrollIndicator={false}
      style={styles.scrollView}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.container}>
        <Text
          medium
          size={18}
          marginTop={32}
          letterSpacing={-0.5}
          children="automaticPayments.enterSubscriberInfo"
        />
        <Controller
          name="abonentNumber"
          control={control}
          render={({ field: { onChange, value } }) => {
            return (
              <TextInput
                marginTop={16}
                value={value}
                onChangeText={onChange}
                label="automaticPayments.subscriberNumber"
                editable={false}
                ref={abonentNumberRef}
              />
            );
          }}
        />
        <SubscriberInfo
          isAutomaticPayment
          feeRules={providerItem?.feeRules}
          debtVerifyResults={debtVerifyResults}
        />
        <Controller
          name="paymentMethod"
          control={control}
          render={({ field: { onChange, value } }) => {
            return (
              <View>
                <TextInput
                  value={value?.name}
                  marginTop={16}
                  editable={false}
                  onChangeText={onChange}
                  label="automaticPayments.paymentMethod"
                  ref={paymentMethodRef}
                  inputStyle={styles.input}
                />
                <Pressable style={styles.iconContainer} onPress={onPaymentMethodPress}>
                  <ChevronDownLarge />
                </Pressable>
              </View>
            );
          }}
        />
        <Controller
          name="amount"
          control={control}
          render={({ field: { onChange, value } }) => {
            return (
              <TextInput
                marginTop={16}
                value={value}
                onChangeText={onChange}
                label={
                  paymentMethod?.type === AutoPaymentTypeEnum.FixedAmount
                    ? 'automaticPayments.amount'
                    : 'automaticPayments.maxAmount'
                }
                keyboardType="decimal-pad"
              />
            );
          }}
        />
        <Alert
          message={
            paymentMethod?.type === AutoPaymentTypeEnum.ByDebt
              ? 'automaticPayments.alert_two'
              : 'automaticPayments.alert'
          }
        />
        <Controller
          name="title"
          control={control}
          render={({ field: { onChange, value } }) => {
            return (
              <TextInput
                marginTop={16}
                value={value}
                onChangeText={onChange}
                label="automaticPayments.taskName"
                autoCorrect={false}
              />
            );
          }}
        />
        <Controller
          name="startDate"
          control={control}
          render={({ field: { onChange, value } }) => {
            return (
              <View>
                <TextInput
                  value={value}
                  marginTop={16}
                  editable={false}
                  onChangeText={onChange}
                  label="automaticPayments.startDate"
                  ref={startDateRef}
                  inputStyle={styles.input}
                />
                <Pressable style={styles.iconContainer} onPress={onSelectStartDatePress}>
                  <Event />
                </Pressable>
              </View>
            );
          }}
        />
        <Controller
          name="activeAllTime"
          control={control}
          render={({ field: { value } }) => {
            return (
              <View style={styles.switchContainer}>
                <SwitchComponent value={value} onValueChange={toggleActiveAllTime} style={{}} />
                <Text children="automaticPayments.activeAllTime" style={styles.switchLabel} />
              </View>
            );
          }}
        />
        <Controller
          name="endDate"
          control={control}
          render={({ field: { onChange, value } }) => {
            return (
              <View>
                <TextInput
                  value={value}
                  marginTop={16}
                  editable={false}
                  onChangeText={onChange}
                  label="automaticPayments.endDate"
                  ref={endDateRef}
                  inputStyle={styles.input}
                />
                <Pressable style={styles.iconContainer} onPress={onSelectEndDatePress}>
                  <Event color={activeAllTime ? Colors.textBlack500 : Colors.black} />
                </Pressable>
              </View>
            );
          }}
        />
        {paymentMethod?.type === AutoPaymentTypeEnum.FixedAmount && (
          <Controller
            name="paymentDate"
            control={control}
            render={({ field: { onChange, value } }) => {
              return (
                <View>
                  <TextInput
                    value={value ? String(value) : ''}
                    marginTop={16}
                    editable={false}
                    onChangeText={onChange}
                    label="automaticPayments.paymentDate"
                    inputStyle={styles.input}
                    ref={paymentDateRef}
                  />
                  <Pressable style={styles.iconContainer} onPress={onSelectPayDayPress}>
                    <ChevronDownLarge color={activeAllTime ? Colors.textBlack500 : Colors.black} />
                  </Pressable>
                </View>
              );
            }}
          />
        )}
        <Controller
          name="agreed"
          control={control}
          render={({ field: { value } }) => {
            return (
              <View style={styles.terms}>
                <Checkbox
                  isChecked={value}
                  onChange={toggleCheckbox}
                  label="common.accept"
                  labelStyle={styles.labelStyle}
                />
                <Text color={Colors.primary} children="common.terms_and_conditions" />
              </View>
            );
          }}
        />
      </View>
      <MyBalance selectedAccount={account} selectAccountOnPress={selectAccount} />
      <View style={styles.buttonContainer}>
        <Button.Primary
          fullWidth
          text="common.next"
          onPress={handleNextPress}
          customWrapperStyle={[styles.button, isDisabled && styles.disabled]}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};
