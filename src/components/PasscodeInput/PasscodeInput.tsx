import React, { FC } from 'react';
import { View } from 'react-native';
import PinKeyboard from 'components/PinKeyboard/PinKeyboard';
import { PinLine } from 'components/PinLine/PinLine';
import { PasscodeInputProps } from './PasscodeInput.types';
import { useStyleTheme } from './PasscodeInput.styles';
import { PasscodeLogo } from 'assets/SVGs';
import { Text } from 'components/index';

export const PasscodeInput: FC<PasscodeInputProps> = ({
  onPasscodeChange,
  valueLength,
  title,
  label,
}) => {
  const styles = useStyleTheme();
  return (
    <View style={styles.container}>
      <PasscodeLogo />
      <View style={styles.innerTopContainer}>
        <Text style={styles.title} children={title} />
        <Text style={styles.label} children={label} />
        <PinLine fillNumber={valueLength} />
      </View>
      <View style={styles.pinWrapper}>
        <PinKeyboard onPress={onPasscodeChange} />
      </View>
    </View>
  );
};
