import { useCallback, useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useCulture } from 'hooks/useCulture';
import { MainStackRouteProps, MainStackScreenProps } from 'navigation/types';
import { usePrepareTransferSendMutation } from 'services/apis';
import { TransferSendPrepareResponse } from 'services/apis/moneyTransfersAPI/moneyTransfersAPI.types';
import { Account } from 'services/apis/productsAPI/productsAPI.types';
import { CurrencyEnum } from 'services/apis/transfersAPI/transfersAPI.types';
import { openToast } from 'utils/toast';
import { useKeyboard } from 'utils/useKeyboard';
import { MONEY_TRANSFER_SEND_PERMISSION_SCREEN } from 'navigation/ScreenNames';

export const useMoneyTransferSendMoney = () => {
  const { navigate } = useNavigation<MainStackScreenProps<'ModalStack'>>();
  const { params } = useRoute<MainStackRouteProps<'MoneyTransferSendMoneyScreen'>>();
  const { providerItem, selectedCountry, selectedCity, mtPoint, firstName, lastName } =
    params || {};
  const { isKeyboardOpened } = useKeyboard();
  const { culture } = useCulture();
  const [prepareTransferSend, { isLoading }] = usePrepareTransferSendMutation();

  const [selectedSendCurrency, setSelectedSendCurrency] = useState<CurrencyEnum>(CurrencyEnum.GEL);
  const [selectedSendCurrencyVal, setSelectedSendCurrencyVal] = useState<string>('');
  const [selectedReceiveCurrency, setSelectedReceiveCurrency] = useState<CurrencyEnum>(
    CurrencyEnum.USD,
  );
  const [selectedReceiveCurrencyVal, setSelectedReceiveCurrencyVal] = useState<string>('');
  const [selectedAccount, setSelectedAccount] = useState<Account>();
  const [transferSendPrepareResponse, setTransferSendPrepareResponse] =
    useState<TransferSendPrepareResponse>();

  useEffect(() => {
    setSelectedAccount(undefined);
  }, [selectedSendCurrency]);

  useEffect(() => {
    setTransferSendPrepareResponse(undefined);
    setSelectedReceiveCurrencyVal('');
  }, [selectedSendCurrencyVal]);

  const onSubmit = useCallback(async () => {
    try {
      if (isLoading) return;
      if (!transferSendPrepareResponse) {
        const body = {
          culture,
          channelCode: 'DigitalChannel',
          mtSystem: providerItem?.id,
          fieldValues: [
            {
              code: 'receiveCountry',
              value: selectedCountry?.code || '',
            },
            {
              code: 'receiveCity',
              value: selectedCity?.cityId || '',
            },
            {
              code: 'receivePoint.code',
              value: mtPoint?.code || '',
            },
            {
              code: 'amount',
              value: selectedSendCurrencyVal,
            },
            {
              code: 'currency',
              value: selectedSendCurrency,
            },
            {
              code: 'payOutCurrency',
              value: selectedSendCurrency,
            },
          ],
        };

        const response = await prepareTransferSend(body);

        if ('error' in response) {
          if ('data' in response.error) {
            const errorData = response.error.data as {
              title?: string;
            };
            if (errorData.title) {
              openToast(errorData.title, 'error');
            }
            return;
          }
        } else if (response?.data?.transferSendPrepareResponse) {
          setTransferSendPrepareResponse(response.data.transferSendPrepareResponse);
          setSelectedReceiveCurrencyVal(
            response.data.transferSendPrepareResponse?.payoutAmount?.toString(),
          );
        }
      } else {
        if (selectedAccount) {
          const navParams = {
            providerItem,
            selectedCountry,
            selectedCity,
            mtPoint,
            firstName,
            lastName,
            transferSendPrepareResponse,
            selectedAccount,
          };
          navigate(MONEY_TRANSFER_SEND_PERMISSION_SCREEN, navParams);
        }
      }
    } catch (ex) {
      console.warn('Error in onSubmit prepareTransferSend: ', ex);
    }
  }, [
    culture,
    firstName,
    isLoading,
    lastName,
    mtPoint,
    navigate,
    prepareTransferSend,
    providerItem,
    selectedCity,
    selectedCountry,
    selectedSendCurrency,
    selectedSendCurrencyVal,
    transferSendPrepareResponse,
    selectedAccount,
  ]);

  return {
    onSubmit,
    isKeyboardOpened,
    selectedSendCurrency,
    setSelectedSendCurrency,
    selectedReceiveCurrency,
    setSelectedReceiveCurrency,
    selectedSendCurrencyVal,
    setSelectedSendCurrencyVal,
    selectedReceiveCurrencyVal,
    setSelectedReceiveCurrencyVal,
    selectedAccount,
    setSelectedAccount,
    isLoading,
    transferSendPrepareResponse,
  };
};
