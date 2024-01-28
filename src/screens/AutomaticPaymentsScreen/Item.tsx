import React, { FC, memo } from 'react';
import { Pressable, View } from 'react-native';
import { Divider, Text } from 'components';
import { formatMoney } from 'utils/formatMoney';
import { useStyles } from './AutomaticPaymentsScreen.styles';
import { ItemProps } from './AutomaticPaymentsScreen.types';

export const Item: FC<ItemProps> = memo(({ item, onPress }) => {
  const styles = useStyles();

  return (
    <Pressable onPress={onPress}>
      <View style={styles.itemContainer}>
        <View style={styles.itemIconContainer} />
        <View style={styles.info}>
          <View style={styles.itemRow}>
            <Text medium children={item.title} />
            <Text medium children={formatMoney(item.amount, 'GEL')} />
          </View>
          <View style={styles.itemRow}>
            <Text label secondary children={item.user} />
            <Text label secondary children={item.number} />
          </View>
        </View>
      </View>
      <Divider height={1} marginTop={8} marginBottom={8} marginLeft={60} />
    </Pressable>
  );
});
