import { ItemType } from 'components/modals/IncomeTypeModal/IncomeTypeModal.types';
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
  typeOfIncome: ItemType[];
  income: string;
  workplace: string;
  position: string;
};

export enum IncomeTypeEnum {
  Salary = 1,
  Rent = 2,
  Remittance = 4,
  Dividend = 8,
  IncomeFromProfessionalWork = 16,
  Other = 32,
}
