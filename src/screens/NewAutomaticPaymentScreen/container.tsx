import React, { useState } from 'react';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigation, useRoute } from '@react-navigation/native';
import { setAdjustPan, setAdjustResize } from 'rn-android-keyboard-adjust';
import { Colors } from 'theme/Variables';
import { closeModal, openModal } from 'utils/modal';
import {
  getDate,
  getDiff,
  isBefore,
  getCurrentDate,
  calcFutureDate,
  getAllDatesBetween,
} from 'utils/formatDate';
import { AutomaticPaymentDateModal, SelectPaymentDateModal } from 'components/modals';
import { AutomaticPaymentMethodModal } from 'components/modals/AutomaticPaymentMethodModal/AutomaticPaymentMethodModal';
import { SelectedMethod } from 'components/modals/AutomaticPaymentMethodModal/AutomaticPaymentMethodModal.types';
import { TextInputRefType } from 'components/TextInput/TextInput.types';
import { Account, AutoPaymentTypeEnum } from 'services/apis/productsAPI/productsAPI.types';
import { AutomaticPaymentForm } from './NewAutomaticPaymentScreen.types';
import { ModalStackRouteProps, ModalStackScreenProps } from 'navigation/types';
import { NEW_AUTOMATIC_PAYMENT_DETAILS_SCREEN } from 'navigation/ScreenNames';
import { MAX_DAYS_IN_MONTH, MAX_SELECTABLE_DATE } from 'constants/common';
import { openToast } from 'utils/toast';
import { CurrencyEnum } from 'services/apis/transfersAPI/transfersAPI.types';

const minDate = getCurrentDate();

