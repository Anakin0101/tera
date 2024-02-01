import React from 'react';
import { Alert, Pressable, View } from 'react-native';
import { useStyles } from './MyBalance.styles';
import { Text } from 'components/Text/Text';
import { useTranslation } from 'react-i18next';
import { ArrowDown } from 'assets/SVGs';

export const MyBalance = () => {
  const styles = useStyles();
  const { t } = useTranslation();

  return (
    <Pressable style={styles.wrapper} onPress={() => Alert.alert('on press my financial')}>
      <View style={styles.container}>
        <View style={styles.cardWrapper}>
          <View style={styles.card} />
        </View>
        <View style={styles.infoWrapper}>
          <Text style={styles.title}>{t('checkPaymentProvider.myFinancial')}</Text>
          <Text style={styles.desc}>48,292.48 ₾</Text>
        </View>
      </View>
      <View style={styles.arrowStyle}>
        <ArrowDown width={24} height={14} />
      </View>
    </Pressable>
  );
};
