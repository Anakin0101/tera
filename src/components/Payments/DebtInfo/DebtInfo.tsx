import React from 'react';
import { Alert, Pressable, View } from 'react-native';
import { useStyles } from './DebtInfo.styles';
import { Text } from 'components/Text/Text';
import { ArrowRight } from 'assets/SVGs';
import { useTranslation } from 'react-i18next';

export const DebtInfo = () => {
  const styles = useStyles();
  const { t } = useTranslation();

  return (
    <Pressable style={styles.wrapper} onPress={() => Alert.alert('On Press')}>
      <View style={styles.container}>
        <View style={styles.counterWrapper}>
          <Text style={styles.counterText}>4</Text>
        </View>
        <View>
          <Text style={styles.deptTitle}>{t('payments.totalDebt')}</Text>
          <Text style={styles.deptValue}>1,329.00 ₾</Text>
        </View>
      </View>
      <ArrowRight />
    </Pressable>
  );
};
