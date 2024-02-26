import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, Pressable } from 'react-native';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import { MainStackScreenProps, ModalStackRouteProps } from 'navigation/types';
import { useKeyboard } from 'utils/useKeyboard';
import {
  ADD_CART_SCREEN,
  CART_PAYMENT_SUCCESS_SCREEN,
  MODAL_STACK,
  NEW_PAYMENT_SCREEN,
  PAYMENT_ERROR_SCREEN,
} from 'navigation/ScreenNames';
import {
  useDeleteBasketItemsMutation,
  useDeleteBasketMutation,
  useGetBasketItemsQuery,
  useGetPaymentServicesQuery,
  usePayServiceMutation,
} from 'services/apis';
import { getValue } from 'storage/index';
import { SELECTED_LANGUAGE } from 'storage/constants';
import {
  LanguageKeyForAPIEnum,
  LanguageKeys,
} from 'components/LanguageSwitcher/LanguageSwitcher.types';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { SubscriberFieldValue } from 'screens/CheckPaymentProviderScreen/CheckPaymentProviderScreen.types';
import { MoreIcon } from 'assets/SVGs';
import {
  PayRequestBody,
  Payment,
  ProviderItemProps,
} from 'services/apis/paymentsAPI/paymentsAPI.types';
import { openToast } from 'utils/toast';
import { Colors } from 'theme/Variables';
import { useStyles } from './CartPaymentListScreen.style';

export const useCartPaymentList = () => {
  const styles = useStyles();
  const { isKeyboardOpened } = useKeyboard();
  const { t } = useTranslation();
  const { navigate, setOptions, goBack } = useNavigation<MainStackScreenProps<'ModalStack'>>();
  const { params } = useRoute<ModalStackRouteProps<'CartPaymentListScreen'>>();
  const { basket } = params || {};
  const savedLanguage = getValue(SELECTED_LANGUAGE);
  const { isAdult = false } = useAppSelector(state => state.profile?.userProfileInfo) || {};

  const [subscriberFieldsValue, setSubscriberFieldsValue] = useState<{
    [key: string]: SubscriberFieldValue;
  }>({});
  const [isSending, setIsSending] = useState<boolean>(false);
  const [isActionSheetVisible, setIsActionSheetVisible] = useState<boolean>(false);
  const [providerItems, setProviderItems] = useState<Array<ProviderItemProps>>([]);

  const [getPaymentServices, { isLoading: payIsLoading }] = usePayServiceMutation();
  const [deleteBasketItemService] = useDeleteBasketItemsMutation();
  const [deleteBasket] = useDeleteBasketMutation();

  const toggleActionSheet = useCallback(() => {
    setIsActionSheetVisible(prev => !prev);
  }, []);

  const payService = useCallback(
    async (
      accountId: number,
      payments: Array<Payment>,
      sum: number,
      selectedCartItemIds: Array<string>,
    ) => {
      try {
        const request: PayRequestBody = {
          otp: null,
          payments,
          isTeraBytes: false,
          accountId,
          sendOtp: false,
          culture:
            savedLanguage === LanguageKeys.geo
              ? LanguageKeyForAPIEnum.KA
              : LanguageKeyForAPIEnum.EN,
        };
        const response = await getPaymentServices(request);

        if ('error' in response) {
          if ('data' in response.error) {
            // Use type assertion to inform TypeScript about the structure
            const errorData = response.error.data as {
              detail?: string;
            };

            if (errorData.detail) {
              openToast(errorData.detail, 'error');
            }
            return;
          }
        } else if ('data' in response && response.data.paymentResults) {
          const newProviderItems = providerItems?.filter(el =>
            selectedCartItemIds.includes(el?.id),
          );

          navigate(MODAL_STACK, {
            screen: CART_PAYMENT_SUCCESS_SCREEN,
            params: {
              paymentResults: response.data.paymentResults,
              sum,
              providerItems: newProviderItems,
            },
          });
        }
      } catch (err) {
        console.warn('error=> payService >>>', err);
        navigate(PAYMENT_ERROR_SCREEN);
        return err;
      }
    },
    [getPaymentServices, navigate, savedLanguage, providerItems],
  );

  const { data: getPaymentResponse, isLoading: isPaymentServiceLoading } =
    useGetPaymentServicesQuery({ isAdult });

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
      headerRight: () => (
        <Pressable onPress={toggleActionSheet} style={styles.headerButton}>
          <MoreIcon />
        </Pressable>
      ),
    });
  }, [setOptions, basket?.name, toggleActionSheet, styles.headerButton]);

  const addPaymentOnPress = useCallback(() => {
    toggleActionSheet();
    navigate(MODAL_STACK, {
      screen: NEW_PAYMENT_SCREEN,
      params: { basket },
    });
  }, [basket, navigate, toggleActionSheet]);

  const basketItems = useMemo(() => data?.basketItems || [], [data?.basketItems]);

  const providersGroups = useMemo(
    () => getPaymentResponse?.providersGroups || [],
    [getPaymentResponse?.providersGroups],
  );

  const deleteBasketService = useCallback(
    (basketId: string) => {
      try {
        deleteBasketItemService({
          itemsIds: [basketId],
          culture:
            savedLanguage === LanguageKeys.geo
              ? LanguageKeyForAPIEnum.KA
              : LanguageKeyForAPIEnum.EN,
        })
          .unwrap()
          .then(() => {})
          .catch(ex => {
            if ('data' in ex && ex?.data?.detail) {
              openToast(ex.data.detail, 'error');
            }
          });
      } catch (ex) {
        console.warn(ex);
      }
    },
    [deleteBasketItemService, savedLanguage],
  );

  const editOnPress = useCallback(() => {
    toggleActionSheet();
    navigate(MODAL_STACK, {
      screen: ADD_CART_SCREEN,
      params: {
        basket,
        fromBasketDetails: true,
      },
    });
  }, [basket, navigate, toggleActionSheet]);

  const deleteBaskeetService = useCallback(() => {
    try {
      if (isSending) return;
      setIsSending(true);
      deleteBasket({
        basketIds: [basket.id],
        culture:
          savedLanguage === LanguageKeys.geo ? LanguageKeyForAPIEnum.KA : LanguageKeyForAPIEnum.EN,
      })
        .unwrap()
        .then(() => {
          goBack();
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
  }, [isSending, deleteBasket, basket.id, savedLanguage, goBack, t]);

  const deleteBaskeetServiceOnPress = useCallback(() => {
    toggleActionSheet();
    Alert.alert(t('cartListScreen.deleteCartMessage'), '', [
      {
        text: t('common.no'),
        style: 'cancel',
      },
      {
        text: t('common.yes'),
        onPress: () => deleteBaskeetService(),
        style: 'destructive',
      },
    ]);
  }, [deleteBaskeetService, t, toggleActionSheet]);

  const actionItems = useMemo(
    () => [
      {
        label: 'common.addPayment',
        onPress: addPaymentOnPress,
      },
      {
        label: 'common.editName',
        onPress: editOnPress,
      },
      {
        label: 'common.delete',
        color: Colors.error,
        onPress: deleteBaskeetServiceOnPress,
      },
    ],
    [addPaymentOnPress, deleteBaskeetServiceOnPress, editOnPress],
  );

  return {
    isKeyboardOpened,
    addPaymentOnPress,
    isLoading,
    data: basketItems,
    basket,
    isPaymentServiceLoading,
    providersGroups,
    subscriberFieldsValue,
    setSubscriberFieldsValue,
    payIsLoading,
    payService,
    deleteBasketService,
    actionItems,
    isActionSheetVisible,
    toggleActionSheet,
    setProviderItems,
  };
};
