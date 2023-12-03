import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Text } from 'components';
import { useStyleTheme } from './TransferToAccountScreen.styles';
import { useConvertAmountBuy } from './useConvertAmountBuy';
import { useConvertAmountSell } from './useConvertAmountSell';
import { ConvertSvg } from 'assets/SVGs';
import { EditSvg } from 'assets/SVGs';
export const Convert = ({
  accountFromData,
  accountToData,
  openTransferScreen,
  selectedData,
  selectedItem,
}: any) => {
  const styles = useStyleTheme();
  const [inputValueBuy, setInputValueBuy] = useState(''); // Initialized with '0'
  const [inputValueSell, setInputValueSell] = useState(''); // Initialized with '0'
  const [sourceInput, setSourceInput] = useState<'buy' | 'sell' | null>(null);

  const { convertAmount: buyAmount, convertLoading: buyLoading } = useConvertAmountBuy({
    amountBuy: inputValueBuy.length > 0 ? parseFloat(inputValueBuy) : 0.01,
    currencyBuy: accountFromData?.ccy,
    currencySell: accountToData?.ccy,
  });

  const { convertAmount: sellAmount, convertLoading: sellLoading } = useConvertAmountSell({
    ...(inputValueSell.length > 0 && { amountSell: parseFloat(inputValueSell) }),
    currencyBuy: accountFromData?.ccy,
    currencySell: accountToData?.ccy,
  });

  useEffect(() => {
    if (buyAmount && sourceInput === 'buy' && !sellLoading) {
      const updatedValue = parseFloat(inputValueBuy) / buyAmount.specialRate;
      const roundedValue = updatedValue.toFixed(2); // Round to two decimal places
      setInputValueSell(roundedValue);
    }
  }, [buyAmount, inputValueBuy, sellLoading, sourceInput]);

  useEffect(() => {
    if (sellAmount && sourceInput === 'sell' && !buyLoading) {
      const updatedValue = parseFloat(inputValueSell) * sellAmount.specialRate;
      const roundedValue = updatedValue.toFixed(2); // Round to two decimal places
      setInputValueBuy(roundedValue);
    }
  }, [sellAmount, inputValueSell, buyLoading, sourceInput]);
  useEffect(() => {
    if (sourceInput === 'buy' && inputValueBuy === '') {
      setInputValueSell('');
    } else if (sourceInput === 'sell' && inputValueSell === '') {
      setInputValueBuy('');
    }
  }, [inputValueBuy, inputValueSell, sourceInput]);

  const handleBuyInputChange = (text: string) => {
    setInputValueBuy(text);
    setSourceInput('buy');
  };

  const handleSellInputChange = (text: string) => {
    setInputValueSell(text);
    setSourceInput('sell');
  };

  const renderIcon = (currency: string) => {
    return (
      <TouchableOpacity style={{ padding: 5 }}>
        <Text children={currency === 'GEL' ? '₾' : '$'} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.transferWrapper}>
      <View
        style={{
          flexDirection: 'row',

          alignItems: 'center',
          justifyContent: 'space-between',
          width: '90%',
        }}
      >
        <View style={{ justifyContent: 'flex-start' }}>
          <Text children="გაყიდვა" style={{ fontSize: 14, marginLeft: 10 }} />
          <View style={{ flexDirection: 'row' }}>
            <TextInput
              style={{ width: 70, fontSize: 24 }}
              value={inputValueBuy}
              onChangeText={handleBuyInputChange}
              placeholder={`00.00`}
              keyboardType="numeric"
              textAlign="right"
            />
            {renderIcon(accountFromData?.ccy)}
          </View>
        </View>
        <View>
          <ConvertSvg />
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text children="ყიდვა" style={{ fontSize: 14 }} />
          <View style={{ flexDirection: 'row' }}>
            <TextInput
              style={{ width: 70, fontSize: 24 }}
              value={inputValueSell}
              onChangeText={handleSellInputChange}
              placeholder={`00.00`}
              keyboardType="numeric"
              textAlign="right"
            />
            {renderIcon(accountToData?.ccy)}
          </View>
        </View>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text
          children={`სტანდარტული კურსი: ${buyAmount?.standardRate}/`}
          style={{ fontSize: 12 }}
        />
        <Text children={`შენი კურსი: ${buyAmount?.specialRate}`} style={{ fontSize: 12 }} />
      </View>
      <TouchableOpacity style={styles.button} onPress={openTransferScreen}>
        <Text
          children={!selectedData ? selectedItem.name : selectedData}
          style={{ fontSize: 14 }}
        />
        <EditSvg style={{ marginLeft: 10 }} />
      </TouchableOpacity>
    </View>
  );
};
