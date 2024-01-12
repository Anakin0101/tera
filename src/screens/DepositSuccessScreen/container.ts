import { useNavigation } from '@react-navigation/native';
import { PRODUCTS_SCREEN, TERA_WALLET_SCREEN } from 'navigation/ScreenNames';
import { ProductsStackScreenProps } from 'navigation/types';

export const useDepositSuccess = () => {
  const { reset, navigate } = useNavigation<ProductsStackScreenProps<'ProductsScreen'>>();

  const handleHomePress = () => {
    reset({
      index: 0,
      routes: [{ name: PRODUCTS_SCREEN }],
    });
  };

  const handleTeraWalletPress = () => {
    navigate(TERA_WALLET_SCREEN);
  };

  return {
    handleHomePress,
    handleTeraWalletPress,
  };
};
