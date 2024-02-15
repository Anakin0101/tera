import React, { useCallback, useRef } from 'react';
import { FlatList, Pressable, TextInput, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Animated, {
  runOnJS,
  useSharedValue,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';
import { useLoanAmount } from './container';
import { Colors } from 'theme/Variables';
import { ChevronDown } from 'assets/SVGs';
import { formatMoney } from 'utils/formatMoney';
import { CurrencySignMap } from 'utils/CurrencySignMap';
import { Button, Divider, LoadingView, Text } from 'components';
import { Item } from 'screens/NewDepositAdditionalInfoScreen/Item';
import { CurrenciesProps, RenderItemT } from './LoanAmountScreen.types';
import { useStyles } from './LoanAmountScreen.styles';

const Currencies = ({ currencies, selectedCurrency, setSelectedCurrency }: CurrenciesProps) => {
  const styles = useStyles();

  return (
    <View style={styles.currencies}>
      {currencies?.map(item => (
        <Pressable
          key={item}
          onPress={() => setSelectedCurrency(item)}
          style={[styles.currencyContainer, selectedCurrency === item && styles.selected]}
        >
          <Text secondary children={CurrencySignMap[item]} special={selectedCurrency === item} />
        </Pressable>
      ))}
    </View>
  );
};

export const LoanAmountScreen = () => {
  const styles = useStyles();
  const inputRef = useRef<TextInput>(null);
  const flatlistRef = useRef<FlatList>(null);
  const scrollX = useSharedValue(0);

  const {
    onBlur,
    onChangeText,
    getItemLayout,
    handleItemPress,
    duration,
    amount,
    setAmount,
    selectedCurrency,
    loanPeriod,
    CIRCULAR_ITEM_SIZE,
    setActiveIndex,
    isLoanConfigLoading,
    selectedProduct,
    minAmount,
    maxAmount,
    handleSelectProduct,
    handleNextPress,
    handleCurrencyPress,
    currencies,
  } = useLoanAmount(flatlistRef);

  const handleScroll = useAnimatedScrollHandler(event => {
    try {
      scrollX.value = event.contentOffset.x;
      runOnJS(setActiveIndex)(Math.round(event.contentOffset.x / CIRCULAR_ITEM_SIZE));
    } catch (err) {
      console.warn('Error in handleScroll on LoanAmountScreen', err);
    }
  });

  const renderItem: RenderItemT = useCallback(
    ({ item, index }) => {
      return <Item item={item} index={index} scrollX={scrollX} onPress={handleItemPress} />;
    },
    [handleItemPress, scrollX],
  );

  if (isLoanConfigLoading || !selectedProduct) {
    return <LoadingView />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Pressable onPress={handleSelectProduct} style={styles.headerInner}>
          <View>
            <Text children="loanRequest.selectProduct" secondary />
            <Text children={selectedProduct?.displayName} size={16} />
          </View>
          <ChevronDown color={Colors.black700} />
        </Pressable>
        <Divider height={1} marginTop={8} />
      </View>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
      >
        <View style={styles.amountContainer}>
          <Text children="loanRequest.amountOfMoney" secondary />
          <View style={styles.textInputContainer}>
            <TextInput
              ref={inputRef}
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
              maxFontSizeMultiplier={1}
            />
            <Text
              label
              size={40}
              lineHeight={40}
              style={styles.currency}
              children={CurrencySignMap[selectedCurrency]}
            />
          </View>
          <Currencies
            currencies={currencies}
            selectedCurrency={selectedCurrency}
            setSelectedCurrency={handleCurrencyPress}
          />
        </View>
        <View style={styles.minMaxContainer}>
          <View style={styles.minimum}>
            <Text
              children="loanRequest.min"
              translateProp={{ value: formatMoney(minAmount) }}
              label
            />
          </View>
          {!!maxAmount && (
            <View style={styles.minimum}>
              <Text
                children="loanRequest.max"
                translateProp={{ value: formatMoney(maxAmount) }}
                label
              />
            </View>
          )}
        </View>
        <View style={styles.loadDuration}>
          <Text children="loanRequest.termOfLoan" center secondary />
          <Animated.FlatList
            ref={flatlistRef}
            horizontal
            bounces={false}
            data={loanPeriod}
            onScroll={handleScroll}
            renderItem={renderItem}
            decelerationRate="fast"
            snapToInterval={CIRCULAR_ITEM_SIZE}
            getItemLayout={getItemLayout}
            showsHorizontalScrollIndicator={false}
            style={styles.list}
            contentContainerStyle={styles.durationContentContainer}
          />
          <View style={styles.inputContainer}>
            <TextInput
              maxLength={3}
              onBlur={onBlur}
              value={duration}
              onChangeText={onChangeText}
              textAlign="center"
              keyboardType="number-pad"
              style={styles.periodInput}
              maxFontSizeMultiplier={1}
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button.Primary
            fullWidth
            text="common.next"
            onPress={handleNextPress}
            customWrapperStyle={[styles.button, !amount && styles.disabled]}
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};
