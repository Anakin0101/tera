import React, { useCallback, useEffect } from 'react';
import { SafeAreaView, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { Button, LoadingView, PaymentFieldInput, SubscriberInfo, Text } from 'components/index';
import { useStyles } from './CheckPaymentProviderScreen.style';
import { useCheckProviderInfo } from './container';
import { DebtVerifyBasketResponse } from 'services/apis/paymentsAPI/paymentsAPI.types';
import { KeyboardAvoidingScrollView } from '@cassianosch/react-native-keyboard-sticky-footer-avoiding-scroll-view';

import { useForm } from 'react-hook-form';

/**
 * Create a new array of subscriber fields with empty values based on debtVerifyBasketInfo.
 * @param {DebtVerifyBasketResponse} item - An item from the debt verification basket.
 * @returns {SubscriberFieldValue} An object with id and an empty value.
 */
const createSubscriberField = (item: DebtVerifyBasketResponse) => ({
  id: item.id,
  value: item.value || '',
  key: item.key || '',
});

export const CheckPaymentProviderScreen = () => {
  const { t } = useTranslation();
  const styles = useStyles();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {
    debtVerifyBasketInfo,
    isLoading,
    getDebtVerifyResultsHandler,
    debtVerifyResults,
    isDebtVerifyLoading,
    subscriberFieldsValue,
    setSubscriberFieldsValue,
    isKeyboardOpened,
    providerItem,
    isAutomaticPayment,
    openChoosePaymentAccountScreenOnPress,
    basket,
    isAddBasketItemLoading,
    clearDebtVerifyInfo,
  } = useCheckProviderInfo();

  /**
   * React hook to update the subscriberFieldsValue based on the debtVerifyBasketInfo.
   *
   * @param {DebtVerifyBasketResponse[]} debtVerifyBasketInfo - Information about debt verification baskets.
   * @param {function} setSubscriberFieldsValue - State updater function for subscriberFieldsValue.
   */
  useEffect(() => {
    // Check if debtVerifyBasketInfo is available
    if (debtVerifyBasketInfo) {
      // Create a new array of subscriber fields with empty values based on debtVerifyBasketInfo
      let newSubscriberFieldsValue = debtVerifyBasketInfo?.map(createSubscriberField);
      // Set the state with the new array of subscriber fields
      setSubscriberFieldsValue(newSubscriberFieldsValue);
    }
  }, [debtVerifyBasketInfo, setSubscriberFieldsValue]);

  /**
   * Render the correct input fields based on the items in debtVerifyBasketInfo.
   * @returns {JSX.Element[]} An array of JSX elements representing PaymentFieldInput components.
   */
  const renderCorrectInput = useCallback(() => {
    return debtVerifyBasketInfo?.map(item => {
      /**
       * Checks if the parentFieldValue in the item's relations matches any item in the mainArray.
       * If the item doesn't have relations, it's considered a match and returned as true.
       * @param {Object} item - The item to check.
       * @param {Array} mainArray - The main array to compare against.
       * @returns {boolean} - True if the parentFieldValue is matched or if the item doesn't have relations, false otherwise.
       */
      const isParentFieldValueMatched = item?.relations?.length
        ? subscriberFieldsValue.some(mainItem =>
            item?.relations?.some(
              relation =>
                mainItem?.id === relation?.parentFieldId &&
                mainItem?.value === relation?.parentFieldValue,
            ),
          )
        : true;

      if (isParentFieldValueMatched) {
        return (
          <PaymentFieldInput
            key={item.key}
            item={item}
            subscriberFieldsValue={subscriberFieldsValue}
            value={subscriberFieldsValue.find(field => field.id === item.id)?.value || ''}
            onChangeText={(id, text, key) => {
              // clear old debt verify info
              clearDebtVerifyInfo();
              // Update the subscriberFieldsValue state with the new text for the specified id.
              setSubscriberFieldsValue(prev => {
                const updatedFields = [...prev];
                const fieldIndex = updatedFields.findIndex(field => field.id === id);

                if (fieldIndex !== -1) {
                  // If the field with the specified id exists, update its value
                  updatedFields[fieldIndex] = { id, value: text, key };
                } else {
                  // If the field doesn't exist, add a new field to the array
                  updatedFields.push({ id, value: text, key });
                }

                return updatedFields;
              });
            }}
            control={control}
            errors={errors}
          />
        );
      }
    });
  }, [
    debtVerifyBasketInfo,
    subscriberFieldsValue,
    control,
    errors,
    clearDebtVerifyInfo,
    setSubscriberFieldsValue,
  ]);

  const onSubmit = useCallback(() => {
    // If any field has an empty value, return early without invoking getDebtVerifyResultsHandler.
    // if (areAllNonEmpty) {
    if (debtVerifyResults?.length) {
      /**
       * All field values are non-empty, so invoke the getDebtVerifyResultsHandler function.
       * @param {SubscriberFieldsValue} fields - The array of subscriber fields with non-empty values.
       */
      openChoosePaymentAccountScreenOnPress(subscriberFieldsValue);
    } else {
      /**
       * All field values are non-empty, so invoke the getDebtVerifyResultsHandler function.
       * @param {SubscriberFieldsValue} fields - The array of subscriber fields with non-empty values.
       */
      getDebtVerifyResultsHandler(subscriberFieldsValue);
    }
    // }
  }, [
    subscriberFieldsValue,
    debtVerifyResults?.length,
    openChoosePaymentAccountScreenOnPress,
    getDebtVerifyResultsHandler,
  ]);

  if (isLoading) {
    return <LoadingView />;
  }

  return (
    <KeyboardAvoidingScrollView
      containerStyle={styles.container}
      contentContainerStyle={styles.wrapper}
      stickyFooter={
        <View style={[styles.ctaWrapper, isKeyboardOpened && styles.ctaOpenWrapper]}>
          <Button.Primary
            text={basket && debtVerifyResults?.length ? 'checkPaymentProvider.add' : 'common.next'}
            onPress={handleSubmit(onSubmit)}
            fullWidth
            isLoading={isLoading || isDebtVerifyLoading || isAddBasketItemLoading}
          />
        </View>
      }
    >
      <SafeAreaView style={styles.container}>
        <Text style={styles.headerTitle}>{t('checkPaymentProvider.title')}</Text>
        {renderCorrectInput()}
        {!isAutomaticPayment && !!debtVerifyResults?.length && (
          <SubscriberInfo
            debtVerifyResults={debtVerifyResults}
            feeRules={providerItem?.feeRules || []}
          />
        )}
      </SafeAreaView>
    </KeyboardAvoidingScrollView>
  );
};
