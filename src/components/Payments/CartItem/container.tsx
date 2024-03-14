import { useCallback, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { MainStackScreenProps } from 'navigation/types';
import { useDeleteBasketMutation } from 'services/apis';
import { ADD_CART_SCREEN, CART_PAYMENT_LIST_SCREEN, MODAL_STACK } from 'navigation/ScreenNames';
import { Basket } from 'services/apis/paymentsAPI/paymentsAPI.types';
import {
  LanguageKeyForAPIEnum,
  LanguageKeys,
} from 'components/LanguageSwitcher/LanguageSwitcher.types';
import { getValue } from 'storage/index';
import { SELECTED_LANGUAGE } from 'storage/constants';
import { openToast } from 'utils/toast';
import { Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SelectedAccountFromCard } from 'components/CardsAndBalance/CardsAndBalance.types';

export const useCartItem = (selectedAccountFromCard: SelectedAccountFromCard) => {
  const { navigate } = useNavigation<MainStackScreenProps<'ModalStack'>>();
  const savedLanguage = getValue(SELECTED_LANGUAGE);
  const { t } = useTranslation();

  const [isSending, setIsSending] = useState<boolean>(false);

  const [deleteBasket] = useDeleteBasketMutation();

  const openCartDetailsScreen = useCallback(
    (item: Basket) => {
      navigate(MODAL_STACK, {
        screen: CART_PAYMENT_LIST_SCREEN,
        params: {
          basket: item,
          selectedAccountFromCard,
        },
      });
    },
    [navigate, selectedAccountFromCard],
  );

  const editOnPress = useCallback(
    (item: Basket) => {
      navigate(MODAL_STACK, {
        screen: ADD_CART_SCREEN,
        params: {
          basket: item,
        },
      });
    },
    [navigate],
  );

  const deleteBaskeetService = useCallback(
    (item: Basket) => {
      try {
        if (isSending) return;
        setIsSending(true);
        deleteBasket({
          basketIds: [item.id],
          culture:
            savedLanguage === LanguageKeys.geo
              ? LanguageKeyForAPIEnum.KA
              : LanguageKeyForAPIEnum.EN,
        })
          .unwrap()
          .then(() => {
            setIsSending(false);
            openToast(t('common.successfullyOperation'), 'success');
          })
          .catch(ex => {
            setIsSending(false);
            if ('data' in ex && ex?.data?.detail) {
              openToast(ex.data.detail, 'error');
            }
          });
      } catch (ex) {
        console.warn('addBaskeetServiceOnPress', ex);
        setIsSending(false);
      }
    },
    [isSending, deleteBasket, savedLanguage, t],
  );

  const deleteBaskeetServiceOnPress = (basket: Basket) => {
    Alert.alert(t('cartListScreen.deleteCartMessage'), '', [
      {
        text: t('common.no'),
        style: 'cancel',
      },
      {
        text: t('common.yes'),
        onPress: () => deleteBaskeetService(basket),
        style: 'destructive',
      },
    ]);
  };

  return { openCartDetailsScreen, editOnPress, deleteBaskeetServiceOnPress, isSending };
};
