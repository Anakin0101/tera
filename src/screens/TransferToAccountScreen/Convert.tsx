import React, { useState, useEffect, useCallback } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Text } from 'components';
import { useStyleTheme } from './TransferToAccountScreen.styles';
import { useConvertAmount } from './useConvertAmountBuy';
import { EditSvg } from 'assets/SVGs';
import { setConvertionData } from 'store/slices/transfers';
import { useDispatch } from 'react-redux';
import { getCurrencyIcon } from 'utils/currency';
import { amountBuyOrSell } from 'services/apis/transfersAPI/transfersAPI.types';
import { useTranslation } from 'react-i18next';
export const Convert = ({
  accountFromData,
  accountToData,
  openTransferScreen,
  selectedData,
  setIsButtonDisabled,
}: any) => {
  const styles = useStyleTheme();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [inputValueBuy, setInputValueBuy] = useState('');
  const [inputValueSell, setInputValueSell] = useState('');
  const [sourceInput, setSourceInput] = useState<amountBuyOrSell.buy | amountBuyOrSell.sell | null>(
    null,
  );

  const { buyAmount, buyLoading, sellAmount, sellLoading } = useConvertAmount(
    {
      amountBuy: inputValueBuy.length > 0 ? parseFloat(inputValueBuy) : 0.01,
      currencyBuy: accountFromData?.ccy,
      currencySell: accountToData?.ccy,
    },
    {
      ...(inputValueSell.length > 0 && { amountSell: parseFloat(inputValueSell) }),
      currencyBuy: accountFromData?.ccy,
      currencySell: accountToData?.ccy,
    },
  );
  const { specialRate, specialRateUsed, standardRate, conversionAvailableLimit } = buyAmount || {};

  const calculateWithRate = useCallback(
    (value: number) => {
      if (specialRateUsed && conversionAvailableLimit > 0) {
        return value * specialRate;
      } else {
        return value * standardRate;
      }
    },
    [specialRateUsed, specialRate, standardRate, conversionAvailableLimit],
  );

  useEffect(() => {
    try {
      if (accountFromData.ccy === accountToData.ccy) {
        if (buyAmount && sourceInput === amountBuyOrSell.buy && !sellLoading) {
          const updatedValue = parseFloat(inputValueBuy) / calculateWithRate(1);
          const roundedValue = updatedValue.toFixed(2);
          setInputValueSell(roundedValue);
        } else {
          console.warn('error during convertion');
        }
      } else {
        if (buyAmount && sourceInput === amountBuyOrSell.buy && !sellLoading) {
          const updatedValue = parseFloat(inputValueBuy) * calculateWithRate(1);
          const roundedValue = updatedValue.toFixed(2);
          setInputValueSell(roundedValue);
        } else {
          console.warn('error during convertion');
        }
      }
    } catch (error) {
      console.warn('Error in calculation:', error);
    }
  }, [
    buyAmount,
    inputValueBuy,
    sellLoading,
    sourceInput,
    calculateWithRate,
    accountFromData,
    accountToData,
  ]);

  useEffect(() => {
    try {
      if (accountFromData.ccy === accountToData.ccy) {
        if (sellAmount && sourceInput === amountBuyOrSell.sell && !buyLoading) {
          const updatedValue = parseFloat(inputValueSell) * calculateWithRate(1);
          const roundedValue = updatedValue.toFixed(2);
          setInputValueBuy(roundedValue);
        } else {
          console.warn('error during convertion');
        }
      } else {
        if (sellAmount && sourceInput === amountBuyOrSell.sell && !buyLoading) {
          const updatedValue = parseFloat(inputValueSell) * calculateWithRate(1);
          const roundedValue = updatedValue.toFixed(2);
          setInputValueBuy(roundedValue);
        } else {
          console.warn('error during convertion');
        }
      }
    } catch (error) {
      console.warn('Error in calculation:', error);
    }
  }, [
    sellAmount,
    inputValueSell,
    buyLoading,
    sourceInput,
    calculateWithRate,
    accountFromData,
    accountToData,
  ]);

  useEffect(() => {
    if (sourceInput === amountBuyOrSell.buy && inputValueBuy === '') {
      setInputValueSell('');
    } else if (sourceInput === amountBuyOrSell.sell && inputValueSell === '') {
      setInputValueBuy('');
    }
  }, [inputValueBuy, inputValueSell, sourceInput]);

  const handleBuyInputChange = (text: string) => {
    setInputValueBuy(text);
    setIsButtonDisabled(!text || text.trim() === '');
    setSourceInput(amountBuyOrSell.buy);
  };

  const handleSellInputChange = (text: string) => {
    setInputValueSell(text);
    setIsButtonDisabled(!text || text.trim() === '');
    setSourceInput(amountBuyOrSell.sell);
  };
  useEffect(() => {
    if (buyAmount && sellAmount) {
      dispatch(setConvertionData({ buyAmount: buyAmount, sellAmount: sellAmount }));
    }
  }, [buyAmount, sellAmount, dispatch]);

  const renderIcon = (currency: string | undefined) => {
    return (
      <TouchableOpacity style={styles.paddedView}>
        <Text children={getCurrencyIcon(currency || '')} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.transferWrapper}>
      <View style={styles.transferView}>
        <View style={styles.transferTextView}>
          <Text children="transfers.sell" style={styles.sellText} />
          <View style={styles.inputView}>
            <TextInput
              style={styles.amountInput}
              value={inputValueBuy}
              onChangeText={handleBuyInputChange}
              placeholder={'00.00'}
              keyboardType="numeric"
              textAlign="right"
            />
            {renderIcon(accountFromData?.ccy)}
          </View>
        </View>
        <View style={styles.transferFlexEnd}>
          <Text children="transfers.buy" style={styles.buyText} />
          <View style={styles.inputView}>
            <TextInput
              style={styles.amountInput}
              value={inputValueSell}
              onChangeText={handleSellInputChange}
              placeholder={'00.00'}
              keyboardType="numeric"
              textAlign="right"
            />
            {renderIcon(accountToData?.ccy)}
          </View>
        </View>
      </View>
      <View style={styles.inputView}>
        <Text
          children={`${t('transfers.standardCourse')}: ${buyAmount?.standardRate.toFixed(4)} / `}
          style={styles.courseText}
        />
        <Text
          children={`${t('transfers.specificCourse')}: ${
            specialRateUsed && conversionAvailableLimit > 0
              ? buyAmount?.specialRate.toFixed(4)
              : buyAmount?.standardRate.toFixed(4)
          }`}
          style={styles.courseText}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={openTransferScreen}>
        <Text children={selectedData ? selectedData : 'transfers.convertion'} style={styles.text} />
        <EditSvg style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};
