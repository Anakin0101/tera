import React, { FC } from 'react';
import { Pressable, View } from 'react-native';
import { useStyles } from './CardOrderTypeScreen.styles';
import { ChevronRight } from 'assets/SVGs';
import { Image, Text } from 'components';
import { PlasticCardDetails } from './CardOrderTypeScreen.types';
import { useNavigation } from '@react-navigation/native';
import { ProductsStackScreenProps } from 'navigation/types';
import { CARD_ORDER_CHOOSE_CARD_SCREEN } from 'navigation/ScreenNames';
import { Colors } from 'theme/Variables';

export const Item: FC<{ item: PlasticCardDetails }> = ({ item }) => {
  const styles = useStyles();
  const { navigate } = useNavigation<ProductsStackScreenProps<'NewDepositDetailsScreen'>>();

  const onPress = () => {
    navigate(CARD_ORDER_CHOOSE_CARD_SCREEN);
  };

  return (
    <Pressable onPress={onPress} style={styles.item}>
      <View style={styles.imageContainer}>
        <Image source={item.image} style={styles.image} />
      </View>
      <View style={styles.content}>
        <View style={styles.fill}>
          <Text children={item.title} size={16} />
          <Text marginTop={4} children={item.subtitle} color={Colors.textBlack500} />
        </View>
        <ChevronRight />
      </View>
    </Pressable>
  );
};
