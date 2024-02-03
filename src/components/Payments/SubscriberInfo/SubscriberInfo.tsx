import React, { useCallback } from 'react';
import { View } from 'react-native';
import { useStyles } from './SubscriberInfo.styles';
import { useTranslation } from 'react-i18next';
import { TextInput } from 'components/TextInput/TextInput';
import { SubscriberInfoItem } from './SubscriberInfoItem';
import { ServiceField } from 'services/apis/paymentsAPI/paymentsAPI.types';
import { getFee } from 'utils/paymentUtils';
import { SubscriberInfoProps } from './SubscriberInfo.types';
import { sumForSubscriberFieldsValue } from 'utils/sumForSubscriberFieldsValue';

export const SubscriberInfo: React.FC<SubscriberInfoProps> = ({
  debtVerifyResults,
  feeRules,
  subscriberInputFieldsValue,
  setSubscriberInputFieldsValue,
}) => {
  const styles = useStyles();
  const { t } = useTranslation();

  // Combine serviceFields arrays from all items in debtVerifyResults
  const combinedServiceFields: Array<ServiceField> = debtVerifyResults.flatMap(
    item => item.serviceFields || [],
  );

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
            value={subscriberInputFieldsValue.find(field => field.id === item.id)?.value || ''}
            onChangeText={(text: string) => {
              /**
               * Update the subscriberFieldsValue state with the new text for the specified id.
               *
               * @param {string} text - The new text value for the input field.
               */
              setSubscriberInputFieldsValue(prev => {
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
  }, [combinedServiceFields, setSubscriberInputFieldsValue, subscriberInputFieldsValue]);

  const getFeeValue = () => {
    const sum = sumForSubscriberFieldsValue(subscriberInputFieldsValue);
    return getFee(Number(sum), feeRules).toString();
  };

  return (
    <View>
      {renderInputs()}
      <View style={styles.wrapper}>
        {renderContent()}
        <SubscriberInfoItem name={t('checkPaymentProvider.commission')} value={getFeeValue()} />
      </View>
    </View>
  );
};
