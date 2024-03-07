import { useCallback, useState } from 'react';

import { useRoute } from '@react-navigation/native';
import { MainStackRouteProps } from 'navigation/types';
import { useKeyboard } from 'utils/useKeyboard';
import { useLazyFindTransferQuery } from 'services/apis';

export const useCheckMoneyTransferProviderInfo = () => {
  // const { navigate } = useNavigation<MainStackScreenProps<'ModalStack'>>();

  const [transferCode, setTransferCode] = useState<string>('');

  const { params } = useRoute<MainStackRouteProps<'CheckMoneyTransferProviderScreen'>>();
  const { providerItem } = params || {};

  const { isKeyboardOpened } = useKeyboard();

  const [findTransferQuery, { isLoading }] = useLazyFindTransferQuery();

  const findTransferOnPress = useCallback(async () => {
    const reqParams = {
      channelCode: 'DigitalChannel',
      mtSystem: providerItem?.key,
      transferNumber: transferCode,
      currency: '',
    };

    const response = await findTransferQuery(reqParams);
    console.warn('response', response);
  }, [findTransferQuery, providerItem?.key, transferCode]);

  return {
    isLoading,
    isKeyboardOpened,
    providerItem,
    transferCode,
    setTransferCode,
    findTransferOnPress,
  };
};
