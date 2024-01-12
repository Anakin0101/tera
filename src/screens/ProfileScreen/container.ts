import { useMemo } from 'react';
import {
  useGetTotalSavingMutation,
  useGetUnreadNotificationsCountMutation,
  useLazyGetUserProfileInfoQuery,
} from 'services/apis';

export const useProfileScreen = () => {
  const [GetUserProfileInfo, { isLoading }] = useLazyGetUserProfileInfoQuery();
  const [getTotalSaving, { data: totalSaving, isLoading: totalSavingLoading }] =
    useGetTotalSavingMutation();

  const [
    getUnreadNotifications,
    { data: unreadNotifications, isLoading: unreadNotificationsLoading },
  ] = useGetUnreadNotificationsCountMutation();

  const profileScreenLoading = useMemo(() => {
    return isLoading || unreadNotificationsLoading || totalSavingLoading;
  }, [isLoading, totalSavingLoading, unreadNotificationsLoading]);

  //   TODO - temporarily ---- will be fixed when we implement toggle for "show pension fund"
  const showPensionFund = true;

  return {
    unreadNotifications,
    showPensionFund,
    totalSaving,
    profileScreenLoading,
    GetUserProfileInfo,
    getUnreadNotifications,
    getTotalSaving,
  };
};
