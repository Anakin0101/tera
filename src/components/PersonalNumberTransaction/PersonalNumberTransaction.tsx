import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View } from 'react-native';
import { ControlledInput, Text, Button, TransferTemplates, LoadingView, Image } from 'components';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useStyles } from './PersonalNumberTransaction.styles';
import { useOtherBanksContainer } from 'screens/OtherBanksTransactionScreen/container';
import { useTransactionsScreen } from 'screens/TransactionsScreen/container';
import { Colors } from 'theme/Variables';
import { setAccountToData, setReceiverInfo, setTemplateForIban } from 'store/slices/transfers';
import { useAppDispatch } from 'store/hooks/useAppDispatch';
import { useNavigation } from '@react-navigation/native';
import { TransactionsStackScreenProps } from 'navigation/types';
import { DetailsItem } from 'components/DetailsItem/DetailsItem';
import { TRANSFER_TO_OTHER_BANK_ACCOUNT_SCREEN } from 'navigation/ScreenNames';
import { PersonalNumberAccount, Account } from './PersonalNumberTransaction.types';
import { PERSONAL, personalNumberRegex } from 'constants/transactionConstants';
import { FinancialTransferTypeEnum } from 'services/apis/transfersAPI/transfersAPI.types';
import useBankIcons from 'components/IbanTransaction/useIban';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { SelectedItemProp } from 'screens/TransferDetailScreen/TransferDetailScreen.types';
import { maskIban } from 'utils/maskIban';
import { KeyboardAvoidingScrollView } from '@cassianosch/react-native-keyboard-sticky-footer-avoiding-scroll-view';
import { useKeyboard } from 'utils/useKeyboard';
import { useForm } from 'react-hook-form';
import { RecepientNumberType } from './PersonalNumberTransaction.types';
import { REGEX } from 'constants/index';

