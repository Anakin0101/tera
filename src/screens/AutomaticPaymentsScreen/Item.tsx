import React, { FC, memo } from 'react';
import { Pressable, View } from 'react-native';
import { Divider, IconComponent, Text } from 'components';
import { formatMoney } from 'utils/formatMoney';
import { ItemProps } from './AutomaticPaymentsScreen.types';
import { useStyles } from './AutomaticPaymentsScreen.styles';
import { CurrencyEnum } from 'services/apis/transfersAPI/transfersAPI.types';

export const Item: FC<ItemProps> = memo(({ item, onPress }) => {
  const styles = useStyles();

  return (
    <Pressable onPress={onPress}>
      <View style={styles.itemContainer}>
        <IconComponent imageId={item?.largeImageId} customImageIDStyle={styles.icon} />
        <View style={styles.info}>
          <View style={styles.itemRow}>
            <Text medium children={item?.name} />
            <Text
              medium
              children={formatMoney(item?.fixedAmount || item?.maxAmount, CurrencyEnum.GEL)}
            />
          </View>
          <View style={styles.itemRow}>
            <Text label secondary children={item?.customerNumber} />
          </View>
        </View>
      </View>
      <Divider height={1} marginTop={8} marginBottom={8} marginLeft={60} />
    </Pressable>
  );
});
