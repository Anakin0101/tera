import React, { useCallback, memo } from 'react';
import { View } from 'react-native';
import { useStyles } from './PaymentDetails.styles';
import { useTranslation } from 'react-i18next';
import { ServiceField } from 'services/apis/paymentsAPI/paymentsAPI.types';
import { getFee } from 'utils/paymentUtils';
import { PaymentDetailsProps } from './PaymentDetails.types';
import { sumForSubscriberFieldsValue } from 'utils/sumForSubscriberFieldsValue';
import { SubscriberInfoItem } from '../SubscriberInfo/SubscriberInfoItem';
import { Text } from 'components/Text/Text';
import { maskAccountIban } from 'utils/maskAccountIban';

export const PaymentDetails: React.FC<PaymentDetailsProps> = memo(
  ({
    debtVerifyResults,
    feeRules,
    subscriberFieldsValue,
    subscriberInputFieldsValue,
    selectedAccount,
    debtVerifyBasketInfo,
  }) => {
    const styles = useStyles();
    const { t } = useTranslation();

    // Combine serviceFields arrays from all items in debtVerifyResults
    const combinedServiceFields: Array<ServiceField> = debtVerifyResults.flatMap(
      item => item.serviceFields || [],
    );

    /**
     * Render subscriber information items based on debtVerifyBasketInfo and subscriberFieldsValue.
     *
     * @function
     * @returns {JSX.Element[]} An array of JSX elements representing SubscriberInfoItem components.
     */
    const renderBasketInfo = useCallback(() => {
      return debtVerifyBasketInfo?.map((item, index) => {
        const name = item.name;

        // Extract values from subscriberFieldsValue for the current item's id and join them
        const value = subscriberFieldsValue
          .map(field => (field.id === item.id ? field.value : ''))
          .join('');

        return <SubscriberInfoItem key={item.id + index.toString()} name={name} value={value} />;
      });
    }, [debtVerifyBasketInfo, subscriberFieldsValue]);

    /**
     * Render SubscriberInfoItem components based on the properties of items in combinedServiceFields array.
     *
     * @returns {JSX.Element[]} An array of JSX elements representing SubscriberInfoItem components.
     */
    const renderContent = useCallback(() => {
      return combinedServiceFields.map((item, index) => {
        /**
         * Check if the item is readonly and visible before rendering SubscriberInfoItem.
         * If both conditions are met, render a SubscriberInfoItem component.
         *
         * @type {boolean} Whether the item is readonly.
         * @type {boolean} Whether the item is visible.
         */
        const isRenderable = item?.readonly && item?.visible;

        if (isRenderable) {
          /**
           * Render a SubscriberInfoItem component.
           *
           * @type {string} Unique key for the SubscriberInfoItem.
           * @type {string | undefined} Name property for the SubscriberInfoItem.
           * @type {string | undefined} Value property for the SubscriberInfoItem.
           */
          return (
            <SubscriberInfoItem
              key={item.id + index.toString()}
              name={item?.name}
              value={item?.value}
            />
          );
        }
        return null;
      });
    }, [combinedServiceFields]);

    const getFeeValue = () => {
      const sum = sumForSubscriberFieldsValue(subscriberInputFieldsValue);
      return getFee(Number(sum), feeRules).toString();
    };

    return (
      <View style={styles.wrapper}>
        <Text style={styles.title}>{t('paymentDetailsScreen.details')}</Text>
        {renderBasketInfo()}
        {renderContent()}
        <SubscriberInfoItem name={t('checkPaymentProvider.commission')} value={getFeeValue()} />

        <View>
          <Text children={t('checkPaymentProvider.fromWhere')} style={styles.headerTitleStyle} />
          <Text style={styles.moneyLabel}>{selectedAccount.accountName}</Text>
          <Text style={styles.accountIban}>{maskAccountIban(selectedAccount.accountIban)}</Text>
        </View>
      </View>
    );
  },
);
