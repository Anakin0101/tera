import React, { FC } from 'react';
import { View } from 'react-native';
import { Badge, Text } from 'components';
import { getExpirationDate } from 'utils/formatDate';
import { Colors } from 'theme/Variables';
import { Alert, CheckShieldSmall, Lock, MasterCard, TeraCardLogo, Visa } from 'assets/SVGs';
import { CardStatusCode } from 'services/apis/productsAPI/productsAPI.types';
import { CardSliderItemProps } from './CardDetailsScreen.types';
import { useStyles } from './CardDetailsScreen.styles';

export const CardSliderItem: FC<CardSliderItemProps> = ({ item }) => {
  const styles = useStyles();
  return (
    <View style={styles.cardItem}>
      <View style={styles.cardHeader}>
        <TeraCardLogo />
        <View style={styles.badgesContainer}>
          {item.status === CardStatusCode.Blocked && (
            <Badge
              height={25}
              icon={<Lock />}
              label="products.blocked"
              backgroundColor={Colors.white}
            />
          )}
          {item.status === CardStatusCode.Issued && (
            <Badge
              height={25}
              icon={<Alert />}
              label="products.expired"
              backgroundColor={Colors.white}
            />
          )}
          {item.status === CardStatusCode.TemporarilyInactive && (
            <Badge
              height={25}
              icon={<Alert color={Colors.warningSolid} />}
              label="products.tempInactive"
              textColor={Colors.warningSolid}
              backgroundColor={Colors.white}
            />
          )}
          {item.isInsured && (
            <View style={styles.insuredIcon}>
              <CheckShieldSmall />
            </View>
          )}
        </View>
      </View>
      <View>
        <Text children={item.cardProductName} color={Colors.white} />
        <View style={styles.cardFooter}>
          <View style={styles.cardInfo}>
            <Text color={Colors.white}>**** {item.pan.slice(-4)}</Text>
            <Text color={Colors.white}>{getExpirationDate(item.endDate)}</Text>
          </View>
          {item.cardProductName.toLowerCase().includes('visa') ? <Visa /> : <MasterCard />}
        </View>
      </View>
    </View>
  );
};
