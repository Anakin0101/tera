import React, { useState, useEffect, useCallback } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Text } from 'components';
import { useStyleTheme } from './TransferToAccountScreen.styles';
import { useConvertAmount } from './useConvertAmountBuy';
import { EditSvg } from 'assets/SVGs';
import { setConvertionData } from 'store/slices/transfers';
import { useDispatch } from 'react-redux';
import { getCurrencyIcon } from 'utils/currency';
export const Convert = ({
  accountFromData,
  accountToData,
  openTransferScreen,
  selectedData,
  setIsButtonDisabled,
}: any) => {
  const styles = useStyleTheme();
  const dispatch = useDispatch();
  const [inputValueBuy, setInputValueBuy] = useState('');
  const [inputValueSell, setInputValueSell] = useState('');
  const [sourceInput, setSourceInput] = useState<'buy' | 'sell' | null>(null);

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
  const { specialRate, specialRateUsed, standardRate } = buyAmount || {};

  const calculateWithRate = useCallback(
    (value: number) => {
      if (specialRateUsed) {
        return value * specialRate;
      } else {
        return value * standardRate;
      }
    },
    [specialRateUsed, specialRate, standardRate],
  );

  useEffect(() => {
    if (buyAmount && sourceInput === 'buy' && !sellLoading) {
      const updatedValue = parseFloat(inputValueBuy) / calculateWithRate(1);
      const roundedValue = updatedValue.toFixed(2);
      setInputValueSell(roundedValue);
    }
  }, [buyAmount, inputValueBuy, sellLoading, sourceInput, calculateWithRate]);

  useEffect(() => {
    if (sellAmount && sourceInput === 'sell' && !buyLoading) {
      const updatedValue = parseFloat(inputValueSell) * calculateWithRate(1);
      const roundedValue = updatedValue.toFixed(2);
      setInputValueBuy(roundedValue);
    }
  }, [sellAmount, inputValueSell, buyLoading, sourceInput, calculateWithRate]);

  useEffect(() => {
    if (sourceInput === 'buy' && inputValueBuy === '') {
      setInputValueSell('');
    } else if (sourceInput === 'sell' && inputValueSell === '') {
      setInputValueBuy('');
    }
  }, [inputValueBuy, inputValueSell, sourceInput]);

  const handleBuyInputChange = (text: string) => {
    setInputValueBuy(text);
    setIsButtonDisabled(!text || text.trim() === '');
    setSourceInput('buy');
  };

  const handleSellInputChange = (text: string) => {
    setInputValueSell(text);
    setIsButtonDisabled(!text || text.trim() === '');
    setSourceInput('sell');
  };
  useEffect(() => {
    if (buyAmount && sellAmount) {
      dispatch(setConvertionData({ buyAmount: buyAmount, sellAmount: sellAmount }));
    }
  }, [buyAmount, sellAmount, dispatch]);

  const renderIcon = (currency: string | undefined) => {
    return (
      <TouchableOpacity style={{ padding: 5 }}>
        <Text children={getCurrencyIcon(currency || '')} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.transferWrapper}>
      <View style={styles.transferView}>
        <View style={{ justifyContent: 'flex-start' }}>
          <Text children="გაყიდვა" style={styles.sellText} />
          <View style={{ flexDirection: 'row' }}>
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
        <View style={{ alignItems: 'flex-end' }}>
          <Text children="ყიდვა" style={styles.buyText} />
          <View style={{ flexDirection: 'row' }}>
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
      <View style={{ flexDirection: 'row' }}>
        <Text
          children={`სტანდარტული კურსი: ${buyAmount?.standardRate.toFixed(4)} / `}
          style={styles.courseText}
        />
        <Text
          children={`შენი კურსი: ${
            specialRateUsed ? buyAmount?.specialRate.toFixed(4) : buyAmount?.standardRate.toFixed(4)
          }`}
          style={styles.courseText}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={openTransferScreen}>
        <Text children={selectedData ? selectedData : 'კონვერტაცია'} style={styles.text} />
        <EditSvg style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};
