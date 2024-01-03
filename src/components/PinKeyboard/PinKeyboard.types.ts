export type PinKeyboardProps = {
  onPress: (value: number) => void;
  handleBiometricAuth?: () => void;
  showBiometricKey?: boolean | null;
};
