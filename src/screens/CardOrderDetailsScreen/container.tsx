import { useCallback, useEffect } from 'react';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { useForm } from 'react-hook-form';
import { useAddCardMutation } from 'services/apis/productsAPI/productsAPI';
import { closeModal, openModal } from 'utils/modal';
import { FormData } from './CardOrderDetailsScreen.types';
import { OTPModal } from 'components';
import { AddCardRequest } from 'services/apis/productsAPI/productsAPI.types';
import React from 'react';

export const useCardOrderDetails = () => {
  const { selectedCardData, selectedIban, selectedBranch } = useAppSelector(
    state => state.products,
  );
  const userPhoneNumber = useAppSelector(state => state.profile.userProfileInfo?.mobile);
  const { control, watch } = useForm<FormData>();
  const checkboxValue = watch('save');
  const [addCard, { isSuccess, isLoading }] = useAddCardMutation();

  const generateData = useCallback(
    (sendOtp: boolean, otp = ''): AddCardRequest => ({
      accountId: selectedIban?.accountId,
      cardId: null,
      culture: 'ka',
      departmentId: selectedBranch?.id,
      isUrgent: false,
      otp,
      productId: selectedCardData?.cardProductId,
      sendOtp,
      timezoneOffset: -240,
      updateReason: 21,
    }),
    [selectedIban, selectedBranch, selectedCardData],
  );

  const addCardRequest = useCallback(
    async (data: AddCardRequest, close: boolean = false) => {
      if (checkboxValue) {
        await addCard(data);
        if (close && isSuccess) {
          closeModal();
          //TODO NAVIGATE TO SUCCESS PAGE
        }
      }
    },
    [checkboxValue, addCard, isSuccess],
  );

  useEffect(() => {
    const data = generateData(true);
    addCardRequest(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkboxValue]);

  const handleOrderCard = useCallback(() => {
    if (checkboxValue) {
      openModal({
        element: (
          <OTPModal
            onFinished={code => {
              const data = generateData(false, code);
              addCardRequest(data, true);
            }}
          />
        ),
        withKeyboard: true,
      });
    }
  }, [checkboxValue, generateData, addCardRequest]);

  return {
    control,
    selectedCardData,
    selectedIban,
    handleOrderCard,
    selectedBranch,
    userPhoneNumber,
    checkboxValue,
    isLoading,
  };
};
