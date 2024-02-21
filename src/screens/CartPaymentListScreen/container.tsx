import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';

import { MainStackScreenProps, ModalStackRouteProps } from 'navigation/types';
import { useKeyboard } from 'utils/useKeyboard';
import { useCallback, useEffect, useMemo } from 'react';
import { MODAL_STACK, NEW_PAYMENT_SCREEN } from 'navigation/ScreenNames';
import { useGetBasketItemsQuery } from 'services/apis';
import { getValue } from 'storage/index';
import { SELECTED_LANGUAGE } from 'storage/constants';
import {
  LanguageKeyForAPIEnum,
  LanguageKeys,
} from 'components/LanguageSwitcher/LanguageSwitcher.types';

export const useCartPaymentList = () => {
  const { isKeyboardOpened } = useKeyboard();
  const { navigate, setOptions } = useNavigation<MainStackScreenProps<'ModalStack'>>();
  const { params } = useRoute<ModalStackRouteProps<'CartPaymentListScreen'>>();
  const { basket } = params || {};

  const savedLanguage = getValue(SELECTED_LANGUAGE);

  const { data, isLoading, refetch } = useGetBasketItemsQuery({
    basketId: basket?.id,
    culture:
      savedLanguage === LanguageKeys.geo ? LanguageKeyForAPIEnum.KA : LanguageKeyForAPIEnum.EN,
  });

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  useEffect(() => {
    setOptions({
      title: basket?.name || '',
    });
  }, [setOptions, basket?.name]);

  const addPaymentOnPress = useCallback(() => {
    navigate(MODAL_STACK, {
      screen: NEW_PAYMENT_SCREEN,
      params: { basket },
    });
  }, [basket, navigate]);

  const basketItems = useMemo(() => data?.basketItems || [], [data?.basketItems]);

  return {
    isKeyboardOpened,
    addPaymentOnPress,
    isLoading,
    data: basketItems,
    basket,
  };
};
