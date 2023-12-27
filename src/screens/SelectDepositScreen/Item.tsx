import React, { FC } from 'react';
import { Pressable, View } from 'react-native';
import { useStyles } from './SelectDepositScreen.styles';
import { ChevronRight } from 'assets/SVGs';
import { Text } from 'components';
import { Colors } from 'theme/Variables';
import { ItemProps } from './SelectDepositScreen.types';
import { useNavigation } from '@react-navigation/native';
import { ProductsStackScreenProps } from 'navigation/types';

export const Item: FC<ItemProps> = ({ item }) => {
  const styles = useStyles();
  const { navigate } = useNavigation<ProductsStackScreenProps<'NewDepositDetailsScreen'>>();

  const onPress = () => {
    navigate('NewDepositDetailsScreen');
  };

  return (
    <Pressable onPress={onPress} style={styles.item}>
      <View style={styles.icon} />
      <View style={styles.content}>
        <View style={styles.fill}>
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
