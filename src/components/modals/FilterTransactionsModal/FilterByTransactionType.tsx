import React, { FC, useState } from 'react';
import { Pressable, View } from 'react-native';
import { TransactionByAccModalProps } from './FilterTransactionsModal.types';
import { useStyles } from './FilterTransactionsModal.styles';
import { Text } from 'components';
import { Buttons } from './Buttons';
import { closeModal } from 'utils/modal';

const transactionTypes = [
  'საკუთარ ანგარიშებს შორის გადარიცხვა',
  'კონვერტაცია',
  'შემოსავლები',
  'გადარიცხვა და თანხის გატანა',
  'კომუნალური და მობილური',
  'სხვა ხარჯები',
];

export const FilterByTransactionType: FC<TransactionByAccModalProps> = ({ setFilters }) => {
  const styles = useStyles();
  const [type, setType] = useState('');

  const handleSelect = () => {
    if (!type) {
      return;
    }
    setFilters(prev => ({
      ...prev,
      type,
    }));
    closeModal();
  };

  return (
    <>
      <View style={styles.transactionTypeModal}>
        {transactionTypes.map(transactionType => (
          <Pressable
            style={[styles.type, type === transactionType && styles.selectedItem]}
            onPress={() => setType(transactionType)}
          >
            <Text children={transactionType} special={type === transactionType} />
          </Pressable>
        ))}
      </View>
      <Buttons onClearPress={() => setType('')} onSelectPress={handleSelect} />
    </>
  );
};
