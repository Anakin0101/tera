import { useState } from 'react';
import { useGetTemplatesQuery } from 'services/apis/transfersAPI/transfersAPI';
import DocumentPicker from 'react-native-document-picker';
import { setInvoiceData } from 'store/slices/transfers/indext';
export const useTransactionsScreen = () => {
  const INPUT_LENGTH = 22;
  const [selectedData, setSelectedData] = useState(null);
  const [typedAccountName, setTypedAccountName] = useState('');
  const [debouncedAccountName, setDebouncedAccountName] = useState('');
  const [previousAccountName, setPreviousAccountName] = useState('');
  const [apiCallInitiated, setApiCallInitiated] = useState(false);
  const [invoiceFile, setInvoiceFile] = useState<any>(null);

  const { data: templates, isLoading: temlpatesLoading } = useGetTemplatesQuery();

  const handleFilePick = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      if (res && res.length > 0) {
        const selectedFileName = res[0];
        setInvoiceData(res);
        setInvoiceFile(selectedFileName.name);
      }
    } catch (err) {
      console.error(err);
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
  };
};
