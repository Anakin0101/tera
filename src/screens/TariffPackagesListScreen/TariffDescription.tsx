import React from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { IconComponent, Text } from 'components/index';
import Images from 'theme/Images';
import { useStyles } from './TariffDescription.styles';
import { TariffPackagesListTypes } from './TariffPackagesList.types';

export const TariffDescription = ({ noData }: TariffPackagesListTypes) => {
  const { t } = useTranslation();
  const styles = useStyles();

  return (
    <View style={styles.mainCard}>
      <IconComponent
        pngLocalIcon={Images().GoldMedal}
        pngLocalIconCustomStyle={styles.icon}
        customIconComponentStyles={styles.iconWrapper}
      />
      <Text style={styles.title}>{t('newDeposit.tariffPackages')}</Text>
      {noData ? (
        <Text style={styles.descriptionText}> {t('newDeposit.nodataTarifDesc')}</Text>
      ) : (
        <Text style={styles.descriptionText} numberOfLines={2}>
          {t('newDeposit.selectTariff')}
        </Text>
      )}
    </View>
  );
};
