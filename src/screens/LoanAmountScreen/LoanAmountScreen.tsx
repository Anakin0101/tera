import React, { useCallback, useRef } from 'react';
import { FlatList, Pressable, TextInput, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Animated, {
  runOnJS,
  useSharedValue,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';
import { Button, Divider, Text } from 'components';
import { useLoanAmount } from './container';
import { Item } from 'screens/NewDepositAdditionalInfoScreen/Item';
import { Colors } from 'theme/Variables';
import { ChevronDown } from 'assets/SVGs';
import { CurrencySignMap } from 'utils/CurrencySignMap';
import { RenderItemT } from './LoanAmountScreen.types';
import { useStyles } from './LoanAmountScreen.styles';
import { formatMoney } from 'utils/formatMoney';

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
    setSelectedCurrency,
    loanPeriod,
    ITEM_SIZE,
    currencies,
    setActiveIndex,
  } = useLoanAmount(flatlistRef);

  const getCurrencies = useCallback(() => {
    return currencies?.map(item => (
      <Pressable
        key={item}
        onPress={() => setSelectedCurrency(item)}
        style={[styles.currencyContainer, selectedCurrency === item && styles.selected]}
      >
        <Text secondary children={CurrencySignMap[item]} special={selectedCurrency === item} />
      </Pressable>
    ));
  }, [
    currencies,
    selectedCurrency,
    setSelectedCurrency,
    styles.currencyContainer,
    styles.selected,
  ]);

  const handleScroll = useAnimatedScrollHandler(event => {
    try {
      scrollX.value = event.contentOffset.x;
      runOnJS(setActiveIndex)(Math.round(event.contentOffset.x / ITEM_SIZE));
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

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerInner}>
          <View>
            <Text children="აირჩიე პროდუქტი" secondary />
            <Text children="ოვერდრაფტი" size={16} />
          </View>
          <ChevronDown color={Colors.black700} />
        </View>
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
        </View>
        <View style={styles.minMaxContainer}>
          <View style={styles.minimum}>
            <Text
              children="loanRequest.min"
              translateProp={{ value: formatMoney(1000, 'GEL') }}
              label
            />
          </View>
          <View style={styles.minimum}>
            <Text
              children="loanRequest.max"
              translateProp={{ value: formatMoney(5000, 'GEL') }}
              label
            />
          </View>
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
            snapToInterval={ITEM_SIZE}
            getItemLayout={getItemLayout}
            showsHorizontalScrollIndicator={false}
            style={styles.list}
            contentContainerStyle={styles.durationContentContainer}
          />
          <View style={styles.inputContainer}>
            <TextInput
              maxLength={2}
              onBlur={onBlur}
              value={duration}
              onChangeText={onChangeText}
              textAlign="center"
              keyboardType="number-pad"
              style={styles.periodInput}
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button.Primary
            fullWidth
            text="common.next"
            onPress={() => {}}
            customWrapperStyle={[styles.button]}
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};
