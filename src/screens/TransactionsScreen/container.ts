import { useState, useCallback } from 'react';
import { useGetTemplatesQuery } from 'services/apis';
import DocumentPicker from 'react-native-document-picker';
import { setInvoiceData, setAccountIban } from 'store/slices/transfers';
import { useAppDispatch } from 'store/hooks/useAppDispatch';
import { PersonalNumberAccount } from 'components/PersonalNumberTransaction/PersonalNumberTransaction.types';
import {
  INPUT_LENGTH,
  MOBILE_NUMBER_LENGTH,
  PERSONAL_NUMBER_LENGTH,
} from 'components/MobileTransaction/MobileTransaction.constants';

export const useTransactionsScreen = () => {
  const dispatch = useAppDispatch();

  const [selectedData, setSelectedData] = useState(null);
  const [typedAccountName, setTypedAccountName] = useState('');
  const [debouncedAccountName, setDebouncedAccountName] = useState('');
  const [previousAccountName, setPreviousAccountName] = useState('');
  const [apiCallInitiated, setApiCallInitiated] = useState(false);
  const [invoiceFile, setInvoiceFile] = useState<any>(null);
  const [chosenAccount, setChosenAccount] = useState<PersonalNumberAccount | null>(null);

  const { data: templates, isLoading: temlpatesLoading } = useGetTemplatesQuery();

  const toggleCheckIcon = useCallback(
    (account: PersonalNumberAccount) => {
      if (chosenAccount && chosenAccount.accountId === account.accountId) {
        setChosenAccount(null);
      } else {
        setChosenAccount(account);
        dispatch(setAccountIban({ accountIbanId: account.accountIban }));
      }
    },
    [chosenAccount, dispatch],
  );

  const handleFilePick = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      if (res && res.length > 0) {
        const selectedFileName = res[0];
        dispatch(setInvoiceData(res));
        setInvoiceFile(selectedFileName.name);
      }
    } catch (err) {
      console.warn(err);
    }
  };

  return {
    templates,
    temlpatesLoading,
    selectedData,
    setSelectedData,
    typedAccountName,
    setTypedAccountName,
    debouncedAccountName,
    setDebouncedAccountName,
    previousAccountName,
    setPreviousAccountName,
    invoiceFile,
    handleFilePick,
    apiCallInitiated,
    setApiCallInitiated,
    INPUT_LENGTH,
    PERSONAL_NUMBER_LENGTH,
    toggleCheckIcon,
    MOBILE_NUMBER_LENGTH,
    chosenAccount,
  };
};
