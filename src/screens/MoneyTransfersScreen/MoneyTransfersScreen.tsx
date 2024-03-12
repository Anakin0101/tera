import React, { useState } from 'react';
import { View, Pressable, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Button, IconComponent, TabBarComponent, Text, TransfersHistory } from 'components/index';
import { useStyles } from './MoneyTransfersScreen.style';
import { MainStackScreenProps } from 'navigation/types';
import Images from 'theme/Images';
import { MONEY_TRANSFER_RECEIVE_SCREEN } from 'navigation/ScreenNames';
import { TransferListTypeEnum } from 'components/TransfersHistory/container';

const routes = [
  { key: 'receive', title: 'common.receive' },
  { key: 'send', title: 'common.send' },
];

export const MoneyTransfersScreen = () => {
  const styles = useStyles();
  const { navigate } = useNavigation<MainStackScreenProps<'CartPaymentSuccessScreen'>>();

  const [tabIndex, setTabIndex] = useState<number>(0);

  const receiveMoneyOnPress = () => {
    navigate(MONEY_TRANSFER_RECEIVE_SCREEN);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerButtonsWrapper}>
        <Pressable
          style={[styles.headerButtonItem, styles.headerButtonItemMargin]}
          onPress={() => Alert.alert('send')}
        >
          <IconComponent
            customIconComponentStyles={styles.icon}
            pngLocalIcon={Images().SendIcon}
            pressable={false}
          />
          <Text children={'common.send'} style={styles.headerButtonLabel} />
        </Pressable>
        <Pressable style={styles.headerButtonItem} onPress={receiveMoneyOnPress}>
          <IconComponent
            customIconComponentStyles={styles.icon}
            pngLocalIcon={Images().ReceiveIcon}
            pressable={false}
          />
          <Text children={'common.receive'} style={styles.headerButtonLabel} />
        </Pressable>
      </View>
      <TabBarComponent
        routes={routes}
        setTabIndex={setTabIndex}
        tabIndex={tabIndex}
        style={styles.tabWrapper}
      />
      <View style={styles.dateButton}>
        <Button.Outline
          text="common.date"
          onPress={() => Alert.alert('date')}
          customWrapperStyle={styles.dateButtonWrapper}
          customTextStyle={styles.dateButtonLabel}
        />
      </View>
      <TransfersHistory
        transferType={tabIndex === 0 ? TransferListTypeEnum.receive : TransferListTypeEnum.send}
      />
    </View>
  );
};
