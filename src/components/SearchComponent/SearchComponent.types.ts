export type SearchProps = {
  value: string;
  onChangeText: (val: string) => void;
  onSubmitEditing?: () => void;
  placeholder: string;
  autoFocus?: boolean;
  onClearTextOnPress?: () => void;
};
