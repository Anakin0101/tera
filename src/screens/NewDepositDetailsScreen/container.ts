import { useNavigation } from '@react-navigation/native';
import { ProductsStackScreenProps } from 'navigation/types';

export const useNewDepositDetails = () => {
  const { navigate } = useNavigation<ProductsStackScreenProps<'NewDepositInitialAmountScreen'>>();

  const handlePress = () => {
    navigate('NewDepositInitialAmountScreen');
  };

  return {
    handlePress,
  };
};
