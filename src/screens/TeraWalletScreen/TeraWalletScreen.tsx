import React, { useCallback, FC, useRef } from 'react';
import { ListRenderItem, ScrollView, View, Pressable, FlatList, TextInput } from 'react-native';
import { useStyles } from './TeraWalletScreen.styles';
import { Button, Divider, Text } from 'components';
import Animated, {
  interpolate,
  Extrapolation,
  interpolateColor,
  useAnimatedStyle,
  SharedValue,
  //   runOnJS,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import { Colors } from 'theme/Variables';
import { useTeraWallet } from './container';
import { formatMoney } from 'utils/formatMoney';
import { ChevronDown } from 'assets/SVGs';

const ITEM_SIZE = 86;

const arr = [0.25, 0.5, 1, 2, 3, 4];

const arrayRange = (start: number, stop: number, step: number) => {
  return Array.from({ length: (stop - start) / step + 1 }, (_, index) => start + index * step);
};

const data = [...arr, ...arrayRange(5, 100, 5)];

export interface ItemProps {
  item: number;
  index: number;
  scrollX: SharedValue<number>;
  onPress: (index: number) => void;
}

export const Item: FC<ItemProps> = ({ item, index, scrollX, onPress }) => {
  const styles = useStyles();

  const animStyle = useAnimatedStyle(() => {
    const inputRange = [(index - 1) * ITEM_SIZE, index * ITEM_SIZE, (index + 1) * ITEM_SIZE];

    const scale = interpolate(
      scrollX.value,
      [
        (index - 2) * ITEM_SIZE,
        (index - 1) * ITEM_SIZE,
        index * ITEM_SIZE,
        (index + 1) * ITEM_SIZE,
        (index + 2) * ITEM_SIZE,
      ],
      [0.7, 0.8, 1, 0.8, 0.7],
    );

    const borderColor = interpolateColor(scrollX.value, inputRange, [
      Colors.secondary,
      Colors.primary,
      Colors.secondary,
    ]);

    const borderWidth = interpolate(scrollX.value, inputRange, [1, 2, 1], Extrapolation.CLAMP);

    const backgroundColor = interpolateColor(scrollX.value, inputRange, [
      'transparent',
      Colors.secondary,
      'transparent',
    ]);

    return {
      transform: [{ scale }],
      borderColor,
      borderWidth,
      backgroundColor,
    };
  });

  const textAnimStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      scrollX.value,
      [
        (index - 2) * ITEM_SIZE,
        (index - 1) * ITEM_SIZE,
        index * ITEM_SIZE,
        (index + 1) * ITEM_SIZE,
        (index + 2) * ITEM_SIZE,
      ],
      [Colors.textBlack500, Colors.black700, Colors.primary, Colors.black700, Colors.textBlack500],
    );

    return {
      color,
    };
  });

  return (
    <Pressable onPress={() => onPress(index)}>
      <Animated.View style={styles.itemWrapper}>
        <Animated.View style={[styles.itemContainer, animStyle]}>
          <Animated.Text style={[styles.itemText, textAnimStyle]}>{item}</Animated.Text>
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
};

export const TeraWalletScreen = () => {
  const styles = useStyles();
  const scrollX = useSharedValue(0);
  const ref = useRef<FlatList>(null);
  const { handleItemPress, duration, setDuration, handleSelectDepositPress } = useTeraWallet(ref);

  const handleScroll = useAnimatedScrollHandler(event => {
    scrollX.value = event.contentOffset.x;
    // runOnJS(setDuration)(String(Math.round(event.contentOffset.x / ITEM_SIZE) + 3));
  });

  const renderItem: ListRenderItem<number> = useCallback(
    ({ item, index }) => {
      return <Item item={item} index={index} scrollX={scrollX} onPress={handleItemPress} />;
    },
    [handleItemPress, scrollX],
  );

  return (
    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
      <View style={{ marginHorizontal: 24 }}>
        <View style={styles.iconContainer} />
        <Text children="teraWallet.collectMoney" center medium size={18} marginTop={24} />
        <Text children="teraWallet.desc" center secondary marginTop={16} />
        <Divider height={1} marginTop={32} marginBottom={32} />
        <Text children="teraWallet.selectAmount" secondary center />
      </View>
      <View style={styles.selectAmount}>
        <Animated.FlatList
          ref={ref}
          horizontal
          bounces={false}
          data={data}
          onScroll={handleScroll}
          renderItem={renderItem}
          decelerationRate="fast"
          snapToInterval={ITEM_SIZE}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.selectAmountContentContainer}
        />
        <View style={styles.inputContainer}>
          <TextInput
            value={duration}
            onChangeText={setDuration}
            maxLength={2}
            textAlign="center"
            keyboardType="numeric"
            style={styles.input}
          />
        </View>
      </View>
      <Text children="teraWallet.selectDeposit" secondary center marginTop={60} />
      <Divider height={1} marginTop={22} />
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
