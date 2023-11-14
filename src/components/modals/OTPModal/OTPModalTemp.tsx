import React, { useRef } from 'react';
import { TextInput, View } from 'react-native';
import { Text } from 'components';
import { ResendIcon } from 'assets/SVGs';
import { useStyleTheme } from './OTPModal.styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Controller, useForm } from 'react-hook-form';

interface OTPFormInputs {
  input1: string;
  input2: string;
  input3: string;
  input4: string;
  input5: string;
  input6: string;
}

export const OTPModalTemp = ({ onFinished }: { onFinished?: (code: string) => void }) => {
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
    <View style={styles.container}>
      <Text children="resend.text" style={styles.text} />
      <View style={{ width: '80%' }}>
        <Text children="resend.label" style={styles.label} />
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'center', width: '80%' }}>
        {[1, 2, 3, 4, 5, 6].map(num => (
          <Controller
            key={num}
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                ref={input => (inputRefs.current[num - 1] = input)}
                style={{ width: 40, height: 50, margin: 5, textAlign: 'center', borderWidth: 1 }}
                maxLength={1}
                onBlur={onBlur}
                onChangeText={text => {
                  onChange(text);
                  if (text && num === 6) {
                    checkAndSubmit();
                  } else {
                    focusNextInput(num - 1);
                  }
                }}
                value={value}
                keyboardType="numeric"
                autoFocus={num === 1}
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
    </View>
  );
};
