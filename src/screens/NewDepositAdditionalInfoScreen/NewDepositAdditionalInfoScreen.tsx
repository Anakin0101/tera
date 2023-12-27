import React, { useCallback, useRef } from 'react';
import { FlatList, ListRenderItem, Pressable, ScrollView, TextInput, View } from 'react-native';
import Animated, {
  runOnJS,
  useSharedValue,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';
import { Item } from './Item';
import { formatMoney } from 'utils/formatMoney';
import { Button, Divider, Text } from 'components';
import { useNewDepositAdditionalInfo } from './container';
import { formatDateFullMonth, getDateMonthsLater } from 'utils/formatDate';
import { useStyles } from './NewDepositAdditionalInfoScreen.styles';

const ITEM_SIZE = 86;
const numbersArray = Array.from({ length: 22 }, (_, index) => index + 3);
const withdrawPeriod = ['ვადის ბოლოს', 'წინასწარ', 'ყოველთვე'];

export const NewDepositAdditionalInfoScreen = () => {
  const ref = useRef<FlatList>(null);
  const styles = useStyles();
  const scrollX = useSharedValue(0);
  const {
    withdraw,
    setWithdraw,
    duration,
    setDuration,
    debouncedValue,
    handleItemPress,
    handleNextPress,
    onChangeText,
    onBlur,
    depositType,
    initialAmount,
    currency,
  } = useNewDepositAdditionalInfo(ref);

  const handleScroll = useAnimatedScrollHandler(event => {
    scrollX.value = event.contentOffset.x;
    runOnJS(setDuration)(String(Math.round(event.contentOffset.x / ITEM_SIZE) + 3));
  });

  const renderItem: ListRenderItem<number> = useCallback(
    ({ item, index }) => {
      return <Item item={item} index={index} scrollX={scrollX} onPress={handleItemPress} />;
    },
    [handleItemPress, scrollX],
  );

  return (
    <ScrollView bounces={false} style={styles.wrapper} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={styles.iconContainer} />
        <View>
          <Text children={depositType} medium size={16} />
          <Text children={formatMoney(initialAmount, currency)} size={18} />
        </View>
      </View>
      <View style={styles.main}>
        <View>
          {/* <Text children="დასრულების თარიღი" secondary center />
          <Text children="უვადო" special center /> */}
          <Text children="newDeposit.depositDuration" secondary center />
          <View style={styles.duration}>
            <Animated.FlatList
              ref={ref}
              horizontal
              bounces={false}
              data={numbersArray}
              onScroll={handleScroll}
              renderItem={renderItem}
              decelerationRate="fast"
              snapToInterval={ITEM_SIZE}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.durationContentContainer}
            />
            <View style={styles.inputContainer}>
              <TextInput
                value={duration}
                onChangeText={onChangeText}
                maxLength={2}
                textAlign="center"
                keyboardType="number-pad"
                style={styles.input}
                onBlur={onBlur}
              />
            </View>
            <Text children="newDeposit.completionDate" secondary center marginTop={24} />
            {debouncedValue && Number(debouncedValue) > 2 && Number(debouncedValue) < 25 && (
              <Text
                children={formatDateFullMonth(
                  getDateMonthsLater(Number(debouncedValue)),
                  'DD-MM-YYYY',
                )}
                secondary
                center
              />
            )}
          </View>
        </View>
        <Text children="newDeposit.withdrawBenefits" secondary marginTop={35} center />
        <ScrollView
          horizontal
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}
          showsHorizontalScrollIndicator={false}
        >
          {withdrawPeriod.map(period => (
            <Pressable
              key={period}
              onPress={() => setWithdraw(period)}
              style={[styles.period, withdraw === period && styles.selected]}
            >
              <Text children={period} special={withdraw === period} />
            </Pressable>
          ))}
        </ScrollView>
        <View style={styles.table}>
          <View style={styles.tableItem}>
            <Text children="deposits.interestRate" secondary />
            <Text children="11.00%" style={styles.regularRate} label secondary />
            <Text children="12.01%" style={styles.specialRate} />
          </View>
          <Divider height={1} marginTop={18} marginBottom={18} />
          <View style={styles.tableItem}>
            <Text children="newDeposit.effectiveInterestRate" secondary />
            <Text children="12.01%" />
          </View>
          <Divider height={1} marginTop={18} marginBottom={18} />
          <View style={styles.tableItem}>
            <Text children="newDeposit.benefit" secondary />
            <Text children={formatMoney(100, 'GEL')} special />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button.Primary
            fullWidth
            text="common.next"
            onPress={handleNextPress}
            customWrapperStyle={[styles.button, !withdraw && styles.disabled]}
          />
        </View>
      </View>
    </ScrollView>
  );
};
