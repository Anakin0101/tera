import React, { useCallback } from 'react';
import { View } from 'react-native';
import { useStyles } from './SubscriberInfo.styles';
import { useTranslation } from 'react-i18next';
import { TextInput } from 'components/TextInput/TextInput';
import { SubscriberInfoItem } from './SubscriberInfoItem';
import { ServiceField } from 'services/apis/paymentsAPI/paymentsAPI.types';
import { getFee } from 'utils/paymentUtils';
import { SubscriberInfoProps } from './SubscriberInfo.types';

export const SubscriberInfo: React.FC<SubscriberInfoProps> = ({
  debtVerifyResults,
  payableMoney = '',
  setPayableMoney,
  feeRules,
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

  return (
    <View>
      <TextInput label="თანხა" value={payableMoney} onChangeText={setPayableMoney} marginTop={24} />
      <View style={styles.wrapper}>
        {renderContent()}
        <SubscriberInfoItem
          name={t('checkPaymentProvider.commission')}
          value={getFee(Number(payableMoney), feeRules).toString()}
        />
      </View>
    </View>
  );
};
