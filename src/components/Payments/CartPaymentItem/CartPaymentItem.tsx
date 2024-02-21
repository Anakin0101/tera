import React, { memo } from 'react';
import { Pressable, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { useStyles } from './CartPaymentItem.styles';
import { Text } from 'components/Text/Text';
import { CartItemProps } from './CartPaymentItem.types';
import { CartIcon } from 'assets/SVGs';

export const CartPaymentItem: React.FC<CartItemProps> = memo(({ item, isLast = false }) => {
  const styles = useStyles();
  const { t } = useTranslation();

  return (
    <Pressable style={[!isLast && styles.itemWrapperMargin]} onPress={() => {}}>
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
  );
});
