import React, { FC } from 'react';
import { Pressable, TextInput, View } from 'react-native';
import { Button, Text, Divider } from 'components';
import { Colors, FontSize, Spacing } from 'theme/Variables';
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
      <Divider height={Spacing.one} marginTop={Spacing.xxs} />
      <View style={styles.inputsWrapper}>
        <View style={styles.fill}>
          <Text
            lineHeight={Spacing.ml}
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
            marginTop={Spacing.xxxs}
            lineHeight={Spacing.ml}
            letterSpacing={-0.5}
            children="exchange.buy"
            color={Colors.textBlack500}
          />
          <Text
            size={FontSize.regular}
            lineHeight={Spacing.lg}
            numberOfLines={1}
            children={result}
            marginTop={Spacing.s}
          />
          <SelectCurrency
            currency={isReversed ? fromCurrency : toCurrency}
            setCurrency={isReversed ? setFromCurrency : setToCurrency}
            currencies={currencyListBuy}
          />
        </View>
      </View>
      <Divider height={Spacing.one} marginTop={Spacing.xl} marginBottom={Spacing.xl} />
      {defaultRate && (
        <View>
          <View style={styles.rates}>
            <Text
              center
              size={FontSize.tiny}
              children="exchange.standardRate"
              translateProp={translateProp}
              color={Colors.textBlack500}
            />
            {defaultRate?.specialRateUsed && (
              <Text
                center
                size={FontSize.tiny}
                children="exchange.specialRate"
                translateProp={specRateTranslateProp}
                color={Colors.textBlack500}
              />
            )}
          </View>
          {defaultRate?.specialRateUsed && (
            <View>
              <Text
                center
                size={FontSize.dwarf}
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
