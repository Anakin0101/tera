import { Text } from 'components';
import React from 'react';
import { View } from 'react-native';
import { useStyles } from './TariffDescription.styles';
import { useTranslation } from 'react-i18next';

export const EmptyListMsg = () => {
  const styles = useStyles();
  const { t } = useTranslation();
  return (
    <View style={styles.noDataWrapper}>
      <Text style={styles.nodatatext}>{t('newDeposit.noTariff')}</Text>
    </View>
  );
};
