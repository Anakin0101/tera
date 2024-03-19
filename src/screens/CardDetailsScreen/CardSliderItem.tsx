import React, { FC } from 'react';
import { ImageBackground, View } from 'react-native';
import { Badge, Text } from 'components';
import { getExpirationDate, isExpired } from 'utils/formatDate';
import { Colors } from 'theme/Variables';
import { Alert, CheckShieldSmall, Lock } from 'assets/SVGs';
import { CardStatusCode } from 'services/apis/productsAPI/productsAPI.types';
import { CardSliderItemProps } from './CardDetailsScreen.types';
import { useStyles } from './CardDetailsScreen.styles';
import { PUBLIC_IMAGE_URL } from 'services/api';
import { maskCardPanShort } from 'utils/maskCardPan';

export const CardSliderItem: FC<CardSliderItemProps> = ({ item }) => {
  const styles = useStyles();

  if (!item) {
    return <View />;
  }

  return (
    <ImageBackground
      source={{ uri: `${PUBLIC_IMAGE_URL}${item?.cardLargeImageId}` }}
      resizeMode="contain"
    >
      <View style={styles.card}>
        <View style={styles.cardInner}>
          <View style={styles.badgesContainer}>
            {(item?.status === CardStatusCode.Blocked ||
              item?.status === CardStatusCode.TemporarilyInactive) && (
              <Badge
                height={25}
                icon={<Lock />}
                label="products.blocked"
                backgroundColor={Colors.white}
              />
            )}
            {isExpired(item?.endDate) && (
              <Badge
                height={25}
                icon={<Alert />}
                label="products.expired"
                backgroundColor={Colors.white}
              />
            )}
            {item?.isInsured && (
              <View style={styles.insuredIcon}>
                <CheckShieldSmall />
              </View>
            )}
          </View>
          <View>
            <Text children={item?.cardProductName} size={16} color={Colors.white} />
            <View style={styles.cardInfo}>
              <Text children={maskCardPanShort(item?.pan)} color={Colors.white} />
              {item.endDate && <Text color={Colors.white}>{getExpirationDate(item?.endDate)}</Text>}
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};
