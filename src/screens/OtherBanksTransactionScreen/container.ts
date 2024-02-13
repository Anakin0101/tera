import {
  useLazyCheckPinQuery,
  useLazyCheckIbanQuery,
  useLazyCheckMobileQuery,
} from 'services/apis/transfersAPI/transfersAPI';
import { MOBILE, PERSONAL } from 'constants/transactionConstants';
import { useAppDispatch } from 'store/hooks/useAppDispatch';
import { setIsInternal } from 'store/slices/transfers';
export const useOtherBanksContainer = (param: string) => {
  const dispatch = useAppDispatch();
  const checkQuery =
    param === MOBILE
      ? useLazyCheckMobileQuery
      : param === PERSONAL
      ? useLazyCheckPinQuery
      : useLazyCheckIbanQuery;
  const [checkQueryMutation, { isSuccess, data, isError, isLoading }] = checkQuery();

  const handleCheckIban = async (pin: string) => {
    try {
      const response = await checkQueryMutation(pin);

      dispatch(setIsInternal(response.data.ibanIsInternal));
      return response;
    } catch (error) {
      console.warn('Exchange Amount Error:', error);
      return;
    }
  };
  const handlePersonalNumber = async (pin: string) => {
    try {
      const response = await checkQueryMutation(pin);
      return response;
    } catch (error) {
      console.warn('Exchange Amount Error:', error);
      return;
    }
  };
  const handleMobileNumber = async (mobile: string) => {
    try {
      const response = await checkQueryMutation(mobile);
      return response;
    } catch (error) {
      console.warn('Exchange Amount Error:', error);
      return;
    }
  };

  return {
    handleCheckIban,
    handlePersonalNumber,
    isSuccess,
    data,
    handleMobileNumber,
    isError,
    isLoading,
  };
};
