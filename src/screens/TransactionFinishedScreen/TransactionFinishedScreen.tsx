import React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'components/index';
import { useStyleTheme } from './TransactionFinishedScreen.styles';
import { Calendar, Plus, Share, SuccessTransaction } from 'assets/SVGs';
import { TransactionsStackScreenProps } from 'navigation/types';
import { useNavigation } from '@react-navigation/native';
import { ChooseService } from 'components/index';
import { TRANSACTIONS_SCREEN } from 'navigation/ScreenNames';

export const TransactionFinishedScreen = () => {
  const { navigate } = useNavigation<TransactionsStackScreenProps<'TransactionsScreen'>>();
  const navigateToMain = () => {
    navigate(TRANSACTIONS_SCREEN);
  };
  const data = [
    {
      name: 'transfers.saveAsTemplate',
      icon: <Plus />,
    },
    {
      name: 'transfers.automaticPay',
      icon: <Calendar />,
    },
    {
      name: 'transfers.shareCheck',
      icon: <Share />,
    },
  ];
  const styles = useStyleTheme();
  return (
    <>
      <View style={styles.wrapper}>
        <SuccessTransaction />
        <View style={styles.textWrapper}>
          <Text children="transfers.success" style={styles.text} numberOfLines={2} />
          <Text children="თანხა" style={styles.amount} />
          <View style={styles.btnWrapper}>
            <ChooseService fromTransaction serviceData={data} />
            <Button.Primary text="მთავარზე დაბრუნება" onPress={navigateToMain} />
          </View>
        </View>
      </View>
    </>
  );
};
