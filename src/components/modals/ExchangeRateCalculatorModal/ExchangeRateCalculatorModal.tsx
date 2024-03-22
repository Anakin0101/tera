import React, { FC } from 'react';
import { Pressable, TextInput, View } from 'react-native';
import { Button, Text, Divider } from 'components';
import { Colors } from 'theme/Variables';
import { formatMoney } from 'utils/formatMoney';
import { SelectCurrency } from './SelectCurrency';
import { useExchangeRateCalculator } from './container';
import { TabBarTransactions } from 'assets/SVGs';
import { ExchangeRateCalculatorModalProps } from './ExchangeRateCalculatorModal.types';
import { useStyles } from './ExchangeRateCalculatorModal.styles';
import { INITIAL_AMOUNT_PLACEHOLDER } from 'constants/common';

export const ExchangeRateCalculatorModal: FC<ExchangeRateCalculatorModalProps> = ({
  currencies,
  handleConversion,
}) => {
  const styles = useStyles();
  const {
    fromCurrency,
    setFromCurrency,
    toCurrency,
    setToCurrency,
    amount,
    onChangeAmount,
    result,
    switchCurrencies,
    isReversed,
    defaultRate,
    translateProp,
    specRateTranslateProp,
    currencyListBuy,
    currencyListSell,
  } = useExchangeRateCalculator(currencies);

  return (
    <View>
      <Divider height={1} marginTop={4} />
      <View style={styles.inputsWrapper}>
        <View style={styles.fill}>
          <Text
            lineHeight={16.45}
            letterSpacing={-0.5}
            children="exchange.sell"
            color={Colors.textBlack500}
          />
          <TextInput
            value={amount}
            onChangeText={onChangeAmount}
            autoFocus
            numberOfLines={1}
            placeholder={INITIAL_AMOUNT_PLACEHOLDER}
            keyboardType="decimal-pad"
            style={styles.input}
          />
          <SelectCurrency
            currency={isReversed ? toCurrency : fromCurrency}
            setCurrency={isReversed ? setToCurrency : setFromCurrency}
            currencies={currencyListSell}
          />
        </View>
        <Pressable onPress={switchCurrencies} style={styles.mainIconWrapper}>
          <TabBarTransactions />
        </Pressable>
        <View style={styles.toCurrency}>
          <Text
            marginTop={2}
            lineHeight={16.45}
            letterSpacing={-0.5}
            children="exchange.buy"
            color={Colors.textBlack500}
          />
          <Text size={16} lineHeight={19} numberOfLines={1} children={result} marginTop={7} />
          <SelectCurrency
            currency={isReversed ? fromCurrency : toCurrency}
            setCurrency={isReversed ? setFromCurrency : setToCurrency}
            currencies={currencyListBuy}
          />
        </View>
      </View>
      <Divider height={1} marginTop={24} marginBottom={24} />
      {defaultRate && (
        <View>
          <View style={styles.rates}>
            <Text
              center
              size={12}
              children="exchange.standardRate"
              translateProp={translateProp}
              color={Colors.textBlack500}
            />
            {defaultRate?.specialRateUsed && (
              <Text
                center
                size={12}
                children="exchange.specialRate"
                translateProp={specRateTranslateProp}
                color={Colors.textBlack500}
              />
            )}
          </View>
          {defaultRate?.specialRateUsed && (
            <View>
              <Text
                size={12}
                center
                color={Colors.textBlack500}
                children="exchange.specRateLimit"
                translateProp={{ value: formatMoney(defaultRate?.conversionAvailableLimit) }}
              />
            </View>
          )}
        </View>
      )}
      <Button.Primary
        fullWidth
        onPress={handleConversion}
        text="exchange.convert"
        customWrapperStyle={[styles.button, !amount && styles.disabled]}
      />
    </View>
  );
};
