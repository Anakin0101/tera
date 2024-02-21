import {
  useLazyCheckPinQuery,
  useLazyCheckIbanQuery,
  useLazyCheckMobileQuery,
} from 'services/apis/transfersAPI/transfersAPI';
import { MOBILE, PERSONAL } from 'constants/transactionConstants';
import { useAppDispatch } from 'store/hooks/useAppDispatch';
import { setIsInternal } from 'store/slices/transfers';
import { useState, useCallback } from 'react';
export const useOtherBanksContainer = (param: string) => {
  const [savedIban, setSavedIban] = useState('');
  const [savedAccountName, setSavedAccountName] = useState('');

  const dispatch = useAppDispatch();
  const checkQuery =
    param === MOBILE
      ? useLazyCheckMobileQuery
      : param === PERSONAL
      ? useLazyCheckPinQuery
      : useLazyCheckIbanQuery;
  const [checkQueryMutation, { isSuccess, data, isError, isLoading }] = checkQuery();

  const handleCheckIban = useCallback(
    async (pin: string) => {
      try {
        const response = await checkQueryMutation(pin);
        dispatch(setIsInternal(response?.data?.ibanIsInternal));
        setSavedIban(pin);
        return response;
      } catch (error) {
        console.warn('Exchange Amount Error1:', error);
        return;
      }
    },
    [checkQueryMutation, dispatch, setSavedIban],
  );
  const handlePersonalNumber = useCallback(
    async (pin: string) => {
      try {
        const response = await checkQueryMutation(pin);
        setSavedAccountName(pin);
        return response;
      } catch (error) {
        console.warn('Exchange Amount Error2:', error);
        return;
      }
    },
    [checkQueryMutation, setSavedAccountName],
  );
  const handleMobileNumber = useCallback(
    async (mobile: string) => {
      try {
        const response = await checkQueryMutation(mobile);
        return response;
      } catch (error) {
        console.warn('Exchange Amount Error:', error);
        return;
      }
    },
    [checkQueryMutation],
  );

  return {
    handleCheckIban,
    handlePersonalNumber,
    isSuccess,
    data,
    handleMobileNumber,
    isError,
    isLoading,
    savedIban,
    savedAccountName,
  };
};
