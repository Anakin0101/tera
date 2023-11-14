import { useEffect } from 'react';
import { useGetUserProfileInfoQuery } from 'services/apis';
import {
  useGetTemplatesQuery,
  useGetCustomerOperationsMutation,
  useGetCreditCardsQuery,
  useGetOverDraftQuery,
  useGetLoanCustomerIdQuery,
  useGetAssetsQuery,
  useGetBankerQuery,
} from 'services/apis/dashboardAPI/dashboardAPI';
import { useAppDispatch } from 'store/hooks/useAppDispatch';
import { setCustomerId } from 'store/slices/profile';

export const useDashboardScreen = () => {
  const dispatch = useAppDispatch();
  const { data: templates, isLoading: temlpatesLoading } = useGetTemplatesQuery();
  const [getCustomerOperations, { data: customOperations, isLoading: customerOperationsLoading }] =
    useGetCustomerOperationsMutation();
  const { data: creditCards, isLoading: creditCardsLoading } = useGetCreditCardsQuery();
  const { data: overDraft, isLoading: overDraftLoading } = useGetOverDraftQuery();
  const { data: getLoanCustomerId, isLoading: customerIdLoading } = useGetLoanCustomerIdQuery();
  const { data: assets, isLoading: assetsLoading } = useGetAssetsQuery();
  const { data: banker, isLoading: bankerLoading } = useGetBankerQuery();
  const { data: profile } = useGetUserProfileInfoQuery();

  useEffect(() => {
    getCustomerOperations({
      count: 5,
      culture: 'ka',
      currency: 'gel',
      endDate: '2023-10-24T16:24:09.087Z',
      startDate: '2023-08-24T16:24:09.087Z',
      accountNumber: null,
    });
  }, [getCustomerOperations]);

  useEffect(() => {
    if (profile) {
      dispatch(setCustomerId(profile.customerId));
    }
  }, [dispatch, profile]);

  return {
    templates,
    temlpatesLoading,
    customerOperationsLoading,
    customerIdLoading,
    assetsLoading,
    bankerLoading,
    overDraftLoading,
    creditCardsLoading,
    customOperations,
    creditCards,
    overDraft,
    getLoanCustomerId,
    assets,
    banker,
  };
};
