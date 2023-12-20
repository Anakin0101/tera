import React, { FC, useState } from 'react';
import { Pressable, View } from 'react-native';
import { TransactionByAccModalProps } from './FilterTransactionsModal.types';
import { useStyles } from './FilterTransactionsModal.styles';
import { Text } from 'components';
import { Buttons } from './Buttons';
import { closeModal } from 'utils/modal';
import { OpCategoryEnum } from 'services/apis/dashboardAPI/dashboardAPI.types';

const types = [
  {
    id: OpCategoryEnum.Income,
    title: 'filters.income',
  },
  {
    id: OpCategoryEnum.ToSomeone,
    title: 'filters.outcome',
  },
  {
    id: OpCategoryEnum.ToOwnAccount,
    title: 'filters.toOwnAccount',
  },
  {
    id: OpCategoryEnum.Exchange,
    title: 'filters.exchange',
  },
  {
    id: OpCategoryEnum.ToTreasure,
    title: 'filters.toTreasure',
  },
  {
    id: OpCategoryEnum.Payments,
    title: 'filters.payments',
  },
];

export const FilterByTransactionType: FC<TransactionByAccModalProps> = ({ setFilters }) => {
  const styles = useStyles();
  const [type, setType] = useState<OpCategoryEnum | null>(null);

  const handleSelect = () => {
    if (!type) {
      return;
    }
    setFilters(prev => ({
      ...prev,
      category: type,
    }));
    closeModal();
  };

  return (
    <>
      <View style={styles.transactionTypeModal}>
        {types.map(item => (
          <Pressable
            style={[styles.type, type === item.id && styles.selectedItem]}
            onPress={() => setType(item.id)}
          >
            <Text children={item.title} special={type === item.id} />
          </Pressable>
        ))}
      </View>
      <Buttons onClearPress={() => setType(null)} onSelectPress={handleSelect} />
    </>
  );
};
