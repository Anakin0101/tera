import React from 'react';
import { View } from 'react-native';
import { useStyles } from './TariffCardLayout.styles';
import { useTranslation } from 'react-i18next';
import { IconComponent, Text } from 'components';
import { TariffCardProps } from './TariffCardLayout.types';
import { ArrowRight } from 'assets/SVGs';

export const TariffCardLayout: React.FC<TariffCardProps> = ({
  cardTypeName,
  commissionMnth,
  commissionYr,
  icon,
  status,
}) => {
  const { t } = useTranslation();
  const styles = useStyles();
  return (
    <View style={styles.cardContainer}>
      <View style={styles.row}>
        <IconComponent customIconComponentStyles={styles.iconWrapper} pngLocalIcon={icon} />
        <View>
          <View style={styles.row}>
            <Text style={styles.cardName}>{cardTypeName}</Text>
            {status?.length ? (
              <View style={styles.statusWrapper}>
                <Text style={styles.statusText}>{status}</Text>
              </View>
            ) : null}
          </View>
          <Text style={styles.commission}>
            {t('newDeposit.monthlyFee')}: <Text style={styles.cardName}>{commissionMnth} ₾</Text>
          </Text>
          <Text style={styles.commission}>
            {t('newDeposit.annualFee')}: <Text style={styles.cardName}>{commissionYr} ₾</Text>
          </Text>
        </View>
      </View>
      <IconComponent hasBorder={false} customIconSize={24} IconJSX={ArrowRight} />
    </View>
  );
};
