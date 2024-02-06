import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
import { Text } from 'components';
import { useStyles } from './TariffDescriptionSingle.styles';
import { useTranslation } from 'react-i18next';

type PaymentType = 'monthly' | 'annual';

export const ChangePackagesButtons = ({}) => {
  const [activePaymentType, setActivePaymentType] = useState<PaymentType>('monthly');

  const styles = useStyles();
  const { t } = useTranslation();

  const onChangePress = (type: PaymentType) => {
    setActivePaymentType(type);
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={[
          styles.button,
          activePaymentType === 'monthly' ? styles.activeButton : styles.inactiveButton,
        ]}
        onPress={() => onChangePress('monthly')}
      >
        <Text
          style={[
            styles.buttonText,
            activePaymentType === 'monthly' ? styles.buttonActiveText : styles.inactiveButtontext,
          ]}
        >
          {t('newDeposit.monthly')}
        </Text>
      </Pressable>
      <Pressable
        style={[
          styles.button,
          activePaymentType === 'annual' ? styles.activeButton : styles.inactiveButton,
        ]}
        onPress={() => onChangePress('annual')}
      >
        <Text
          style={[
            styles.buttonText,
            activePaymentType === 'annual' ? styles.buttonActiveText : styles.inactiveButtontext,
          ]}
        >
          {t('newDeposit.annual')}
        </Text>
      </Pressable>
    </View>
  );
};
