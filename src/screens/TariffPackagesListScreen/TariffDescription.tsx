import React from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { IconComponent, Text } from 'components/index';
import Images from 'theme/Images';
import { useStyles } from './TariffDescription.styles';

export const TariffDescription = () => {
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
      <Text style={styles.descriptionText} numberOfLines={2}>
        {t('newDeposit.selectTariff')}
      </Text>
    </View>
  );
};
