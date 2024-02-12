import React, { FC, useCallback, useMemo, useState } from 'react';
import { Pressable, View } from 'react-native';
import { Colors } from 'theme/Variables';
import { Button, Text } from 'components';
import { getAllDatesBetween, getDate, getDiff } from 'utils/formatDate';
import { MAX_DAYS_IN_MONTH, MAX_SELECTABLE_DATE } from 'constants/common';
import { ModalProps } from './AutomaticPaymentDateModal.types';
import { useStyles } from './AutomaticPaymentDateModal.styles';

const payDays = Array.from({ length: 28 }, (_, i) => i + 1);
const rows = [0, 1, 2, 3];

export const AutomaticPaymentDateModal: FC<ModalProps> = ({
  startDate,
  endDate,
  onPress,
  selectedDate,
}) => {
  const styles = useStyles();
  const [date, setDate] = useState<number>(selectedDate);

  const selectableDates = useMemo(() => {
    if (!startDate || !endDate || getDiff(startDate, endDate) >= MAX_DAYS_IN_MONTH) {
      return payDays;
    } else {
      return getAllDatesBetween(startDate, endDate)
        .map(i => getDate(i))
        .filter(i => i <= MAX_SELECTABLE_DATE);
    }
  }, [startDate, endDate]);

  const handleSelectPress = useCallback(() => {
    onPress(date);
  }, [date, onPress]);

  const getDates = () => {
    return rows.map((_, index) => (
      <View style={styles.row}>
        {payDays.slice(index * 7, index * 7 + 7).map(i => {
          const isEnabled = selectableDates.includes(i);

          const handlePress = () => {
            if (!isEnabled) {
              return;
            }
            setDate(i);
          };

          return (
            <Pressable onPress={handlePress} style={styles.dateWrapper}>
              <View style={[styles.dateContainer, i === date && styles.selected]}>
                <Text
                  color={
                    !isEnabled ? Colors.textBlack500 : i === date ? Colors.white : Colors.black
                  }
                  children={i}
                />
              </View>
            </Pressable>
          );
        })}
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      {getDates()}
      <View style={styles.buttonContainer}>
        <Button.Primary
          fullWidth
          text="common.select"
          onPress={handleSelectPress}
          customWrapperStyle={[styles.button, !date && styles.disabled]}
        />
      </View>
    </View>
  );
};
