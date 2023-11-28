import { useAppSelector } from 'store/hooks/useAppSelector';

export const useLoans = () => {
  const { loans, totalDebtGEL, overdrafts } = useAppSelector(state => state.products);

  const data = [...overdrafts, ...loans];

  return {
    loans,
    totalDebtGEL,
    data,
  };
};
