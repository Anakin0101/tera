import React, { FC, useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, ListRenderItem } from 'react-native';
import { Item } from './Item';
import { config } from 'utils/config';
import { closeModal } from 'utils/modal';
import { useSelectAccountModal } from './container';
import { Account } from 'services/apis/productsAPI/productsAPI.types';
import { SelectAccountModalProps } from './SelectAccountModal.types';
import { useStyles } from './SelectAccountModal.styles';

const ITEM_HEIGHT = 85;

export const SelectAccountModal: FC<SelectAccountModalProps> = ({
  selectedAccount,
  onPress,
  selectedCurrency,
  setIsModalOpened,
}) => {
  const styles = useStyles();
  const { groupedAccountsByIban, isLoadingAccounts } = useSelectAccountModal();
  const [acc, setAcc] = useState<Account | null>(selectedAccount);

  const shouldAddPadding =
    (config.mobileHeight * 0.9 - ITEM_HEIGHT) / ITEM_HEIGHT < groupedAccountsByIban.length;

  const handlePress = (item: Account) => {
    setAcc(item);
    onPress(item);
    setTimeout(() => {
      closeModal();
      setIsModalOpened(false);
    }, 200);
  };

  const renderItem: ListRenderItem<Account> = ({ item }) => {
    return (
      <Item
        account={item}
        onPress={() => handlePress(item)}
        isSelected={item.accountId === acc?.accountId}
      />
    );
  };

  const listData = useMemo(() => {
    return groupedAccountsByIban
      .flatMap(item => item.accounts)
      .filter(account => account.ccy === selectedCurrency);
  }, [groupedAccountsByIban, selectedCurrency]);

  if (isLoadingAccounts) {
    return <ActivityIndicator />;
  }

  return (
    <FlatList
      data={listData}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[
        styles.contentContainer,
        shouldAddPadding && styles.additionalPadding,
      ]}
    />
  );
};
