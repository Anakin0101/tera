import React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'components';
import { useStyles } from './TariffDescriptionSingle.styles';
import { useTranslation } from 'react-i18next';
import { SuccessTransaction } from 'assets/SVGs';
import { closeModal } from 'utils/modal';

export const SuccessModal = () => {
  const styles = useStyles();
  const { t } = useTranslation();

  return (
    <View style={styles.centredView}>
      <SuccessTransaction width={64} height={64} />
      <View style={styles.successTextView}>
        <Text style={styles.successText}>{t('newDeposit.requestSuccess')}</Text>
      </View>
      <View style={styles.changeTextView}>
        <Text style={styles.changeText}>{t('newDeposit.changePackageText')}</Text>
      </View>
      <Button.Primary fullWidth text={t('common.thankyou')} onPress={closeModal} />
    </View>
  );
};
