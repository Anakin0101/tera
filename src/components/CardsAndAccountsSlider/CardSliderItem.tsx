import { Alert, CheckShieldSmall, Lock, MasterCard, TeraCardLogo, Visa } from 'assets/SVGs';
import { Text } from '../index';
import React, { FC } from 'react';
import { View } from 'react-native';

import { getExpirationDate } from 'utils/formatDate';
import { Colors } from 'theme/Variables';
import { CardSliderItemProps } from './CardsAndAccountsSlider.types';
import { useStyles } from './CardsAndAccountsSlider.styles';
import { CardStatusCode } from 'services/apis/productsAPI/productsAPI.types';
import { CardStatusBadge } from './CardStatusBadge';

export const CardSliderItem: FC<CardSliderItemProps> = ({ item }) => {
  const styles = useStyles();
  return (
    <View style={styles.cardItem}>
      <View style={styles.cardHeader}>
        <TeraCardLogo />
        <View style={styles.badgesContainer}>
          {item.status === CardStatusCode.Blocked && (
            <CardStatusBadge icon={<Lock />} text="products.blocked" />
          )}
          {item.status === CardStatusCode.Issued && (
            <CardStatusBadge icon={<Alert />} text="products.expired" />
          )}
          {item.status === CardStatusCode.TemporarilyInactive && (
            <CardStatusBadge
              icon={<Alert color={Colors.warningSolid} />}
              text="products.tempInactive"
              textColor={Colors.warningSolid}
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
