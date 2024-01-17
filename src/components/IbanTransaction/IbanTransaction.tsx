import { View, Image, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useCallback, useMemo } from 'react';
import { Text } from 'components';
import { Button, TextInput, TransferTemplates, LoadingView } from 'components';
import { useOtherBanksContainer } from 'screens/OtherBanksTransactionScreen/container';
import { DetailsItem } from 'components/DetailsItem/DetailsItem';
import { useNavigation } from '@react-navigation/native';
import { TransactionsStackScreenProps } from 'navigation/types';
import { TRANSFER_TO_OTHER_BANK_ACCOUNT_SCREEN } from 'navigation/ScreenNames';
import { useTransactionsScreen } from 'screens/TransactionsScreen/container';
import { useAppDispatch } from 'store/hooks/useAppDispatch';
import { setAccountToData, setReceiverInfo } from 'store/slices/transfers';
import { useStyles } from './IbanTransaction.styles';
import { TransactionModal } from 'components/modals';
import { openModal } from 'utils/modal';
import { SelectedItem } from 'components/OtherBanksTransactionTabBar/OtherBanksTransactionTabBar.types';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { ChevronDown } from 'assets/SVGs';
import { Colors } from 'theme/Variables';
import useBankIcons from './useIban';
import { Error } from 'assets/SVGs';
import { IBAN } from 'constants/transactionConstants';
import { ibanRegex } from 'constants/transactionConstants';

const IbanTransaction = () => {
  const dispatch = useAppDispatch();
  const styles = useStyles();
  const selectedItemFromStore = useAppSelector(
    (state: { transfers: SelectedItem }) => state.transfers,
  );
  const { selectedTransactionType } = selectedItemFromStore;
  const { navigate } = useNavigation<TransactionsStackScreenProps<'TransferToAccountScreen'>>();
  const { handleCheckIban, isSuccess, data } = useOtherBanksContainer(IBAN);
  const {
    templates,
    temlpatesLoading,
    selectedData,
    setSelectedData,
    typedAccountName,
    setTypedAccountName,
    debouncedAccountName,
    setDebouncedAccountName,
    previousAccountName,
    setPreviousAccountName,
    apiCallInitiated,
    setApiCallInitiated,
    INPUT_LENGTH,
  } = useTransactionsScreen();

  const { bankIcon, debouncedHandleChange } = useBankIcons(
    data?.bicCode,
    setDebouncedAccountName,
    dispatch,
    INPUT_LENGTH,
  );

  const selectTemplate = useCallback(
    (iban: any) => {
      setSelectedData(iban);
      setTypedAccountName(iban);
      handleCheckIban(iban);
      setApiCallInitiated(true);
      dispatch(setAccountToData({ iban: iban.toUpperCase() }));
    },
    [setSelectedData, setTypedAccountName, handleCheckIban, setApiCallInitiated, dispatch],
  );

  useEffect(() => {
    dispatch(
      setAccountToData({ name: data?.customerName, iban: selectedData || typedAccountName }),
    );
    dispatch(setReceiverInfo(data));
  }, [data, dispatch, selectedData, typedAccountName]);

  const handleChange = (value: string) => {
    const uppercaseValue = value.toUpperCase();
    if (value.length <= INPUT_LENGTH) {
      setTypedAccountName(uppercaseValue);
      debouncedHandleChange(uppercaseValue);
    }
  };

  useEffect(() => {
    if (
      debouncedAccountName.length === INPUT_LENGTH &&
      ibanRegex.test(debouncedAccountName) &&
      debouncedAccountName !== previousAccountName
    ) {
      setApiCallInitiated(true);
      handleCheckIban(debouncedAccountName);
      setPreviousAccountName(debouncedAccountName);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedAccountName, handleCheckIban, previousAccountName]);

  useEffect(() => {
    setApiCallInitiated(false);
  }, [setApiCallInitiated]);

  const navigateToTransferScreen = () => {
    if (isSuccess) {
      navigate(TRANSFER_TO_OTHER_BANK_ACCOUNT_SCREEN, {
        fromOtherBank: true,
        fromIban: true,
      });
    }
  };

  const filteredTemplates = useMemo(() => {
    if (!templates?.templates) {
      return [];
    }

    return templates.templates.filter(item => item.type === 4).slice(0, 4);
  }, [templates?.templates]);

  if (temlpatesLoading) {
    return <LoadingView />;
  }

  return (
    <ScrollView style={styles.scroll}>
      <Text children="personalNumber.Recepient" size={18} demiBold />
      {apiCallInitiated && data ? (
        <View>
          <View style={styles.wrapper}>
            <DetailsItem label="personalNumber.Receiver" value={typedAccountName} />
            {bankIcon && <Image source={bankIcon} style={styles.image} />}
          </View>
          <DetailsItem label="transactionDetails.receiver" value={data?.bankName} />
          <TouchableOpacity
            onPress={() =>
              openModal({
                element: <TransactionModal />,
                title: 'transactions.details',
                titlePosition: 'center',
                disablePanning: true,
              })
            }
          >
            <View style={styles.chevron}>
              <Text children="transactionDetails.type" size={12} demiBold />
              <ChevronDown color={Colors.black700} />
            </View>
            <Text children={selectedTransactionType.name} size={12} />
          </TouchableOpacity>
          {selectedTransactionType.name === 'transactions.standard' ? (
            <View style={styles.fastPayment}>
              <Error />
              <Text children="transactions.standardText" size={12} color={Colors.textBlack} />
            </View>
          ) : (
            <View style={styles.fastPayment}>
              <Error />
              <Text children="transactions.fastText" size={12} color={Colors.textBlack} />
            </View>
          )}
        </View>
      ) : (
        <>
          <TextInput
            inputStyle={styles.inputStyle}
            label="personalNumber.Receiver"
            value={typedAccountName}
            maxLength={22}
            onChangeText={value => handleChange(value)}
            marginTop={32}
            autoFocus
          />
          <View style={styles.template}>
            <TransferTemplates
              fromOtherBanks
              setTypedAccountName={setTypedAccountName}
              selectedData={selectedData}
              setSelectedData={selectTemplate}
              templates={filteredTemplates}
              temlpatesLoading={temlpatesLoading}
            />
          </View>
        </>
      )}

      <View style={styles.btn}>
        <Button.Primary text="personalNumber.next" onPress={navigateToTransferScreen} fixedWidth />
      </View>
    </ScrollView>
  );
};

export default IbanTransaction;
