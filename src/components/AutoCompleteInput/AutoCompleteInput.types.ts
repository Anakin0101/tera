import { StyleProp, ViewStyle, TextStyle } from 'react-native';

type SuggestionSelectionEvent = {
  item: any;
  isSelectedFromBankNameInput: boolean;
};

export type AutocompleteInputProps = {
  label: string;

  fetchSuggestions: any;
  onSuggestionSelected: (event: SuggestionSelectionEvent) => void;
  style?: StyleProp<ViewStyle>;
  value: string;
  clearOnSelect: () => void;
  isBankNameInput?: boolean;
  inputContainerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  placeholder?: string;
  disabled?: boolean;
  visible?: boolean;
  accessibilityLabel?: string;
  testID?: string;
};
