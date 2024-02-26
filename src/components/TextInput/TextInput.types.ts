import { KeyboardTypeOptions, StyleProp, TextStyle, TextInput as RNTextInput } from 'react-native';
import { FieldErrors, FieldValues, UseControllerProps } from 'react-hook-form';
import { RefObject } from 'react';
export type TextInputProps = {
  value?: string;
  label?: string;
  subTitle?: string;
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
  ef?: RefObject<RNTextInput>;
};

type ControlledInputType = {
  type?: 'text' | 'checkbox' | 'radio';
};

export type ControlledInputProps<T extends FieldValues> = TextInputProps &
  ControlledInputType &
  UseControllerProps<T> & {
    errors?: FieldErrors<T>;
  };

export interface TextInputRefType {
  focus: () => void;
  blur: () => void;
}
