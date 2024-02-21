import React, { memo, useCallback } from 'react';
import { Pressable, View, Animated } from 'react-native';
import { useTranslation } from 'react-i18next';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import { useStyles } from './CartItem.styles';
import { Text } from 'components/Text/Text';
import { CartIcon } from 'assets/SVGs';
import { SwipeButtonsActions } from './SwipeButtonsActions';
import { CartItemProps } from './CartItem.types';
import { useCartItem } from './container';

let row: Array<Swipeable | null> = [];
let prevOpenedRow: Swipeable | null;

export const CartItem: React.FC<CartItemProps> = memo(({ item, isLast = false, index }) => {
  const styles = useStyles();
  const { t } = useTranslation();

  const { openCartDetailsScreen, editOnPress, deleteBaskeetServiceOnPress } = useCartItem();

  /**
   * Closes the swipeable row at the specified index.
   * @param {number} index - The index of the swipeable row to close.
   */
  const closeRow = useCallback(() => {
    if (prevOpenedRow && prevOpenedRow !== row?.[index]) {
      prevOpenedRow?.close();
    }
    prevOpenedRow = row[index];
  }, [index]);

  const editCartOnPress = useCallback(() => {
    try {
      prevOpenedRow?.close();
      editOnPress(item);
    } catch (ex) {
      console.warn('Error in editCartOnPress', ex);
    }
  }, [editOnPress, item]);

  const deleteBasketOnPress = useCallback(() => {
    try {
      prevOpenedRow?.close();
      deleteBaskeetServiceOnPress(item);
    } catch (ex) {
      console.warn('Error in deleteBasketOnPress', ex);
    }
  }, [deleteBaskeetServiceOnPress, item]);

  /**
   * Renders the right swipe actions for a review item.
   */
  const renderRightActions = useCallback(
    (
      progress: Animated.AnimatedInterpolation<string | number>,
      dragX: Animated.AnimatedInterpolation<string | number>,
    ) => {
      const trans = dragX.interpolate({
        inputRange: [0, 50, 60, 61],
        outputRange: [-1, 0, 0, 1],
      });
      return (
        <SwipeButtonsActions
          trans={trans}
          disableButtons={false}
          deleteOnPress={deleteBasketOnPress}
          editOnPress={editCartOnPress}
        />
      );
    },
    [deleteBasketOnPress, editCartOnPress],
  );

  return (
    <Swipeable
      key={item.id}
      ref={ref => (row[index] = ref)}
      onSwipeableOpen={closeRow}
      renderRightActions={(progress, dragX) => renderRightActions(progress, dragX)}
      childrenContainerStyle={styles.swipeableWrapper}
    >
      <Pressable
        style={[!isLast && styles.itemWrapperMargin]}
        onPress={() => openCartDetailsScreen(item)}
      >
        <View style={styles.itemWrapper}>
          <View style={styles.itemIconWrapper}>
            <CartIcon strokeWidth={1.8} />
          </View>
          <View style={styles.contentWrapper}>
            <Text style={styles.itemTitle}>{item.name}</Text>
            <Text style={styles.itemDesc}>
              {item?.basketServices?.length} {t('cartListScreen.template')}
            </Text>
          </View>
        </View>
        <View style={styles.contentBorder} />
      </Pressable>
    </Swipeable>
  );
});
