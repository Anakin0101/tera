import { useState, useEffect } from 'react';
import { useGetBranchesMutation } from 'services/apis/productsAPI/productsAPI';
import { Branch } from 'services/apis/productsAPI/productsAPI.types';
import { useAppDispatch } from 'store/hooks/useAppDispatch';
import { saveBranch } from 'store/slices/products';
import { useNavigation } from '@react-navigation/native';
import { ProductsStackScreenProps } from 'navigation/types';
import { CARD_ORDER_DETAILS_SCREEN } from 'navigation/ScreenNames';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { useForm } from 'react-hook-form';
import { REGEX } from 'constants/index';

export const useBranches = (initialSearchText: string = '') => {
  const dispatch = useAppDispatch();
  const { control } = useForm();
  const { navigate } = useNavigation<ProductsStackScreenProps<'CardOrderChosenCardScreen'>>();
  const [getBranches, { data: branches, isLoading }] = useGetBranchesMutation();
  const [searchText, setSearchText] = useState<string>(initialSearchText);
  const [selectedBranch, setSelectedBranch] = useState<string | null>(null);
  const [filteredBranches, setFilteredBranches] = useState<Branch[] | null>(null);
  const { selectedCardData } = useAppSelector(state => state.products);

  useEffect(() => {
    getBranches();
  }, [getBranches]);

  useEffect(() => {
    try {
      if (!branches) return;

      const lowercasedSearchText = searchText.toLowerCase();
      const filtered = branches.filter(
        branch =>
          branch.name.Geo.toLowerCase().includes(lowercasedSearchText) ||
          branch.name.Eng.toLowerCase().includes(lowercasedSearchText),
      );

      setFilteredBranches(filtered);
    } catch (error) {
      console.warn('Error filtering branches:', error);
    }
  }, [branches, searchText]);

  useEffect(() => {
    try {
      if (!selectedBranch) return;

      const idMatch = selectedBranch.match(REGEX.MATCH_ID);
      const branchId = idMatch ? parseInt(idMatch[1], 10) : null;

      if (branchId === null) return;

      const branch = filteredBranches?.find(branch => branch.id === branchId);

      if (branch) {
        dispatch(
          saveBranch({
            id: branch.id,
            branchName: branch.name.Geo,
          }),
        );
      }
    } catch (error) {
      console.warn('Error processing selected branch:', error);
    }
  }, [selectedBranch, filteredBranches, dispatch]);

  const navigateToOrderDetailsScreen = () => {
    if (!selectedBranch) return;
    navigate(CARD_ORDER_DETAILS_SCREEN);
  };

  return {
    filteredBranches,
    searchText,
    setSearchText,
    selectedBranch,
    setSelectedBranch,
    selectedCardData,
    navigateToOrderDetailsScreen,
    control,
    isLoading,
  };
};