export const useNewAutomaticPayment = () => {
  const { control, setValue, watch } = useForm<AutomaticPaymentForm>({
    defaultValues: {
      abonentNumber: '',
      paymentMethod: null,
      amount: '',
      title: '',
      startDate: '',
      activeAllTime: false,
      endDate: '',
      paymentDate: 0,
      account: undefined,
      agreed: false,
    },
  });
  const paymentMethodRef = useRef<TextInputRefType>(null);
  const startDateRef = useRef<TextInputRefType>(null);
  const endDateRef = useRef<TextInputRefType>(null);
  const abonentNumberRef = useRef<TextInputRefType>(null);
  const paymentDateRef = useRef<TextInputRefType>(null);
  const [shouldBlurPaymentDate, setShouldBlurPaymentDate] = useState(false);
  const [shouldBlurEndDate, setShouldBlurEndDate] = useState(false);
  const { navigate } = useNavigation<ModalStackScreenProps<'NewAutomaticPaymentDetailsScreen'>>();
  const { params } = useRoute<ModalStackRouteProps<'NewAutomaticPaymentScreen'>>();
  const { debtVerifyResults, providerItem, subscriberFieldsValue, selectedAccountFromCard } =
    params || {};
  const [startDate, endDate, paymentDate, account, activeAllTime, paymentMethod, amount] = watch([
    'startDate',
    'endDate',
    'paymentDate',
    'account',
    'activeAllTime',
    'paymentMethod',
    'amount',
  ]);
  const allFields = watch();

  useEffect(() => {
    setAdjustPan();
    return () => {
      setAdjustResize();
    };
  }, []);

  const selectAccount = useCallback(
    (acc: Account) => {
      setValue('account', acc);
    },
    [setValue],
  );

  const setAccountFromCard = useCallback(() => {
    if (!selectedAccountFromCard) {
      return;
    }
    const isGelAccount = selectedAccountFromCard?.ccy === CurrencyEnum.GEL;

    if (isGelAccount) {
      selectAccount(selectedAccountFromCard);
    }
  }, [selectAccount, selectedAccountFromCard]);

  useEffect(() => {
    setAccountFromCard();
  }, [setAccountFromCard]);

  useEffect(() => {
    if (debtVerifyResults?.[0]?.customerNumber) {
      abonentNumberRef.current?.focus();
      setValue('abonentNumber', debtVerifyResults?.[0].customerNumber);
    }
  }, [debtVerifyResults, setValue]);

  const toggleActiveAllTime = useCallback(
    (newValue: boolean) => {
      if (endDate) {
        setValue('endDate', '');
        setShouldBlurEndDate(true);
      }

      if (paymentDate) {
        setValue('paymentDate', 0);
        setShouldBlurPaymentDate(true);
      }

      setValue('activeAllTime', newValue);
    },
    [endDate, paymentDate, setValue],
  );

  useEffect(() => {
    if (shouldBlurEndDate) {
      endDateRef.current?.blur();
      setShouldBlurEndDate(false);
    }
  }, [shouldBlurEndDate]);

  const blurPaymentDateField = useCallback(() => {
    if (startDate && endDate && paymentDate && getDiff(startDate, endDate) <= MAX_DAYS_IN_MONTH) {
      const isPaymentDateInSelectedRanege = getAllDatesBetween(startDate, endDate)
        .map(i => getDate(i))
        .filter(i => i <= MAX_SELECTABLE_DATE)
        .includes(paymentDate);

      if (!isPaymentDateInSelectedRanege) {
        setValue('paymentDate', 0);
        setShouldBlurPaymentDate(true);
      }
    }
  }, [endDate, paymentDate, setValue, startDate]);

  useEffect(() => {
    blurPaymentDateField();
  }, [blurPaymentDateField]);

  useEffect(() => {
    if (shouldBlurPaymentDate) {
      paymentDateRef.current?.blur();
      setShouldBlurPaymentDate(false);
    }
  }, [shouldBlurPaymentDate]);

  const handleSelectPaymentMethod = useCallback(
    (selectedMethod: SelectedMethod) => {
      if (!selectedMethod) {
        return;
      }

      if (selectedMethod?.type !== AutoPaymentTypeEnum.FixedAmount) {
        setShouldBlurPaymentDate(true);
        setValue('paymentDate', 0);
      }

      closeModal();
      paymentMethodRef.current?.focus();
      setValue('paymentMethod', selectedMethod);
    },
    [setValue],
  );

  const onPaymentMethodPress = useCallback(() => {
    openModal({
      element: (
        <AutomaticPaymentMethodModal
          selectedMethod={paymentMethod}
          onPress={handleSelectPaymentMethod}
          directDebitType={providerItem?.directDebitType}
        />
      ),
      title: 'automaticPayments.selectPaymentMethod',
      disablePanning: true,
    });
  }, [handleSelectPaymentMethod, paymentMethod, providerItem?.directDebitType]);

  const handleSelectStartDate = useCallback(
    (date: string) => {
      if (!date) {
        return;
      }

      closeModal();
      startDateRef.current?.focus();

      if (endDate && isBefore(date, endDate)) {
        setValue('endDate', '');
        setShouldBlurEndDate(true);
      }

      setValue('startDate', date);
    },
    [endDate, setValue],
  );

  const markedDates = useCallback(
    (selected: string) => ({
      [selected]: {
        selected: true,
        selectedColor: Colors.primary,
      },
    }),
    [],
  );

  const onSelectStartDatePress = useCallback(() => {
    openModal({
      element: (
        <SelectPaymentDateModal
          minDate={calcFutureDate(minDate, 1)}
          onPress={handleSelectStartDate}
          selectedDate={startDate}
          markedDates={markedDates}
          hideExtraDays
          current={startDate}
        />
      ),
      title: 'automaticPayments.selectStartDate',
      disablePanning: true,
    });
  }, [handleSelectStartDate, markedDates, startDate]);

  const handleSelectEndDate = useCallback(
    (date: string) => {
      if (!date) {
        return;
      }
      closeModal();
      endDateRef.current?.focus();
      setValue('endDate', date);
    },
    [setValue],
  );

  const onSelectEndDatePress = useCallback(() => {
    if (activeAllTime) {
      return;
    }
    openModal({
      element: (
        <SelectPaymentDateModal
          minDate={startDate ? calcFutureDate(startDate, 1) : calcFutureDate(minDate, 1)}
          onPress={handleSelectEndDate}
          selectedDate={endDate}
          markedDates={markedDates}
          hideExtraDays
          disableAllTouchEventsForDisabledDays
          current={endDate || startDate}
        />
      ),
      title: 'automaticPayments.selectEndDate',
      disablePanning: true,
    });
  }, [activeAllTime, endDate, handleSelectEndDate, markedDates, startDate]);

  const disablePayDay = useMemo(() => {
    return activeAllTime || !startDate || !endDate;
  }, [activeAllTime, endDate, startDate]);

  const handleSelectPayDay = useCallback(
    (date: number) => {
      if (!date) {
        return;
      }
      closeModal();
      paymentDateRef.current?.focus();
      setValue('paymentDate', date);
    },
    [setValue],
  );

  const onSelectPayDayPress = useCallback(() => {
    if (activeAllTime) {
      return;
    }
    openModal({
      element: (
        <AutomaticPaymentDateModal
          startDate={startDate}
          endDate={endDate}
          selectedDate={paymentDate}
          onPress={handleSelectPayDay}
        />
      ),
      title: 'automaticPayments.selectPaymentDate',
      disablePanning: true,
    });
  }, [activeAllTime, endDate, handleSelectPayDay, paymentDate, startDate]);

  const isDisabled = useMemo(() => {
    let values = [];
    let copiedFields: Record<string, any> = {};

    if (paymentMethod?.type !== AutoPaymentTypeEnum.FixedAmount) {
      for (let key in allFields) {
        if (key !== 'paymentDate') {
          copiedFields[key] = allFields[key as keyof AutomaticPaymentForm];
        }
      }
    } else {
      copiedFields = { ...allFields };
    }

    if (!activeAllTime) {
      for (let key in copiedFields) {
        if (key !== 'activeAllTime') {
          values.push(allFields[key as keyof AutomaticPaymentForm]);
        }
      }
    } else {
      for (let key in copiedFields) {
        if (key !== 'endDate' && key !== 'paymentDate') {
          values.push(allFields[key as keyof AutomaticPaymentForm]);
        }
      }
    }

    return !values.every(Boolean);
  }, [activeAllTime, allFields, paymentMethod?.type]);

  const toggleCheckbox = useCallback(
    (value: boolean) => {
      setValue('agreed', value);
    },
    [setValue],
  );

  const handleNextPress = useCallback(() => {
    if (isNaN(Number(amount))) {
      openToast('automaticPayments.amountTypeWarning', 'error');
      return;
    }
    navigate(NEW_AUTOMATIC_PAYMENT_DETAILS_SCREEN, {
      providerItem,
      debtVerifyResults,
      automaticPaymentForm: allFields,
      subscriberFieldsValue,
    });
  }, [allFields, amount, debtVerifyResults, navigate, providerItem, subscriberFieldsValue]);

  return {
    control,
    setValue,
    toggleActiveAllTime,
    paymentMethodRef,
    handleSelectPaymentMethod,
    onPaymentMethodPress,
    startDateRef,
    onSelectStartDatePress,
    endDateRef,
    onSelectEndDatePress,
    activeAllTime,
    abonentNumberRef,
    debtVerifyResults,
    onSelectPayDayPress,
    toggleCheckbox,
    disablePayDay,
    paymentDateRef,
    isDisabled,
    account,
    selectAccount,
    providerItem,
    handleNextPress,
    paymentMethod,
  };
};
