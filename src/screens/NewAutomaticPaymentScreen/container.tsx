import { useForm } from 'react-hook-form';
import { FormData } from './NewAutomaticPaymentScreen.types';
import { useCallback, useEffect, useRef, useState } from 'react';
import { SelectedMethod } from 'components/modals/AutomaticPaymentMethodModal/AutomaticPaymentMethodModal.types';
import { closeModal, openModal } from 'utils/modal';
import { TextInputRefType } from 'components/TextInput/TextInput.types';
import { AutomaticPaymentMethodModal } from 'components/modals/AutomaticPaymentMethodModal/AutomaticPaymentMethodModal';
import React from 'react';
import { SelectPaymentDateModal } from 'components/modals';
import { getCurrentDate } from 'utils/formatDate';
import { Colors } from 'theme/Variables';
import { setAdjustPan, setAdjustResize } from 'rn-android-keyboard-adjust';

const minDate = getCurrentDate();

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
  const startDateRef = useRef<TextInputRefType>(null);
  const endDateRef = useRef<TextInputRefType>(null);
  const activeAllTime = watch('activeAllTime');

  useEffect(() => {
    setAdjustPan();
    return () => {
      setAdjustResize();
    };
  }, []);

  const toggleActiveAllTime = useCallback(
    (newValue: boolean) => {
      if (watch('endDate')) {
        setValue('endDate', '');
      }
      setValue('activeAllTime', newValue);
    },
    [setValue, watch],
  );

  useEffect(() => {
    if (activeAllTime) {
      endDateRef.current?.blur();
    }
  }, [activeAllTime]);

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

  const handleSelectStartDate = useCallback(
    (date: string) => {
      closeModal();
      startDateRef.current?.focus();
      setValue('startDate', date);
    },
    [setValue],
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

  const onSelectStartDatePress = () => {
    openModal({
      element: (
        <SelectPaymentDateModal
          minDate={minDate}
          onPress={handleSelectStartDate}
          selectedDate={watch('startDate')}
          markedDates={markedDates}
          hideExtraDays
        />
      ),
      title: 'აირჩიე დაწყების თარიღი',
      disablePanning: true,
    });
  };

  const handleSelectEndDate = useCallback(
    (date: string) => {
      closeModal();
      endDateRef.current?.focus();
      setValue('endDate', date);
    },
    [setValue],
  );

  const onSelectEndDatePress = () => {
    if (activeAllTime) {
      return;
    }
    openModal({
      element: (
        <SelectPaymentDateModal
          minDate={watch('startDate') || minDate}
          onPress={handleSelectEndDate}
          selectedDate={watch('endDate')}
          markedDates={markedDates}
          hideExtraDays
          disableAllTouchEventsForDisabledDays
        />
      ),
      title: 'აირჩიე დასრულების თარიღი',
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
    startDateRef,
    onSelectStartDatePress,
    endDateRef,
    onSelectEndDatePress,
    activeAllTime,
  };
};
