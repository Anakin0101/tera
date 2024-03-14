import { useNavigation } from '@react-navigation/native';
import { MODAL_STACK, PRODUCTS_SCREEN, TERA_WALLET_SCREEN } from 'navigation/ScreenNames';
import { MainStackScreenProps } from 'navigation/types';

export const useDepositSuccess = () => {
  const { navigate } = useNavigation<MainStackScreenProps<'ModalStack'>>();

  const handleHomePress = () => {
    navigate(PRODUCTS_SCREEN);
  };

  const handleTeraWalletPress = () => {
    navigate(MODAL_STACK, { screen: TERA_WALLET_SCREEN });
  };

  return {
    handleHomePress,
    handleTeraWalletPress,
  };
};
