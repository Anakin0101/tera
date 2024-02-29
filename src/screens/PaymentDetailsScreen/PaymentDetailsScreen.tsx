import React, { useMemo } from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { Button, IconComponent, PaymentDetails, Text } from 'components/index';
import { useStyles } from './PaymentDetailsScreen.style';
import { getValue } from 'storage/index';
import { SELECTED_LANGUAGE } from 'storage/constants';
import { LanguageKeys } from 'components/LanguageSwitcher/LanguageSwitcher.types';
import { sumForSubscriberFieldsValue } from 'utils/sumForSubscriberFieldsValue';
import { formatMoney } from 'utils/formatMoney';
import { getFee } from 'utils/paymentUtils';
import { usePayService } from './container';

export const PaymentDetailsScreen = () => {
  const { t } = useTranslation();
  const styles = useStyles();

  const {
    payService,
    isLoading,
    providerItem,
    debtVerifyResults,
    selectedAccount,
    subscriberFieldsValue,
    subscriberInputFieldsValue,
    debtVerifyBasketInfo,
  } = usePayService();
  const savedLanguage = getValue(SELECTED_LANGUAGE);
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
    () => sumForSubscriberFieldsValue(subscriberInputFieldsValue),
    [subscriberInputFieldsValue],
  );

  const headerTitle = useMemo(() => {
    // Initialize title with an empty string
    let title = '';
    // Check if the selected language is 'geo'
    if (savedLanguage === LanguageKeys.geo) {
      // Use the Georgian name if available, otherwise use an empty string
      title = providerItem?.name?.ka || '';
    } else {
      // Use the English name if available, otherwise use an empty string
      title = providerItem?.name?.en || '';
    }
    // Return the calculated title
    return title;
  }, [providerItem?.name?.en, providerItem?.name?.ka, savedLanguage]);

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
      const fee = getFee(Number(sum), providerItem?.feeRules).toString();
      // Return the formatted sum plus the fee
      return formatMoney(Number(sum) + Number(fee));
    },
    [providerItem?.feeRules, sum],
  );

  const payServiceOnPress = () => {
    try {
      payService();
    } catch (ex) {
      console.warn('payServiceOnPress', ex);
    }
  };

  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="handled"
      contentInsetAdjustmentBehavior="automatic"
      extraScrollHeight={80}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <View style={styles.providerWrapper}>
        <IconComponent imageId={providerItem?.largeImageId} customImageIDStyle={styles.iconStyle} />
        <View style={styles.headerWrapper}>
          <Text style={styles.headerTitle}>{headerTitle}</Text>
          <Text style={styles.headerDesc}>{formatMoney(sum)} ₾</Text>
        </View>
      </View>
      <PaymentDetails
        debtVerifyResults={debtVerifyResults}
        feeRules={providerItem?.feeRules || []}
        subscriberInputFieldsValue={subscriberInputFieldsValue}
        selectedAccount={selectedAccount}
        debtVerifyBasketInfo={debtVerifyBasketInfo}
        subscriberFieldsValue={subscriberFieldsValue}
      />

      <View style={styles.nextButtonWrapper}>
        <Button.Primary
          text={`${t('paymentDetailsScreen.pay')} (${latestPaymentValue} ₾)`}
          fullWidth
          onPress={payServiceOnPress}
          isLoading={isLoading}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};
