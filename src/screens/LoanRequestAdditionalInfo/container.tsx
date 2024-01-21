import React, { useMemo, useRef } from 'react';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { FormData } from './LoanRequestAdditionalInfo.types';
import { closeModal, openModal } from 'utils/modal';
import { IncomeTypeModal, SelectPaymentDateModal } from 'components/modals';
import { TextInputRefType } from 'components/TextInput/TextInput.types';
import { ItemType } from 'components/modals/IncomeTypeModal/IncomeTypeModal.types';

export const useLoanRequestAdditionalInfo = () => {
  const paymentDateRef = useRef<TextInputRefType>(null);
  const typeOfIncomeRef = useRef<TextInputRefType>(null);
  const { control, setValue, watch } = useForm<FormData>();
  const allFields = watch();

  const handleSelectDate = useCallback(
    (date: string) => {
      closeModal();
      paymentDateRef.current?.focus();
      setValue('paymentDate', date);
    },
    [setValue],
  );

  const allFieldsFull = useMemo(() => {
    return Object.values(allFields).every(Boolean);
  }, [allFields]);

  const handleSelectIncomeType = useCallback(
    (selectedIncomeTypes: ItemType[]) => {
      closeModal();
      typeOfIncomeRef.current?.focus();
      setValue('typeOfIncome', selectedIncomeTypes);
    },
    [setValue],
  );

  const onPaymentDatePress = useCallback(() => {
    openModal({
      element: (
        <SelectPaymentDateModal onPress={handleSelectDate} selectedDate={watch('paymentDate')} />
      ),
      title: 'loanRequest.choosePaymentDate',
      disablePanning: true,
    });
  }, [handleSelectDate, watch]);

  const onIncomeTypePress = useCallback(() => {
    openModal({
      element: (
        <IncomeTypeModal
          onPress={handleSelectIncomeType}
          selectedTypes={watch('typeOfIncome') ?? []}
        />
      ),
      title: 'loanRequest.typeOfIncome',
      disablePanning: true,
      snapPoints: ['90%'],
    });
  }, [handleSelectIncomeType, watch]);

  return {
    control,
    onPaymentDatePress,
    paymentDateRef,
    typeOfIncomeRef,
    onIncomeTypePress,
    allFieldsFull,
  };
};
