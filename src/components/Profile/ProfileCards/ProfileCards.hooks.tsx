import { useLanguageSwitcher } from 'components/LanguageSwitcher/useLanguageSwitcher';
import { useEffect } from 'react';
import { useGetTotalSavingMutation, useGetUnreadNotificationsCountMutation } from 'services/apis';
import { ProfileCardType } from './ProfileCards.types';
import Images from 'theme/Images';
import React from 'react';
import { PensionFund } from '../PensionFund/PensionFund';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { Notification } from '../Notification/Notification';

export const useProfileCards = () => {
  const userProfileInfo = useAppSelector(state => state.profile.userProfileInfo);
  const [getTotalSaving, { data: totalSaving }] = useGetTotalSavingMutation();

  const [getUnreadNotifications, { data: unreadNotifications }] =
    useGetUnreadNotificationsCountMutation();
  const { savedLanguage } = useLanguageSwitcher();
  //   TODO - temporarily ---- will be fixed when we implement toggle for "show pension fund"
  const showPensionFund = true;

  useEffect(() => {
    const culture = savedLanguage === 'Eng' ? 'en' : 'ka';
    getTotalSaving({
      culture: culture,
    });
    getUnreadNotifications({
      culture: culture,
      personalId: userProfileInfo?.personalId || '',
    });
  }, [savedLanguage, getTotalSaving, getUnreadNotifications, userProfileInfo?.personalId]);

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
    },
    {
      id: 'locations',
      icon: Images().Locations,
      text: 'profile.locations',
    },
    {
      id: 'pension_fund',
      icon: Images().PensionFund,
      text: 'profile.pension_fund',
      extraData: (
        <PensionFund
          totalSaving={totalSaving?.totalSaving ?? 0}
          showPensionFund={showPensionFund}
        />
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
