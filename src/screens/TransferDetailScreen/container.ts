import {
  useExchangeAmountMutation,
  useTransferToOwnAccountMutation,
  useTransferToSomeoneMutation,
  useP2ptransferToSomeoneMutation,
  useLazyGetTransferInfoQuery,
} from 'services/apis/transfersAPI/transfersAPI';
import { TransferToOwnAccountRequestType } from 'services/apis/transfersAPI/transfersAPI.types';

export const useTransferDetails = (useP2pMutation: boolean = false) => {
  const [exchangeAmountMutation] = useExchangeAmountMutation();
  const [transferToOwnAccountMutation] = useTransferToOwnAccountMutation();
  const [transferToSomeoneMutation, { data: transferData }] = useTransferToSomeoneMutation();
  const [P2pTransferToSomeone, { data: p2pData }] = useP2ptransferToSomeoneMutation();
  const [getTransferInfo] = useLazyGetTransferInfoQuery();
  const PERSONAL_TRANSACTION = 'პირადი გადარიცხვა';

  const transferToSomeone = useP2pMutation ? P2pTransferToSomeone : transferToSomeoneMutation;
  const data = useP2pMutation ? p2pData : transferData;
  const handleExchangeAmount = async (params: any) => {
    try {
      const response = await exchangeAmountMutation(params);
      return response;
    } catch (error) {
      console.warn('Exchange Amount Error:', error);
      throw error;
    }
  };

  const handleTransferToOwnAccount = async (operations: TransferToOwnAccountRequestType) => {
    try {
      const response = await transferToOwnAccountMutation(operations);

      return response;
    } catch (error) {
      console.warn('Transfer to Own Account Error:', error);
      throw error;
    }
  };

  const handleTransferInfo = async (info: any) => {
    try {
      const response = await getTransferInfo(info);

      return response;
    } catch (error) {
      console.warn('Transfer to Someone Account Error:', error);
      throw error;
    }
  };

  return {
    handleExchangeAmount,
    handleTransferToOwnAccount,
    data,
    handleTransferInfo,
    transferToSomeone,
    PERSONAL_TRANSACTION,
  };
};
