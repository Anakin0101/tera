import React, { FC } from 'react';
import { View } from 'react-native';
import { Button } from 'components';
import { useStyles } from './FilterTransactionsModal.styles';
import { ButtonsProps } from './FilterTransactionsModal.types';

export const Buttons: FC<ButtonsProps> = ({ onClearPress, onSelectPress }) => {
  const styles = useStyles();
  return (
    <View style={styles.buttonsContainer}>
      <Button.Secondary
        text="common.clear"
        customWrapperStyle={styles.buttonWrapper}
        customTextStyle={styles.buttonLabel}
        onPress={onClearPress}
      />
      <Button.Primary
        text="common.select"
        onPress={onSelectPress}
        customWrapperStyle={styles.buttonWrapper}
        customTextStyle={styles.buttonLabel}
      />
    </View>
  );
};
