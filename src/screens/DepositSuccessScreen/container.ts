import { useNavigation } from '@react-navigation/native';
import { ProductsStackScreenProps } from 'navigation/types';

export const useDepositSuccess = () => {
  const { reset, navigate } = useNavigation<ProductsStackScreenProps<'ProductsScreen'>>();

  const handleHomePress = () => {
    reset({
      index: 0,
      routes: [{ name: 'ProductsScreen' }],
    });
  };

  const handleTeraWalletPress = () => {
    navigate('TeraWalletScreen');
  };

  return {
    handleHomePress,
    handleTeraWalletPress,
  };
};
