import { ProfileCardType } from './ProfileCards.types';
import Images from 'theme/Images';
import React, { useEffect } from 'react';
import { PensionFund } from '../PensionFund/PensionFund';
import { Notification } from '../Notification/Notification';
import { useProfileScreen } from 'screens/ProfileScreen/container';
import { useAppSelector } from 'store/hooks/useAppSelector';
import {
  ATMS_AND_BRANCHES_SCREEN,
  EXCHANGE_RATES_SCREEN,
  MODAL_STACK,
} from 'navigation/ScreenNames';

export const useProfileCards = () => {
  const userProfileInfo = useAppSelector(state => state.profile.userProfileInfo);
  const {
    getTotalSaving,
    getUnreadNotifications,
    unreadNotifications,
    showPensionFund,
    totalSaving,
  } = useProfileScreen();

  useEffect(() => {
    getTotalSaving({
      culture: 'en',
    });
    getUnreadNotifications({
      culture: 'en',
      personalId: userProfileInfo?.personalId || '',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getTotalSaving, getUnreadNotifications]);

  const profileCardsConfig: ProfileCardType[] = [
    {
      id: 'notifications',
      icon: Images().NotificationColored,
      text: 'profile.notifications',
      extraData: <Notification notificationsQTY={unreadNotifications?.data?.notReadCount} />,
      absolute: true,
    },
    {
      id: 'currency_rates',
      icon: Images().CurrencyRates,
      text: 'profile.currency_rates',
      navigateTo: {
        stack: MODAL_STACK,
        screen: EXCHANGE_RATES_SCREEN,
      },
    },
    {
      id: 'locations',
      icon: Images().Locations,
      text: 'profile.locations',
      navigateTo: {
        stack: MODAL_STACK,
        screen: ATMS_AND_BRANCHES_SCREEN,
      },
    },
    {
      id: 'pension_fund',
      icon: Images().PensionFund,
      text: 'profile.pension_fund',
      extraData: (
        <PensionFund totalSaving={totalSaving?.totalSaving} showPensionFund={showPensionFund} />
      ),
    },
    {
      id: 'my_finances',
      icon: Images().Finances,
      text: 'profile.my_finances',
    },
    {
      id: 'my_documents',
      icon: Images().Documents,
      text: 'profile.my_documents',
    },
  ];

  return {
    profileCardsConfig,
  };
};
