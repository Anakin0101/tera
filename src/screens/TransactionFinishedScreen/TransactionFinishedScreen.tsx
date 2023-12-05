import React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'components/index';
import { useStyleTheme } from './TransactionFinishedScreen.styles';
import { Calendar, Plus, Share, SuccessTransaction } from 'assets/SVGs';
import { ChooseService } from 'components/index';

export const TransactionFinishedScreen = () => {
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
            <Button.Primary text="მთავარზე დაბრუნება" />
          </View>
        </View>
      </View>
    </>
  );
};
