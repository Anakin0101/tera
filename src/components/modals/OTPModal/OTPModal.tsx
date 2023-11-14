import React, { useState } from 'react';
import { View } from 'react-native';
import { Text } from 'components';
import { ResendIcon } from 'assets/SVGs';
import { useStyleTheme } from './OTPModal.styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import OTPInputView from '@twotalltotems/react-native-otp-input';

export const OTPModal = ({ onFinished }: { onFinished?: (code: string) => void }) => {
  const styles = useStyleTheme();
  const [otpCode, setOtpCode] = useState('');

  return (
    <View style={styles.container}>
      <Text children="resend.text" style={styles.text} />
      <View style={{ width: '80%' }}>
        <Text children="resend.label" style={styles.label} />
      </View>
      <OTPInputView
        style={styles.OTPView}
        pinCount={6}
        autoFocusOnLoad
        code={otpCode}
        onCodeChanged={code => setOtpCode(code)}
        codeInputFieldStyle={styles.underlineStyleBase}
        codeInputHighlightStyle={styles.underlineStyleHighLighted}
        onCodeFilled={() => onFinished?.(otpCode)}
      />
      <TouchableOpacity style={styles.resendView}>
        <ResendIcon />
        <Text children="ხელახლა გაგზავნა" style={styles.resendText} />
      </TouchableOpacity>
    </View>
  );
};
