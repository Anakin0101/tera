import { useLazyCheckForeignIbanQuery } from 'services/apis/transfersAPI/transfersAPI';

export const useForeignIban = () => {
  const [checkForeignIban, { isLoading: isChecking }] = useLazyCheckForeignIbanQuery();

  return {
    checkForeignIban,
    isChecking,
  };
};
