import React, { FC, useCallback, useMemo } from 'react';
import { ScrollView, View } from 'react-native';
import { Button, DetailsItem, IconComponent, Text } from 'components';
import { useTranslation } from 'react-i18next';
import { getFee } from 'utils/paymentUtils';
import { formatMoney } from 'utils/formatMoney';
import { maskAccountIban } from 'utils/maskAccountIban';
import { useNewAutomaticPaymentDetails } from './container';
import { LanguageKeys } from 'components/LanguageSwitcher/LanguageSwitcher.types';
import { AutoPaymentTypeEnum } from 'services/apis/productsAPI/productsAPI.types';
import { HeaderProps } from './NewAutomaticPaymentDetailsScreen.types';
import { useStyles } from './NewAutomaticPaymentDetailsScreen.styles';
import { CurrencyEnum } from 'services/apis/transfersAPI/transfersAPI.types';

const Header: FC<HeaderProps> = ({ name, imageId, amount, lang }) => {
  const styles = useStyles();
  return (
    <View style={styles.header}>
      <IconComponent imageId={imageId} customImageIDStyle={styles.icon} />
      <View style={styles.info}>
        <Text children={lang === LanguageKeys.geo ? name.ka : name.en} secondary />
        <Text children={formatMoney(amount, CurrencyEnum.GEL)} size={16} />
      </View>
    </View>
  );
};

export const NewAutomaticPaymentDetailsScreen = () => {
  const { t } = useTranslation();
  const styles = useStyles();
  const {
    debtVerifyResults,
    providerItem,
    automaticPaymentForm,
    addAutomaticPayment,
    savedLanguage,
  } = useNewAutomaticPaymentDetails();

  const renderContent = useCallback(() => {
    const combined = debtVerifyResults.flatMap(item => item.serviceFields) || [];
    return combined.map(item => {
      if (item?.readonly && item?.visible) {
        return <DetailsItem label={item.name} value={item.value} />;
      }
      return null;
    });
  }, [debtVerifyResults]);

  const fee = useMemo(() => {
    return getFee(Number(automaticPaymentForm.amount), providerItem?.feeRules);
  }, [automaticPaymentForm.amount, providerItem?.feeRules]);

  const paymentAmount = useMemo(() => {
    return formatMoney(fee + Number(automaticPaymentForm.amount), CurrencyEnum.GEL);
  }, [automaticPaymentForm.amount, fee]);

  return (
    <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
      <Header
        imageId={providerItem?.largeImageId}
        name={providerItem.name}
        amount={Number(automaticPaymentForm.amount)}
        lang={savedLanguage}
      />
      <View style={styles.main}>
        <Text children="automaticPayments.details" medium size={18} letterSpacing={-0.5} />
        <DetailsItem
          label="automaticPayments.subscriberNumber"
          value={automaticPaymentForm?.abonentNumber}
        />
        {renderContent()}
        <DetailsItem label="automaticPayments.taskName" value={automaticPaymentForm.title} />
        <DetailsItem
          label={
            automaticPaymentForm.paymentMethod?.type === AutoPaymentTypeEnum.FixedAmount
              ? 'automaticPayments.amount'
              : 'automaticPayments.maxAmount'
          }
          value={formatMoney(Number(automaticPaymentForm.amount), CurrencyEnum.GEL)}
        />
        <DetailsItem
          label="automaticPayments.commission"
          value={formatMoney(fee, CurrencyEnum.GEL)}
        />
        <DetailsItem label="automaticPayments.startDate" value={automaticPaymentForm.startDate} />
        <DetailsItem
          label="automaticPayments.endDate"
          value={
            automaticPaymentForm.activeAllTime
              ? 'automaticPayments.activeAllTime'
              : automaticPaymentForm.endDate
          }
        />
        {!automaticPaymentForm.activeAllTime &&
          automaticPaymentForm.paymentMethod?.type === AutoPaymentTypeEnum.FixedAmount && (
            <DetailsItem
              label="automaticPayments.paymentDate"
              value={automaticPaymentForm.paymentDate}
            />
          )}
        <DetailsItem
          label="automaticPayments.paymentMethod"
          value={automaticPaymentForm.paymentMethod?.name}
        />
        <DetailsItem
          label="automaticPayments.from"
          value={
            <View>
              <Text children={automaticPaymentForm?.account?.accountName} />
              <Text
                label
                secondary
                children={maskAccountIban(automaticPaymentForm?.account?.accountIban || '')}
              />
            </View>
          }
        />
        <Button.Primary
          fullWidth
          text={`${t('automaticPayments.pay')} (${paymentAmount})`}
          onPress={addAutomaticPayment}
          customWrapperStyle={styles.button}
        />
      </View>
    </ScrollView>
  );
};
