import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { MainStackScreenProps } from 'navigation/types';
import { useKeyboard } from 'utils/useKeyboard';
import { useGetBasketsServicesQuery } from 'services/apis';
import { useCallback } from 'react';
import { ADD_CART_SCREEN, MODAL_STACK } from 'navigation/ScreenNames';

export const useCartList = () => {
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

  return {
    isKeyboardOpened,
    data: data?.baskets || [],
    isLoading,
    addCartOnPress,
  };
};
