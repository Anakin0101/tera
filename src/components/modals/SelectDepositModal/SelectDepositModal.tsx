import React, { FC, useState } from 'react';
import { FlatList, ListRenderItem } from 'react-native';
import { SelectDepositModalProps } from './SelectDepositModal.types';
import { Item } from './Item';
import { useStyles } from './SelectDepositModal.styles';
import { WalletAccount } from 'services/apis/productsAPI/productsAPI.types';
import { closeModal } from 'utils/modal';
import { config } from 'utils/config';

const ITEM_HEIGHT = 85;

export const SelectDepositModal: FC<SelectDepositModalProps> = ({
  deposits,
  onPress,
  selectedDeposit,
  setSelectedCurrency,
}) => {
  const styles = useStyles();
  const [account, setAccount] = useState<WalletAccount | null>(selectedDeposit);

  const shouldAddPadding =
    (config.mobileHeight * 0.9 - ITEM_HEIGHT) / ITEM_HEIGHT < deposits.length;

  const handlePress = (item: WalletAccount) => {
    setAccount(item);
    onPress(item);
    setSelectedCurrency(item.currency);
    setTimeout(() => closeModal(), 200);
  };

  const renderItem: ListRenderItem<WalletAccount> = ({ item }) => {
    return (
      <Item
        account={item}
        onPress={() => handlePress(item)}
        isSelected={item.accountId === account?.accountId}
      />
    );
  };

  return (
    <FlatList
      data={deposits}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[
        styles.contentContainer,
        shouldAddPadding && styles.additionalPadding,
      ]}
    />
  );
};
