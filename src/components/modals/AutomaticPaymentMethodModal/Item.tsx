import React, { FC } from 'react';
import { Pressable, View } from 'react-native';
import { Divider, Text } from 'components';
import { CheckCircle } from 'assets/SVGs';
import { useStyles } from './AutomaticPaymentMethodModal.styles';
import { ItemProps } from './AutomaticPaymentMethodModal.types';

export const Item: FC<ItemProps> = ({ item, onPress, isSelected }) => {
  const styles = useStyles();

  return (
    <Pressable onPress={onPress}>
      <Divider height={1} />
      <View style={styles.item}>
        <Text
          numberOfLines={1}
          secondary={!isSelected}
          children={item?.name}
          style={styles.title}
        />
        {isSelected && <CheckCircle height={24} width={24} />}
      </View>
    </Pressable>
  );
};
