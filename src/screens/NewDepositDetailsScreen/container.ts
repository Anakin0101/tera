import { useNavigation, useRoute } from '@react-navigation/native';
import { NEW_DEPOSIT_INITIAL_AMOUNT_SCREEN } from 'navigation/ScreenNames';
import { ProductsStackRouteProps, ProductsStackScreenProps } from 'navigation/types';
import { useGetOfferByIdQuery } from 'services/apis/productsAPI/productsAPI';
import { useAppDispatch } from 'store/hooks/useAppDispatch';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { setOfferDetails } from 'store/slices/deposit';

export const useNewDepositDetails = () => {
  const dispatch = useAppDispatch();
  const { navigate } = useNavigation<ProductsStackScreenProps<'NewDepositInitialAmountScreen'>>();
  const { params } = useRoute<ProductsStackRouteProps<'NewDepositDetailsScreen'>>();
  const { data: offer } = useGetOfferByIdQuery(params.id);
  const { imageUrl } = useAppSelector(state => state.deposit);

  const handlePress = () => {
    if (!offer) {
      return;
    }
    dispatch(setOfferDetails(offer));
    navigate(NEW_DEPOSIT_INITIAL_AMOUNT_SCREEN);
  };

  return {
    handlePress,
    imageUrl,
    offer,
  };
};
