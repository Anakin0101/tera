import { View, ScrollView, Pressable, TextInput as RNInput } from 'react-native';
import React, { useCallback, useEffect, useRef } from 'react';
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
import { useTranslation } from 'react-i18next';
// import { useForm } from 'react-hook-form';
// import { RecepientNumberType } from './MobileTransaction.types';
// import { REGEX } from 'constants/index';
import { KeyboardAvoidingScrollView } from '@cassianosch/react-native-keyboard-sticky-footer-avoiding-scroll-view';
import { useKeyboard } from 'utils/useKeyboard';
import { Contact } from 'assets/SVGs';
import { checkContactsPermissions } from 'utils/persmissionChecker';
import { pickContact } from 'react-native-contact-pick';
import { useIsFocused } from '@react-navigation/native';
import { openToast } from 'utils/toast';
const MobileTransaction = () => {
  const { t } = useTranslation();
  const inputRef = useRef<RNInput>(null);
  const isFocused = useIsFocused();
  const { navigate } =
    useNavigation<TransactionsStackScreenProps<'TransferToOtherBankAccountScreen'>>();
  const dispatch = useAppDispatch();

  const styles = useStyles();
  const { isKeyboardOpened } = useKeyboard();
  // const {
  //   control,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<RecepientNumberType>({
  //   defaultValues: {
  //     number: '',
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
    (pin: string) => {
      setSelectedData(pin);
      setTypedAccountName(pin);
      handleMobileNumber(pin);
      setApiCallInitiated(true);
      dispatch(setAccountToData({ pin: pin }));
      dispatch(setTemplateForIban(pin));
    },
    [setSelectedData, setTypedAccountName, handleMobileNumber, setApiCallInitiated, dispatch],
  );

  const resetUI = useCallback(() => {
    setSelectedData('');
    setApiCallInitiated(false);
    dispatch(setAccountToData({ pin: '' }));
  }, [setSelectedData, setApiCallInitiated, dispatch]);

  useEffect(() => {
    if (apiCallInitiated) {
      dispatch(
        setAccountToData({
          name: data?.customerName,
          iban: selectedData || typedAccountName,
        }),
      );
      dispatch(setReceiverInfo(data));
    }
  }, [data, dispatch, selectedData, typedAccountName, apiCallInitiated]);

  const handleChange = useCallback(
    (value: string | null | undefined) => {
      const stringValue = value ?? '';

      if (stringValue.length <= MOBILE_NUMBER_LENGTH) {
        setTypedAccountName(stringValue);
        debouncedHandleChange(stringValue);
      }
      if (stringValue.length < MOBILE_NUMBER_LENGTH) {
        resetUI();
      }
    },
    [resetUI, setTypedAccountName, debouncedHandleChange, MOBILE_NUMBER_LENGTH],
  );

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
    item => item.type === FinancialTransferTypeEnum.P2p,
  );

  const navigateToTransferScreen = () => {
    if (isSuccess) {
      navigate(TRANSFER_TO_OTHER_BANK_ACCOUNT_SCREEN, {
        fromOtherBank: true,
        fromMobile: true,
      });
    }
  };
  useEffect(() => {
    if (isFocused) {
      setTimeout(() => {
        inputRef?.current?.focus();
      }, 300);
    }
  }, [isFocused]);

  const getContactList = useCallback(async () => {
    try {
      const checkPermission = await checkContactsPermissions();
      if (checkPermission) {
        const res = await pickContact();
        const mobileNumber = res?.phoneNumbers?.find(p => p.type === 'mobile')?.number;
        if (mobileNumber) {
          const formattedNumber = mobileNumber.replace(/\D/g, '');
          handleChange(formattedNumber);
        }
      }
    } catch (ex) {
      console.warn(ex);
      openToast(`${t('transactionDetails.validContact')}`, 'error');
    }
  }, [handleChange, t]);

  if (temlpatesLoading) {
    return <LoadingView />;
  }

  return (
    <KeyboardAvoidingScrollView
      scrollEnabled={isKeyboardOpened}
      containerStyle={styles.keyboardContainer}
      stickyFooter={
        <View style={[styles.ctaWrapper, isKeyboardOpened && styles.ctaOpenWrapper]}>
          <Button.Primary text="personalNumber.next" onPress={navigateToTransferScreen} fullWidth />
        </View>
      }
    >
      <ScrollView style={styles.scroll}>
        <Text children="personalNumber.Iban" size={18} demiBold />
        {/* <ControlledInput
          control={control}
          value={typedAccountName}
          name="number"
          label="personalNumber.RecepientNumber"
          maxLength={22}
          marginTop={24}
          errors={errors}
          autoFocus
          rules={{
            required: {
              value: true,
              message: 'common:form.is_required',
            },
            pattern: {
              value: REGEX.MAX_LENGTH_9,
              message: 'common:form.9_digits_required',
            },
          }}
          handleChange={(value: string | null | undefined) => handleChange(value)}
        /> */}
        <TextInput
          inputStyle={styles.inputStyle}
          label="personalNumber.mobile"
          value={typedAccountName}
          maxLength={22}
          ref={inputRef}
          onChangeText={(value: string | null | undefined) => handleChange(value)}
          marginTop={32}
          autoFocus
        />

        {apiCallInitiated && data ? (
          <View>
            <DetailsItem label="personalNumber.Address" value={data.customerName} underline />
          </View>
        ) : (
          <>
            <Pressable style={styles.chooseFromContactWrapper} onPress={getContactList}>
              <Contact />
              <Text
                style={styles.chooseFromLabel}
                children="chooseMobileProviderScreen.chooseFromContact"
              />
            </Pressable>
            {isError && <Text children={isError} />}
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
          </>
        )}
      </ScrollView>
    </KeyboardAvoidingScrollView>
  );
};

export default MobileTransaction;
