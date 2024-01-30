export type SelectPaymentDateModalProps = {
  onPress: (date: string) => void;
  selectedDate: string;
  minDate: string;
  maxDate: string;
};

export type MarkedDay = {
  selected: boolean;
  selectedColor: string;
  disabled: boolean;
  disableTouchEvent: boolean;
};
