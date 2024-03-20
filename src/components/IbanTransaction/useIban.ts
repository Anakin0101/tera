import { useEffect, useState, useCallback } from 'react';
import Images from 'theme/Images';
import {
  BOG_CODE,
  TBC_BANK_CODE,
  VTB_BANK_CODE,
  CREDO_BANK_CODE,
  TERRA_BANK_CODE,
  LIBERTY_BANK_CODE,
  KHALIK_BANK_CODE,
  BASIS_BANK_CODE,
  PROCREDIT_BANK_CODE,
  CARTU_BANK_CODE,
  PASHA_BANK_CODE,
  ZIRAAT_BANK_CODE,
  SILK_BANK_CODE,
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
      case LIBERTY_BANK_CODE:
        setBankIcon(Images()?.LibertyBankLogoIcon);
        break;
      case LIBERTY_BANK_CODE:
        setBankIcon(Images()?.LibertyBankLogoIcon);
        break;
      case KHALIK_BANK_CODE:
        setBankIcon(Images()?.KhalikBankLogoIcon);
        break;
      case BASIS_BANK_CODE:
        setBankIcon(Images()?.BasisBankLogoIcon);
        break;
      case PROCREDIT_BANK_CODE:
        setBankIcon(Images()?.ProcreditBankLogoIcon);
        break;
      case CARTU_BANK_CODE:
        setBankIcon(Images()?.KartuBankLogoIcon);
        break;
      case PASHA_BANK_CODE:
        setBankIcon(Images()?.PashaBankLogoIcon);
        break;
      case ZIRAAT_BANK_CODE:
        setBankIcon(Images()?.ZiraatBankLogoIcon);
        break;
      case SILK_BANK_CODE:
        setBankIcon(Images()?.SilkBankLogoIcon);
        break;
      //TODO WE DON"T HAVE ICON OF NATIONAL BANK
      // case NATIONAL_BANK_CODE:
      //   setBankIcon(Images()?.);
      // break;
    }
  }, [externalBankCode]);

  return { bankIcon, debouncedHandleChange };
};

export default useBankIcons;
