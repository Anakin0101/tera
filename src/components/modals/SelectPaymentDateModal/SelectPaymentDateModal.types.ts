import { MarkedDates } from 'react-native-calendars/src/types';

export type SelectPaymentDateModalProps = {
  onPress: (date: string) => void;
  selectedDate: string;
  minDate?: string;
  maxDate?: string;
  current?: string;
  markedDates?: (selected: string) => MarkedDates;
  hideExtraDays?: boolean;
  disabledByDefault?: boolean;
  disableAllTouchEventsForDisabledDays?: boolean;
};

export type MarkedDay = {
  selected: boolean;
  selectedColor: string;
  disabled: boolean;
  disableTouchEvent: boolean;
};
