import { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { CARD_ORDER_CHOOSE_IBAN_SCREEN } from 'navigation/ScreenNames';
import { ModalStackScreenProps } from 'navigation/types';

export const useCardOrderChosenCard = () => {
  const { setOptions, navigate } =
    useNavigation<ModalStackScreenProps<'CardOrderChosenCardScreen'>>();
  const { selectedCardData } = useAppSelector(state => state.products);

  useLayoutEffect(() => {
    if (selectedCardData) {
      setOptions({
        title: selectedCardData.cardKind || '',
      });
    }
  }, [setOptions, selectedCardData]);

  const navigateToChooseIbanScreen = () => {
    navigate(CARD_ORDER_CHOOSE_IBAN_SCREEN);
  };

  return { selectedCardData, navigateToChooseIbanScreen };
};
