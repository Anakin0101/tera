import React, { FC, useCallback, useMemo } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { ActionSheet, DetailsItem, Divider, IconComponent, Text, LoadingInView } from 'components';
import { More } from 'assets/SVGs';
import { formatMoney } from 'utils/formatMoney';
import { useAutomaticPaymentDetails } from './container';
import { HeaderProps } from './AutomaticPaymentDetailsScreen.types';
import { useStyles } from './AutomaticPaymentDetailsScreen.styles';
import { AutoPaymentTypeEnum } from 'services/apis/productsAPI/productsAPI.types';
import { getFormattedDate, getFormattedDateFromISO } from 'utils/formatDate';
import { DD_MM_YYYY_SLASH } from 'constants/DateTemplates';
import { CurrencyEnum } from 'services/apis/transfersAPI/transfersAPI.types';

const Header: FC<HeaderProps> = ({ onPress, name, amount = 0, imageId }) => {
  const styles = useStyles();
  return (
    <View style={styles.header}>
      <IconComponent imageId={imageId} customImageIDStyle={styles.icon} />
      <View style={styles.info}>
        <Text children={name} secondary />
        <Text children={formatMoney(amount, CurrencyEnum.GEL)} size={16} />
      </View>
      <Pressable onPress={onPress} style={styles.actionIconContainer}>
        <More />
      </Pressable>
    </View>
  );
};

export const AutomaticPaymentDetailsScreen = () => {
  const styles = useStyles();

  const {
    isActionSheetVisible,
    toggleActionSheet,
    actionItems,
    isLoading,
    paymentDetails,
    imageId,
  } = useAutomaticPaymentDetails();

  const getMethod = useCallback((type?: AutoPaymentTypeEnum) => {
    switch (type) {
      case AutoPaymentTypeEnum.ByDebt:
        return 'automaticPayments.fixedAmount';
      case AutoPaymentTypeEnum.FixedAmount:
        return 'automaticPayments.fixedAmount';
      case AutoPaymentTypeEnum.FixedDateByDebt:
        return 'automaticPayments.fixedDateByDebt';
    }
  }, []);

  const combined = useMemo(
    () =>
      paymentDetails?.debtVerifyResponse?.debtVerifyResults?.flatMap(item => item.serviceFields),
    [paymentDetails?.debtVerifyResponse?.debtVerifyResults],
  );

  const renderPaymendDetails = useCallback(() => {
    return combined?.map(item => {
      if (item?.readonly && item?.visible) {
        return <DetailsItem label={item.name} value={item.value} key={item.key} />;
      }
      return null;
    });
  }, [combined]);

  if (isLoading) {
    return <LoadingInView />;
  }

  return (
    <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
      <Header
        onPress={toggleActionSheet}
        name={paymentDetails?.name}
        amount={paymentDetails?.fixedAmount || paymentDetails?.maxAmount}
        imageId={imageId}
      />
      <View style={[styles.main, styles.borderRadius]}>
        <Text children="automaticPayments.paymentSchedule" medium size={18} letterSpacing={-0.5} />
        <DetailsItem
          label="automaticPayments.paymentMethod"
          value={getMethod(paymentDetails?.type)}
          valueStyle={styles.text}
        />
        {!!paymentDetails?.payDay && (
          <DetailsItem
            label="automaticPayments.paymentDate"
            value={paymentDetails?.payDay}
            valueStyle={styles.text}
          />
        )}
        <DetailsItem
          label="automaticPayments.startDate"
          value={getFormattedDateFromISO(paymentDetails?.startDate, DD_MM_YYYY_SLASH)}
          valueStyle={styles.text}
        />
        {!!paymentDetails?.endDate && (
          <DetailsItem
            label="automaticPayments.endDate"
            value={getFormattedDateFromISO(paymentDetails?.endDate, DD_MM_YYYY_SLASH)}
            valueStyle={styles.text}
          />
        )}
        {!!paymentDetails?.lastPayDate && (
          <DetailsItem
            label="automaticPayments.lastPaymenDate"
            value={getFormattedDate(paymentDetails?.lastPayDate, DD_MM_YYYY_SLASH)}
            valueStyle={styles.text}
          />
        )}
      </View>
      <Divider />
      <View style={[styles.main]}>
        <Text children="automaticPayments.paymentDetails" medium size={18} letterSpacing={-0.5} />
        <DetailsItem
          label="automaticPayments.subscriberNumber"
          value={paymentDetails?.customerNumber}
          valueStyle={styles.text}
        />
        {renderPaymendDetails()}
        <DetailsItem
          label="automaticPayments.from"
          value={paymentDetails?.account}
          valueStyle={styles.text}
        />
      </View>
      <ActionSheet
        actionItems={actionItems}
        isVisible={isActionSheetVisible}
        onCancel={toggleActionSheet}
        title="common.choose"
      />
    </ScrollView>
  );
};
