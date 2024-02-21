import { useCallback, useMemo } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { MainStackScreenProps } from 'navigation/types';
import { useKeyboard } from 'utils/useKeyboard';
import { useGetBasketsServicesQuery } from 'services/apis';
import { ADD_CART_SCREEN, CART_LIST_SCREEN, MODAL_STACK } from 'navigation/ScreenNames';

export const useCartPayment = () => {
  const { navigate } = useNavigation<MainStackScreenProps<'ModalStack'>>();

  const { data, isLoading, refetch } = useGetBasketsServicesQuery();
  const { isKeyboardOpened } = useKeyboard();

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  const addCartOnPress = useCallback(() => {
    navigate(MODAL_STACK, {
      screen: ADD_CART_SCREEN,
    });
  }, [navigate]);

  const openAllCartsOnPress = useCallback(() => {
    navigate(MODAL_STACK, {
      screen: CART_LIST_SCREEN,
    });
  }, [navigate]);

  const basketList = useMemo(() => {
    return data?.baskets?.slice(0, 4) || [];
  }, [data?.baskets]);

  return {
    isKeyboardOpened,
    data: basketList,
    isLoading,
    addCartOnPress,
    openAllCartsOnPress,
  };
};
