import React, { FC } from 'react';
import { TouchableOpacity, Platform } from 'react-native';
import { useStyleTheme } from './BiometricKey.styles';
import { FingerPrintIcon } from 'assets/SVGs';
import { FaceIdSvg } from 'assets/SVGs';
import { BiometricKeyProps } from './BiometricKey.types';

export const BiometricKey: FC<BiometricKeyProps> = ({ handleBiometricAuth }) => {
  const styles = useStyleTheme();

  const icon = Platform.OS === 'android' ? <FingerPrintIcon /> : <FaceIdSvg />;
  return (
    <TouchableOpacity
      style={styles.pinItem}
      onPress={handleBiometricAuth}
      hitSlop={{
        top: 5,
        bottom: 5,
        left: 25,
        right: 25,
      }}
    >
      {icon}
    </TouchableOpacity>
  );
};
