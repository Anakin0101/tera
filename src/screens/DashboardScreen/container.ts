import { useEffect, useMemo } from 'react';
import { useGetUserProfileInfoQuery } from 'services/apis';
import {
  useGetTemplatesQuery,
  useGetCustomerOperationsMutation,
  useGetCreditCardsQuery,
  useGetOverDraftQuery,
  useGetLoanCustomerIdQuery,
  useGetAssetsQuery,
  useGetBankerQuery,
} from 'services/apis';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { getCurrentDateISO, getDateThreeMonthAgeISO } from 'utils/formatDate';

export const useDashboardScreen = () => {
  const { userIp } = useAppSelector(state => state.deviceInfo);
  const { data: templates, isLoading: temlpatesLoading } = useGetTemplatesQuery({
    headers: { 'X-Bank-UserIp': userIp },
  });
  const [
    getCustomerOperations,
    { data: customerOperations, isLoading: customerOperationsLoading },
  ] = useGetCustomerOperationsMutation();
  const { data: creditCards, isLoading: creditCardsLoading } = useGetCreditCardsQuery();
  const { data: overDraft, isLoading: overDraftLoading } = useGetOverDraftQuery();
  const { data: getLoanCustomerId, isLoading: customerIdLoading } = useGetLoanCustomerIdQuery();
  const { data: assets, isLoading: assetsLoading } = useGetAssetsQuery();
  const { data: banker, isLoading: bankerLoading } = useGetBankerQuery();
  const { data: profile } = useGetUserProfileInfoQuery();

  useEffect(() => {
    getCustomerOperations({
      count: 4,
      endDate: getCurrentDateISO(),
      startDate: getDateThreeMonthAgeISO(),
      accountNumber: null,
    });
  }, [getCustomerOperations]);

  const isDashboardMounted = useMemo(() => {
    const mounted = !!templates?.templates.length && !!assets && !!banker && !!profile?.firstName;
    return mounted;
  }, [assets, banker, profile?.firstName, templates?.templates.length]);

  return {
    templates,
    temlpatesLoading,
    customerOperationsLoading,
    customerIdLoading,
    assetsLoading,
    bankerLoading,
    overDraftLoading,
    creditCardsLoading,
    customerOperations,
    creditCards,
    overDraft,
    getLoanCustomerId,
    assets,
    banker,
    isDashboardMounted,
  };
};
