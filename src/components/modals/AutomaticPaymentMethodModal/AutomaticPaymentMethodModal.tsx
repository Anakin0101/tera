import React, { FC, useCallback, useState } from 'react';
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

const AUTOMATIC_PAYMENT_METHOD = [
  {
    name: 'ფიქსირებული თანხა',
    type: AutoPaymentTypeEnum.FixedAmount,
  },
  {
    name: 'დავალიანების მიხედვით',
    type: AutoPaymentTypeEnum.ByDebt,
  },
  {
    name: 'ფიქსირებულ რიცხვში',
    type: AutoPaymentTypeEnum.FixedDateByDebt,
  },
];

const Footer: FC<FooterProps> = ({ handleSelectPress }) => {
  const styles = useStyles();

  return (
    <View style={styles.buttonContainer}>
      <Button.Primary
        fullWidth
        text="common.select"
        onPress={handleSelectPress}
        customWrapperStyle={styles.button}
      />
    </View>
  );
};

export const AutomaticPaymentMethodModal: FC<ModalProps> = ({ selectedMethod, onPress }) => {
  const styles = useStyles();
  const [method, setMethod] = useState<SelectedMethod>(selectedMethod);

  const handleSelectPress = useCallback(() => {
    onPress(method);
  }, [method, onPress]);

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
      data={AUTOMATIC_PAYMENT_METHOD}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      style={styles.list}
      ListFooterComponent={<Footer handleSelectPress={handleSelectPress} />}
    />
  );
};
