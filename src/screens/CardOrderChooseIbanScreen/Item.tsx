import React, { FC } from 'react';
import { View } from 'react-native';
import { useStyles } from './CardOrderChooseIbanScreen.styles';
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
            children={'products.universalAccount'}
            marginTop={3}
            color={Colors.textBlack500}
            size={12}
            lineHeight={16}
          />
        </View>
      </View>
    </View>
  );
};
