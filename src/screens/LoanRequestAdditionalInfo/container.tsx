import React, { useMemo, useRef } from 'react';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { FormData } from './LoanRequestAdditionalInfo.types';
import { closeModal, openModal } from 'utils/modal';
import { IncomeTypeModal, SelectPaymentDateModal } from 'components/modals';
import { TextInputRefType } from 'components/TextInput/TextInput.types';
import { ItemType } from 'components/modals/IncomeTypeModal/IncomeTypeModal.types';
import { useNavigation } from '@react-navigation/native';
import { ProductsStackScreenProps } from 'navigation/types';
import { NEW_LOAN_DETAILS_SCREEN } from 'navigation/ScreenNames';
import { useAppDispatch } from 'store/hooks/useAppDispatch';
import { setNewLoanAdditionalData } from 'store/slices/loan';
import { getDateAfter } from 'utils/formatDate';
import { useAppSelector } from 'store/hooks/useAppSelector';

export const useLoanRequestAdditionalInfo = () => {
  const dispatch = useAppDispatch();
  const { navigate } = useNavigation<ProductsStackScreenProps<'NewLoanDetailsScreen'>>();
  const paymentDateRef = useRef<TextInputRefType>(null);
  const typeOfIncomeRef = useRef<TextInputRefType>(null);
  const { control, setValue, watch } = useForm<FormData>({
    defaultValues: {
      paymentDate: '',
      typeOfIncome: [],
      income: '',
      workplace: '',
      position: '',
    },
  });
  const allFields = watch();
  const { minPaymentDayAfterRequested, maxPaymentDayAfterRequested } = useAppSelector(
    state => state.loan,
  );

  const minDate = useMemo(() => {
    return getDateAfter(minPaymentDayAfterRequested);
  }, [minPaymentDayAfterRequested]);

  const maxDate = useMemo(() => {
    return getDateAfter(maxPaymentDayAfterRequested);
  }, [maxPaymentDayAfterRequested]);

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
        <SelectPaymentDateModal
          minDate={minDate}
          maxDate={maxDate}
          onPress={handleSelectDate}
          selectedDate={watch('paymentDate') || minDate}
        />
      ),
      title: 'loanRequest.choosePaymentDate',
      disablePanning: true,
    });
  }, [handleSelectDate, maxDate, minDate, watch]);

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

  const handleNextPress = useCallback(() => {
    if (!allFieldsFull) {
      return;
    }
    dispatch(
      setNewLoanAdditionalData({
        paymentDate: allFields.paymentDate,
        typeOfIncome: allFields.typeOfIncome,
        income: allFields.income,
        workplace: allFields.workplace,
        position: allFields.position,
      }),
    );
    navigate(NEW_LOAN_DETAILS_SCREEN);
  }, [allFields, allFieldsFull, dispatch, navigate]);

  return {
    control,
    onPaymentDatePress,
    paymentDateRef,
    typeOfIncomeRef,
    onIncomeTypePress,
    allFieldsFull,
    handleNextPress,
  };
};
