import { View, ScrollView } from 'react-native';
import React, { useCallback, useEffect } from 'react';
import { TextInput, Text, Button, TransferTemplates } from 'components';
import { useStyles } from './MobileTransaction.styles';
import { useOtherBanksContainer } from 'screens/OtherBanksTransactionScreen/container';
import { useTransactionsScreen } from 'screens/TransactionsScreen/container';
import { setAccountToData, setReceiverInfo, setTemplateForIban } from 'store/slices/transfers';
import { useAppDispatch } from 'store/hooks/useAppDispatch';
import { useNavigation } from '@react-navigation/native';
import { TransactionsStackScreenProps } from 'navigation/types';
import { DetailsItem } from 'components/DetailsItem/DetailsItem';
import { TRANSFER_TO_OTHER_BANK_ACCOUNT_SCREEN } from 'navigation/ScreenNames';
import { MOBILE, mobileNumberRegex } from 'constants/transactionConstants';
import { FinancialTransferTypeEnum } from 'services/apis/transfersAPI/transfersAPI.types';
import useBankIcons from 'components/IbanTransaction/useIban';

const MobileTransaction = () => {
  const { navigate } =
    useNavigation<TransactionsStackScreenProps<'TransferToOtherBankAccountScreen'>>();
  const dispatch = useAppDispatch();

  const styles = useStyles();

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
    MOBILE_NUMBER_LENGTH,
  } = useTransactionsScreen();

  const { handlePersonalNumber, data, isSuccess, isError } = useOtherBanksContainer(MOBILE);
  const { debouncedHandleChange } = useBankIcons(
    null,
    setDebouncedAccountName,
    dispatch,
    MOBILE_NUMBER_LENGTH,
  );
  const selectTemplate = useCallback(
    (pin: any) => {
      setSelectedData(pin);
      setTypedAccountName(pin);
      handlePersonalNumber(pin);
      setApiCallInitiated(true);
      dispatch(setAccountToData({ pin: pin }));
      dispatch(setTemplateForIban(pin));
    },
    [setSelectedData, setTypedAccountName, handlePersonalNumber, setApiCallInitiated, dispatch],
  );

  useEffect(() => {
    dispatch(
      setAccountToData({
        name: data?.customerName,
        iban: selectedData || typedAccountName,
      }),
    );
    dispatch(setReceiverInfo(data));
  }, [data, dispatch, selectedData, typedAccountName]);

  const handleChange = (value: string) => {
    const uppercaseValue = value.toUpperCase();
    if (value.length <= MOBILE_NUMBER_LENGTH) {
      setTypedAccountName(uppercaseValue);
      debouncedHandleChange(uppercaseValue);
    }
  };

  useEffect(() => {
    if (
      debouncedAccountName.length === MOBILE_NUMBER_LENGTH &&
      mobileNumberRegex.test(debouncedAccountName) &&
      debouncedAccountName !== previousAccountName
    ) {
      setApiCallInitiated(true);
      handlePersonalNumber(debouncedAccountName);
      setPreviousAccountName(debouncedAccountName);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedAccountName, handlePersonalNumber, previousAccountName]);

  const filteredTemplates = templates?.templates.filter(
    item =>
      item.type === FinancialTransferTypeEnum.ToSomeoneInsideBank &&
      item.bankInternal?.personalId !== null,
  );
  const navigateToTransferScreen = () => {
    if (isSuccess) {
      navigate(TRANSFER_TO_OTHER_BANK_ACCOUNT_SCREEN, {
        fromOtherBank: true,
        fromMobile: true,
      });
    }
  };

  return (
    <ScrollView style={styles.scroll}>
      <Text children="personalNumber.Recepient" size={18} demiBold />
      {apiCallInitiated && data ? (
        <View>
          <DetailsItem label="personalNumber.mobile" value={typedAccountName} underline />
          <DetailsItem label="personalNumber.Address" value={data.customerName} underline />
        </View>
      ) : (
        <>
          <TextInput
            inputStyle={styles.inputStyle}
            label="personalNumber.Recepient"
            value={typedAccountName}
            maxLength={22}
            onChangeText={value => handleChange(value)}
            marginTop={32}
            autoFocus
          />
          {isError && <Text children={isError} />}
          <View style={styles.template}>
            <TransferTemplates
              fromOtherBanks
              setTypedAccountName={setTypedAccountName}
              selectedData={selectedData}
              setSelectedData={selectTemplate}
              templates={filteredTemplates}
              temlpatesLoading={temlpatesLoading}
              fromPin
            />
          </View>
        </>
      )}
      <View>
        <Button.Primary text="personalNumber.next" onPress={navigateToTransferScreen} />
      </View>
    </ScrollView>
  );
};

export default MobileTransaction;
