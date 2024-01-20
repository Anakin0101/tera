import { KeyboardTypeOptions } from 'react-native';

export type FieldProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  editable: boolean;
  keyboardType?: KeyboardTypeOptions;
  onPress?: () => void;
};

export type FormData = {
  paymentDate: string;
  typeOfIncome: string;
  income: string;
  workplace: string;
  position: string;
};
