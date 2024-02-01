import React, { useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation, useRoute } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import {
  Button,
  LoadingView,
  MyBalance,
  PaymentFieldInput,
  SubscriberInfo,
  Text,
} from 'components/index';
import { useStyles } from './CheckPaymentProviderScreen.style';
import { MainStackRouteProps } from 'navigation/types';
import { SELECTED_LANGUAGE } from 'storage/constants';
import { getValue } from 'storage/index';
import { LanguageKeys } from 'components/LanguageSwitcher/LanguageSwitcher.types';
import { useCheckProviderInfo } from './container';
import { SubscriberFieldsValue } from './CheckPaymentProviderScreen.types';

export const CheckPaymentProviderScreen = () => {
  const { t } = useTranslation();
  const styles = useStyles();
  const { setOptions } = useNavigation();
  const { params } = useRoute<MainStackRouteProps<'CheckPaymentProviderScreen'>>();
  const { providerItem } = params || {};
  const savedLanguage = getValue(SELECTED_LANGUAGE);
  const {
    debtVerifyBasketInfo,
    isLoading,
    getDebtVerifyResultsHandler,
    debtVerifyResults,
    isDebtVerifyLoading,
  } = useCheckProviderInfo(providerItem?.id);

  const [subscriberFieldsValue, setSubscriberFieldsValue] = useState<SubscriberFieldsValue>([]);
  const [payableMoney, setPayableMoney] = useState<string>('');

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

  useLayoutEffect(() => {
    setOptions({
      title: headerTitle,
    });
  }, [setOptions, headerTitle]);

  /**
   * React hook to update the subscriberFieldsValue based on the debtVerifyBasketInfo.
   *
   * @param {DebtVerifyBasketInfo[]} debtVerifyBasketInfo - Information about debt verification baskets.
   * @param {function} setSubscriberFieldsValue - State updater function for subscriberFieldsValue.
   */
  useEffect(() => {
    /**
     * Create a new array of subscriber fields with empty values based on debtVerifyBasketInfo.
     * @param {DebtVerifyBasketInfo} item - An item from the debt verification basket.
     * @returns {SubscriberFieldValue} An object with id and an empty value.
     */
    const createSubscriberField = item => ({
      id: item.id,
      value: item.value || '',
    });

    // Check if debtVerifyBasketInfo is available
    if (debtVerifyBasketInfo) {
      // Create a new array of subscriber fields with empty values based on debtVerifyBasketInfo
      let newSubscriberFieldsValue = debtVerifyBasketInfo?.map(createSubscriberField);
      // Set the state with the new array of subscriber fields
      setSubscriberFieldsValue(newSubscriberFieldsValue);
    }
  }, [debtVerifyBasketInfo]);

  /**
   * Render the correct input fields based on the items in debtVerifyBasketInfo.
   * @returns {JSX.Element[]} An array of JSX elements representing PaymentFieldInput components.
   */
  const renderCorrectInput = useCallback(() => {
    return debtVerifyBasketInfo?.map(item => (
      <PaymentFieldInput
        key={item.id}
        item={item}
        value={subscriberFieldsValue.find(field => field.id === item.id)?.value || ''}
        onChangeText={(id, text) => {
          // Update the subscriberFieldsValue state with the new text for the specified id.
          setSubscriberFieldsValue(prev => {
            const updatedFields = [...prev];
            const fieldIndex = updatedFields.findIndex(field => field.id === id);

            if (fieldIndex !== -1) {
              // If the field with the specified id exists, update its value
              updatedFields[fieldIndex] = { id, value: text };
            } else {
              // If the field doesn't exist, add a new field to the array
              updatedFields.push({ id, value: text });
            }

            return updatedFields;
          });
        }}
      />
    ));
  }, [debtVerifyBasketInfo, subscriberFieldsValue]);

  const checkSubscriberInfo = useCallback(() => {
    /**
     * Check if any field value in the subscriberFieldsValue array is empty.
     * @type {boolean} True if at least one field has an empty value, otherwise false.
     */
    const areAllNonEmpty = subscriberFieldsValue.every(field => !!field?.value);

    // If any field has an empty value, return early without invoking getDebtVerifyResultsHandler.
    if (areAllNonEmpty) {
      /**
       * All field values are non-empty, so invoke the getDebtVerifyResultsHandler function.
       * @param {SubscriberFieldsValue} fields - The array of subscriber fields with non-empty values.
       */
      getDebtVerifyResultsHandler(subscriberFieldsValue);
    }
  }, [subscriberFieldsValue, getDebtVerifyResultsHandler]);

  if (isLoading) {
    return <LoadingView />;
  }

  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="handled"
      contentInsetAdjustmentBehavior="automatic"
      extraScrollHeight={80}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <View style={styles.wrapper}>
        <Text style={styles.headerTitle}>{t('checkPaymentProvider.title')}</Text>
        {renderCorrectInput()}
        {!!debtVerifyResults?.length && (
          <SubscriberInfo
            debtVerifyResults={debtVerifyResults}
            payableMoney={payableMoney}
            setPayableMoney={setPayableMoney}
            feeRules={providerItem?.feeRules || []}
          />
        )}
      </View>
      <MyBalance />
      <View style={styles.nextButtonWrapper}>
        <Button.Primary
          text="common.next"
          fullWidth
          onPress={checkSubscriberInfo}
          isLoading={isLoading || isDebtVerifyLoading}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};
