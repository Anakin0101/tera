import {
  LanguageKeyForAPIEnum,
  LanguageKeys,
} from 'components/LanguageSwitcher/LanguageSwitcher.types';
import { useEffect, useMemo } from 'react';
import {
  useGetDebtVerifyBasketMutation,
  useGetPaymentServicesQuery,
  useGetTemplatesQuery,
} from 'services/apis';
import { SELECTED_LANGUAGE } from 'storage/constants';
import { getValue } from 'storage/index';
import { useAppSelector } from 'store/hooks/useAppSelector';

const defaultProviderSeriviceId = 260; // გაერთიანებული მობილური ოპერატორის აიდი რომლის გაჰადკოდებაც მოგვიწია

export const useChooseMobileProviderScreen = () => {
  const { userIp } = useAppSelector(state => state.deviceInfo);
  const savedLanguage = getValue(SELECTED_LANGUAGE);

  const { isAdult = false } = useAppSelector(state => state.profile?.userProfileInfo) || {};

  const { data: providersGroupsResponse } = useGetPaymentServicesQuery({ isAdult });
  const { data, isLoading: temlpatesLoading } = useGetTemplatesQuery({
    headers: { 'X-Bank-UserIp': userIp },
  });

  const [getDebtVerifyBasket, { data: debtVerifyBasketInfo }] = useGetDebtVerifyBasketMutation();

  useEffect(() => {
    getDebtVerifyBasket({
      serviceId: defaultProviderSeriviceId,
      culture:
        savedLanguage === LanguageKeys.geo ? LanguageKeyForAPIEnum.KA : LanguageKeyForAPIEnum.EN,
    });
  }, [getDebtVerifyBasket, savedLanguage]);

  const mobilePaymentTempaltes = useMemo(
    () => data?.templates.filter(el => !!el?.mobilePayment),
    [data?.templates],
  );

  // Use the find method to find the provider group
  // const foundProviderGroup = providersGroups.find(group =>
  //   group.providers.find(provider => provider.id === providerIdToFind),
  // );

  const checkNumberDetails = (number: string) => {
    // providersGroups
    // console.log(providersGroupsResponse);

    const foundProviderGroup = providersGroupsResponse?.providersGroups?.find(group =>
      group?.providers?.find(provider => provider.id === defaultProviderSeriviceId),
    );
    const foundProvider = foundProviderGroup?.providers.find(
      provider => provider.id === defaultProviderSeriviceId,
    );

    const params = {
      fieldValues: [{ id: debtVerifyBasketInfo?.[0]?.id, value: number }],
      serviceId: defaultProviderSeriviceId,
      culture:
        savedLanguage === LanguageKeys.geo ? LanguageKeyForAPIEnum.KA : LanguageKeyForAPIEnum.EN,
    };

    console.log('foundProviderItem', foundProvider);
    console.log('params', params);
  };

  return {
    templates: mobilePaymentTempaltes,
    temlpatesLoading,
    checkNumberDetails,
  };
};
