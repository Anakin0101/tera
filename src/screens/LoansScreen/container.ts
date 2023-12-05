import { useAppSelector } from 'store/hooks/useAppSelector';

export const useLoans = () => {
  const { loans, totalDebtGEL, overdrafts, creditCards } = useAppSelector(state => state.products);

  const data = [...overdrafts, ...creditCards, ...loans];

  return {
    loans,
    totalDebtGEL,
    data,
  };
};
