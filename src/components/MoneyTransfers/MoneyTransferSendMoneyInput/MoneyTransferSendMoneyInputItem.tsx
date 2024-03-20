import React, { memo } from 'react';
import { Pressable, View } from 'react-native';

import { useStyles } from './MoneyTransferSendMoneyInput.styles';
import { MoneyTransferSendMoneyInputItemProps } from './MoneyTransferSendMoneyInput.types';
import { TextInput } from 'components/TextInput/TextInput';
import { Text } from 'components/Text/Text';
import { ArrowDown } from 'assets/SVGs';
import { getCurrencyIcon } from 'utils/currency';
import { useMoneyTransferSendMoney } from './container';

export const MoneyTransferSendMoneyInputItem: React.FC<MoneyTransferSendMoneyInputItemProps> = memo(
  ({
    selectedCurrency,
    inputName = '',
    changeCurrencyOnPress,
    setSelectedCurrencyVal = () => {},
    selectedCurrencyVal = '',
    disabled = false,
  }) => {
    const styles = useStyles();

    const { selectCurrencyOnPress } = useMoneyTransferSendMoney(
      selectedCurrency,
      changeCurrencyOnPress,
    );

    return (
      <View style={styles.itemWrapper}>
        <TextInput
          containerStyle={styles.inputStyle}
          inputStyle={styles.inputTextStyle}
          label={inputName}
          value={selectedCurrencyVal}
          maxLength={22}
          onChangeText={setSelectedCurrencyVal}
          keyboardType="numeric"
          editable={!disabled}
        />

        <View style={styles.currencyContainer}>
          <Pressable
            onPress={selectCurrencyOnPress}
            style={styles.currencyButton}
            disabled={disabled}
          >
            <Text style={styles.currencyButtonLabel} children={getCurrencyIcon(selectedCurrency)} />
            <ArrowDown />
          </Pressable>
        </View>
      </View>
    );
  },
);
