import {
  useExchangeAmountMutation,
  useTransferToOwnAccountMutation,
} from 'services/apis/transfersAPI/transfersAPI';
export const useTransferDetails = () => {
  const [exchangeAmountMutation] = useExchangeAmountMutation();
  const [transferToOwnAccountMutation] = useTransferToOwnAccountMutation();

  const handleExchangeAmount = async (params: any) => {
    try {
      const response = await exchangeAmountMutation(params);
      return response;
    } catch (error) {
      console.error('Exchange Amount Error:', error);
      throw error;
    }
  };

  const handleTransferToOwnAccount = async (operations: any) => {
    try {
      const response = await transferToOwnAccountMutation(operations);

      return response;
    } catch (error) {
      console.error('Transfer to Own Account Error:', error);
      throw error;
    }
  };

  return {
    handleExchangeAmount,
    handleTransferToOwnAccount,
  };
};
