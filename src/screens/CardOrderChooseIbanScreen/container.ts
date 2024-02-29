import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch } from 'store/hooks/useAppDispatch';
import { useGetAccountsByCustomerIdQuery } from 'services/apis/productsAPI/productsAPI';
import { saveIban } from 'store/slices/products';
import { CARD_ORDER_CHOOSE_ADDRESS_SCREEN } from 'navigation/ScreenNames';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { ProductsStackScreenProps } from 'navigation/types';
import { useForm } from 'react-hook-form';

export const useCardOrderChooseIban = () => {
  const { navigate } = useNavigation<ProductsStackScreenProps<'CardOrderChosenCardScreen'>>();
  const dispatch = useAppDispatch();
  const { data: accounts } = useGetAccountsByCustomerIdQuery();
  const { control } = useForm();
  const { selectedCardData } = useAppSelector(state => state.products);
  const [selectedIban, setSelectedIban] = useState<string | null>(null);

  const uniqueAccounts = accounts?.reduce(
    (acc, account) => ({
      ...acc,
      [account.accountIban]: account,
    }),
    {} as { [key: string]: (typeof accounts)[0] },
  );

  const uniqueAccountsList = uniqueAccounts ? Object.values(uniqueAccounts) : [];

  const navigateToChooseAddressScreen = () => {
    try {
      if (!selectedIban) return;
      const selectedAccount = uniqueAccountsList.find(
        account => account.accountIban === selectedIban,
      );

      if (selectedAccount) {
        dispatch(
          saveIban({
            accountIban: selectedAccount.accountIban,
            accountId: selectedAccount.accountId.toString(),
          }),
        );

        navigate(CARD_ORDER_CHOOSE_ADDRESS_SCREEN);
      }
    } catch (error) {
      console.warn('Error navigating to choose address screen:', error);
    }
  };

  return {
    selectedCardData,
    uniqueAccountsList,
    selectedIban,
    setSelectedIban,
    navigateToChooseAddressScreen,
    control,
  };
};
