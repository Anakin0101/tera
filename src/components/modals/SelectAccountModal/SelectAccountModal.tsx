import React, { FC, useState } from 'react';
import { ActivityIndicator, FlatList, ListRenderItem } from 'react-native';
import { useSelectAccountModal } from './container';
import { Account } from '../FilterTransactionsModal/Account';
import { config } from 'utils/config';
import { IGroupedAccountsByIban } from 'components/CardsAndAccounts/CardsAndAccounts.types';
import { useStyles } from './SelectAccountModal.styles';
import { SelectAccountModalProps } from './SelectAccountModal.types';

import { closeModal } from 'utils/modal';

const ITEM_HEIGHT = 85;

export const SelectAccountModal: FC<SelectAccountModalProps> = ({ selectedAccount, onPress }) => {
  const styles = useStyles();
  const { groupedAccountsByIban, isLoadingAccounts } = useSelectAccountModal();
  const [acc, setAcc] = useState<IGroupedAccountsByIban | null>(selectedAccount);

  const shouldAddPadding =
    (config.mobileHeight * 0.9 - ITEM_HEIGHT) / ITEM_HEIGHT < groupedAccountsByIban.length;

  const handlePress = (item: IGroupedAccountsByIban) => {
    setAcc(item);
    onPress(item);
    setTimeout(() => closeModal(), 200);
  };

  const renderItem: ListRenderItem<IGroupedAccountsByIban> = ({ item }) => {
    return (
      <Account
        account={item}
        onPress={() => handlePress(item)}
        isSelected={item.iban === acc?.iban}
      />
    );
  };

  if (isLoadingAccounts) {
    return <ActivityIndicator />;
  }

  return (
    <FlatList
      data={groupedAccountsByIban}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[
        styles.contentContainer,
        shouldAddPadding && styles.additionalPadding,
      ]}
    />
  );
};
