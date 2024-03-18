import React, { FC } from 'react';
import { Pressable, View } from 'react-native';
import { useStyles } from './CardOrderChooseCardScreen.styles';
import { ChevronRight } from 'assets/SVGs';
import { Image, Text } from 'components';
import { useNavigation } from '@react-navigation/native';
import { ModalStackScreenProps } from 'navigation/types';
import { useAppDispatch } from 'store/hooks/useAppDispatch';
import { CARD_ORDER_CHOSEN_CARD_SCREEN } from 'navigation/ScreenNames';
import { Colors } from 'theme/Variables';
import { setSelectedCardData } from 'store/slices/products';
import { CardProduct } from 'services/apis/productsAPI/productsAPI.types';

export const Item: FC<{ item: CardProduct }> = ({ item }) => {
  const styles = useStyles();
  const { navigate } = useNavigation<ModalStackScreenProps<'CardOrderChosenCardScreen'>>();
  const dispatch = useAppDispatch();

  const onPress = () => {
    dispatch(setSelectedCardData(item));

    navigate(CARD_ORDER_CHOSEN_CARD_SCREEN);
  };

  return (
    <Pressable onPress={onPress} style={styles.item}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item?.cardImageUrl }} style={styles.image} />
      </View>
      <View style={styles.content}>
        <View style={styles.fill}>
          <Text children={item.cardKind} size={16} lineHeight={18} />
          <Text
            marginTop={4}
            children={`${item.cardProcessingConditions?.[0]?.title}: ${item.cardProcessingConditions?.[0]?.value}`}
            color={Colors.textBlack500}
            size={12}
            lineHeight={18}
            numberOfLines={2}
          />
        </View>
        <ChevronRight />
      </View>
    </Pressable>
  );
};
