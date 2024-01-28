import React, { useCallback, useRef } from 'react';
import {
  ListRenderItem,
  ScrollView,
  View,
  Pressable,
  FlatList,
  TextInput,
  Image,
} from 'react-native';
import { Button, Divider, LoadingView, Text } from 'components';
import Animated, {
  runOnJS,
  useSharedValue,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';
import { Colors } from 'theme/Variables';
import { ChevronDown } from 'assets/SVGs';
import { useTeraWallet } from './container';
import { formatMoney } from 'utils/formatMoney';
import { Item } from 'screens/NewDepositAdditionalInfoScreen/Item';
import { WalletAmount } from 'services/apis/productsAPI/productsAPI.types';
import { DataType } from './TeraWalletScreen.types';
import { useStyles } from './TeraWalletScreen.styles';

const ICON = require('assets/images/TeraWallet.png');

export const TeraWalletScreen = () => {
  const styles = useStyles();
  const scrollX = useSharedValue(0);
  const flatListRef = useRef<FlatList>(null);
  const scrollViewRef = useRef<ScrollView>(null);
  const {
    handleItemPress,
    amount,
    handleSelectDepositPress,
    setActiveIndex,
    onChangeText,
    onBlur,
    onFocus,
    amounts,
    ITEM_SIZE,
    selectedDeposit,
    selectedCurrency,
    teraWalletInfo,
    handleNextPress,
    selectedDepositInfo,
  } = useTeraWallet(flatListRef, scrollViewRef);

  const handleScroll = useAnimatedScrollHandler(event => {
    try {
      scrollX.value = event.contentOffset.x;
      runOnJS(setActiveIndex)(Math.round(event.contentOffset.x / ITEM_SIZE));
    } catch (error) {
      console.warn('Error in handleScroll on TeraWalletScreen', error);
    }
  });

  const renderItem: ListRenderItem<WalletAmount> = useCallback(
    ({ item, index }) => {
      return (
        <Item
          item={item.value}
          index={index}
          scrollX={scrollX}
          onPress={handleItemPress}
          currency={selectedCurrency}
        />
      );
    },
    [handleItemPress, scrollX, selectedCurrency],
  );

  const getItemLayout = useCallback(
    (_: DataType, index: number) => ({
      length: ITEM_SIZE,
      offset: ITEM_SIZE * index,
      index,
    }),
    [ITEM_SIZE],
  );

  if (!teraWalletInfo) {
    return <LoadingView />;
  }

  return (
    <ScrollView ref={scrollViewRef} style={styles.scrollView} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <Image source={ICON} style={styles.image} />
        </View>
        <Text children="teraWallet.collectMoney" center medium size={18} marginTop={24} />
        <Text children="teraWallet.desc" center secondary marginTop={16} />
        <Divider height={1} marginTop={32} marginBottom={32} />
        <Text children="teraWallet.selectAmount" secondary center />
      </View>
      <View style={styles.selectAmount}>
        <Animated.FlatList
          ref={flatListRef}
          horizontal
          bounces={false}
          data={amounts}
          onScroll={handleScroll}
          renderItem={renderItem}
          decelerationRate="fast"
          snapToInterval={ITEM_SIZE}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.selectAmountContentContainer}
          getItemLayout={getItemLayout}
        />
        <View style={styles.inputContainer}>
          <TextInput
            value={amount}
            onChangeText={onChangeText}
            maxLength={4}
            textAlign="center"
            keyboardType="decimal-pad"
            style={styles.input}
            onBlur={onBlur}
            onFocus={onFocus}
          />
        </View>
      </View>
      <Text children="teraWallet.selectDeposit" secondary center marginTop={60} />
      <Divider height={1} marginTop={16} />
      <View style={styles.selectDeposit}>
        <View style={styles.footerIconContainer} />
        <Pressable style={styles.selectDepositInner} onPress={handleSelectDepositPress}>
          <View>
            <Text
              children={selectedDeposit ? selectedDeposit.nameGeo : 'teraWallet.chooseDeposit'}
              label
              secondary
            />
            <Text children={formatMoney(selectedDepositInfo?.balance ?? 0, selectedCurrency)} />
          </View>
          <ChevronDown color={Colors.black700} />
        </Pressable>
      </View>
      <View style={styles.buttonContainer}>
        <Button.Primary
          fullWidth
          text="common.next"
          onPress={handleNextPress}
          customWrapperStyle={[styles.button, !selectedDeposit && styles.disbaled]}
        />
      </View>
    </ScrollView>
  );
};
