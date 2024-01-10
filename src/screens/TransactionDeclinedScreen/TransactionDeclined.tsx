import React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'components/index';
import { useStyleTheme } from './TransactionDeclined.styles';
import { FailedSvg } from 'assets/SVGs';
import { TransactionsStackScreenProps } from 'navigation/types';
import { useNavigation } from '@react-navigation/native';
import { TRANSACTIONS_SCREEN } from 'navigation/ScreenNames';

export const TransactionFailedScreen = () => {
  const { navigate } = useNavigation<TransactionsStackScreenProps<'TransactionsScreen'>>();
  const navigateToMain = () => {
    navigate(TRANSACTIONS_SCREEN);
  };

  const styles = useStyleTheme();
  return (
    <View style={styles.wrapper}>
      <FailedSvg />
      <View style={styles.textWrapper}>
        <Text children="transfers.Failed" style={styles.text} numberOfLines={2} />
        <View style={styles.btnWrapper}>
          <Button.Primary text="transfers.backToHome" onPress={navigateToMain} />
        </View>
      </View>
    </View>
  );
};
