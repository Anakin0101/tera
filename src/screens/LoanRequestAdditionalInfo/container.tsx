import React, { useRef } from 'react';
import { useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { FormData } from './LoanRequestAdditionalInfo.types';
import { closeModal, openModal } from 'utils/modal';
import { SelectPaymentDateModal } from 'components/modals';
import { TextInputRefType } from 'components/TextInput/TextInput.types';

export const useLoanRequestAdditionalInfo = () => {
  const paymentDateRef = useRef<TextInputRefType>(null);
  const typeOfIncomeRef = useRef<TextInputRefType>(null);
  const { control, setValue, watch } = useForm<FormData>();

  const paymentDate = useMemo(() => {
    return watch('paymentDate');
  }, [watch]);

  const handleSelectDate = useCallback(
    (date: string) => {
      closeModal();
      paymentDateRef.current?.focus();
      setValue('paymentDate', date);
    },
    [setValue],
  );

  const onPaymentDatePress = useCallback(() => {
    openModal({
      element: <SelectPaymentDateModal onPress={handleSelectDate} selectedDate={paymentDate} />,
      title: 'loanRequest.choosePaymentDate',
      disablePanning: true,
    });
  }, [handleSelectDate, paymentDate]);

  return {
    control,
    onPaymentDatePress,
    paymentDateRef,
    typeOfIncomeRef,
  };
};
