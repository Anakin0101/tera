import { View, ScrollView } from 'react-native';
import React, { useCallback, useEffect } from 'react';
import { TextInput, Text, Button, TransferTemplates, LoadingView } from 'components';
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
import { getMobileNumberWithPrefix } from 'utils/transactionUtils/getMobileNumberWithPrefix';

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

  const { handleMobileNumber, data, isSuccess, isError } = useOtherBanksContainer(MOBILE);
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
      handleMobileNumber(getMobileNumberWithPrefix(pin));
      setApiCallInitiated(true);
      dispatch(setAccountToData({ pin: pin }));
      dispatch(setTemplateForIban(pin));
    },
    [setSelectedData, setTypedAccountName, handleMobileNumber, setApiCallInitiated, dispatch],
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
      handleMobileNumber(debouncedAccountName);
      setPreviousAccountName(debouncedAccountName);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedAccountName, handleMobileNumber, previousAccountName]);

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

  if (temlpatesLoading) {
    return <LoadingView />;
  }

  return (
    <ScrollView style={styles.scroll}>
      <Text children="personalNumber.Iban" size={18} demiBold />
      {apiCallInitiated && data ? (
        <View>
          <DetailsItem label="personalNumber.mobile" value={typedAccountName} underline />
          <DetailsItem label="personalNumber.Address" value={data.customerName} underline />
        </View>
      ) : (
        <>
          <TextInput
            inputStyle={styles.inputStyle}
            label="personalNumber.mobile"
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
        <Button.Primary text="personalNumber.next" onPress={navigateToTransferScreen} fullWidth />
      </View>
    </ScrollView>
  );
};

export default MobileTransaction;
