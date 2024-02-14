import React, { useCallback, useEffect, useLayoutEffect, useMemo } from 'react';
import { SafeAreaView, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

import { Button, LoadingView, PaymentFieldInput, SubscriberInfo, Text } from 'components/index';
import { useStyles } from './CheckPaymentProviderScreen.style';
import { MainStackScreenProps } from 'navigation/types';
import { SELECTED_LANGUAGE } from 'storage/constants';
import { getValue } from 'storage/index';
import { LanguageKeys } from 'components/LanguageSwitcher/LanguageSwitcher.types';
import { useCheckProviderInfo } from './container';
import { DebtVerifyBasketResponse } from 'services/apis/paymentsAPI/paymentsAPI.types';
import { CHOOSE_PAYMENT_ACCOUNT_SCREEN, MODAL_STACK } from 'navigation/ScreenNames';
import { KeyboardAvoidingScrollView } from '@cassianosch/react-native-keyboard-sticky-footer-avoiding-scroll-view';

import { useForm } from 'react-hook-form';

export const CheckPaymentProviderScreen = () => {
  const { t } = useTranslation();
  const styles = useStyles();
  const { setOptions } = useNavigation();
  const { navigate } = useNavigation<MainStackScreenProps<'ModalStack'>>();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const savedLanguage = getValue(SELECTED_LANGUAGE);

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
  } = useCheckProviderInfo();

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
   * @param {DebtVerifyBasketResponse[]} debtVerifyBasketInfo - Information about debt verification baskets.
   * @param {function} setSubscriberFieldsValue - State updater function for subscriberFieldsValue.
   */
  useEffect(() => {
    /**
     * Create a new array of subscriber fields with empty values based on debtVerifyBasketInfo.
     * @param {DebtVerifyBasketResponse} item - An item from the debt verification basket.
     * @returns {SubscriberFieldValue} An object with id and an empty value.
     */
    const createSubscriberField = (item: DebtVerifyBasketResponse) => ({
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
  }, [debtVerifyBasketInfo, setSubscriberFieldsValue]);

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
        control={control}
        errors={errors}
      />
    ));
  }, [control, debtVerifyBasketInfo, errors, subscriberFieldsValue, setSubscriberFieldsValue]);

  const checkSubscriberInfo = useCallback(() => {
    /**
     * Check if any field value in the subscriberFieldsValue array is empty.
     * @type {boolean} True if at least one field has an empty value, otherwise false.
     */
    const areAllNonEmpty = subscriberFieldsValue.every(field => !!field?.value);

    // If any field has an empty value, return early without invoking getDebtVerifyResultsHandler.
    if (areAllNonEmpty) {
      if (debtVerifyResults?.length) {
        navigate(MODAL_STACK, {
          screen: CHOOSE_PAYMENT_ACCOUNT_SCREEN,
          params: {
            providerItem,
            debtVerifyBasketInfo,
            debtVerifyResults,
            subscriberFieldsValue,
          },
        });
      } else {
        /**
         * All field values are non-empty, so invoke the getDebtVerifyResultsHandler function.
         * @param {SubscriberFieldsValue} fields - The array of subscriber fields with non-empty values.
         */
        getDebtVerifyResultsHandler(subscriberFieldsValue);
      }
    }
  }, [
    subscriberFieldsValue,
    debtVerifyResults,
    navigate,
    providerItem,
    debtVerifyBasketInfo,
    getDebtVerifyResultsHandler,
  ]);

  const onSubmit = () => {
    checkSubscriberInfo();
  };

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
            text="common.next"
            onPress={handleSubmit(onSubmit)}
            fullWidth
            isLoading={isLoading || isDebtVerifyLoading}
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
