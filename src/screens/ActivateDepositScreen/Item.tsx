import React, { FC } from 'react';
import { Pressable, View } from 'react-native';
import { useStyles } from './ActivateDepositScreen.styles';
import { ChevronRight } from 'assets/SVGs';
import { Text } from 'components';
import { Colors } from 'theme/Variables';
import { ItemProps } from './ActivateDepositScreen.types';

export const Item: FC<ItemProps> = ({ item }) => {
  const styles = useStyles();
  return (
    <Pressable style={styles.item}>
      <View style={styles.icon} />
      <View style={styles.content}>
        <View style={{ flex: 1 }}>
          <Text children={item.title} size={16} />
          <Text
            color={Colors.textBlack500}
            children="newDeposit.initial"
            translateProp={{ value: item.initialAmount }}
          />
        </View>
        <ChevronRight />
      </View>
    </Pressable>
  );
};
