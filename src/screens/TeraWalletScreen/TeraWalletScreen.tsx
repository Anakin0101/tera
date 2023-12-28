import React, { useCallback, useRef } from 'react';
import { ListRenderItem, ScrollView, View, Pressable, FlatList, TextInput } from 'react-native';
import { Button, Divider, Text } from 'components';
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
import { useStyles } from './TeraWalletScreen.styles';

export const TeraWalletScreen = () => {
  const styles = useStyles();
  const scrollX = useSharedValue(0);
  const flatListRef = useRef<FlatList>(null);
  const scrollViewRef = useRef<ScrollView>(null);
  const {
    handleItemPress,
    duration,
    handleSelectDepositPress,
    setActiveIndex,
    onChangeText,
    onBlur,
    onFocus,
    amounts,
    ITEM_SIZE,
  } = useTeraWallet(flatListRef, scrollViewRef);

  const handleScroll = useAnimatedScrollHandler(event => {
    scrollX.value = event.contentOffset.x;
    runOnJS(setActiveIndex)(Math.round(event.contentOffset.x / ITEM_SIZE));
  });

  const renderItem: ListRenderItem<number> = useCallback(
    ({ item, index }) => {
      return (
        <Item
          item={item}
          index={index}
          scrollX={scrollX}
          onPress={handleItemPress}
          currency="GEL"
        />
      );
    },
    [handleItemPress, scrollX],
  );

  return (
    <ScrollView ref={scrollViewRef} style={styles.scrollView} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <View style={styles.iconContainer} />
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
          getItemLayout={(_, index) => ({ length: ITEM_SIZE, offset: ITEM_SIZE * index, index })}
        />
        <View style={styles.inputContainer}>
          <TextInput
            value={duration}
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
            <Text children="შემნახველი ანაბარი" label secondary />
            <Text children={formatMoney(48200, 'GEL')} />
          </View>
          <ChevronDown color={Colors.black700} />
        </Pressable>
      </View>
      <View style={styles.buttonContainer}>
        <Button.Primary text="common.next" fullWidth customWrapperStyle={styles.button} />
      </View>
    </ScrollView>
  );
};
