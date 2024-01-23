import React, { memo } from 'react';
import { Pressable, View } from 'react-native';

import { useStyles } from './ChoosePaymentsService.styles';
import { Text } from 'components/Text/Text';
import { PaymentItemProps } from './ChoosePaymentsService.types';

export const PaymentItem: React.FC<PaymentItemProps> = memo(({ item, isLast = false }) => {
  const styles = useStyles();

  return (
    <Pressable
      style={[styles.itemWrapper, !isLast && styles.itemWrapperMargin]}
      onPress={item.onPress}
    >
      <View style={styles.itemIconWrapper}>{item.icon}</View>
      <Text style={styles.itemTitle}>{item.title}</Text>
    </Pressable>
  );
});
