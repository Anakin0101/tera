import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Card, Note, Share, Swap } from 'assets/SVGs';
import { useAppDispatch } from 'store/hooks/useAppDispatch';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { RelatedOverdraft } from './AccountDetailsScreen.types';
import {
  useGetCustomerOperationsMutation,
  usePrintAccountRequisitesMutation,
} from 'services/apis/productsAPI/productsAPI';
import { getCurrentDateISO, getDateThreeMonthAgeISO } from 'utils/formatDate';
import { setAccountFromData } from 'store/slices/transfers';
import { MainStackScreenProps } from 'navigation/types';
import {
  MODAL_STACK,
  OTHER_BANK_TANSACTION_SCREEN,
  TO_ACCOUNT_SCREEN,
} from 'navigation/ScreenNames';
import { useCulture } from 'hooks/useCulture';
import { downloadPdf } from 'utils/downloadPdf';
import { openModal } from 'utils/modal';
import { AccountExtractionModal } from 'components/modals';
import { useGroupedAccountsByIban } from 'hooks/useGroupedAccountsByIban';

export const useAccountDetails = (iban: string, index: number) => {
  const dispatch = useAppDispatch();
  const { culture } = useCulture();
  const { navigate } = useNavigation<MainStackScreenProps<'ModalStack'>>();
  const [activeIndex, setActiveIndex] = useState(index);
  const { overdrafts } = useAppSelector(state => state.products);
  const { groupedAccountsByIban } = useGroupedAccountsByIban();
  const [getLastTransactions, { data: lastTransactions }] = useGetCustomerOperationsMutation();
  const [printAccountRequisites, { isLoading: isLoadingFileId }] =
    usePrintAccountRequisitesMutation();
  const [activeAccountIndex, setActiveAccountIndex] = useState(0);

  const account = useMemo(() => {
    return groupedAccountsByIban?.[activeIndex];
  }, [groupedAccountsByIban, activeIndex]);

  useEffect(() => {
    if (account) {
      getLastTransactions({
        count: 4,
        startDate: getDateThreeMonthAgeISO(),
        endDate: getCurrentDateISO(),
        accountNumber: account?.accountNumber,
      });
    }
  }, [account, getLastTransactions]);

  const blockedAmounts = useMemo(() => {
    return account?.accounts
      .filter(item => item?.blockedAmount)
      .map(({ blockedAmount, ccy }) => ({
        blockedAmount,
        ccy,
      }));
  }, [account?.accounts]);

  const overdraftRelatedToAcc = useMemo(() => {
    let result: RelatedOverdraft = null;
    account?.accounts?.forEach(item => {
      const match = overdrafts?.find(overdraft => item?.accountId === overdraft?.accountId);
      if (match) {
        result = match;
      }
    });
    return result;
  }, [account?.accounts, overdrafts]);

  const selectedAccountFromCard = useMemo(() => {
    return account?.accounts?.[activeAccountIndex];
  }, [account, activeAccountIndex]);

  const transferToOwnAccount = useCallback(() => {
    dispatch(setAccountFromData(selectedAccountFromCard));
    navigate(MODAL_STACK, {
      screen: TO_ACCOUNT_SCREEN,
      params: { selected: selectedAccountFromCard?.accountId },
    });
  }, [dispatch, navigate, selectedAccountFromCard]);

  const transferToSomeone = useCallback(() => {
    dispatch(setAccountFromData(selectedAccountFromCard));
    navigate(MODAL_STACK, {
      screen: OTHER_BANK_TANSACTION_SCREEN,
      params: { otherBanks: true },
    });
  }, [dispatch, navigate, selectedAccountFromCard]);

  const getAccountRequisites = useCallback(async () => {
    await printAccountRequisites({
      culture,
      accountId: selectedAccountFromCard?.accountId,
    })
      .unwrap()
      .then(fileId => {
        const id = fileId?.slice(-10);
        const title = `Account_Requisites_${selectedAccountFromCard?.ccy}_${id}`;
        downloadPdf(fileId, title);
      });
  }, [
    culture,
    printAccountRequisites,
    selectedAccountFromCard?.accountId,
    selectedAccountFromCard?.ccy,
  ]);

  const handleAccountExraction = useCallback(() => {
    openModal({
      sectionList: (
        <AccountExtractionModal
          accounts={account?.accounts}
          selectedAccountFromCard={selectedAccountFromCard}
        />
      ),
      disableDynamicSizing: true,
      snapPoints: ['90%'],
    });
  }, [account?.accounts, selectedAccountFromCard]);

  const actions = useMemo(() => {
    return [
      {
        title: 'dashboard.transferToOwnAcc',
        icon: <Swap />,
        handlePress: transferToOwnAccount,
      },
      {
        title: 'dashboard.transferToSomeone',
        icon: <Card />,
        handlePress: transferToSomeone,
      },
      {
        title: 'products.requisite',
        icon: <Note />,
        handlePress: getAccountRequisites,
      },
      {
        title: 'dashboard.extraction',
        icon: <Share />,
        handlePress: handleAccountExraction,
      },
    ];
  }, [transferToOwnAccount, transferToSomeone, getAccountRequisites, handleAccountExraction]);

  return {
    account,
    groupedAccountsByIban,
    actions,
    overdraftRelatedToAcc,
    blockedAmounts,
    lastTransactions,
    activeIndex,
    setActiveIndex,
    setActiveAccountIndex,
    isLoadingFileId,
  };
};
