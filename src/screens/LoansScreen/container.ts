import { useAppSelector } from 'store/hooks/useAppSelector';

export const useLoans = () => {
  const { loans, totalDebtGEL } = useAppSelector(state => state.products);

  return {
    loans,
    totalDebtGEL,
  };
};
