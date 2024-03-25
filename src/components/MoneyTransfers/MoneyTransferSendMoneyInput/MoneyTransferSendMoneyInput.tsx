import React, { memo } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { useStyles } from './MoneyTransferSendMoneyInput.styles';
import { MoneyTransferSendMoneyInputProps } from './MoneyTransferSendMoneyInput.types';
import { MoneyTransferSendMoneyInputItem } from './MoneyTransferSendMoneyInputItem';
import { Colors } from 'theme/Variables';

export const MoneyTransferSendMoneyInput: React.FC<MoneyTransferSendMoneyInputProps> = memo(
  ({
    selectedSendCurrency,
    setSelectedSendCurrency,
    selectedReceiveCurrency,
    setSelectedReceiveCurrency,
    selectedSendCurrencyVal,
    setSelectedSendCurrencyVal,
    selectedReceiveCurrencyVal,
    setSelectedReceiveCurrencyVal,
    isLoading = false,
  }) => {
    const styles = useStyles();

    return (
      <View style={styles.wrapper}>
        <MoneyTransferSendMoneyInputItem
          selectedCurrency={selectedSendCurrency}
          inputName="moneyTransferSendMoneyScreen.send"
          changeCurrencyOnPress={setSelectedSendCurrency}
          setSelectedCurrencyVal={setSelectedSendCurrencyVal}
          selectedCurrencyVal={selectedSendCurrencyVal}
        />
        <View style={styles.loaderStyle}>
          {isLoading && <ActivityIndicator size={'small'} color={Colors.primary} />}
        </View>
        <MoneyTransferSendMoneyInputItem
          selectedCurrency={selectedReceiveCurrency}
          inputName="moneyTransferSendMoneyScreen.recieve"
          changeCurrencyOnPress={setSelectedReceiveCurrency}
          selectedCurrencyVal={selectedReceiveCurrencyVal}
          setSelectedCurrencyVal={setSelectedReceiveCurrencyVal}
          disabled={true}
        />
      </View>
    );
  },
);
