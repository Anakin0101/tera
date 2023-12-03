import { useGetTemplatesQuery } from 'services/apis/transfersAPI/transfersAPI';

export const useTransactionsScreen = () => {
  const { data: templates, isLoading: temlpatesLoading } = useGetTemplatesQuery();

  //   const [getCustomerOperations, { data: customOperations, isLoading: customerOperationsLoading }] =
  //     useGetCustomerOperationsMutation();

  return {
    templates,
    temlpatesLoading,
  };
};
