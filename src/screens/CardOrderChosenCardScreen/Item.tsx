import React, { FC } from 'react';
import { View } from 'react-native';
import { useStyles } from './CardOrderChosenCardScreen.styles';
import { Image, Text } from 'components';
import { Colors } from 'theme/Variables';
import { CardProduct } from 'services/apis/productsAPI/productsAPI.types';

export const Item: FC<{ item: CardProduct }> = ({ item }) => {
  const styles = useStyles();

  return (
    <View style={styles.item}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item?.cardImageUrl }} style={styles.image} />
      </View>
      <View style={styles.content}>
        <View style={styles.fill}>
          <Text children={item.name} size={14} lineHeight={20} />

          <Text
            marginTop={3}
            color={Colors.textBlack500}
            size={12}
            lineHeight={20}
            numberOfLines={2}
          >
            {`${item.productServiceConditions?.[1]?.title}: `}
            <Text special size={12} lineHeight={16}>
              {item.productServiceConditions?.[0]?.value}
            </Text>
          </Text>
          <Text
            marginTop={3}
            children={`${item.cardProcessingConditions?.[0]?.title}: ${item.cardProcessingConditions?.[0]?.value}`}
            color={Colors.textBlack500}
            size={12}
            lineHeight={20}
            numberOfLines={2}
          />
        </View>
      </View>
    </View>
  );
};
