import React, { memo } from 'react';
import { Alert, Pressable, View } from 'react-native';

import { useStyles } from './Carts.styles';
import { Text } from 'components/Text/Text';
import { CartItemProps } from './Carts.types';
import { CartIcon } from 'assets/SVGs';

export const CartItem: React.FC<CartItemProps> = memo(({ item, isLast = false }) => {
  const styles = useStyles();

  return (
    <Pressable style={[!isLast && styles.itemWrapperMargin]} onPress={() => Alert.alert(item.id)}>
      <View style={styles.itemWrapper}>
        <View style={styles.itemIconWrapper}>
          <CartIcon />
        </View>
        <View style={styles.contentWrapper}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text style={styles.itemDesc}>{item.desc}</Text>
        </View>
      </View>
      <View style={styles.contentBorder} />
    </Pressable>
  );
});
