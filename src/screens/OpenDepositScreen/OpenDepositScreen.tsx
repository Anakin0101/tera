import React, { useEffect, useState } from 'react';
import { View, Pressable, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import { setAdjustResize, setAdjustPan } from 'rn-android-keyboard-adjust';
import { Button, Text } from 'components';
import { Colors, Spacing } from 'theme/Variables';
import { useStyles } from './OpenDepositScreen.styles';
import { CurrencySignMap } from 'utils/CurrencySignMap';
import { Currency } from 'services/apis/productsAPI/productsAPI.types';
import { SmallCC, TinyChevron } from 'assets/SVGs';

const currencies: Currency[] = ['GEL', 'USD', 'EUR'];

const DepositInitialAmount = () => {
  const styles = useStyles();
  const headerHeight = useHeaderHeight();
  const [amount, setAmount] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>('GEL');

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.textInputContainer}>
          <Text
            label
            size={40}
            lineHeight={40}
            marginTop={Platform.OS === 'ios' ? 6 : 2}
            children={CurrencySignMap[selectedCurrency]}
          />
          <TextInput
            autoFocus
            value={amount}
            onChangeText={setAmount}
            style={styles.input}
            selectionColor={Colors.primary}
            autoCorrect={false}
            keyboardType="numeric"
            autoCapitalize="none"
            autoComplete="off"
            textAlign="center"
          />
        </View>
        <View style={styles.currencies}>
          {currencies.map(item => (
            <Pressable
              onPress={() => setSelectedCurrency(item)}
              style={[styles.currencyContainer, selectedCurrency === item && styles.selected]}
            >
              <Text
                secondary
                children={CurrencySignMap[item]}
                special={selectedCurrency === item}
              />
            </Pressable>
          ))}
        </View>
        <View style={styles.minimumAmount}>
          <Text
            label
            secondary
            translateProp={{ value: 10 }}
            children="newDeposit.minimumDeposit"
          />
        </View>
      </View>
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={Platform.select({
          ios: headerHeight + Spacing.xl,
          android: headerHeight + Spacing.xxxl,
        })}
      >
        <View style={styles.accountsContainer}>
          <View style={styles.account}>
            <View style={styles.cardIcon}>
              <SmallCC />
            </View>
            <View>
              <Text children="newDeposit.selectAcc" secondary label />
              <Text children="newDeposit.from" />
            </View>
          </View>
          <TinyChevron />
          <View style={styles.account}>
            <View style={styles.alignEnd}>
              <Text children="newDeposit.selectAcc" secondary label />
              <Text children="newDeposit.to" />
            </View>
            <View style={styles.cardIcon}>
              <SmallCC />
            </View>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button.Primary fullWidth text="common.next" customWrapperStyle={styles.button} />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export const OpenDepositScreen = () => {
  useEffect(() => {
    setAdjustPan();
    return () => {
      setAdjustResize();
    };
  }, []);

  return <DepositInitialAmount />;
};
