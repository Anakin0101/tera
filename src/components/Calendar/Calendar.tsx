import React, { FC, memo } from 'react';
import { Calendar as RNCalendar, LocaleConfig } from 'react-native-calendars';
import { getValue } from 'storage/index';
import { SELECTED_LANGUAGE } from 'storage/constants';
import { theme, useStyles } from './Calendar.styles';
import { CalendarProps } from './Calendar.types';
import { LanguageKeys } from 'components/LanguageSwitcher/LanguageSwitcher.types';

LocaleConfig.locales.geo = {
  monthNames: [
    'იანვარი',
    'თებერვალი',
    'მარტი',
    'აპრილი',
    'მაისი',
    'ივნისი',
    'ივლისი',
    'აგვისტო',
    'სექტემბერი',
    'ოქტომბერი',
    'ნოემბერი',
    'დეკემბერი',
  ],
  monthNamesShort: [
    'იან',
    'თებ',
    'მარ',
    'აპრ',
    'მაი',
    'ივნ',
    'ივლ',
    'აგვ',
    'სექ',
    'ოქტ',
    'ნოე',
    'დეკ',
  ],
  dayNames: ['კვირა', 'ორშაბათი', 'სამშაბათი', 'ოთხშაბათი', 'ხუთშაბათი', 'პარასკევი', 'შაბათი'],
  dayNamesShort: ['კვი', 'ორშ', 'სამ', 'ოთხ', 'ხუთ', 'პარ', 'შაბ'],
};

LocaleConfig.locales.en = {
  monthNames: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  monthNamesShort: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ],
  dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
};

LocaleConfig.defaultLocale = getValue(SELECTED_LANGUAGE) || LanguageKeys.geo;

export const Calendar: FC<CalendarProps> = memo(({ minDate, maxDate, onDayPress }) => {
  const styles = useStyles();

  return (
    <RNCalendar
      firstDay={1}
      minDate={minDate}
      maxDate={maxDate}
      onDayPress={({ dateString }) => onDayPress(dateString)}
      theme={theme}
      style={styles.container}
    />
  );
});
