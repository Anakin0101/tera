import React from 'react';
import { Text, View } from 'react-native';
import { styles } from './PaymentsScreen.style';
import useTheme from 'hooks/useTheme';
import { CustomHeader } from 'components/CustomHeader';
import { useTranslation } from 'react-i18next';

export const PaymentsScreen = () => {
  const { Fonts } = useTheme();
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <CustomHeader title={t('common:navigation.payments')} />
      <Text style={[Fonts.textSmall]}>Payments main Screen</Text>
    </View>
  );
};
