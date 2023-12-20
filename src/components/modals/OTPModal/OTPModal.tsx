import React, { useRef } from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView, TextInput, View } from 'react-native';
import { Text } from 'components';
import { ResendIcon } from 'assets/SVGs';
import { useStyleTheme } from './OTPModal.styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Controller, useForm } from 'react-hook-form';

type OTPFormInputs = {
  input1: string;
  input2: string;
  input3: string;
  input4: string;
  input5: string;
  input6: string;
};

export const OTPModal = ({ onFinished }: { onFinished?: (code: string) => void }) => {
  const styles = useStyleTheme();
  const { control, getValues } = useForm<OTPFormInputs>();
  const inputRefs = useRef<(TextInput | null)[]>([null, null, null, null, null, null]);

  const checkAndSubmit = () => {
    const values = getValues();
    const otpCode = `${values.input1}${values.input2}${values.input3}${values.input4}${values.input5}${values.input6}`;

    if (otpCode.length === 6) {
      onFinished?.(otpCode);
    }
  };

  const focusNextInput = (index: number) => {
    if (inputRefs.current[index + 1]) {
      const nextInput = inputRefs.current[index + 1];
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <Text children="resend.text" style={styles.OTPNumberLabel} />
        <View>
          <Text children="resend.label" style={styles.label} />
        </View>
        <View style={styles.OTPInputContainer}>
          {[1, 2, 3, 4, 5, 6].map(num => (
            <Controller
              key={num}
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  ref={input => (inputRefs.current[num - 1] = input)}
                  style={styles.inputItem}
                  maxLength={1}
                  onBlur={onBlur}
                  onChangeText={text => {
                    onChange(text);
                    if (text && num === 6) {
                      checkAndSubmit();
                    }
                    if (text && num < 6) {
                      focusNextInput(num - 1);
                    }
                  }}
                  onKeyPress={({ nativeEvent }) => {
                    if (nativeEvent.key === 'Backspace' && !value) {
                      if (num > 1) {
                        const prevInput = inputRefs.current[num - 2];
                        if (prevInput) {
                          prevInput.focus();
                        }
                      }
                    }
                  }}
                  value={value}
                  keyboardType="numeric"
                  autoFocus={num === 1}
                  placeholder={num > 1 && inputRefs.current[num - 1] ? '*' : ''}
                />
              )}
              name={`input${num}` as any}
              rules={{ required: true }}
              defaultValue=""
            />
          ))}
        </View>

        <TouchableOpacity style={styles.resendView}>
          <ResendIcon />
          <Text children="ხელახლა გაგზავნა" style={styles.resendText} />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
