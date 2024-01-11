import React, { Fragment, useState } from 'react';
import { Pressable, View } from 'react-native';
import { Divider, Text } from 'components';
import { CheckCircle } from 'assets/SVGs';
import { useStyles } from './TransactionModal.styles';
import { closeModal } from 'utils/modal';
import { setSelectedTransactionType } from 'store/slices/transfers';
import { useAppDispatch } from 'store/hooks/useAppDispatch';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { SelectedItem } from 'components/OtherBanksTransactionTabBar/OtherBanksTransactionTabBar.types';
const types = [
  {
    type: 'transactions.standard',
    isSelected: false,
    id: 1,
  },
  {
    type: 'transactions.fast',
    isSelected: false,
    id: 2,
  },
];

export const TransactionModal = () => {
  const selectedItemFromStore = useAppSelector(
    (state: { transfers: SelectedItem }) => state.transfers,
  );
  const { selectedTransactionType } = selectedItemFromStore;
  const dispatch = useAppDispatch();
  const styles = useStyles();
  const [selectedType, setselectedType] = useState(types);

  const handlePress = (index: number) => {
    const updatedType = selectedType.map((item, i) => ({
      ...item,
      isSelected: i === index,
    }));

    dispatch(
      setSelectedTransactionType({
        name: updatedType[index].type,
        isFast: updatedType[index].type === 'transactions.fast',
        selected: updatedType[index].id,
      }),
    );
    setselectedType(updatedType);
    closeModal();
  };

  return (
    <View>
      <View style={styles.wrapper}>
        {selectedType.map((item, index) => (
          <Fragment key={index}>
            <Pressable style={styles.container} onPress={() => handlePress(index)}>
              <Text children={item.type} />
              {selectedTransactionType.selected === item.id && (
                <View style={styles.icon}>
                  <CheckCircle />
                </View>
              )}
            </Pressable>
            {!index && <Divider style={styles.divider} height={1} />}
          </Fragment>
        ))}
      </View>
    </View>
  );
};
