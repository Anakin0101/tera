import { useLazyCheckIbanQuery } from 'services/apis/transfersAPI/transfersAPI';

export const useOtherBanksContainer = () => {
  const [checkIbanMutation, { isSuccess, data }] = useLazyCheckIbanQuery();

  const handleCheckIban = async (iban: any) => {
    try {
      const response = await checkIbanMutation(iban);
      return response;
    } catch (error) {
      console.error('Exchange Amount Error:', error);
      throw error;
    }
  };

  return {
    handleCheckIban,
    isSuccess,
    data,
  };
};