const PersonalNumberTransaction = () => {
  const { isKeyboardOpened } = useKeyboard();
  const [chosenTemplateIban, setChosenTemplateIban] = useState('');
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RecepientNumberType>({
    defaultValues: {
      RecepientNumber: '',
    },
  });
  const { navigate } =
    useNavigation<TransactionsStackScreenProps<'TransferToOtherBankAccountScreen'>>();
  const dispatch = useAppDispatch();
  const selectedItemFromStore = useAppSelector(
    (state: { transfers: SelectedItemProp }) => state.transfers,
  );
  const { accountFromData } = selectedItemFromStore;

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
    PERSONAL_NUMBER_LENGTH,
    toggleCheckIcon,
    chosenAccount,
    chosenIBANAccount,
    setChosenIBANAccount,
  } = useTransactionsScreen();

  const { debouncedHandleChange } = useBankIcons(
    null,
    setDebouncedAccountName,
    dispatch,
    PERSONAL_NUMBER_LENGTH,
  );

  const { handlePersonalNumber, data, isSuccess, isError, isLoading } =
    useOtherBanksContainer(PERSONAL);

  const selectTemplate = useCallback(
    (pin: string) => {
      const pinAsString = pin.toString();
      setSelectedData(pinAsString);
      setTypedAccountName(pinAsString);
      handlePersonalNumber(pinAsString);
      setApiCallInitiated(true);
      dispatch(setAccountToData({ pin: pinAsString }));
      dispatch(setTemplateForIban(pinAsString));
    },
    [setSelectedData, setTypedAccountName, handlePersonalNumber, setApiCallInitiated, dispatch],
  );

  useEffect(() => {
    dispatch(
      setAccountToData({
        name: data?.customerName,
        iban: chosenIBANAccount?.accountIban || typedAccountName,
      }),
    );
    dispatch(setReceiverInfo(data));
  }, [data, dispatch, selectedData, typedAccountName, chosenIBANAccount]);
  const resetUI = () => {
    setSelectedData('');
    setApiCallInitiated(false);
    dispatch(setAccountToData({ name: '', iban: '' }));
  };

  const handleChange = (value: string | null | undefined) => {
    const stringValue = value ?? '';
    const uppercaseValue = stringValue.toUpperCase();

    if (stringValue.length === 0) {
      setPreviousAccountName('');
      resetUI();
    }
    if (stringValue.length <= PERSONAL_NUMBER_LENGTH) {
      setTypedAccountName(uppercaseValue);
      debouncedHandleChange(uppercaseValue);
    }
    if (stringValue.length < PERSONAL_NUMBER_LENGTH) {
      resetUI();
    }
  };

  useEffect(() => {
    if (
      debouncedAccountName.length === PERSONAL_NUMBER_LENGTH &&
      personalNumberRegex.test(debouncedAccountName) &&
      debouncedAccountName !== previousAccountName
    ) {
      setApiCallInitiated(true);
      handlePersonalNumber(debouncedAccountName);
      setPreviousAccountName(debouncedAccountName);
    } else if (debouncedAccountName.length === 0) {
      resetUI();
      setPreviousAccountName('');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedAccountName, handlePersonalNumber, previousAccountName]);

  const filteredTemplates = templates?.templates.filter(
    item =>
      item.type === FinancialTransferTypeEnum.ToSomeoneInsideBank &&
      (item?.bankInternal?.currency === accountFromData?.ccy ||
        item?.bankInternal?.currency === accountFromData?.ccy) &&
      item.bankInternal?.personalId !== null,
  );

  const navigateToTransferScreen = () => {
    if (isSuccess && chosenAccount) {
      navigate(TRANSFER_TO_OTHER_BANK_ACCOUNT_SCREEN, {
        fromOtherBank: true,
        fromPersonal: true,
      });
    } else {
      // toast of error
    }
  };

  const filteredAccounts = useMemo(() => {
    return data?.accounts.filter(
      (account: { currency: string }) => account.currency === accountFromData?.ccy,
    );
  }, [accountFromData?.ccy, data?.accounts]);

  const { bankIcon } = useBankIcons(
    data?.bicCode,
    setDebouncedAccountName,
    dispatch,
    PERSONAL_NUMBER_LENGTH,
  );
  useEffect(() => {
    if (chosenTemplateIban.length > 0 && filteredAccounts) {
      const chosedAccount = filteredAccounts.find(
        (account: Account) => account.accountIban === chosenTemplateIban,
      );
      if (chosedAccount) {
        toggleCheckIcon(chosedAccount);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chosenTemplateIban]);

  if (temlpatesLoading || isLoading) {
    return <LoadingView />;
  }

  return (
    <KeyboardAvoidingScrollView
      scrollEnabled={isKeyboardOpened}
      containerStyle={styles.keyboardContainer}
      stickyFooter={
        <View style={[styles.ctaWrapper, isKeyboardOpened && styles.ctaOpenWrapper]}>
          <Button.Primary
            text="personalNumber.next"
            fullWidth
            disabled={!chosenAccount}
            hitSlop={15}
            onPress={handleSubmit(navigateToTransferScreen)}
          />
        </View>
      }
    >
      <ScrollView style={styles.scroll}>
        <Text children="personalNumber.Recepient" size={18} demiBold />
        <ControlledInput
          control={control}
          value={typedAccountName}
          name="RecepientNumber"
          label="personalNumber.RecepientNumber"
          autoFocus
          maxLength={22}
          marginTop={24}
          errors={errors}
          rules={{
            required: {
              value: true,
              message: 'common:form.is_required',
            },
            pattern: {
              value: REGEX.MAX_LENGTH_11,
              message: 'common:form.11_digits_required',
            },
          }}
          handleChange={(value: string | null | undefined) => handleChange(value)}
        />
        {apiCallInitiated && data ? (
          <View>
            <DetailsItem label="personalNumber.name" value={data.customerName} underline />
            <View style={styles.accountsCard}>
              <Text children="personalNumber.Receiver" size={18} demiBold style={styles.receiver} />
              {filteredAccounts.map((item: PersonalNumberAccount, index: number) => (
                <TouchableWithoutFeedback
                  style={styles.accountIban}
                  onPress={() => {
                    toggleCheckIcon(item);
                    setChosenIBANAccount(item);
                  }}
                >
                  <Text
                    key={index}
                    style={{
                      color:
                        chosenAccount && chosenAccount.accountId === item.accountId
                          ? Colors.success
                          : Colors.black700,
                    }}
                  >
                    {maskIban(item.accountIban, item.currency)}
                  </Text>
                  {bankIcon && <Image source={bankIcon} style={styles.image} />}
                </TouchableWithoutFeedback>
              ))}
            </View>
          </View>
        ) : (
          <>
            {isError && <Text children={isError} />}
            <View style={styles.template}>
              <TransferTemplates
                fromOtherBanks
                setTypedAccountName={handleChange}
                selectedData={selectedData}
                setSelectedData={selectTemplate}
                templates={filteredTemplates}
                temlpatesLoading={temlpatesLoading}
                setChosenTemplateIban={setChosenTemplateIban}
                fromPin
              />
            </View>
          </>
        )}
      </ScrollView>
    </KeyboardAvoidingScrollView>
  );
};

export default PersonalNumberTransaction;
