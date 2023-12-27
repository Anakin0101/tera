import React, { useRef } from 'react';
import { View, Pressable, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { Button, Text } from 'components';
import { formatMoney } from 'utils/formatMoney';
import { Colors, Spacing } from 'theme/Variables';
import { SmallCC, TinyChevron } from 'assets/SVGs';
import { CurrencySignMap } from 'utils/CurrencySignMap';
import { useNewDepositInitialAmount } from './container';
import { Currency } from 'services/apis/productsAPI/productsAPI.types';
import { useStyles } from './NewDepositInitialAmountScreen.styles';

const currencies: Currency[] = ['GEL', 'USD', 'EUR'];

export const NewDepositInitialAmountScreen = () => {
  const styles = useStyles();
  const ref = useRef<TextInput>(null);

  const {
    headerHeight,
    handleSelectAccountPress,
    total,
    totalDestAccount,
    fromAccount,
    toAccount,
    selectedCurrency,
    setSelectedCurrency,
    amount,
    setAmount,
    handlePress,
  } = useNewDepositInitialAmount(ref);

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
            marginTop={Platform.OS === 'ios' ? 5 : 2}
            children={CurrencySignMap[selectedCurrency]}
          />
        </View>
        <View style={styles.currencies}>
          {currencies.map(item => (
            <Pressable
              key={item}
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
            <Pressable onPress={() => handleSelectAccountPress('from')}>
              <Text label secondary numberOfLines={1} children={'newDeposit.selectAcc'} />
              <Text
                children={total ? formatMoney(total, selectedCurrency) : 'newDeposit.from'}
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
                    totalDestAccount
                      ? formatMoney(totalDestAccount, selectedCurrency)
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
              !(fromAccount && toAccount && amount) && styles.disabled,
            ]}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};
