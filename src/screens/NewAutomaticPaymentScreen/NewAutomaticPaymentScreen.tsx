import React from 'react';
import { Pressable, View } from 'react-native';
import { Controller } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button, Checkbox, SwitchComponent, Text, TextInput } from 'components';
import { useNewAutomaticPayment } from './container';
import { useStyles } from './NewAutomaticPaymentScreen.styles';
import { Event, ChevronDownLarge } from 'assets/SVGs';
import { Alert } from './Alert';

export const NewAutomaticPaymentScreen = () => {
  const styles = useStyles();
  const { control, toggleActiveAllTime, isChecked, setIsChecked } = useNewAutomaticPayment();

  return (
    <KeyboardAwareScrollView
      bounces={false}
      keyboardShouldPersistTaps="handled"
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
          children="შეიყვანეთ აბონენტის ინფორმაცია"
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
                label="აბონენტის ნომერი"
              />
            );
          }}
        />
        <Controller
          name="paymentMethod"
          control={control}
          render={({ field: { onChange, value } }) => {
            return (
              <View>
                <TextInput
                  value={value}
                  marginTop={16}
                  editable={false}
                  onChangeText={onChange}
                  label="გადახდის მეთოდი"
                />
                <Pressable style={styles.iconContainer} onPress={() => {}}>
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
            return <TextInput marginTop={16} value={value} onChangeText={onChange} label="თანხა" />;
          }}
        />
        <Alert message="სისტემა 3 დღის განმავლობაში ეცდება გადახდას" />
        <Controller
          name="title"
          control={control}
          render={({ field: { onChange, value } }) => {
            return (
              <TextInput
                marginTop={16}
                value={value}
                onChangeText={onChange}
                label="დავალების დასახელება"
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
                  label="დაწყების თარიღი"
                />
                <Pressable style={[styles.iconContainer]} onPress={() => {}}>
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
                <Text children="აქტიური მუდმივად" style={styles.switchLabel} />
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
                  label="დასრულების თარიღი"
                />
                <Pressable style={[styles.iconContainer]} onPress={() => {}}>
                  <Event />
                </Pressable>
              </View>
            );
          }}
        />
        <Controller
          name="paymentDate"
          control={control}
          render={({ field: { onChange, value } }) => {
            return (
              <View>
                <TextInput
                  value={value}
                  marginTop={16}
                  editable={false}
                  onChangeText={onChange}
                  label="გადახდის რიცხვი"
                />
                <Pressable style={[styles.iconContainer]} onPress={() => {}}>
                  <ChevronDownLarge />
                </Pressable>
              </View>
            );
          }}
        />
        <Checkbox
          isChecked={isChecked}
          onChange={setIsChecked}
          label="ვეთანხმები წესებს და პირობებს"
          style={styles.terms}
          labelStyle={styles.labelStyle}
        />
      </View>
      <View style={styles.footer}>
        <Button.Primary fullWidth text="common.next" customWrapperStyle={styles.button} />
      </View>
    </KeyboardAwareScrollView>
  );
};
