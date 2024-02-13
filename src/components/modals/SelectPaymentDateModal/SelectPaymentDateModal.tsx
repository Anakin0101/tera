import React, { FC, useCallback, useState } from 'react';
import { View } from 'react-native';
import { Button, Calendar } from 'components';
import { SelectPaymentDateModalProps } from './SelectPaymentDateModal.types';
import { useStyles } from './SelectPaymentDateModal.styles';

export const SelectPaymentDateModal: FC<SelectPaymentDateModalProps> = ({
  onPress,
  selectedDate,
  minDate,
  maxDate,
  current,
  markedDates,
  hideExtraDays,
  disabledByDefault,
  disableAllTouchEventsForDisabledDays,
}) => {
  const styles = useStyles();
  const [selected, setSelected] = useState(selectedDate);

  const handlePress = useCallback(() => {
    onPress(selected);
  }, [onPress, selected]);

  return (
    <View>
      <Calendar
        onDayPress={setSelected}
        markedDates={markedDates?.(selected)}
        minDate={minDate}
        maxDate={maxDate}
        current={current}
        hideExtraDays={hideExtraDays}
        disabledByDefault={disabledByDefault}
        disableAllTouchEventsForDisabledDays={disableAllTouchEventsForDisabledDays}
      />
      <Button.Primary
        fullWidth
        onPress={handlePress}
        text="common.select"
        customWrapperStyle={[styles.button, !selected && styles.disabled]}
      />
    </View>
  );
};
