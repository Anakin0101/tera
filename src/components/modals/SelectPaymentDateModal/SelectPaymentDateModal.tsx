import React, { FC, useCallback, useState } from 'react';
import { View } from 'react-native';
import { Colors } from 'theme/Variables';
import { Button, Calendar } from 'components';
import { SelectPaymentDateModalProps } from './SelectPaymentDateModal.types';
import { useStyles } from './SelectPaymentDateModal.styles';

export const SelectPaymentDateModal: FC<SelectPaymentDateModalProps> = ({
  onPress,
  selectedDate,
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
        markedDates={{
          [selected]: { selected: true, selectedColor: Colors.primary },
        }}
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
