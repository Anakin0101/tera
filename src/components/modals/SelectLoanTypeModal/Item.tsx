import React, { FC } from 'react';
import { Pressable, View } from 'react-native';
import { Divider, Text } from 'components';
import { CheckCircle } from 'assets/SVGs';
import { useStyles } from './SelectLoanTypeModal.styles';
import { ItemProps } from './SelectLoanTypeModal.types';

export const Item: FC<ItemProps> = ({ item, product, setProduct }) => {
  const styles = useStyles();

  const handlePress = () => {
    setProduct(item);
  };

  return (
    <Pressable onPress={handlePress}>
      <Divider height={1} />
      <View style={styles.item}>
        <Text
          numberOfLines={1}
          secondary={product?.productsGroupId !== item.productsGroupId}
          children={item?.displayName}
          style={styles.title}
        />
        {product?.productsGroupId === item.productsGroupId && (
          <CheckCircle height={24} width={24} />
        )}
      </View>
    </Pressable>
  );
};
