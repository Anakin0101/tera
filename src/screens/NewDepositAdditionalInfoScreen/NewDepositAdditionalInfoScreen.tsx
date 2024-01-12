import React, { useCallback, useMemo, useRef } from 'react';
import {
  View,
  Image,
  FlatList,
  Pressable,
  TextInput,
  ScrollView,
  ListRenderItem,
  ActivityIndicator,
} from 'react-native';
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

export const NewDepositAdditionalInfoScreen = () => {
  const ref = useRef<FlatList>(null);
  const styles = useStyles();
  const scrollX = useSharedValue(0);
  const {
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
    ITEM_SIZE,
    offer,
    setProductId,
    productId,
    depositPeriod,
    interestRate,
    benefit,
    isLoadingBenefit,
    isLoadingRates,
    imageUrl,
    setProductName,
    minPeriod,
    maxPeriod,
  } = useNewDepositAdditionalInfo(ref);

  const handleScroll = useAnimatedScrollHandler(event => {
    try {
      scrollX.value = event.contentOffset.x;
      runOnJS(setDuration)(String(Math.round(event.contentOffset.x / ITEM_SIZE) + minPeriod));
    } catch (err) {
      console.warn('Error in handleScroll on NewDepositAdditionalInfoScreen', err);
    }
  });

  const renderItem: ListRenderItem<string> = useCallback(
    ({ item, index }) => {
      return <Item item={item} index={index} scrollX={scrollX} onPress={handleItemPress} />;
    },
    [handleItemPress, scrollX],
  );

  const isSingleOption = useMemo(() => {
    return offer?.depositProducts?.length === 1;
  }, [offer]);

  const getDepositProducts = () => {
    return offer?.depositProducts?.map(product => (
      <Pressable
        key={product.productId}
        onPress={() => {
          setProductId(product.productId);
          setProductName(product.name);
        }}
        style={[styles.period, productId === product.productId && styles.selected]}
      >
        <Text children={product.name.ka} special={productId === product.productId} />
      </Pressable>
    ));
  };

  return (
    <ScrollView bounces={false} style={styles.wrapper} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Image source={{ uri: imageUrl }} style={styles.image} />
        </View>
        <View>
          <Text children={depositType} medium size={16} />
          <Text children={formatMoney(initialAmount, currency)} size={18} />
        </View>
      </View>
      <View style={[styles.main, isSingleOption && styles.fullHeight]}>
        {isSingleOption ? (
          <>
            <Text children="newDeposit.completionDate" secondary center />
            <Text children="newDeposit.lifetime" special center />
          </>
        ) : (
          <>
            <View>
              <Text children="newDeposit.depositDuration" secondary center />
              <View style={styles.duration}>
                <Animated.FlatList
                  ref={ref}
                  horizontal
                  bounces={false}
                  data={depositPeriod}
                  onScroll={handleScroll}
                  renderItem={renderItem}
                  decelerationRate="fast"
                  snapToInterval={ITEM_SIZE}
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.durationContentContainer}
                  getItemLayout={(_, index) => ({
                    length: ITEM_SIZE,
                    offset: ITEM_SIZE * index,
                    index,
                  })}
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
                {debouncedValue &&
                  Number(debouncedValue) >= minPeriod &&
                  Number(debouncedValue) <= maxPeriod && (
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
              {getDepositProducts()}
            </ScrollView>
          </>
        )}
        <View style={styles.table}>
          <View style={styles.tableItem}>
            <Text children="deposits.interestRate" secondary />
            {isLoadingRates ? (
              <ActivityIndicator />
            ) : (
              <>
                <Text children="0.00%" style={styles.regularRate} label secondary />
                <Text
                  children={interestRate ? `${interestRate.effectivePercent}%` : '0.00%'}
                  style={styles.specialRate}
                />
              </>
            )}
          </View>
          <Divider height={1} marginTop={18} marginBottom={18} />
          <View style={styles.tableItem}>
            <Text children="newDeposit.effectiveInterestRate" secondary />
            {isLoadingRates ? (
              <ActivityIndicator />
            ) : (
              <Text children={interestRate ? `${interestRate.percent}%` : '0.00%'} />
            )}
          </View>
          <Divider height={1} marginTop={18} marginBottom={18} />
          <View style={styles.tableItem}>
            <Text children="newDeposit.benefit" secondary />
            {isLoadingBenefit ? (
              <ActivityIndicator />
            ) : (
              <Text children={benefit ? formatMoney(benefit, currency) : '0.00'} special />
            )}
          </View>
        </View>
        <View style={[styles.buttonContainer, isSingleOption && styles.buttonMargin]}>
          <Button.Primary
            fullWidth
            text="common.next"
            onPress={handleNextPress}
            customWrapperStyle={[styles.button, !productId && styles.disabled]}
          />
        </View>
      </View>
    </ScrollView>
  );
};
