import React from 'react';
import { View } from 'react-native';
import { Text } from 'components';
import { useStyles } from './TariffProducts.styles';
import { TariffProductsProps } from './TariffProducts.types';

export const TariffProductsLayout: React.FC<TariffProductsProps> = ({
  title,
  priceTitle,
  price,
  status,
  icon,
}) => {
  const styles = useStyles();
  return (
    <View style={styles.cardWrapper}>
      <View style={styles.titleWrapper}>
        <Text numberOfLines={3} style={styles.title}>
          {title}
        </Text>
        <View style={styles.row}>
          <Text style={styles.priceTitle}>{priceTitle}</Text>
          <Text style={styles.price}>{price}</Text>
        </View>
      </View>
      {status?.length ? (
        <View style={styles.statusWrapper}>
          <Text style={styles.status}>{status}</Text>
          <View>{icon}</View>
        </View>
      ) : null}
    </View>
  );
};
