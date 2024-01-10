import {
  useLazyCheckPinQuery,
  useLazyCheckIbanQuery,
  useLazyCheckMobileQuery,
} from 'services/apis/transfersAPI/transfersAPI';
import { MOBILE, PERSONAL } from 'constants/transactionConstants';
export const useOtherBanksContainer = (param: string) => {
  const checkQuery =
    param === MOBILE
      ? useLazyCheckMobileQuery
      : param === PERSONAL
      ? useLazyCheckPinQuery
      : useLazyCheckIbanQuery;
  const [checkQueryMutation, { isSuccess, data, isError }] = checkQuery();

  const handleCheckIban = async (pin: any) => {
    try {
      const response = await checkQueryMutation(pin);
      return response;
    } catch (error) {
      console.warn('Exchange Amount Error:', error);
      throw error;
    }
  };
  const handlePersonalNumber = async (pin: any) => {
    try {
      const response = await checkQueryMutation(pin);
      return response;
    } catch (error) {
      console.warn('Exchange Amount Error:', error);
      throw error;
    }
  };
  const handleMobileNumber = async (mobile: any) => {
    try {
      const response = await checkQueryMutation(mobile);
      return response;
    } catch (error) {
      console.warn('Exchange Amount Error:', error);
      throw error;
    }
  };

  return {
    handleCheckIban,
    handlePersonalNumber,
    isSuccess,
    data,
    handleMobileNumber,
    isError,
  };
};
