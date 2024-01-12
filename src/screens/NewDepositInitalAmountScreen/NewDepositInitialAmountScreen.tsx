import React, { useRef } from 'react';
import { View, Pressable, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { Button, Text } from 'components';
import { formatMoney } from 'utils/formatMoney';
import { Colors, Spacing } from 'theme/Variables';
import { SmallCC, TinyChevron } from 'assets/SVGs';
import { CurrencySignMap } from 'utils/CurrencySignMap';
import { useNewDepositInitialAmount } from './container';
import { useStyles } from './NewDepositInitialAmountScreen.styles';

export const NewDepositInitialAmountScreen = () => {
  const styles = useStyles();
  const ref = useRef<TextInput>(null);

  const {
    headerHeight,
    handleSelectAccountPress,
    creditAccount,
    debitAccount,
    selectedCurrency,
    setSelectedCurrency,
    amount,
    setAmount,
    handlePress,
    offer,
  } = useNewDepositInitialAmount(ref);

  const getCurrencies = () => {
    return offer?.depositProducts?.[0]?.currencies?.map(item => (
      <Pressable
        key={item.currency}
        onPress={() => setSelectedCurrency(item.currency)}
        style={[styles.currencyContainer, selectedCurrency === item.currency && styles.selected]}
      >
        <Text
          secondary
          children={CurrencySignMap[item.currency]}
          special={selectedCurrency === item.currency}
        />
      </Pressable>
    ));
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.textInputContainer}>
          <TextInput
            ref={ref}
            autoFocus
            value={amount}
            onChangeText={setAmount}
            style={styles.input}
            selectionColor={Colors.primary}
            autoCorrect={false}
            keyboardType="numeric"
            autoCapitalize="none"
            autoComplete="off"
            placeholder="00.00"
            placeholderTextColor={Colors.inputBlack50}
          />
          <Text
            label
            size={40}
            lineHeight={40}
            style={styles.currency}
            children={CurrencySignMap[selectedCurrency]}
          />
        </View>
        <View style={styles.currencies}>{getCurrencies()}</View>
        <View style={styles.minimumAmount}>
          <Text
            label
            secondary
            translateProp={{ value: offer?.depositProducts?.[0]?.currencies?.[0]?.minAmount }}
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
            <Pressable onPress={() => handleSelectAccountPress('from')}>
              <Text label secondary numberOfLines={1} children={'newDeposit.selectAcc'} />
              <Text
                children={
                  typeof creditAccount?.balance === 'number'
                    ? formatMoney(creditAccount?.balance, selectedCurrency)
                    : 'newDeposit.from'
                }
                medium
              />
            </Pressable>
          </View>
          <TinyChevron />
          <View style={styles.account}>
            <Pressable onPress={() => handleSelectAccountPress('to')}>
              <View style={styles.alignEnd}>
                <Text label secondary numberOfLines={1} children={'newDeposit.selectAcc'} />
                <Text
                  children={
                    typeof debitAccount?.balance === 'number'
                      ? formatMoney(debitAccount.balance, selectedCurrency)
                      : 'newDeposit.to'
                  }
                  medium
                />
              </View>
            </Pressable>
            <View style={styles.cardIcon}>
              <SmallCC />
            </View>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button.Primary
            fullWidth
            text="common.next"
            onPress={handlePress}
            customWrapperStyle={[
              styles.button,
              !(creditAccount && debitAccount && amount) && styles.disabled,
            ]}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};
