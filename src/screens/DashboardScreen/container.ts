import { useEffect, useMemo } from 'react';
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
  const { data: creditCards, isLoading: creditCardsLoading } = useGetCreditCardsQuery();
  const { data: overDraft, isLoading: overDraftLoading } = useGetOverDraftQuery();
  const { data: getLoanCustomerId, isLoading: loanCustomerIdLoading } = useGetLoanCustomerIdQuery();
  const { data: deposits, isLoading: depositsLoading } = useGetDepositsQuery();
  const { data: banker, isLoading: bankerLoading } = useGetBankerQuery();
  const { data: profile, isLoading: profileLoading } = useGetUserProfileInfoQuery();
  const [getTotalSaving, { data: totalSaving, isLoading: totalSavingLoading }] =
    useGetTotalSavingMutation();
  const { data: banners, isLoading: bannersLoading } = useGetBannersQuery({
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

  const isDashboardMounted = useMemo(() => {
    const mounted =
      !!templates?.templates.length && !!deposits && !!banker && !!profile?.firstName && !!banners;
    return mounted;
  }, [deposits, banker, profile?.firstName, templates?.templates.length, banners]);

  const isLoading = useMemo(() => {
    return (
      customerOperationsLoading ||
      loanCustomerIdLoading ||
      bankerLoading ||
      overDraftLoading ||
      creditCardsLoading ||
      bannersLoading ||
      totalSavingLoading ||
      profileLoading ||
      temlpatesLoading ||
      depositsLoading
    );
  }, [
    bankerLoading,
    bannersLoading,
    creditCardsLoading,
    customerOperationsLoading,
    depositsLoading,
    loanCustomerIdLoading,
    overDraftLoading,
    profileLoading,
    temlpatesLoading,
    totalSavingLoading,
  ]);

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
    profileLoading,
    deposits,
    depositsLoading,
    isLoading,
  };
};
