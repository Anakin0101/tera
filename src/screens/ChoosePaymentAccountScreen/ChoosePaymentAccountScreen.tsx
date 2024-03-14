import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { Button, IconComponent, MyBalance, Text, TextInput } from 'components/index';
import { useStyles } from './ChoosePaymentAccountScreen.style';
import { MainStackRouteProps, MainStackScreenProps } from 'navigation/types';
import { SubscriberFieldsValue } from './ChoosePaymentAccountScreen.types';
import { Account } from 'services/apis/productsAPI/productsAPI.types';
import { ServiceField } from 'services/apis/paymentsAPI/paymentsAPI.types';
import { MODAL_STACK, PAYMENT_DETAILS_SCREEN } from 'navigation/ScreenNames';
import { sumForSubscriberFieldsValue } from 'utils/sumForSubscriberFieldsValue';
import { KeyboardAvoidingScrollView } from '@cassianosch/react-native-keyboard-sticky-footer-avoiding-scroll-view';
import { useKeyboard } from 'utils/useKeyboard';
import { getValue } from 'storage/index';
import { SELECTED_LANGUAGE } from 'storage/constants';
import { LanguageKeys } from 'components/LanguageSwitcher/LanguageSwitcher.types';
import { CurrencyEnum } from 'services/apis/transfersAPI/transfersAPI.types';

export const ChoosePaymentAccountScreen = () => {
  const styles = useStyles();
  const { params } = useRoute<MainStackRouteProps<'ChoosePaymentAccountScreen'>>();
  const {
    providerItem,
    debtVerifyResults,
    subscriberFieldsValue,
    debtVerifyBasketInfo,
    selectedAccountFromCard,
  } = params || {};
  const { navigate } = useNavigation<MainStackScreenProps<'ModalStack'>>();
  const { isKeyboardOpened } = useKeyboard();
  const savedLanguage = getValue(SELECTED_LANGUAGE);

  const [subscriberInputFieldsValue, setSubscriberInputFieldsValue] =
    useState<SubscriberFieldsValue>([]);
  const [selectedAccount, setSelectedAccount] = useState<Account>();

  // Combine serviceFields arrays from all items in debtVerifyResults
  const combinedServiceFields: Array<ServiceField> = debtVerifyResults.flatMap(
    item => item.serviceFields || [],
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

  const checkDefaultPayableValue = useCallback(() => {
    combinedServiceFields.map(item => {
      const isRenderable = item?.required && item?.visible;

      if (isRenderable && debtVerifyResults?.[0]?.payable > 0) {
        setSubscriberInputFieldsValue(prev => {
          const updatedFields = [...prev];
          const fieldIndex = updatedFields.findIndex(field => field.id === item.id);

          if (fieldIndex !== -1) {
            // If the field with the specified id exists, update its value
            updatedFields[fieldIndex] = {
              id: item.id,
              value: debtVerifyResults?.[0]?.payable?.toString(),
            };
          } else {
            // If the field doesn't exist, add a new field to the array
            updatedFields.push({
              id: item.id,
              value: debtVerifyResults?.[0]?.payable.toString(),
            });
          }

          return updatedFields;
        });
      }
    });
  }, [combinedServiceFields, debtVerifyResults]);

  useEffect(() => {
    checkDefaultPayableValue();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setAccountFromCard = useCallback(() => {
    if (!selectedAccountFromCard) {
      return;
    }
    const isGelAccount = selectedAccountFromCard?.ccy === CurrencyEnum.GEL;

    if (isGelAccount) {
      setSelectedAccount(selectedAccountFromCard);
    }
  }, [selectedAccountFromCard]);

  useEffect(() => {
    setAccountFromCard();
  }, [setAccountFromCard]);

  const checkSubscriberInfo = useCallback(() => {
    const sum = sumForSubscriberFieldsValue(subscriberInputFieldsValue);

    if (debtVerifyResults?.length && sum > 0 && selectedAccount) {
      navigate(MODAL_STACK, {
        screen: PAYMENT_DETAILS_SCREEN,
        params: {
          providerItem,
          debtVerifyBasketInfo,
          debtVerifyResults,
          selectedAccount,
          subscriberFieldsValue,
          subscriberInputFieldsValue,
        },
      });
    }
  }, [
    subscriberFieldsValue,
    subscriberInputFieldsValue,
    debtVerifyResults,
    selectedAccount,
    navigate,
    providerItem,
    debtVerifyBasketInfo,
  ]);

  const selectAccountOnPress = useCallback((account: Account) => {
    setSelectedAccount(account);
  }, []);

  const onSubmit = () => {
    checkSubscriberInfo();
  };

  /**
   * Render input fields based on combinedServiceFields, considering visibility and requirement.
   *
   * @function
   * @returns {JSX.Element[]} An array of JSX elements representing TextInput components.
   */
  const renderInputs = useCallback(() => {
    return combinedServiceFields.map((item, index) => {
      const isRenderable = item?.required && item?.visible;

      if (isRenderable) {
        return (
          <TextInput
            key={item.id + index.toString()}
            label={item?.name}
            editable={debtVerifyResults?.[0]?.payable === 0}
            value={subscriberInputFieldsValue?.find(field => field.id === item.id)?.value || ''}
            onChangeText={(text: string) => {
              /**
               * Update the subscriberFieldsValue state with the new text for the specified id.
               *
               * @param {string} text - The new text value for the input field.
               */
              setSubscriberInputFieldsValue?.(prev => {
                const updatedFields = [...prev];
                const fieldIndex = updatedFields.findIndex(field => field.id === item.id);

                if (fieldIndex !== -1) {
                  // If the field with the specified id exists, update its value
                  updatedFields[fieldIndex] = { id: item.id, value: text };
                } else {
                  // If the field doesn't exist, add a new field to the array
                  updatedFields.push({ id: item.id, value: text });
                }

                return updatedFields;
              });
            }}
            marginTop={24}
          />
        );
      }
      return null;
    });
  }, [combinedServiceFields, debtVerifyResults, subscriberInputFieldsValue]);

  const disablePayButton = useMemo(() => {
    const areAllNonEmpty = subscriberFieldsValue.every(field => !!field?.value);
    return !(areAllNonEmpty && selectedAccount);
  }, [selectedAccount, subscriberFieldsValue]);

  return (
    <KeyboardAvoidingScrollView
      contentContainerStyle={styles.container}
      containerStyle={styles.containerStyle}
      stickyFooter={
        <View style={[isKeyboardOpened && styles.ctaOpenWrapper]}>
          <MyBalance
            selectedAccount={selectedAccount}
            selectAccountOnPress={selectAccountOnPress}
          />
          <View style={styles.ctaWrapper}>
            <Button.Primary
              text="paymentDetailsScreen.pay"
              onPress={onSubmit}
              fullWidth
              customWrapperStyle={[styles.buttonWrapper, disablePayButton && styles.disabledButton]}
              disabled={disablePayButton}
            />
          </View>
        </View>
      }
    >
      <View style={styles.wrapper}>
        <View style={styles.providerWrapper}>
          <IconComponent
            imageId={providerItem?.largeImageId}
            customImageIDStyle={styles.iconStyle}
          />
          <View style={styles.headerWrapper}>
            <Text style={styles.providerHeaderTitle}>{headerTitle}</Text>
            {/* <Text style={styles.headerDesc}>{providerItem.id}</Text> */}
          </View>
        </View>

        <View style={styles.contentWrapper}>{renderInputs()}</View>
      </View>
    </KeyboardAvoidingScrollView>
  );
};
