import { useForm } from 'react-hook-form';
import { FormData } from './NewAutomaticPaymentScreen.types';
import { useCallback, useState } from 'react';

export const useNewAutomaticPayment = () => {
  const { control, setValue } = useForm<FormData>({
    defaultValues: {
      abonentNumber: '',
      paymentMethod: '',
      amount: '',
      title: '',
      startDate: '',
      activeAllTime: false,
      endDate: '',
      paymentDate: '',
      account: '',
    },
  });
  const [isChecked, setIsChecked] = useState(false);

  const toggleActiveAllTime = useCallback(
    (newValue: boolean) => {
      setValue('activeAllTime', newValue);
    },
    [setValue],
  );

  return {
    control,
    setValue,
    toggleActiveAllTime,
    isChecked,
    setIsChecked,
  };
};
