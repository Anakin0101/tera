import React, { useMemo } from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation, useRoute } from '@react-navigation/native';

import { Button, Text } from 'components/index';
import { useStyles } from './PaymentSuccessScreen.style';
import { MainStackRouteProps, MainStackScreenProps } from 'navigation/types';
import { sumForSubscriberFieldsValue } from 'utils/sumForSubscriberFieldsValue';
import { formatMoney } from 'utils/formatMoney';
import { getFee } from 'utils/paymentUtils';
import { SuccessTransaction } from 'assets/SVGs';
import { DASHBOARD_SCREEN } from 'navigation/ScreenNames';

export const PaymentSuccessScreen = () => {
  const { t } = useTranslation();
  const styles = useStyles();
  const { params } = useRoute<MainStackRouteProps<'PaymentSuccessScreen'>>();
  const { providerItem, subscriberInputFieldsValue, amount, isBasketMode } = params || {};

  const { navigate } = useNavigation<MainStackScreenProps<'PaymentSuccessScreen'>>();

  /**
   * Memoized sum calculation for the values in subscriberInputFieldsValue.
   *
   * @type {number}
   */
  const sum = useMemo(
    /**
     * Callback function to calculate the sum for the values in subscriberInputFieldsValue.
     *
     * @function
     * @returns {number} The calculated sum.
     */
    () => {
      if (subscriberInputFieldsValue) {
        return sumForSubscriberFieldsValue(subscriberInputFieldsValue);
      }

      if (amount) {
        return amount;
      }
    },
    [amount, subscriberInputFieldsValue],
  );

  /**
   * Memoized calculation for the latest payment value based on the sum, fee rules, and formatting.
   *
   * @type {string}
   */
  const latestPaymentValue = useMemo(
    /**
     * Callback function to calculate the latest payment value.
     *
     * @function
     * @returns {string} The formatted latest payment value.
     */
    () => {
      // Calculate the fee using the sum and fee rules
      const fee = getFee(Number(sum), providerItem?.feeRules || []).toString();
      // Return the formatted sum plus the fee
      return formatMoney(Number(sum) + Number(fee));
    },
    [providerItem?.feeRules, sum],
  );

  const openMainScreen = () => {
    navigate(DASHBOARD_SCREEN);
  };

  return (
    <View style={styles.container}>
      <SuccessTransaction width={80} height={80} />
      <Text style={styles.headerTitle}>
        {isBasketMode ? t('paymentSuccessScreen.basketTitle') : t('paymentSuccessScreen.title')}
      </Text>
      {!isBasketMode && (
        <View style={styles.moneyWrapper}>
          <Text style={styles.moneyLabel}>{t('paymentSuccessScreen.money')}</Text>
          <Text style={[styles.moneyLabel, styles.moneyLabelBlack]}>{latestPaymentValue} ₾</Text>
        </View>
      )}

      {/* ეს დროებით ჩაითიშება, ეტაპობრივად დაემატება */}
      {/* {!isBasketMode && (
        <View style={styles.actionButtonsWrapper}>
          <View style={styles.actionContainer}>
            <View style={styles.actionButton}>
              <Plus />
            </View>
            <Text style={styles.actionButtonLabel}>
              {t('paymentSuccessScreen.saveAsToTemplate')}
            </Text>
          </View>
          {!amount && (
            <View style={styles.actionContainer}>
              <View style={styles.actionButton}>
                <AutomaticPayment />
              </View>
              <Text style={styles.actionButtonLabel}>{t('paymentSuccessScreen.automaticPay')}</Text>
            </View>
          )}
          <View style={styles.actionContainer}>
            <View style={styles.actionButton}>
              <Share />
            </View>
            <Text style={styles.actionButtonLabel}>{t('paymentSuccessScreen.receiptShare')}</Text>
          </View>
        </View>
      )} */}

      <View style={styles.nextButtonWrapper}>
        <Button.Primary
          text={t('paymentSuccessScreen.mainPage')}
          onPress={openMainScreen}
          customTextStyle={styles.buttonLabel}
        />
      </View>
    </View>
  );
};
