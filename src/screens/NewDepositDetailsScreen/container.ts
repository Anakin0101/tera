import { useNavigation, useRoute } from '@react-navigation/native';
import { ProductsStackRouteProps, ProductsStackScreenProps } from 'navigation/types';
import { useGetOfferByIdQuery } from 'services/apis/productsAPI/productsAPI';

export const useNewDepositDetails = () => {
  const { navigate } = useNavigation<ProductsStackScreenProps<'NewDepositInitialAmountScreen'>>();
  const { params } = useRoute<ProductsStackRouteProps<'NewDepositDetailsScreen'>>();
  const { data: offer } = useGetOfferByIdQuery(params.id);
  const image = params.url;

  const handlePress = () => {
    navigate('NewDepositInitialAmountScreen');
  };

  return {
    handlePress,
    image,
    offer,
  };
};
