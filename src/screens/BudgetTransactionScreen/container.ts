import { useState, useMemo, useEffect } from 'react';
import { useGetTreasuryCodeQuery } from 'services/apis';

export const useBudget = () => {
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
  };

  return {
    budgetCode,
    setBudgetCode,
    onChangeBudgetCode,
    treasury,
  };
};
