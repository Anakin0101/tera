import { useState, useEffect, useCallback } from 'react';
import { useGetTreasuryCodeQuery } from 'services/apis';
import { useAppDispatch } from 'store/hooks/useAppDispatch';
import { setAccountToData } from 'store/slices/transfers';
import { setWrappedCode, setTreasuryFromCode } from 'store/slices/transfers';

export const useBudget = (withoutQuery: boolean) => {
  const dispatch = useAppDispatch();
  const [budgetCode, setBudgetCode] = useState('');
  const [queryParams, setQueryParams] = useState({});
  const [wrapCode, setWrapCode] = useState({ a: '', b: '', c: '' });

  const { data: treasury, refetch } = useGetTreasuryCodeQuery(queryParams, {
    skip: !withoutQuery && budgetCode.length === 0,
  });

  useEffect(() => {
    if (budgetCode.length > 0) {
      refetch();
    }
  }, [budgetCode, refetch]);

  const onChangeBudgetCode = useCallback(
    (code: string, wrap?: string) => {
      const { a, b } = {
        a: code.toString().charAt(0),
        b: code.toString().slice(1, 5),
      };

      let queryParamsNew = {};

      if (!!a || !!b) {
        queryParamsNew = { a, b };
      }

      if (wrap) {
        let newWrapCode = { ...wrapCode, [wrap]: code };
        setWrapCode(newWrapCode);
        queryParamsNew = newWrapCode;
        const createdWrappedCode = `${newWrapCode?.a ?? ''}${newWrapCode?.b ?? ''}${
          newWrapCode?.c ?? ''
        }`;
        dispatch(setAccountToData({ iban: createdWrappedCode, name: 'transactions.budgetTitle' }));
      } else {
        setBudgetCode(code.toString());
        dispatch(setAccountToData({ iban: code.toString(), name: 'transactions.budgetTitle' }));
      }
      setQueryParams(queryParamsNew);
      dispatch(setWrappedCode(queryParamsNew));
      dispatch(setTreasuryFromCode(treasury));
    },
    [dispatch, wrapCode, treasury],
  );

  return {
    budgetCode,
    setBudgetCode,
    onChangeBudgetCode,
    treasury,
  };
};
