import React, { FC, useCallback, useMemo, useState } from 'react';
import { FlatList, View } from 'react-native';
import { Item } from './Item';
import { AutoPaymentTypeEnum } from 'services/apis/productsAPI/productsAPI.types';
import {
  FooterProps,
  ItemT,
  ModalProps,
  RenderItem,
  SelectedMethod,
} from './AutomaticPaymentMethodModal.types';
import { useStyles } from './AutomaticPaymentMethodModal.styles';
import { Button } from 'components';
import { useTranslation } from 'react-i18next';

const Footer: FC<FooterProps> = ({ handleSelectPress, isDisabled }) => {
  const styles = useStyles();

  return (
    <View style={styles.buttonContainer}>
      <Button.Primary
        fullWidth
        text="common.select"
        onPress={handleSelectPress}
        customWrapperStyle={[styles.button, isDisabled && styles.disbaled]}
      />
    </View>
  );
};

export const AutomaticPaymentMethodModal: FC<ModalProps> = ({
  selectedMethod,
  onPress,
  directDebitType,
}) => {
  const styles = useStyles();
  const [method, setMethod] = useState<SelectedMethod>(selectedMethod);
  const { t } = useTranslation();

  const paymentMethod = useMemo(
    () => [
      {
        name: t('automaticPayments.fixedAmount'),
        type: AutoPaymentTypeEnum.FixedAmount,
      },
    ],
    [t],
  );

  const additionalMethods = useMemo(
    () => [
      {
        name: t('automaticPayments.byDebt'),
        type: AutoPaymentTypeEnum.ByDebt,
      },
      {
        name: t('automaticPayments.fixedDateByDebt'),
        type: AutoPaymentTypeEnum.FixedDateByDebt,
      },
    ],
    [t],
  );

  const handleSelectPress = useCallback(() => {
    onPress(method);
  }, [method, onPress]);

  const methods = useMemo(() => {
    if (directDebitType === 1) {
      return [...paymentMethod, ...additionalMethods];
    }
    return paymentMethod;
  }, [additionalMethods, directDebitType, paymentMethod]);

  const renderItem: RenderItem = useCallback(
    ({ item }) => {
      const handlePress = () => setMethod(item);

      return <Item item={item} onPress={handlePress} isSelected={item?.type === method?.type} />;
    },
    [method],
  );

  const keyExtractor = useCallback((item: ItemT) => String(item.type), []);

  return (
    <FlatList
      bounces={false}
      data={methods}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      style={styles.list}
      ListFooterComponent={<Footer handleSelectPress={handleSelectPress} isDisabled={!method} />}
    />
  );
};
