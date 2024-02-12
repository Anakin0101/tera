import { useNavigation } from '@react-navigation/native';
import {
  LanguageKeyForAPIEnum,
  LanguageKeys,
} from 'components/LanguageSwitcher/LanguageSwitcher.types';
import { AUTOMATIC_PAYMENT_DETAILS_SCREEN } from 'navigation/ScreenNames';
import { ModalStackScreenProps } from 'navigation/types';
import { useCallback } from 'react';
import { useGetAutoPaymentsQuery } from 'services/apis';
import { SELECTED_LANGUAGE } from 'storage/constants';
import { getValue } from 'storage/index';

const savedLanguage = getValue(SELECTED_LANGUAGE);

export const useAutomaticPayments = () => {
  const { navigate } = useNavigation<ModalStackScreenProps<'AutomaticPaymentsScreen'>>();
  const { data: automaticPayments, isLoading } = useGetAutoPaymentsQuery({
    culture:
      savedLanguage === LanguageKeys.geo ? LanguageKeyForAPIEnum.KA : LanguageKeyForAPIEnum.EN,
  });

  const handleItemPress = useCallback(
    (id: number, imageId: string) => {
      navigate(AUTOMATIC_PAYMENT_DETAILS_SCREEN, { id, imageId });
    },
    [navigate],
  );

  return {
    handleItemPress,
    isLoading,
    automaticPayments,
  };
};
