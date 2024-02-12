import { MarkedDates } from 'react-native-calendars/src/types';

export interface CalendarProps {
  minDate?: string;
  maxDate?: string;
  onDayPress: (date: string) => void;
  markedDates?: MarkedDates;
  current?: string;
  hideExtraDays?: boolean;
  disabledByDefault?: boolean;
  disableAllTouchEventsForDisabledDays?: boolean;
  hideDayNames?: boolean;
  hideArrows?: boolean;
  customHeaderTitle?: JSX.Element;
}
