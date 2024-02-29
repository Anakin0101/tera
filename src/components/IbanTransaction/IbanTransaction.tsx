import { Image, Text } from 'components';
import React, { useEffect, useCallback, useMemo, useState, useRef } from 'react';
import { View, ScrollView, Pressable, TextInput as RNInput } from 'react-native';
import { Button, TextInput, TransferTemplates, LoadingView } from 'components';
import { useOtherBanksContainer } from 'screens/OtherBanksTransactionScreen/container';
import { DetailsItem } from 'components/DetailsItem/DetailsItem';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { TransactionsStackScreenProps } from 'navigation/types';
import { FOREIGN_IBAN_SCREEN, TRANSFER_TO_OTHER_BANK_ACCOUNT_SCREEN } from 'navigation/ScreenNames';
import { useTransactionsScreen } from 'screens/TransactionsScreen/container';
import { useAppDispatch } from 'store/hooks/useAppDispatch';
import {
  setAccountToData,
  setReceiverInfo,
  setReceiverName,
  setSelectedTransactionType,
} from 'store/slices/transfers';
import { useStyles } from './IbanTransaction.styles';
import { TransactionModal } from 'components/modals';
import { openModal } from 'utils/modal';
import { SelectedItem } from 'components/OtherBanksTransactionTabBar/OtherBanksTransactionTabBar.types';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { ChevronDown } from 'assets/SVGs';
import { Colors } from 'theme/Variables';
import useBankIcons from './useIban';
import { IBAN } from 'constants/transactionConstants';
import { ibanRegex, isForeignIban } from 'constants/transactionConstants';
import { Error } from 'assets/SVGs';
import { openToast } from 'utils/toast';
import { useTranslation } from 'react-i18next';
import { TERRA_BANK_CODE } from 'constants/BankCodes';
import { KeyboardAvoidingScrollView } from '@cassianosch/react-native-keyboard-sticky-footer-avoiding-scroll-view';
import { useKeyboard } from 'utils/useKeyboard';
// import { useForm } from 'react-hook-form';
// import { REGEX } from 'constants/index';
// import { RecepientNumberType } from 'components/PersonalNumberTransaction/PersonalNumberTransaction.types';
import { CurrencyEnum } from 'services/apis/transfersAPI/transfersAPI.types';
import { useIsFocused } from '@react-navigation/native';
const IbanTransaction = () => {
  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();
  const { t } = useTranslation();
  const styles = useStyles();
  const selectedItemFromStore = useAppSelector(
    (state: { transfers: SelectedItem }) => state.transfers,
  );

  const { isKeyboardOpened } = useKeyboard();
  const { selectedTransactionType, accountFromData } = selectedItemFromStore;
  const { navigate } = useNavigation<TransactionsStackScreenProps<'TransferToAccountScreen'>>();
  const { handleCheckIban, isSuccess, data } = useOtherBanksContainer(IBAN);
  const [receiver, setReceiver] = useState<string>('');
  const inputRef = useRef<RNInput>(null);

  // const {
  //   control,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<RecepientNumberType>({
  //   defaultValues: {
  //     RecepientNumber: '',
  //   },
  // });

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
    (iban: string) => {
      setSelectedData(iban);
      setTypedAccountName(iban);
      handleCheckIban(iban);
      setApiCallInitiated(true);
      dispatch(setAccountToData({ iban: iban.toUpperCase() }));
    },
    [setSelectedData, setTypedAccountName, handleCheckIban, setApiCallInitiated, dispatch],
  );
  const checkGeorgianIban = (iban: string) => isForeignIban.test(iban);

  useEffect(() => {
    if (data && debouncedAccountName.length >= INPUT_LENGTH) {
      if (!checkGeorgianIban(debouncedAccountName) && accountFromData.ccy === CurrencyEnum.GEL) {
        openToast(`${t('transactionDetails.validIbanPromptForeign')}`, 'error');
      } else if (!checkGeorgianIban(debouncedAccountName)) {
        navigate(FOREIGN_IBAN_SCREEN);
      }
    }
  }, [INPUT_LENGTH, debouncedAccountName, navigate, data, accountFromData.ccy, t]);

  useEffect(() => {
    if (!isForeignIban && data && !data.ibanIsValid) {
      openToast(`${t('transactionDetails.validIbanPrompt')}`, 'error');
    }
  }, [data, t, debouncedAccountName, INPUT_LENGTH]);

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
    dispatch(setReceiverName(value));
  };

  const resetUI = () => {
    setSelectedData('');
    setApiCallInitiated(false);
    dispatch(setAccountToData({ name: '', iban: '' }));
  };

  const handleChange = (value: string | null | undefined) => {
    const stringValue = value ?? '';
    const uppercaseValue = stringValue.toUpperCase();
    if (stringValue.length <= INPUT_LENGTH) {
      setTypedAccountName(uppercaseValue);
      debouncedHandleChange(uppercaseValue);
    }
    if (stringValue.length < INPUT_LENGTH) {
      resetUI();
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
    } else if (debouncedAccountName.length === 0) {
      resetUI();
      setPreviousAccountName('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedAccountName, handleCheckIban, previousAccountName]);

  useEffect(() => {
    setApiCallInitiated(false);
  }, [setApiCallInitiated]);

  useEffect(() => {
    if (typedAccountName) {
      setTimeout(() => {
        inputRef?.current?.focus();
      }, 300);
    }
  }, [typedAccountName, isFocused]);

  const navigateToTransferScreen = () => {
    if (data?.bicCode !== TERRA_BANK_CODE && !receiver) {
      return;
    }
    if (data?.bicCode === TERRA_BANK_CODE) {
      if (isSuccess && data.ibanIsValid) {
        navigate(TRANSFER_TO_OTHER_BANK_ACCOUNT_SCREEN, {
          fromOtherBank: true,
          fromIban: true,
          receiver: receiver,
        });
      }
    } else {
      if (
        isSuccess &&
        data.ibanIsValid &&
        (accountFromData.ccy === CurrencyEnum.GEL ? selectedTransactionType.name : true) &&
        receiver
      ) {
        navigate(TRANSFER_TO_OTHER_BANK_ACCOUNT_SCREEN, {
          fromOtherBank: true,
          fromIban: true,
          receiver: receiver,
        });
      } else if (!selectedTransactionType.name && accountFromData.ccy === CurrencyEnum.GEL) {
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

  if (temlpatesLoading) {
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
            disabled={data?.bicCode !== TERRA_BANK_CODE && !receiver}
            hitSlop={15}
            onPress={navigateToTransferScreen}
          />
        </View>
      }
    >
      <ScrollView style={styles.scroll} contentContainerStyle={styles.bottomStretchStyle}>
        <Text children="personalNumber.Iban" size={18} demiBold />
        <View>
          {/* <ControlledInput
            control={control}
            value={typedAccountName}
            autoFocus
            name="RecepientNumber"
            label="personalNumber.Receiver"
            maxLength={22}
            marginTop={24}
            errors={errors}
            required={true}
            rules={{
              required: {
                value: true,
                message: 'common:form.is_required',
              },
              pattern: {
                value: REGEX.MAX_LENGTH_22,
                message: 'common:form.22_digits_required',
              },
            }}
            handleChange={(value: string | null | undefined) => handleChange(value)}
          /> */}
          <TextInput
            inputStyle={styles.inputStyle}
            label="personalNumber.Receiver"
            value={typedAccountName}
            maxLength={22}
            onChangeText={(value: string | null | undefined) => handleChange(value)}
            marginTop={32}
            ref={inputRef}
            autoFocus
          />

          <View style={styles.wrapper}>
            {apiCallInitiated && data?.ibanIsValid && bankIcon && (
              <Image source={bankIcon} style={styles.image} />
            )}
          </View>
        </View>
        {apiCallInitiated && data?.ibanIsValid ? (
          <View>
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
                {accountFromData.ccy === CurrencyEnum.GEL && (
                  <>
                    <Pressable
                      onPress={() =>
                        openModal({
                          element: <TransactionModal />,
                          title: 'transactions.type',
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
                        <Text
                          children="transactions.standardText"
                          size={12}
                          color={Colors.textBlack}
                        />
                      </View>
                    ) : selectedTransactionType.name ? (
                      <View style={styles.fastPayment}>
                        <Error />
                        <Text children="transactions.fastText" size={12} color={Colors.textBlack} />
                      </View>
                    ) : null}
                  </>
                )}
              </>
            )}
          </View>
        ) : (
          <View style={styles.template}>
            <TransferTemplates
              fromOtherBanks
              setTypedAccountName={handleChange}
              selectedData={selectedData}
              setSelectedData={selectTemplate}
              templates={filteredTemplates}
              temlpatesLoading={temlpatesLoading}
            />
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingScrollView>
  );
};

export default IbanTransaction;
