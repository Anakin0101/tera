import { useState, useMemo, useEffect } from 'react';
import { useGetTreasuryCodeQuery } from 'services/apis';
import { useAppDispatch } from 'store/hooks/useAppDispatch';
import { setAccountToData } from 'store/slices/transfers';

export const useBudget = () => {
  const dispatch = useAppDispatch();
  const [budgetCode, setBudgetCode] = useState<string>('');

  const { a, b } = useMemo(() => {
    return {
      a: budgetCode.charAt(0),
      b: budgetCode.slice(1, 5),
    };
  }, [budgetCode]);
  const { data: treasury, refetch } = useGetTreasuryCodeQuery(
    { a, b },
    { skip: budgetCode.length === 0 },
  );

  useEffect(() => {
    if (budgetCode.length > 0) {
      refetch();
    }
  }, [budgetCode, refetch]);

  const onChangeBudgetCode = (code: string) => {
    setBudgetCode(code);
    dispatch(setAccountToData({ iban: code, name: 'transactions.budgetTitle' }));
  };

  return {
    budgetCode,
    setBudgetCode,
    onChangeBudgetCode,
    treasury,
  };
};
