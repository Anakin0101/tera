import { KeyboardTypeOptions, StyleProp, TextStyle } from 'react-native';
import { FieldErrors, FieldValues, UseControllerProps } from 'react-hook-form';

export type TextInputProps = {
  value?: string;
  label?: string;
  required?: boolean;
  marginTop?: number;
  editable?: boolean;
  maxLength?: number;
  autoCorrect?: boolean;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  labelStyle?: StyleProp<TextStyle>;
  inputStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<TextStyle>;
  iconContainerStyle?: StyleProp<TextStyle>;
  autoFocus?: boolean;
  invoice?: boolean;
  invoiceClick?: () => void;
  onChangeText?: (value: string) => void;
  errorMessage?: string;
  showErrorUI?: boolean;
};

type ControlledInputType = {
  type?: 'text' | 'checkbox';
};

export type ControlledInputProps<T extends FieldValues> = TextInputProps &
  ControlledInputType &
  UseControllerProps<T> & {
    errors?: FieldErrors<T>;
  };
