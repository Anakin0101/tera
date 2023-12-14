import React, { FC } from 'react';
import { ActivityIndicator, Pressable, View } from 'react-native';
import { Divider, Text } from 'components';
import { Buttons } from './Buttons';
import { Close } from 'assets/SVGs';
import { Colors } from 'theme/Variables';
import { closeModal } from 'utils/modal';
import { SelectCurrency } from './SelectCurrency';
import { useFilterTransactionsByAcc } from './container';
import { TransactionByAccModalProps } from './FilterTransactionsModal.types';
import { useStyles } from './FilterTransactionsModal.styles';

export const FilterTransactionsByAccModal: FC<TransactionByAccModalProps> = ({ setFilters }) => {
  const styles = useStyles();
  const {
    iban,
    setIban,
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
        iban,
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
              iban={iban}
              setCurrency={setCurrency}
              currency={currency}
              groupedAccountsByIban={groupedAccountsByIban}
            />
          ) : (
            <View>
              {groupedAccountsByIban?.map(acc => (
                <Pressable key={acc.iban} onPress={() => setIban(acc.iban)}>
                  <View style={styles.account}>
                    <View>
                      <Text children={acc.accountName} color={Colors.textBlack500} />
                      <Text children={acc.iban} />
                    </View>
                    <View style={[styles.outline, iban === acc.iban && styles.selected]}>
                      {iban === acc.iban && <View style={styles.inner} />}
                    </View>
                  </View>
                  <Divider height={1} marginTop={18} marginBottom={18} />
                </Pressable>
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
