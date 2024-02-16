import React, { FC } from 'react';
import { View } from 'react-native';
import { IconComponent, Text } from 'components';
import { TariffCardProps } from 'components/TariffCard/TariffCardLayout.types';
import { useStyles } from './TariffDescriptionSingle.styles';
import { useTranslation } from 'react-i18next';

export const TariffDescriptionSingle: FC<TariffCardProps> = ({
  cardTypeName,
  commissionMnth,
  commissionYr,
  icon,
  status,
}) => {
  const styles = useStyles();
  const { t } = useTranslation();

  return (
    <View style={styles.mainWrapper}>
      <View style={styles.cardNameMain}>
        <View style={styles.cardnameWrapper}>
          <IconComponent customIconComponentStyles={styles.iconWrapper} pngLocalIcon={icon} />
          <Text style={styles.cardName}>{cardTypeName}</Text>
        </View>
        {status ? (
          <View style={styles.statusWrapper}>
            <Text style={styles.statusText}>აქტიური</Text>
          </View>
        ) : null}
      </View>
      <View style={styles.cardNameMain}>
        <Text style={styles.commission}>{t('newDeposit.monthlyFee')}:</Text>
        <Text style={styles.commission}>{commissionMnth} ₾</Text>
      </View>

      <View style={styles.cardNameMain}>
        <Text style={styles.commission}>{t('newDeposit.annualFee')}:</Text>
        <Text style={styles.commission}>{commissionYr} ₾</Text>
      </View>
    </View>
  );
};
