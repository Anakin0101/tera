import React, { FC } from 'react';
import { ActivityIndicator, Pressable, View } from 'react-native';
import { Divider, Text } from 'components';
import { Buttons } from './Buttons';
import { Close } from 'assets/SVGs';
// import { Colors } from 'theme/Variables';
import { closeModal } from 'utils/modal';
import { SelectCurrency } from './SelectCurrency';
import { useFilterTransactionsByAcc } from './container';
import { TransactionByAccModalProps } from './FilterTransactionsModal.types';
import { useStyles } from './FilterTransactionsModal.styles';
import { Account } from './Account';

export const FilterTransactionsByAccModal: FC<TransactionByAccModalProps> = ({ setFilters }) => {
  const styles = useStyles();
  const {
    accountNumber,
    setAccountNumber,
    currency,
    setCurrency,
    modalTitle,
    onClearPress,
    accountSelected,
    onSelectAccountPress,
    isLoadingAccounts,
    groupedAccountsByIban,
  } = useFilterTransactionsByAcc();

  const handleFinish = () => {
    if (!currency) {
      return;
    }
    setFilters(prev => {
      return {
        ...prev,
        accountNumber,
        currency,
      };
    });
    closeModal();
  };

  return (
    <>
      <View style={styles.title}>
        <Text children={modalTitle} size={18} medium />
        <Pressable onPress={closeModal}>
          <Close />
        </Pressable>
      </View>
      {!accountSelected && <Divider height={1} marginTop={28} marginBottom={18} />}
      {isLoadingAccounts ? (
        <ActivityIndicator />
      ) : (
        <>
          {accountSelected ? (
            <SelectCurrency
              accountNumber={accountNumber}
              setCurrency={setCurrency}
              currency={currency}
              groupedAccountsByIban={groupedAccountsByIban}
            />
          ) : (
            <View>
              {groupedAccountsByIban?.map(acc => (
                <Account
                  account={acc}
                  key={acc.iban}
                  onPress={() => setAccountNumber(acc.accountNumber)}
                  isSelected={accountNumber === acc.accountNumber}
                />
              ))}
            </View>
          )}
        </>
      )}
      <Buttons
        onClearPress={onClearPress}
        onSelectPress={accountSelected ? handleFinish : onSelectAccountPress}
      />
    </>
  );
};
