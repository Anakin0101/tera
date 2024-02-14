import { useNavigation } from '@react-navigation/native';
import {
  LanguageKeyForAPIEnum,
  LanguageKeys,
} from 'components/LanguageSwitcher/LanguageSwitcher.types';
import { CHOOSE_PAYMENT_ACCOUNT_SCREEN, MODAL_STACK } from 'navigation/ScreenNames';
import { MainStackScreenProps } from 'navigation/types';
import { useEffect, useMemo } from 'react';
import {
  useDebtVerifyResultsMutation,
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
  const { navigate } = useNavigation<MainStackScreenProps<'ModalStack'>>();

  const { isAdult = false } = useAppSelector(state => state.profile?.userProfileInfo) || {};

  const { data: providersGroupsResponse } = useGetPaymentServicesQuery({ isAdult });
  const { data, isLoading: temlpatesLoading } = useGetTemplatesQuery({
    headers: { 'X-Bank-UserIp': userIp },
  });

  const [getDebtVerifyBasket, { data: debtVerifyBasketInfo }] = useGetDebtVerifyBasketMutation();
  const [getDebtVerifyResults] = useDebtVerifyResultsMutation();

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

  const checkNumberDetails = (number: string) => {
    try {
      const foundProviderGroup = providersGroupsResponse?.providersGroups?.find(group =>
        group?.providers?.find(provider => provider.id === defaultProviderSeriviceId),
      );
      const foundProvider = foundProviderGroup?.providers?.find(
        provider => provider.id === defaultProviderSeriviceId,
      );

      if (foundProvider && debtVerifyBasketInfo?.[0]?.id) {
        getDebtVerifyResults({
          fieldValues: [{ id: debtVerifyBasketInfo?.[0]?.id, value: number }],
          serviceId: defaultProviderSeriviceId,
          culture:
            savedLanguage === LanguageKeys.geo
              ? LanguageKeyForAPIEnum.KA
              : LanguageKeyForAPIEnum.EN,
        })
          .unwrap()
          .then(res => {
            if (res.debtVerifyResults?.length) {
              const providerItem = foundProviderGroup?.providers?.find(
                provider => provider.id === res.debtVerifyResults?.[0]?.serviceId,
              );
              if (providerItem) {
                navigate(MODAL_STACK, {
                  screen: CHOOSE_PAYMENT_ACCOUNT_SCREEN,
                  params: {
                    providerItem,
                    debtVerifyBasketInfo,
                    debtVerifyResults: res.debtVerifyResults,
                    subscriberFieldsValue: [{ id: debtVerifyBasketInfo?.[0]?.id, value: number }],
                  },
                });
              }
            }
          });
      }
    } catch (err) {
      console.warn('checkNumberDetails', err);
    }
  };

  return {
    templates: mobilePaymentTempaltes,
    temlpatesLoading,
    checkNumberDetails,
  };
};
