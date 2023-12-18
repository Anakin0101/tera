import {
  useExchangeAmountMutation,
  useTransferToOwnAccountMutation,
  useTransferToSomeoneMutation,
  useLazyGetTransferInfoQuery,
} from 'services/apis/transfersAPI/transfersAPI';
export const useTransferDetails = () => {
  const [exchangeAmountMutation] = useExchangeAmountMutation();
  const [transferToOwnAccountMutation] = useTransferToOwnAccountMutation();
  const [transferToSomeoneMutation, { data }] = useTransferToSomeoneMutation();
  const [getTransferInfo] = useLazyGetTransferInfoQuery();

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

  const handleTransferInfo = async (info: any) => {
    try {
      const response = await getTransferInfo(info);
      return response;
    } catch (error) {
      console.error('Transfer to Someone Account Error:', error);
      throw error;
    }
  };

  return {
    handleExchangeAmount,
    handleTransferToOwnAccount,
    data,
    handleTransferInfo,
    transferToSomeoneMutation,
  };
};
