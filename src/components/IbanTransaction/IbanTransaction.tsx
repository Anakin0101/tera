import { View, Image, ScrollView, Pressable } from 'react-native';
import React, { useEffect, useCallback, useMemo, useState } from 'react';
import { Text } from 'components';
import { Button, TextInput, TransferTemplates, LoadingView } from 'components';
import { useOtherBanksContainer } from 'screens/OtherBanksTransactionScreen/container';
import { DetailsItem } from 'components/DetailsItem/DetailsItem';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { TransactionsStackScreenProps } from 'navigation/types';
import { TRANSFER_TO_OTHER_BANK_ACCOUNT_SCREEN } from 'navigation/ScreenNames';
import { useTransactionsScreen } from 'screens/TransactionsScreen/container';
import { useAppDispatch } from 'store/hooks/useAppDispatch';
import {
  setAccountToData,
  setReceiverInfo,
  setSelectedTransactionType,
} from 'store/slices/transfers';
import { useStyles } from './IbanTransaction.styles';
import { TransactionModal } from 'components/modals';
import { openModal } from 'utils/modal';
import { SelectedItem } from 'components/OtherBanksTransactionTabBar/OtherBanksTransactionTabBar.types';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { ChevronDown, Copy } from 'assets/SVGs';
import { Colors } from 'theme/Variables';
import useBankIcons from './useIban';
import { IBAN } from 'constants/transactionConstants';
import { ibanRegex } from 'constants/transactionConstants';
import { Error } from 'assets/SVGs';
import { openToast } from 'utils/toast';
import { useTranslation } from 'react-i18next';
import { TERRA_BANK_CODE } from 'constants/BankCodes';
import { useCopyToClipboard } from 'hooks';

const IbanTransaction = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const styles = useStyles();
  const selectedItemFromStore = useAppSelector(
    (state: { transfers: SelectedItem }) => state.transfers,
  );
  const { copyToClipboard } = useCopyToClipboard();

  const { selectedTransactionType } = selectedItemFromStore;
  const { navigate } = useNavigation<TransactionsStackScreenProps<'TransferToAccountScreen'>>();
  const { handleCheckIban, isSuccess, data } = useOtherBanksContainer(IBAN);
  const [receiver, setReceiver] = useState<string>('');
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
    if (data && !data.ibanIsValid) {
      openToast(`${t('transactionDetails.validIbanPrompt')}`, 'error');
    }
  }, [data, t]);

  useFocusEffect(
    useCallback(() => {
      if (data?.bicCode !== TERRA_BANK_CODE) {
        dispatch(
          setSelectedTransactionType({
            name: '',
            isFast: null,
            selected: null,
          }),
        );
      }
    }, [dispatch, data?.bicCode]),
  );

  useEffect(() => {
    dispatch(
      setAccountToData({ name: data?.customerName, iban: selectedData || typedAccountName }),
    );
    dispatch(setReceiverInfo(data));
  }, [data, dispatch, selectedData, typedAccountName]);
  const hendleRecieverName = (value: string) => {
    setReceiver(value);
    dispatch(setReceiverInfo(value));
  };

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
    if (data?.bicCode === TERRA_BANK_CODE) {
      if (isSuccess && data.ibanIsValid) {
        navigate(TRANSFER_TO_OTHER_BANK_ACCOUNT_SCREEN, {
          fromOtherBank: true,
          fromIban: true,
          receiver: receiver,
        });
      }
    } else {
      if (isSuccess && data.ibanIsValid && selectedTransactionType.name && receiver) {
        navigate(TRANSFER_TO_OTHER_BANK_ACCOUNT_SCREEN, {
          fromOtherBank: true,
          fromIban: true,
          receiver: receiver,
        });
      } else if (!selectedTransactionType.name) {
        openToast(`${t('transactionDetails.validTransactionPrompt')}`, 'error');
      } else if (!receiver) {
        openToast(`${t('transactionDetails.validRecieverPrompt')}`, 'error');
      }
    }
  };

  const filteredTemplates = useMemo(() => {
    if (!templates?.templates) {
      return [];
    }

    return templates.templates.filter(item => item.type === 4).slice(0, 4);
  }, [templates?.templates]);

  const copyIban = () => {
    typedAccountName && copyToClipboard(typedAccountName, 'products.clipboard');
  };

  if (temlpatesLoading) {
    return <LoadingView />;
  }

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.bottomStretchStyle}>
      <Text children="personalNumber.Recepient" size={18} demiBold />
      {apiCallInitiated && data && data?.ibanIsValid ? (
        <View>
          <View style={styles.wrapper}>
            <DetailsItem
              label="transactionDetails.receiverIban"
              value={typedAccountName}
              onPress={copyIban}
              icon={<Copy />}
            />
            {bankIcon && <Image source={bankIcon} style={styles.image} />}
          </View>

          {data?.bicCode === TERRA_BANK_CODE ? (
            <DetailsItem label={t('transactionDetails.receiver')} value={data?.customerName} />
          ) : (
            <>
              <TextInput
                inputStyle={styles.inputStyle}
                label="transactionDetails.receiver"
                value={receiver}
                onChangeText={text => hendleRecieverName(text)}
                marginTop={32}
                autoFocus
              />
              <Pressable
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
              </Pressable>
              {selectedTransactionType.name === 'transactions.standard' ? (
                <View style={styles.fastPayment}>
                  <Error />
                  <Text children="transactions.standardText" size={12} color={Colors.textBlack} />
                </View>
              ) : selectedTransactionType.name ? (
                <View style={styles.fastPayment}>
                  <Error />
                  <Text children="transactions.fastText" size={12} color={Colors.textBlack} />
                </View>
              ) : null}
            </>
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

      <View style={[styles.btn, styles.bottomStretchStyle]}>
        <Button.Primary text="personalNumber.next" onPress={navigateToTransferScreen} fullWidth />
      </View>
    </ScrollView>
  );
};

export default IbanTransaction;
