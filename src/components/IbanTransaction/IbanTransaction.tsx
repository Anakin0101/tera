import { View } from 'react-native';
import React, { useEffect, useCallback } from 'react';
import { Text } from 'components';
import { Button, TextInput, TransferTemplates } from 'components';
import { useOtherBanksContainer } from 'screens/OtherBanksTransactionScreen/container';
import { debounce } from 'utils/debounce';
import { DetailsItem } from 'components/DetailsItem/DetailsItem';
import { useNavigation } from '@react-navigation/native';
import { TransactionsStackScreenProps } from 'navigation/types';
import { TRANSFER_TO_OTHER_BANK_ACCOUNT_SCREEN } from 'navigation/ScreenNames';
import { useTransactionsScreen } from 'screens/TransactionsScreen/container';
import { useAppDispatch } from 'store/hooks/useAppDispatch';
import { setAccountToData, setReceiverInfo } from 'store/slices/transfers/indext';
import { ScrollView } from 'react-native-gesture-handler';
import { useStyles } from './IbanTransaction.styles';

const IbanTransaction = () => {
  const dispatch = useAppDispatch();
  const styles = useStyles();
  const { navigate } = useNavigation<TransactionsStackScreenProps<'TransferToAccountScreen'>>();
  const { handleCheckIban, isSuccess, data } = useOtherBanksContainer();
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
    invoiceFile,
    handleFilePick,
    apiCallInitiated,
    setApiCallInitiated,
    INPUT_LENGTH,
  } = useTransactionsScreen();

  const debouncedHandleChange = debounce((value: string) => {
    if (value.length <= INPUT_LENGTH) {
      setDebouncedAccountName(value.toUpperCase());
      dispatch(setAccountToData({ iban: value.toUpperCase() }));
    }
  }, 300);

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
    const ibanRegex = /^[A-Z]{2}\d{2}[A-Z\d]+$/;

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
      });
    }
  };

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

  return (
    <ScrollView style={styles.scroll}>
      {apiCallInitiated && data ? (
        <View>
          <Text children="მიმღების დეტალები" size={18} demiBold />
          <DetailsItem label="მიმღების ანგარიში" value={typedAccountName} />
          <DetailsItem label="მიმღების ანგარიში" value={data.customerName} />
          <View style={styles.inputView}>
            <TextInput
              inputStyle={styles.inputStyle}
              label={invoiceFile ? '' : 'ატვირთე ინვოისი'}
              value={invoiceFile || ''}
              editable={false}
              marginTop={32}
              invoice
              invoiceClick={handleFilePick}
            />
          </View>
        </View>
      ) : (
        <>
          <TextInput
            inputStyle={styles.inputStyle}
            label="მიმღების ანგარიში"
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
              templates={templates?.templates.slice(0, 4)}
              temlpatesLoading={temlpatesLoading}
            />
          </View>
        </>
      )}
      <View>
        <Button.Primary text="შემდეგი" onPress={navigateToTransferScreen} />
      </View>
    </ScrollView>
  );
};

export default IbanTransaction;
