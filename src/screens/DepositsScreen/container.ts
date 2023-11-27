import { useAppSelector } from 'store/hooks/useAppSelector';

export const useDepositsScreen = () => {
  const { deposits, totalDepositsGEL } = useAppSelector(state => state.products);

  return {
    deposits,
    totalDepositsGEL,
  };
};
