import { useEffect, useState, useCallback } from 'react';
import Images from 'theme/Images';
import {
  BOG_CODE,
  TBC_BANK_CODE,
  VTB_BANK_CODE,
  CREDO_BANK_CODE,
  TERRA_BANK_CODE,
} from 'constants/BankCodes';
import { debounce } from 'utils/debounce';
import { setAccountToData } from 'store/slices/transfers';

const useBankIcons = (
  externalBankCode: string | null,
  setDebouncedAccountName: Function,
  dispatch: Function,
  INPUT_LENGTH: number,
) => {
  const [bankIcon, setBankIcon] = useState(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedHandleChange = useCallback(
    debounce((value: string) => {
      if (value.length <= INPUT_LENGTH) {
        setDebouncedAccountName(value.toUpperCase());
        dispatch(setAccountToData({ iban: value.toUpperCase() }));
      }
    }, 300),
    [setDebouncedAccountName, dispatch, INPUT_LENGTH],
  );

  useEffect(() => {
    switch (externalBankCode) {
      case BOG_CODE:
        setBankIcon(Images()?.BOGLogoIcon);
        break;
      case TBC_BANK_CODE:
        setBankIcon(Images()?.TBCBankLogoIcon);
        break;
      case VTB_BANK_CODE:
        setBankIcon(Images()?.VTBBankLogoIcon);
        break;
      case TERRA_BANK_CODE:
        setBankIcon(Images()?.TeraBankLogoIcon);
        break;
      case CREDO_BANK_CODE:
        setBankIcon(Images()?.CredoBankLogoIcon);
        break;
    }
  }, [externalBankCode]);

  return { bankIcon, debouncedHandleChange };
};

export default useBankIcons;
