import { useNavigation, useRoute } from '@react-navigation/native';
import { MONEY_TRANSFER_SEND_MONEY_SCREEN } from 'navigation/ScreenNames';
import { MainStackRouteProps, MainStackScreenProps } from 'navigation/types';
import { useCallback, useState } from 'react';
import { useKeyboard } from 'utils/useKeyboard';

export const useMoneyTransferSendInfo = () => {
  const { params } = useRoute<MainStackRouteProps<'MoneyTransferSendInfoScreen'>>();
  const { navigate } = useNavigation<MainStackScreenProps<'ModalStack'>>();
  const { providerItem, selectedCountry, selectedCity, mtPoint } = params || {};

  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');

  const { isKeyboardOpened } = useKeyboard();

  const onSubmit = useCallback(() => {
    const navParams = {
      providerItem,
      selectedCountry,
      selectedCity,
      mtPoint,
      firstName,
      lastName,
    };
    navigate(MONEY_TRANSFER_SEND_MONEY_SCREEN, navParams);
  }, [firstName, lastName, mtPoint, navigate, providerItem, selectedCity, selectedCountry]);

  return { onSubmit, isKeyboardOpened, setFirstName, setLastName };
};
