import { useCallback, useState } from 'react';

import { useNavigation, useRoute } from '@react-navigation/native';
import { MainStackRouteProps, MainStackScreenProps } from 'navigation/types';
import { useLazyFindTransferQuery } from 'services/apis';
import { useCulture } from 'hooks/useCulture';
import { openToast } from 'utils/toast';
import { FindTransferResponse } from 'services/apis/moneyTransfersAPI/moneyTransfersAPI.types';
import { Account } from 'services/apis/productsAPI/productsAPI.types';
import { MODAL_STACK, MONEY_TRANSFER_PERMISSION_SCREEN } from 'navigation/ScreenNames';
import { BuyCurrencyDetails } from './CheckMoneyTransferProviderScreen.types';

export const useCheckMoneyTransferProviderInfo = () => {
  const { navigate } = useNavigation<MainStackScreenProps<'ModalStack'>>();

  const [findTransferQuery, { isFetching }] = useLazyFindTransferQuery();
  const { culture } = useCulture();

  const { params } = useRoute<MainStackRouteProps<'CheckMoneyTransferProviderScreen'>>();
  const { providerItem } = params || {};

  const [transferCode, setTransferCode] = useState<string>('');
  const [transferResponse, setTransferResponse] = useState<FindTransferResponse>();
  const [selectedAccount, setSelectedAccount] = useState<Account>();
  const [termsAndConditionsAccepted, setTermsAndConditionsAccepted] = useState<boolean>(false);
  const [currencyConversionEnable, setCurrencyConversionEnable] = useState<boolean>(false);
  const [buyDetails, setBuyDetails] = useState<BuyCurrencyDetails>();

  const findTransferOnPress = useCallback(async () => {
    const reqParams = {
      channelCode: 'DigitalChannel',
      mtSystem: providerItem?.key,
      transferNumber: transferCode,
      currency: '',
      culture,
    };

    try {
      findTransferQuery(reqParams)
        .unwrap()
        .then(resp => {
          setTransferResponse(resp);
        })
        .catch(ex => {
          if ('data' in ex && ex?.data?.title) {
            openToast(ex.data.title, 'error');
          }
        });
    } catch (e) {
      console.warn('findTransferOnPress', e);
    }
  }, [culture, findTransferQuery, providerItem?.key, transferCode]);

  const clearTransferResponse = useCallback(() => {
    if (transferResponse) {
      setTransferResponse(undefined);
    }
  }, [transferResponse]);

  const openMoneyTransferPermissionScreen = useCallback(() => {
    if (transferResponse && selectedAccount) {
      navigate(MODAL_STACK, {
        screen: MONEY_TRANSFER_PERMISSION_SCREEN,
        params: {
          providerItem,
          transferCode,
          transferResponse,
          selectedAccount,
          buyDetails,
        },
      });
    }
  }, [navigate, providerItem, selectedAccount, transferCode, transferResponse, buyDetails]);

  return {
    transferResponse,
    isLoading: isFetching,
    providerItem,
    transferCode,
    setTransferCode,
    findTransferOnPress,
    selectedAccount,
    setSelectedAccount,
    clearTransferResponse,
    openMoneyTransferPermissionScreen,
    termsAndConditionsAccepted,
    setTermsAndConditionsAccepted,
    currencyConversionEnable,
    setCurrencyConversionEnable,
    buyDetails,
    setBuyDetails,
  };
};
