import { useForm } from 'react-hook-form';
import { FormData } from './NewAutomaticPaymentScreen.types';
import { useCallback, useRef, useState } from 'react';
import { SelectedMethod } from 'components/modals/AutomaticPaymentMethodModal/AutomaticPaymentMethodModal.types';
import { closeModal, openModal } from 'utils/modal';
import { TextInputRefType } from 'components/TextInput/TextInput.types';
import { AutomaticPaymentMethodModal } from 'components/modals/AutomaticPaymentMethodModal/AutomaticPaymentMethodModal';
import React from 'react';

export const useNewAutomaticPayment = () => {
  const { control, setValue, watch } = useForm<FormData>({
    defaultValues: {
      abonentNumber: '',
      paymentMethod: null,
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
  const paymentMethodRef = useRef<TextInputRefType>(null);

  const toggleActiveAllTime = useCallback(
    (newValue: boolean) => {
      setValue('activeAllTime', newValue);
    },
    [setValue],
  );

  const handleSelectPaymentMethod = useCallback(
    (selectedMethod: SelectedMethod) => {
      closeModal();
      paymentMethodRef.current?.focus();
      setValue('paymentMethod', selectedMethod);
    },
    [setValue],
  );

  const onPaymentMethodPress = () => {
    openModal({
      element: (
        <AutomaticPaymentMethodModal
          selectedMethod={watch('paymentMethod')}
          onPress={handleSelectPaymentMethod}
        />
      ),
      title: 'აირჩიე გადახდის მეთოდი',
      disablePanning: true,
    });
  };

  return {
    control,
    setValue,
    toggleActiveAllTime,
    isChecked,
    setIsChecked,
    paymentMethodRef,
    handleSelectPaymentMethod,
    onPaymentMethodPress,
  };
};
