import React, { FC, useCallback, useState } from 'react';
import { View } from 'react-native';
import { Colors } from 'theme/Variables';
import { Button, Calendar } from 'components';
import { getAllDatesBetween, getDate } from 'utils/formatDate';
import { MarkedDay, SelectPaymentDateModalProps } from './SelectPaymentDateModal.types';
import { useStyles } from './SelectPaymentDateModal.styles';

export const SelectPaymentDateModal: FC<SelectPaymentDateModalProps> = ({
  onPress,
  selectedDate,
  minDate,
  maxDate,
}) => {
  const styles = useStyles();
  const [selected, setSelected] = useState(selectedDate);

  const handlePress = useCallback(() => {
    onPress(selected);
  }, [onPress, selected]);

  const getMarkedDates = useCallback(() => {
    const dates: Record<string, MarkedDay> = {};
    getAllDatesBetween(minDate, maxDate).forEach(date => {
      dates[date] = {
        selected: date === selected,
        selectedColor: Colors.primary,
        disabled: getDate(date) > 28,
        disableTouchEvent: getDate(date) > 28,
      };
    });

    return dates;
  }, [maxDate, minDate, selected]);

  return (
    <View>
      <Calendar
        onDayPress={setSelected}
        markedDates={{ ...getMarkedDates() }}
        minDate={minDate}
        maxDate={maxDate}
        current={minDate}
        hideExtraDays
        disabledByDefault
        disableAllTouchEventsForDisabledDays
      />
      <Button.Primary
        fullWidth
        onPress={handlePress}
        text="common.select"
        customWrapperStyle={styles.button}
      />
    </View>
  );
};
