import { useLazyGetTransferInfoQuery } from 'services/apis';

export const useForeignTransfer = () => {
  const [getTransferInfo, { isLoading: isGetTransferInfoLoading }] = useLazyGetTransferInfoQuery();
  const handleTransferInfo = async (info: any) => {
    try {
      const response = await getTransferInfo(info);

      return response;
    } catch (error) {
      console.warn('Transfer to Someone Account Error:', error);
    }
  };
  return { getTransferInfo, handleTransferInfo, isGetTransferInfoLoading };
};
