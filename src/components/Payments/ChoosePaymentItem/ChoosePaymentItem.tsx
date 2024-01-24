import React, { memo } from 'react';
import { Pressable, View } from 'react-native';

import { useStyles } from './ChoosePaymentItem.styles';
import { Text } from 'components/Text/Text';
import { ChoosePaymentItemProps } from './ChoosePaymentItem.types';

export const ChoosePaymentItem: React.FC<ChoosePaymentItemProps> = memo(({ title = '', icon = <>

    </>, onPress = () => {}, isLast = false }) => {
  const styles = useStyles();

  return (
    <Pressable style={[!isLast && styles.itemWrapperMargin]} onPress={onPress}>
      <View style={styles.itemWrapper}>
        <View style={styles.itemIconWrapper}>{icon}</View>
        <View style={styles.contentWrapper}>
          <Text style={styles.itemTitle}>{title}</Text>
        </View>
      </View>
      {!isLast && <View style={styles.contentBorder} />}
    </Pressable>
  );
});
