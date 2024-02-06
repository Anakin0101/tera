import React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'components';
import { useStyles } from './TariffDescriptionSingle.styles';
import { useTranslation } from 'react-i18next';
import { ChangePackagesButtons } from './ChangePackagesButtons';
import { openModal } from 'utils/modal';
import { SuccessModal } from './SuccessModal';

export const PackagesOption = () => {
  const styles = useStyles();
  const { t } = useTranslation();

  const onSuccess = () => {
    openModal({
      element: <SuccessModal />,
      disablePanning: true,
    });
  };

  return (
    <View>
      <Text style={styles.singleCardName}>CLASIC</Text>
      <View style={styles.paytypeWrapper}>
        <Text style={styles.text}>{t('newDeposit.selectPayType')}</Text>
      </View>
      <ChangePackagesButtons />
      <View style={styles.descWrapper}>
        <Text style={[styles.text, styles.marginBottom]}>{t('newDeposit.confirmationText')}</Text>
        <Text style={[styles.text, styles.marginBottom]}>{t('newDeposit.considerationNote')}</Text>
        <Text style={[styles.text, styles.marginBottom]}>
          {t('newDeposit.finalizationInquiry')}
        </Text>
      </View>
      <Button.Primary onPress={onSuccess} fullWidth text={t('common.confirm')} />
    </View>
  );
};
