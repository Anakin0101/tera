import { useNavigation } from '@react-navigation/native';
import { ProductsStackScreenProps } from 'navigation/types';

export const useNewDepositDetails = () => {
  const { navigate } = useNavigation<ProductsStackScreenProps<'OpenDepositScreen'>>();

  const handlePress = () => {
    navigate('OpenDepositScreen');
  };

  return {
    handlePress,
  };
};
