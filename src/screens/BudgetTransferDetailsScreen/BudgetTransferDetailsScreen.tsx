import React, { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Button, TextInput } from 'components';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { useStyleTheme } from './BudgetTransferDetailsScreen.styles';
import { useTranslation } from 'react-i18next';
import { SelectedItemProp } from 'screens/TransferDetailScreen/TransferDetailScreen.types';
import { BudgetDetails } from 'components/Budget/BudgetDetails';
import { TransferDetailsList } from 'screens/TransferDetailScreen/TransferDetailsList';
import { Text } from 'components';
import { BudgetReceiver } from 'components/Budget/BudgetReceiver';
import { budgeTenum, budgetReceiverUser } from 'utils/transactionUtils';
import { useBudgetTransferDetail } from './Container';
import { useAppDispatch } from 'store/hooks/useAppDispatch';
import { setBudgetPerson } from 'store/slices/transfers';

export const BudgetTransferDetailsScreen = () => {
  const dispatch = useAppDispatch();
  const { navigateToTransferScreen, isTreasuryLoading } = useBudgetTransferDetail();
  const { t } = useTranslation();
  const [selectedItem, setSelectedItem] = useState<number>(1);
  const [selectPersonalId, setSelectPersonalId] = useState<string>('');
  const [userName, setUserName] = useState<string>('');

  const selectedItemFromStore = useAppSelector(
    (state: { transfers: SelectedItemProp }) => state.transfers,
  );
  const { accountFromData, selectedPrice } = selectedItemFromStore;

  const styles = useStyleTheme();

  const onTextChange = (text: string) => {
    setSelectPersonalId(text);
    dispatch(setBudgetPerson({ payerCode: text }));
  };
  const onTextChangeUserName = (text: string) => {
    setUserName(text);
    dispatch(setBudgetPerson({ payerName: text }));
  };
  useEffect(() => {
    dispatch(setBudgetPerson({ payForSomeone: selectedItem === budgeTenum.FOR_OTHERS }));
  }, [dispatch, selectedItem]);
  return (
    <ScrollView style={styles.container}>
      <View style={styles.containerWrapper}>
        <BudgetDetails accountFromData={accountFromData} selectedPrice={selectedPrice} />
      </View>

      <View style={styles.details}>
        <View style={styles.wrapper}>
          <Text children="transactions.transferforSomeone" style={styles.title} />
          <View style={styles.budgetInputView}>
            {budgetReceiverUser.map((user, index) => (
              <BudgetReceiver
                account={user}
                key={user.id + index.toString()}
                onPress={() => setSelectedItem(user.id)}
                isSelected={selectedItem === user.id}
              />
            ))}
          </View>
          {selectedItem === budgeTenum.FOR_OTHERS && (
            <TextInput
              inputStyle={styles.input}
              value={selectPersonalId}
              keyboardType="numeric"
              label="registration.personalId"
              onChangeText={onTextChange}
            />
          )}
          {selectedItem === budgeTenum.FOR_OTHERS && (
            <View style={styles.userView}>
              <TextInput
                inputStyle={styles.input}
                value={userName}
                label="checkPaymentProvider.name"
                onChangeText={onTextChangeUserName}
              />
            </View>
          )}

          <TransferDetailsList selectedItemFromStore={selectedItemFromStore} />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button.Primary
          text={t('transfers.transfer')}
          hitSlop={15}
          fixedWidth
          isLoading={isTreasuryLoading}
          onPress={() => navigateToTransferScreen()}
        />
      </View>
    </ScrollView>
  );
};
