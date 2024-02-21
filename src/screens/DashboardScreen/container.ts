import { useEffect, useMemo, useState } from 'react';
import {
  useGetBannersQuery,
  useGetDepositsQuery,
  useGetTotalSavingMutation,
  useGetUserProfileInfoQuery,
} from 'services/apis';
import {
  useGetTemplatesQuery,
  useGetCustomerOperationsMutation,
  useGetCreditCardsQuery,
  useGetOverDraftQuery,
  useGetLoanCustomerIdQuery,
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
  const {
    data: creditCards,
    isLoading: creditCardsLoading,
    refetch: creditCardsRefetch,
  } = useGetCreditCardsQuery();
  const {
    data: overDraft,
    isLoading: overDraftLoading,
    refetch: overDraftRefetch,
  } = useGetOverDraftQuery();
  const {
    data: getLoanCustomerId,
    isLoading: loanCustomerIdLoading,
    refetch: loanCoustomerIdRefetch,
  } = useGetLoanCustomerIdQuery();
  const {
    data: deposits,
    isLoading: depositsLoading,
    refetch: depositsRefetch,
  } = useGetDepositsQuery();
  const { data: banker, isLoading: bankerLoading, refetch: bankerRefetch } = useGetBankerQuery();

  const {
    data: profile,
    isLoading: profileLoading,
    refetch: profileRefetch,
  } = useGetUserProfileInfoQuery();

  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [getTotalSaving, { data: totalSaving, isLoading: totalSavingLoading }] =
    useGetTotalSavingMutation();
  const {
    data: banners,
    isLoading: bannersLoading,
    refetch: bannersRefetch,
  } = useGetBannersQuery({
    channel: 'internet-bank',
    language: 'ka',
    page: 'dashboard-main',
    isCorporate: false,
  });

  useEffect(() => {
    getTotalSaving({
      culture: 'en',
    });
  }, [getTotalSaving]);

  useEffect(() => {
    getCustomerOperations({
      count: 4,
      endDate: getCurrentDateISO(),
      startDate: getDateThreeMonthAgeISO(),
    });
  }, [getCustomerOperations]);

  const onRefresh = async () => {
    try {
      if (refreshing) {
        return;
      }
      setRefreshing(true);
      await creditCardsRefetch();
      await overDraftRefetch();
      await loanCoustomerIdRefetch();
      await bankerRefetch();
      await profileRefetch();
      await bannersRefetch();
      await depositsRefetch();
      setRefreshing(false);
    } catch (ex) {
      console.warn('Error onRefresh', ex);
      setRefreshing(false);
    }
  };

  const isDashboardMounted = useMemo(() => {
    const mounted =
      !!templates?.templates.length && !!deposits && !!banker && !!profile?.firstName && !!banners;
    return mounted;
  }, [deposits, banker, profile?.firstName, templates?.templates.length, banners]);

  return {
    templates,
    temlpatesLoading,
    customerOperationsLoading,
    loanCustomerIdLoading,
    bankerLoading,
    overDraftLoading,
    creditCardsLoading,
    customerOperations,
    creditCards,
    overDraft,
    getLoanCustomerId,
    banker,
    isDashboardMounted,
    banners,
    bannersLoading,
    totalSavingLoading,
    totalSaving,
    onRefresh,
    refreshing,
    profileLoading,
    deposits,
    depositsLoading,
    depositsRefetch,
  };
};
