import React, { FC } from 'react';
import { Image, Pressable, View } from 'react-native';
import { useStyles } from './SelectDepositScreen.styles';
import { ChevronRight } from 'assets/SVGs';
import { Text } from 'components';
import { ItemProps } from './SelectDepositScreen.types';
import { useNavigation } from '@react-navigation/native';
import { ProductsStackScreenProps } from 'navigation/types';
import { useAppDispatch } from 'store/hooks/useAppDispatch';
import { setDepositType } from 'store/slices/deposit';
import { NEW_DEPOSIT_DETAILS_SCREEN } from 'navigation/ScreenNames';

export const Item: FC<ItemProps> = ({ item }) => {
  const styles = useStyles();
  const { navigate } = useNavigation<ProductsStackScreenProps<'NewDepositDetailsScreen'>>();
  const dispatch = useAppDispatch();

  const onPress = () => {
    dispatch(
      setDepositType({
        depositType: item.title,
        imageUrl: item?.images?.[0]?.url,
      }),
    );

    navigate(NEW_DEPOSIT_DETAILS_SCREEN, { id: item.id });
  };

  return (
    <Pressable onPress={onPress} style={styles.item}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item?.images?.[0]?.url }} style={styles.image} />
      </View>
      <View style={styles.content}>
        <View style={styles.fill}>
          <Text children={item.title} size={16} />
        </View>
        <ChevronRight />
      </View>
    </Pressable>
  );
};
