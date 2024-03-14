import React from 'react';
import { Pressable, View } from 'react-native';
import { useStyles } from './TariffCardLayout.styles';
import { useTranslation } from 'react-i18next';
import { IconComponent, Text } from 'components';
import { TariffCardProps } from './TariffCardLayout.types';
import { ArrowRight } from 'assets/SVGs';

export const TariffCardLayout: React.FC<TariffCardProps> = ({
  cardTypeName,
  commissionMnth,
  status,
  commissionYr,
  icon,
  pending,
  noData,
  applyOverlay,
  onPress,
}) => {
  const { t } = useTranslation();
  const styles = useStyles();

  return (
    <Pressable onPress={onPress} style={styles.cardContainer}>
      {applyOverlay && <View style={styles.overlay} />}
      <View style={styles.row}>
        <IconComponent
          customIconComponentStyles={styles.iconWrapper}
          pngLocalIconCustomStyle={noData && styles.locationIcon}
          pngLocalIcon={icon}
        />
        <View>
          <View style={styles.row}>
            <Text style={styles.cardName}>{cardTypeName}</Text>
            {status ? (
              <View style={styles.statusWrapper}>
                <Text style={styles.statusText}>{t('newDeposit.active')}</Text>
              </View>
            ) : null}
            {!status && pending ? (
              <View style={styles.pandingWrapper}>
                <Text style={styles.statusText}>{t('newDeposit.pending')}</Text>
              </View>
            ) : null}
          </View>
          {!noData ? (
            <>
              <Text style={styles.commission}>
                {t('newDeposit.monthlyFee')}:{' '}
                <Text style={styles.cardName}>{`${commissionMnth} ₾`}</Text>
              </Text>
              <Text style={styles.commission}>
                {t('newDeposit.annualFee')}:{' '}
                <Text style={styles.cardName}>{`${commissionYr} ₾`}</Text>
              </Text>
            </>
          ) : (
            <Text style={styles.commission}>{t('newDeposit.seeOffices')}</Text>
          )}
        </View>
      </View>
      <IconComponent hasBorder={false} customIconSize={24} IconJSX={ArrowRight} handler={onPress} />
    </Pressable>
  );
};
