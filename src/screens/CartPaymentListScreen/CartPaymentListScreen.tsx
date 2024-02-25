import React, { useCallback, useMemo, useState } from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';

import {
  ActionSheet,
  Button,
  CartPaymentItem,
  EmptyCartPaymentList,
  LoadingView,
  MyBalance,
  Text,
} from 'components/index';
import { useStyles } from './CartPaymentListScreen.style';
import { useCartPaymentList } from './container';
import {
  BasketItem,
  Payment,
  PaymentFieldValue,
} from 'services/apis/paymentsAPI/paymentsAPI.types';
import { Account } from 'services/apis/productsAPI/productsAPI.types';
import { updateArrayValuesById } from 'utils/paymentUtils';
import { formatMoney } from 'utils/formatMoney';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export const CartPaymentListScreen = () => {
  const { t } = useTranslation();
  const styles = useStyles();

  const [selectedAccount, setSelectedAccount] = useState<Account>();
  const [selectedCartItemIds, setSelectedCartItemIds] = useState<Array<string>>([]);
  const [selectedCartFeeValue, setSelectedCartFeeValue] = useState<{
    [key: number]: number;
  }>({});
  const [serviceFieldsById, setServiceFieldsById] = useState<{
    [key: number]: Array<PaymentFieldValue>;
  }>({});

  const {
    isLoading,
    data,
    basket,
    isPaymentServiceLoading,
    providersGroups,
    subscriberFieldsValue,
    setSubscriberFieldsValue,
    payIsLoading,
    payService,
    deleteBasketService,
    actionItems,
    isActionSheetVisible,
    toggleActionSheet,
    setProviderItems,
  } = useCartPaymentList();

  const unSelectCartOnPress = useCallback(
    (id: string) => {
      try {
        if (selectedCartItemIds.includes(id)) {
          setSelectedCartItemIds(prev => prev.filter(item => item !== id));
          setSelectedCartFeeValue(prev => {
            const updated = { ...prev };
            delete updated[Number(id)];
            return updated;
          });
        }
      } catch (ex) {
        console.warn('unSelectCartOnPress', ex);
      }
    },
    [selectedCartItemIds],
  );

  const selectCartOnPress = useCallback((id: string) => {
    try {
      setSelectedCartItemIds(prev => [...prev?.filter(item => item !== id), id]);
    } catch (ex) {
      console.warn('selectCartOnPress', ex);
    }
  }, []);

  const addToSelectedItemFee = (id: number, fee: number) => {
    try {
      setSelectedCartFeeValue(prev => ({
        ...prev,
        [id.toString()]: fee || 0,
      }));
    } catch (ex) {
      console.warn('addToSelectedItemFee', ex);
    }
  };

  const addServiceFieldsByid = (id: number, fields: Array<PaymentFieldValue>) => {
    setServiceFieldsById(prev => ({
      ...prev,
      [id]: fields,
    }));
  };

  const renderPaymentItem = useCallback(
    ({ item, index }: { item: BasketItem; index: number }) => {
      return (
        <CartPaymentItem
          key={item.id + index.toString()}
          item={item}
          index={index}
          providersGroups={providersGroups}
          value={subscriberFieldsValue?.[item?.id]?.value || ''}
          onChangeText={(id, text) => {
            // Update the subscriberFieldsValue state with the new text for the specified id.
            setSubscriberFieldsValue(prev => ({
              ...prev,
              [item.id]: { id, value: text },
            }));
          }}
          unSelectCartOnPress={unSelectCartOnPress}
          selectCartOnPress={selectCartOnPress}
          selectedCartItemIds={selectedCartItemIds}
          addToSelectedItemFee={addToSelectedItemFee}
          addServiceFieldsByid={addServiceFieldsByid}
          deleteBasketService={deleteBasketService}
          setProviderItems={setProviderItems}
        />
      );
    },
    [
      setProviderItems,
      providersGroups,
      unSelectCartOnPress,
      selectedCartItemIds,
      setSubscriberFieldsValue,
      subscriberFieldsValue,
      selectCartOnPress,
      deleteBasketService,
    ],
  );

  const renderCarts = useCallback(() => {
    return data.map((item, index) => renderPaymentItem({ item, index }));
  }, [data, renderPaymentItem]);

  const sum: number = useMemo(() => {
    try {
      const validValues = selectedCartItemIds
        .map(itemId => parseFloat(subscriberFieldsValue[itemId]?.value) || 0) // Parse value to float, default to 0 if NaN
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0); // Sum all values
      return validValues;
    } catch (ex) {
      console.warn('Error in sum calculation', ex);
      return 0;
    }
  }, [selectedCartItemIds, subscriberFieldsValue]);

  const calculateTotalFee = useMemo(() => {
    try {
      const totalFee = Object.values(selectedCartFeeValue).reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0,
      );
      return totalFee;
    } catch (ex) {
      console.warn('Error in calculateTotalFee', ex);
      return 0;
    }
  }, [selectedCartFeeValue]);

  const payServiceOnPress = useCallback(() => {
    try {
      if (selectedAccount) {
        const payments: Array<Payment> = [];
        data?.map(item => {
          if (selectedCartItemIds.includes(item.id.toString())) {
            const serviceId = item.serviceId;
            const fieldValues = serviceFieldsById[item.id];

            const resultArray = updateArrayValuesById(fieldValues, [
              subscriberFieldsValue[item.id],
            ]);

            payments.push({
              serviceId,
              basketItemDescription: '',
              basketItemName: '',
              fieldValues: resultArray,
              saveIntoBasketId: null,
            });
          } else {
            return;
          }
        });

        payService(selectedAccount.accountId, payments, Number(calculateTotalFee) + Number(sum));
      }
    } catch (ex) {
      console.warn('payServiceOnPress', ex);
    }
  }, [
    calculateTotalFee,
    data,
    payService,
    selectedAccount,
    selectedCartItemIds,
    serviceFieldsById,
    subscriberFieldsValue,
    sum,
  ]);

  const selectAccountOnPress = useCallback((account: Account) => {
    setSelectedAccount(account);
  }, []);

  const renderContent = useCallback(() => {
    if (data?.length < 1) {
      return <EmptyCartPaymentList basket={basket} />;
    } else {
      return (
        <>
          <KeyboardAwareScrollView
            keyboardShouldPersistTaps="handled"
            contentInsetAdjustmentBehavior="automatic"
            extraScrollHeight={100}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listWrapper}
          >
            {renderCarts()}
            <View style={styles.detailsWrapper}>
              <View style={styles.detailsContainer}>
                <Text style={styles.detailsTitle}>{t('cartPaymentListScreen.totalTax')}</Text>
                <Text style={styles.detailsValue}>{formatMoney(Number(sum))} ₾</Text>
              </View>
              <View style={styles.detailsContainer}>
                <Text style={styles.detailsTitle}>{t('cartPaymentListScreen.fee')}</Text>
                <Text style={styles.detailsValue}>{formatMoney(Number(calculateTotalFee))} ₾</Text>
              </View>
            </View>
          </KeyboardAwareScrollView>
          <View style={styles.buttonContainer}>
            <MyBalance
              selectedAccount={selectedAccount}
              selectAccountOnPress={selectAccountOnPress}
            />
            <View style={styles.btnContainer}>
              <Button.Primary
                fullWidth
                text={`${t('paymentDetailsScreen.pay')} (${formatMoney(
                  Number(calculateTotalFee) + Number(sum),
                )})`}
                customTextStyle={styles.buttonText}
                onPress={payServiceOnPress}
                isLoading={payIsLoading}
                disabled={!selectedAccount || !selectedCartItemIds.length}
              />
            </View>
          </View>
        </>
      );
    }
  }, [
    data?.length,
    basket,
    styles.listWrapper,
    styles.detailsWrapper,
    styles.detailsContainer,
    styles.detailsTitle,
    styles.detailsValue,
    styles.buttonContainer,
    styles.btnContainer,
    styles.buttonText,
    renderCarts,
    t,
    sum,
    calculateTotalFee,
    selectedAccount,
    selectAccountOnPress,
    payServiceOnPress,
    payIsLoading,
    selectedCartItemIds.length,
  ]);

  if (isLoading || isPaymentServiceLoading) {
    return <LoadingView />;
  }

  return (
    <View style={styles.container}>
      {renderContent()}
      <ActionSheet
        actionItems={actionItems}
        isVisible={isActionSheetVisible}
        onCancel={toggleActionSheet}
        title="common.choose"
      />
    </View>
  );
};
